import { createReadStream, createWriteStream } from "fs";

const LOG_PATH = "./logs/server.log";
export default function getLogger(prefix: string) {
  return {
    onLog(message: string) {
      try {
        const writeStream = createWriteStream(LOG_PATH);
        writeStream.write(`\n[${new Date().toISOString()}]: on ${prefix} message: ${message}`);
        writeStream.end();

        console.log(`Log: on ${prefix} message: ${message}`);
      } catch (error) {
        console.log('ERROR: ', error);
      }
    },
  };
}