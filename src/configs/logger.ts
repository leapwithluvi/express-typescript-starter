import pino from "pino";

/**
 * LOGGER CONFIGURATION
 * Configures the Pino logger with pretty-printing for development
 * and standard JSON output for production.
 */

const isTest = process.env.NODE_ENV === "test";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  // Use pino-pretty only in non-test environments for better readability
  ...(isTest
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
          },
        },
      }),
});
