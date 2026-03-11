const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "My Node API",
      version: "1.0.0",
      description: "Node.js APIs documentation",
    },
    servers: [
      {
        url: "http://localhost:5000", // backend server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Jahan tumhare route files hain
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};