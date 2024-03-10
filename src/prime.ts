import cluster from "cluster";
import http from "http";
import os from "os";
import Server from "./index";

const numCPUs = os.cpus().length;

const workers = [];

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker process ID ${worker.process.pid} exited`);
  });
} else {
  workers.push(cluster.worker.id);
  Server();
}
export { workers };