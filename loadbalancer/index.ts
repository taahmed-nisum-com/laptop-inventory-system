import * as http from "http";
import * as httpProxy from "http-proxy";
import { workers } from "../src/prime";

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  const selectedWorker = workers[Math.floor(Math.random() * workers.length)];

  proxy.web(req, res, { target: `http://localhost:${3000 + selectedWorker}` });
});

server.listen(80);