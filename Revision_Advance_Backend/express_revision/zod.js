import { z, ZodError } from "zod";
import "dotenv/config";

const age = 19;
const ageSchema = z.number().min(18).max(100).int();

//* Method1:
// const parseAge = ageSchema.parse(age);
// console.log(parseAge);

//* Method2:
// try {
//   const parseAge1 = ageSchema.parse(age);
//   console.log(parseAge1);
// } catch (error) {
//   if (error instanceof ZodError) {
//     console.log(error.issues[0].message);
//   } else {
//     console.log("Unexpected error: ", error);
//   }
// }

//* Method3: In this coerce will convert string to number
const portSchema = z.coerce.number().min(1).max(65535).default(4001);

try {
  const parsePort = portSchema.parse(process.env.PORT);
  console.log(parsePort);
} catch (error) {
  if (error instanceof ZodError) {
    console.log(error.issues[0].message);
  } else {
    console.log("Unexpected error: ", error);
  }
}
