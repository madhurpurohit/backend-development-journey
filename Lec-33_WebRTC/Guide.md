# WebRTC Video Chat - Step-by-Step Guide

Welcome! This guide explains how this WebRTC video chat application works. We'll break down the code into simple, easy-to-understand steps.

## Core Concepts of WebRTC

WebRTC (Web Real-Time Communication) allows browsers to send video, audio, and data directly to each other (peer-to-peer). However, to establish that direct connection, they first need a little help from a server. Here are the key concepts:

1.  **Signaling Server**: This is a middle-man server. The two browsers (peers) connect to this server to exchange information about each other. They need to trade details like network addresses and media capabilities before they can connect directly. In our project, `server.js` using `Socket.io` is our signaling server.

2.  **`RTCPeerConnection`**: This is the main WebRTC object in the browser. It manages the entire lifecycle of the connection, from setup to data transfer to closing.

3.  **SDP (Session Description Protocol)**: This is the "language" peers use to describe themselves. It includes information like:
    *   What media are they sending (video, audio)?
    *   What codecs are they using?
    *   Security keys.
    This happens in an **Offer/Answer** model. One peer sends an "offer" SDP, and the other sends an "answer" SDP.

4.  **ICE (Interactive Connectivity Establishment)**: This is a framework that finds the best possible path for two peers to connect. It might be a direct connection on the same network or a more complex route through firewalls.
    *   **ICE Candidates**: These are simply potential network addresses (IP address and port) for a peer. The peers exchange these candidates through the signaling server until they find one that works.
    *   **STUN/TURN Servers**: Sometimes, peers can't connect directly because of firewalls (NAT).
        *   A **STUN** server helps a peer discover its own public IP address.
        *   A **TURN** server acts as a relay (a middle-man for the media itself) if a direct connection is impossible. Our app gets these server details from the `/ice-servers` endpoint.

---

## Part 1: The Server (`server.js`)

Our server has two jobs: serve the webpage and act as a signaling server.

### Step 1: Setup Express and Socket.io

First, we set up a basic web server to host our HTML, CSS, and JS files. We also attach `Socket.io` to it to handle signaling.

```javascript
// server.js

// Import necessary libraries
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
require("dotenv").config(); // Load environment variables from .env file

// Create the server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve our static files (index.html, script.js, etc.) from the "public" folder
app.use(express.static("public"));
```

### Step 2: Provide ICE Server Configuration

We don't want to expose our secret TURN server credentials in the front-end code. So, we create a simple API endpoint that the client can call to fetch them securely.

```javascript
// server.js

app.get("/ice-servers", (req, res) => {
  // This endpoint sends the STUN and TURN server configuration
  // stored in the .env file on the server.
  res.json({
    iceServers: [
      { urls: process.env.STUN_SERVER_ID },
      {
        urls: process.env.TURN_URLS,
        username: process.env.TURN_USERNAME,
        credential: process.env.TURN_CREDENTIAL,
      },
    ],
  });
});
```

### Step 3: The Signaling Logic

This is the core of our signaling server. When a user connects, we listen for specific WebRTC events (`offer`, `answer`, `candidate`) and simply "relay" or "broadcast" them to the *other* user. The server doesn't understand what these messages mean; it just passes them along.

```javascript
// server.js

// Listen for new connections from clients
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // This is a helper function to relay messages.
  // It listens for an event (like "offer") and broadcasts
  // the received data to all other clients.
  const relay = (event) => {
    socket.on(event, (data) => {
      socket.broadcast.emit(event, data);
    });
  };

  // Set up the relay for all necessary WebRTC signaling events.
  relay("offer");
  relay("answer");
  relay("candidate");

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
```

---

## Part 2: The Client (`script.js`)

This is where the WebRTC magic happens in the browser.

### Step 1: Initial Setup

First, we connect to our signaling server via Socket.io and fetch the ICE server configuration we created in the backend.

```javascript
// script.js

// Establish a connection to our signaling server
const socket = io();

// This variable will hold the STUN/TURN server configuration
let iceServers;

// Immediately fetch the ICE server configuration from our server's API
(async () => {
  try {
    const response = await fetch("/ice-servers"); // Call the endpoint
    const config = await response.json();      // Parse the JSON response
    iceServers = config.iceServers;            // Store the configuration
  } catch (err) {
    console.error("Error fetching ICE servers:", err);
  }
})();

// Listen for signaling messages from the server
socket.on("offer", handleIncomingOffer);
socket.on("answer", handleAnswer);
socket.on("candidate", handleCandidate);
```

### Step 2: Start Camera

Before a call, the user needs to grant permission to use their camera and microphone.

```javascript
// script.js

// When the "Start Camera" button is clicked...
startBtn.onclick = async () => {
  try {
    // ...request access to the user's camera and microphone.
    localStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: true,
    });
    // Display the local video feed in the "localVideo" element.
    localVideo.srcObject = localStream;
  } catch (err) {
    console.error("Camera error:", err);
  }
};
```

### Step 3: The Calling User - Making an Offer

When the first user clicks "Start Call", they initiate the connection process.

