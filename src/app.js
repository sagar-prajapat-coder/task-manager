import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import http from "http";
import path from "path";
// import session from "express-session";
import { fileURLToPath } from "url";
// import { errorHandler } from "./middleware/errorHandler.js";
import router from "./router/route.js";
// import expressEjsLayouts from "express-ejs-layouts";
// import { enrichUser } from "./utils/helper.js";

const app = express();
const server = http.createServer(app);
dotenv.config();
process.env.TZ = "Asia/Calcutta";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));



app.use(
  fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   }
// }));
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.CORS_ORIGIN,
        "https://tixoo-node.webdemozone.com",
        "http://localhost:3001",
      ];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Middleware to set the user in res.locals
app.use(async (req, res, next) => {
  if (!req.user) {
    res.locals.user = null;
    return next();
  }
//   const enrichedUser = await enrichUser(req.user._id);
//   res.locals.user = enrichedUser || null;

  next();
});
// Body parser configuration
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Cookie parser
app.use(cookieParser());

// Import routes
app.use("/api/v1", router);
// app.use("/", admin);

// Catch unknown routes
app.use((req, res) => {
  res.status(404).json({ status: false, error: "Resource not found" });
});

// Error handler
// app.use(errorHandler);

export { app, server };
