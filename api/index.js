import { web } from "../src/application/web.js";
import serverless from "serverless-http";

export default serverless(web);