```javascript
// script.js

// When the "Start Call" button is clicked...
callBtn.onclick = () => {
  // 1. Create the main RTCPeerConnection object, passing the ICE server config.
  pc = new RTCPeerConnection({ iceServers });

  // 2. Add the local camera and microphone tracks to the connection.
  // These tracks will be sent to the other peer.
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  // 3. Set up a listener for when the other peer's media stream arrives.
  pc.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  // 4. Set up a listener for when the ICE framework finds a network candidate.
  pc.onicecandidate = ({ candidate }) => {
    // If a candidate is found, send it to the other peer via the signaling server.
    if (candidate) {
      socket.emit("candidate", candidate);
    }
  };

  // 5. Create the SDP "offer". This describes our media capabilities.
  pc.createOffer()
    // 6. Set this offer as our "local description".
    .then((offer) => pc.setLocalDescription(offer))
    .then(() => {
      // 7. Send the offer to the other peer via the signaling server.
      socket.emit("offer", pc.localDescription);
    });
};
```

### Step 4: The Receiving User - Answering the Offer

The second user receives the offer and decides whether to accept the call.

```javascript
// script.js

// This function is called when an "offer" is received from the signaling server.
function handleIncomingOffer(offer) {
  // We store the offer and show the incoming call UI to the user.
  currentOffer = offer;
  incomingCallDiv.classList.remove("hidden");
}

// When the "Accept" button is clicked...
acceptBtn.onclick = async () => {
  // 1. Create the second user's RTCPeerConnection.
  pc = new RTCPeerConnection({ iceServers });

  // 2. Add their local media tracks to be sent.
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  // 3. Set up listeners for media tracks and ICE candidates, just like the caller.
  pc.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };
  pc.onicecandidate = ({ candidate }) => {
    candidate && socket.emit("candidate", candidate);
  };

  // 4. IMPORTANT: Set the received offer as the "remote description".
  // This tells our connection about the other peer.
  await pc.setRemoteDescription(currentOffer);

  // 5. Create an SDP "answer" to send back.
  const answer = await pc.createAnswer();

  // 6. Set the answer as our "local description".
  await pc.setLocalDescription(answer);

  // 7. Send the answer back to the original caller via the signaling server.
  socket.emit("answer", answer);
};
```

### Step 5: The Calling User - Receiving the Answer

The original caller gets the answer, completing the SDP exchange.

```javascript
// script.js

// This function is called when an "answer" is received from the signaling server.
function handleAnswer(answer) {
  if (pc) {
    // IMPORTANT: Set the received answer as the "remote description".
    // Now both peers have a complete description of each other!
    pc.setRemoteDescription(answer);
  }
}
```

### Step 6: Exchanging ICE Candidates (Both Peers)

While the offer/answer exchange is happening, the ICE framework is working in the background. As it finds potential network paths (candidates), it fires the `onicecandidate` event we set up earlier. These candidates are sent through the signaling server and added to the other peer's connection.

```javascript
// script.js

// This function is called when a "candidate" is received from the signaling server.
function handleCandidate(candidate) {
  if (pc) {
    // Add the received ICE candidate to our peer connection.
    // The ICE framework will use this to try and form a connection.
    pc.addIceCandidate(new RTCIceCandidate(candidate));
  }
}
```

Once the peers successfully use an ICE candidate to connect and the SDP exchange is complete, the `ontrack` event will fire, and the video/audio streams will begin flowing directly between them!

### Step 7: Ending the Call

To end the call, we simply close the connection and release the camera.

```javascript
// script.js

hangupBtn.onclick = () => {
  // Close the peer connection.
  if (pc) {
    pc.close();
    pc = null;
  }

  // Stop all media tracks to release the camera and microphone.
  localStream.getTracks().forEach((track) => {
    track.stop();
  });

  // Reset UI elements.
};
```

### Step 8: Cleanup on Page Close

It's good practice to clean up connections when the user closes the browser tab to avoid leaving things hanging.

```javascript
// script.js

// This event fires just before the page is about to be unloaded.
window.onbeforeunload = () => {
  // Disconnect from the signaling server.
  socket.disconnect();
  // Close the peer connection if it exists.
  if (pc) pc.close();
};
```

### Step 9: Handling Abrupt Disconnections

**The Problem:** What happens if one user just closes their browser tab or their network connection drops without clicking "Hang Up"? Previously, the other user would be left looking at a frozen, last-seen image of the disconnected peer. This is a poor user experience.

**The Solution:** The `RTCPeerConnection` object provides a powerful event listener called `onconnectionstatechange` that lets us monitor the real-time status of the peer-to-peer connection. We can use this to detect when a connection is lost and clean up the UI accordingly.

We add this event handler in the two places our `RTCPeerConnection` is created: once for the caller (`callBtn.onclick`) and once for the person receiving the call (`acceptBtn.onclick`).

```javascript
// script.js

// Add this inside callBtn.onclick AND acceptBtn.onclick

pc.onconnectionstatechange = (event) => {
  // Check the connection state
  if (
    pc.connectionState === "disconnected" ||
    pc.connectionState === "closed" ||
    pc.connectionState === "failed"
  ) {
    // If the connection is lost, clear the remote video feed.
    remoteVideo.srcObject = null;
  }
};
```

Now, if a user disconnects unexpectedly, the `connectionState` will change to `"disconnected"`. Our code will detect this change and immediately set the `remoteVideo`'s source to `null`, which makes the video element go blank. This provides clear and instant feedback to the remaining user that the call has ended.
