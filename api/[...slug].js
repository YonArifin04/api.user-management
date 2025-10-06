import { web } from "../../src/application/web.js";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    web(req, res, (result) => {
      if (result instanceof Error) {
        return res.status(500).json({ error: result.message });
      }
      return resolve(result);
    });
  });
}