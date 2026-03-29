import express, { Express } from "express";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();
import eventRoutes from "./api/v1/routes/eventRoutes"
import { apiHelmetConfig } from "./config/helmetConfig";
import { getCorsOptions } from "./config/corsConfig";
import cors from "cors";
import morgan from "morgan";
import setupSwagger from "./config/swagger";



// Initialize Express application
const app: Express = express();


app.use(express.json());

app.use(morgan("combined"));

app.use("/api/v1", eventRoutes)

// Sample healt check
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

setupSwagger(app);
app.use(apiHelmetConfig);
app.use(cors(getCorsOptions()));
export default app;