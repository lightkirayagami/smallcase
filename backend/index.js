import fetch from "node-fetch";
import express from "express";
import {createAuthToken} from "./jwt.js";
import cors from "cors";

const ENDPOINT = "gateway/goalfi/transaction";

const app = express();
app.use(cors());
app.use(express.json());

const url = "https://gatewayapi.smallcase.com/";
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "x-gateway-secret": "goalfi_ffe2d9a27ad7449994e8795a383f2e6a",
    "x-gateway-authtoken": createAuthToken(undefined),
    "Content-Type": "application/json",
  },
};

/* -------------------------- API Calls ----------------------------- */

app.post("", async (req, res) => {
  const details = await apicall(req, res);
  res.send(details);
});

// app.get("/authtoken", (req, res) => {
//   res.json(createAuthToken(undefined));
// });

/* -------------------------- Helpers ----------------------------- */

const apicall = async (req, res) => {
  const {method, info} = req.body;
  options.method = method;
  options.body = JSON.stringify(info);
  const result = await fetch(url + ENDPOINT, options);
  const details = await result.json();
  console.log("Backend", details);
  return {details, auth_token: createAuthToken(undefined)};
};

app.listen(5000, () => {
  console.log("listening to port 5000");
});
