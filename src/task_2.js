import { createReadStream, createWriteStream } from "fs";
import csv from "csvtojson";
import { pipeline } from "stream";

const csvFilePath="./src/csv/example.csv";
const txtFilePath = "./src/csv/output.txt";

pipeline(
  createReadStream(csvFilePath),
  csv({
      noheader: false,
      headers: ["book", "author", "amount", "price"],
  }),
  createWriteStream(txtFilePath),
  (error) => error ? console.log(error) : console.log("pipeline accomplished")
);
