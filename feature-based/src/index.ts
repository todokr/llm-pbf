import express from "express";
import { userRouter } from "./users";
import { projectRouter } from "./projects";
import { taskRouter } from "./tasks";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Feature-based architecture API is running",
    architecture: "package-by-feature",
  });
});

app.listen(PORT, () => {
  console.log(`Feature-based API server running on port ${PORT}`);
});
