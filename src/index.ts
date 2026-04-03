/**
 * SERVER ENTRY POINT
 * This file is responsible for initializing the environment, 
 * starting the Express server, and managing its lifecycle.
 */

// 1. Validate environment variables at the very first line
import "@/configs/env";

import app from "./app";
import { prisma } from "@/configs/prisma";
import { createTerminus } from "@godaddy/terminus";
import { databaseCheck, checkMemory } from "@/checks";

const PORT = process.env.PORT || 3000;

// 2. Start the HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/**
 * 3. GRACEFUL SHUTDOWN & HEALTH CHECKS (Terminus)
 * Terminus handles SIGTERM/SIGINT and provides a standard /health endpoint.
 */
const onSignal = async () => {
  console.log("Cleanup started: Server is receiving a shutdown signal...");
};

const onShutdown = async () => {
  console.log("Cleanup in progress: Closing database connection...");
  await prisma.$disconnect();
  console.log("Cleanup complete: System is shutting down.");
};

const healthChecks = {
  "/health": async () => {
    // Perform all vital checks here
    await databaseCheck();
    const memory = await checkMemory();
    
    return {
      status: "UP",
      database: "Connected",
      memory,
    };
  },
};

createTerminus(server, {
  signal: "SIGTERM",
  signals: ["SIGINT"],
  healthChecks,
  onSignal,
  onShutdown,
  // beforeShutdown: Wait for 5s to allow load balancers to stop sending traffic
  beforeShutdown: () => new Promise((resolve) => setTimeout(resolve, 5000)),
});
