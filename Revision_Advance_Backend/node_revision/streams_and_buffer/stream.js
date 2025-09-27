import { createReadStream, createWriteStream } from "fs";
import path from "path";

const inputFilePath = path.join(import.meta.dirname, "input.txt");
const outputFilePath = path.join(import.meta.dirname, "output.txt");

//* How to create a stream.
const readableStream = createReadStream(inputFilePath, {
  encoding: "utf-8",
  highWaterMark: 16, // THis means how many bytes we want to read at a time.
});

//* How to write a stream.
const writeableStream = createWriteStream(outputFilePath);

//* How to copy/pipe a stream.
// readableStream.pipe(writeableStream);

//* If we want to see the flow/chunk of data.
readableStream.on("data", (chunk) => {
  //   console.log("Buffer (Chunk): ", Buffer.from(chunk)); // It converts the chunk to buffer.
  console.log("\nBuffer (Chunk): ", Buffer.from(chunk)); // It converts the chunk to buffer.
  console.log("Received Chunk: ", chunk); // It logs each 16-byte chunk.
  writeableStream.write(chunk); // It writes the chunk to the output file.
});

// Handle Stream end.
readableStream.on("end", () => {
  console.log("File read completed.");
  writeableStream.end();
});

//* Handle errors.
readableStream.on("error", (error) => console.log(error));
writeableStream.on("error", (error) => console.log(error));
