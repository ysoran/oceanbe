import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/routes";
const compression = require("compression");

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

const PORT = parseInt(process.env.PORT as string, 10) || 4000;
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.use(compression());

let server = app.listen(PORT, () => {
  console.log(`Ocean app is alive on port ${PORT}`);
});

module.exports = app;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
