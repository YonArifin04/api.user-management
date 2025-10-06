import { web } from "../src/application/web.js";
import serverless from "serverless-http";

const handler = serverless(web);
export default handler;
