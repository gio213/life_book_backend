import env from "dotenv";
import express from "express";
import bodyParser from "body-parser";
env.config({ path: "./.env" });
import router from "./index.js";
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    info: {
      title: "Social Media App",
      version: "1.0.0",
      description: "A social media app with a REST API",
      contact: {
        name: "Giorgi Patsia",
        url: "localhost:3000",
        email: "gio.patsia@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use("/api", router);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.listen(3000, () => {
  console.log(`Server is running on port ${3000}.`);
});
