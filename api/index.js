import app from "../src/application/web.js";
import serverless from "serverless-http";

export const handler = serverless(app);
