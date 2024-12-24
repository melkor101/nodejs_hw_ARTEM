import { createReadStream, createWriteStream } from "fs";
import colors from "colors/safe";

const LOG_PATH = "./logs/server.log";
const writeStream = createWriteStream(LOG_PATH);

export default function getLogger(prefix: string) {
  return {
    log(message: string) {
      try {
        writeStream.write(`\n[${new Date().toISOString()}]: log on ${prefix} message: ${message}`);

        console.log(`Log: on ${prefix} message: ${message}`);
      } catch (error) {
        console.log('ERROR: ', error);
      }
    },
    warn(message: string) {
      try {
        writeStream.write(`\n[${new Date().toISOString()}]: warn on ${prefix} message: ${message}`);

        console.log(`Log: on ${prefix} message: ${message}`);
      } catch (error) {
        console.log('ERROR: ', error);
      }
    },
    error(message: string, ...args) {
      console.error(colors.red(`${prefix}: ${message}`), ...args);
    }
  };
}