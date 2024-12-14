import colors from "colors/safe.js";
import config from "config";
// import "dotenv/config";


const isColorsEnabled = config.has("COLORS_ENABLED") && config.get("COLORS_ENABLED");

export default function getLogger(prefix) {
  return {
    log(message) {
      const logName = "LOG:";
      const showName =  isColorsEnabled ? colors.green(logName) :  logName;

      console.log(showName, `${prefix}: ${message}`);
    },
    warn(message) {
      const logName = "WARN:";
      const showName =  isColorsEnabled ? colors.yellow(logName) :  logName;

      console.error(showName,`${prefix}: ${message}`);
    }
  };
}