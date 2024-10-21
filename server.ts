import createApp from "./src/app.js";
import connectDB from "./src/db/connectDB.js";

connectDB()
  .then(() => {
    createApp();
  })
  .catch((err: any) => {
    console.error("Database connection failed - ", err.message || err);
    process.exit(1);
  });
