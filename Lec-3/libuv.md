# What is Libuv?

Libuv is a C library that provides asynchronous I/O and event-driven programming support for Node.js. It is responsible for handling non-blocking operations like:

✅ File system operations (reading/writing files)

✅ Networking (handling HTTP requests)

✅ Timers (setTimeout, setInterval)

✅ Child processes

✅ Thread pooling (for CPU-intensive tasks)

# Why Does Node.js Need libuv?

Since JavaScript is single-threaded, Node.js needs a way to handle multiple tasks asynchronously without blocking execution. libuv helps achieve this using:

1️⃣ **Event Loop** – Manages async tasks efficiently.

2️⃣ **Thread Pool** – Uses multiple threads for heavy operations.

3️⃣ **Asynchronous I/O** – Handles network, file system, and timers in a non-blocking way.

# How libuv Works in Node.js?

1. **Event Loop (Manages Asynchronous Tasks)**

- The event loop is a part of libuv that executes callbacks when an operation completes.

- Example: setTimeout, fs.readFile, HTTP requests, etc.

2. **Thread Pool (Handles CPU-Intensive Tasks)**

- Some tasks in Node.js use multiple threads via libuv’s thread pool.

- Example: File system operations, Crypto functions, Compression tasks.

# Does Node.js use multiple threads?

- Yes, The main thread runs JavaScript code (event loop).

- The libuv thread pool uses multiple threads for CPU-intensive tasks like file operations and cryptography.

# What is the Role of V8 in Node.js?

V8 is a JavaScript engine written in C++ that only does one job:

✅ Converts JavaScript code into machine code and executes it.

## 📌 What V8 DOES NOT Do:

🚫 It doesn’t handle file system operations, networking, or timers.

🚫 It doesn’t manage async I/O or threading (since JavaScript is single-threaded).

# What is the Role of libuv in Node.js?

libuv is a C library that provides asynchronous I/O and thread management for Node.js.

✅ Manages the event loop.

✅ Handles non-blocking I/O (File system, Networking, Timers, Child Processes).

✅ Provides a thread pool for CPU-heavy operations.

## 📌 What libuv DOES NOT Do:

🚫 It doesn’t execute JavaScript or convert it into machine code.

# Why Was libuv Created Separately Instead of Adding It to V8?

There are three major reasons:

### 1️⃣ V8 is designed for the browser, not for system-level tasks.

- Browsers don’t need to handle file system operations or threads.

- If V8 included these features, it would become bloated and slow.

### 2️⃣ Node.js needs cross-platform asynchronous I/O.

- libuv works on Windows, Linux, macOS, while V8 is optimized for Chrome (not system-level tasks).

- libuv makes Node.js portable and efficient.

### 3️⃣ Separation of Concerns (Better Design).

- V8 only handles JavaScript execution.

- libuv only handles async I/O and threading.

- Node.js connects them efficiently without bloating V8.

# How the code runs under the hood?

| Working Of Backend Code.                                         |
| ---------------------------------------------------------------- |
| JavaScript (JS) <-- Your Code (Calls fs, setTimeout, etc.)       |
| ↓                                                                |
| V8 Engine <-- Executes JavaScript Code (But No I/O!)             |
| ↓                                                                |
| Node.js APIs <-- Bridge between JS and C++ (Written in C++)      |
| ↓                                                                |
| libuv (C Library) <-- Handles Async I/O, Thread Pool, Event Loop |

# How Do Node.js APIs, V8, and libuv Interact?

When you write JavaScript code in Node.js, here’s what happens:

1️⃣ JavaScript code is executed by V8 (JavaScript engine).

2️⃣ If your code calls a built-in Node.js API (like fs.readFile, setTimeout, etc.), Node.js (C++ bindings) takes over.

3️⃣ Node.js (C++ layer) sends the request to libuv if it’s an asynchronous task (file system, networking, timers).

4️⃣ libuv handles the task asynchronously (using OS features or its thread pool).

5️⃣ Once the task is complete, libuv notifies Node.js, which then sends the result back to V8.

6️⃣ V8 executes the JavaScript callback function with the result.

# Is Global Object available in Node.js & Browser both?

Yes, the **Global Object** is available in both. & setTimeOut(), setInterval(), eventListener() etc are only the function call.

In another word setTimeout() is just a function exposed by the Global Object (global in Node.js, window in Browsers). But the actual implementation is handled differently in both environments

| Environment | Global Object | Who Implements setTimeout()?   |
| ----------- | ------------- | ------------------------------ |
| Browser     | window        | Web APIs (part of the Browser) |
| Node.js     | global        | libuv (C-based async library)  |

# How setTimeout() & other Global Object works in Browser & Node.js?

### 1️⃣ In the Browser (Web APIs)

- ✅ Step 1: When you call setTimeout(), the browser does NOT handle it inside the JavaScript engine (V8). Instead, it delegates it to the Web APIs provided by the browser.

- ✅ Step 2: The Web API starts a timer in the background.

- ✅ Step 3: Once the timer expires, the callback is sent to the Callback Queue.

- ✅ Step 4: The Event Loop picks up the callback and executes it.

### 2️⃣ In Node.js (libuv)

- ✅ Step 1: When you call setTimeout() in Node.js, it is not handled by the JavaScript engine (V8).
- ✅ Step 2: Instead, it is sent to libuv, which starts a timer in C++.
- ✅ Step 3: Once the timer expires, the callback is added to the Timers Queue in the Event Loop.
- ✅ Step 4: The Event Loop picks it up and executes the callback.

# Why Callbacks Are Needed

✅ JavaScript is single-threaded, so it cannot handle blocking operations efficiently.

✅ libuv allows asynchronous execution by using a callback function.

✅ Callbacks allow JavaScript to continue execution while libuv handles long-running tasks.

✅ Without callbacks (or Promises), JavaScript would block the entire thread, making the application slow.
