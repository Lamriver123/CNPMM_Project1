import express, { Application } from "express";
import configViewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
import initWebRoutes from "./routes/web";
import connectDB from "./config/configdb";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view engine
configViewEngine(app);

// Initialize web routes
initWebRoutes(app);

// Connect DB
connectDB();

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
