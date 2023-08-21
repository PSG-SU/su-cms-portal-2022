import express, { json, urlencoded } from "express";
import cors from "cors"; // get MongoDB driver connection
import { connectToServer } from "./mongo/conn.js";

import userRoutes from "./routes/authRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import officeBearerRoutes from "./routes/officeBearerRoutes.js";
import suTeamRoutes from "./routes/suTeamRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import nssRoutes from "./routes/nssStaffRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import generalRoutes from "./routes/Club/GeneralRoutes.js";
import teamMemberRoutes from "./routes/Club/teamMemberRoutes.js";
import proposalRoutes from "./routes/Club/proposalRoutes.js";
import eventReportRoutes from "./routes/Club/eventReportRoutes.js"
import spotlightRoutes from "./routes/spotlightRoutes.js";
import logRoutes from "./routes/logRoutes.js";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(json());
app.use(urlencoded());
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/office-bearers", officeBearerRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/suteam", suTeamRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/nssncc", nssRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/announcement",announcementRoutes);
app.use("/api/club/general", generalRoutes);
app.use("/api/club/team-member", teamMemberRoutes);
app.use("/api/club/proposal", proposalRoutes);
app.use("/api/club/report", eventReportRoutes)
app.use("/api/spotlight", spotlightRoutes);
app.use("/api/log", logRoutes);

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
