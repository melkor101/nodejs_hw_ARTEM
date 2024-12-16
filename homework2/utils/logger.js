import colors from "colors/safe.js";
import config from "config";
// import "dotenv/config";


const isColorsEnabled = config.has("COLORS_ENABLED") && config.get("COLORS_ENABLED");

export default function getLogger(prefix) {
  return {
    log(message) {
      const showMessage =  isColorsEnabled ?  `${colors.green(prefix)}: ${message}` : `${prefix}: ${message}`;
      console.log(showMessage);
    },
    warn(message) {
      const showMessage =  isColorsEnabled ?  `${colors.yellow(prefix)}: ${message}` : `${prefix}: ${message}`;
      console.error(showMessage);
    }
  };
}