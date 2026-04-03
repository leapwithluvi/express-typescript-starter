import swaggerJsdoc from "swagger-jsdoc";
import { version } from "../../package.json";

/**
 * SWAGGER CONFIGURATION
 * Defines the OpenAPI specification and security schemes for the API.
 * This configuration is used by swagger-jsdoc to generate the documentation.
 */

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express TypeScript Starter API",
      version,
      description:
        "A robust and production-ready Express.js API documentation.",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      contact: {
        name: "leapwithluvi",
        url: "https://github.com/leapwithluvi",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routers/*.ts", "./src/types/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
