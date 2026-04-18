import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env)
// Load environment variables BEFORE your internal imports!

import eventRoutes from "./api/v1/routes/eventRoutes"
import { apiHelmetConfig } from "./config/helmetConfig";
import { getCorsOptions } from "./config/corsConfig";
import cors from "cors";
import morgan from "morgan";
import setupSwagger from "./config/swagger";


const corsOptions = getCorsOptions();

// Initialize Express application
const app: Express = express();

// Apply security headers first (before any routes)
app.use(apiHelmetConfig);

// Apply logging middleware
app.use(morgan("combined"));

// Apply CORS middleware with options
app.use(cors(getCorsOptions()));

// Handle preflight requests for all routes
app.options("/{*splat}", cors(corsOptions));

app.use(express.json());



// Define a route
app.get("/", (req, res) => {
    res.send("It's Online!!");
});

// Use event routes
app.use("/api/v1", eventRoutes)

// Setup Swagger documentation
setupSwagger(app);
