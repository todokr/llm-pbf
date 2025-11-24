import express from "express";
import { userRouter, projectRouter, taskRouter } from "./controllers";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Layered architecture API is running",
    architecture: "layered",
  });
});

app.listen(PORT, () => {
  console.log(`Layered API server running on port ${PORT}`);
});
