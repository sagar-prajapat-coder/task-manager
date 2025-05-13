import dotenv from "dotenv";
import connetDB from "./src/db/index.js";
import { server } from "./src/app.js";

dotenv.config();

connetDB(process.env.MONGO_URL)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`APIs ready at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongo db connection failed", err);
  });
