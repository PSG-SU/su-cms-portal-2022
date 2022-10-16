import express, { json, urlencoded } from "express";
import cors from "cors"; // get MongoDB driver connection
import { connectToServer } from "./mongo/conn.js";

import userRoutes from "./routes/authRoutes.js";
// import clubRoutes from "./routes/clubRoutes.js";
import officeBearerRoutes from "./routes/officeBearerRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(json());
app.use(urlencoded());

app.use("/api/auth", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/office-bearers", officeBearerRoutes);

app.get("/", async (req, res) => {
  res.send("Welcome to the SU CMS API");
});

// perform a database connection when the server starts
connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
