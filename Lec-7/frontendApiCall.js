// If we only use fetch then automatically it will act method like GET.
fetch("https://hadhadha.com");

// Like this we can make API call from frontend.
const response = await fetch("https://hadhadha.com", {
  // For getting data
  method: "GET",

  // It is meta data about data.
  headers: {
    "Content-Type": "application/json", // It will tell that the data which we send/receive is in JSON format. In this Content-Type shows that what type of content we get.
  },

  //   For sending data in JSON format
  body: JSON.stringify({
    name: "Madhur Purohit",
    age: 24,
  }),
});
