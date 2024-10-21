import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello From Server" });
});
app.listen(PORT, () => {
    console.log(`listening to PORT: ${PORT}`);
});
