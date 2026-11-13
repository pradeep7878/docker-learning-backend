require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/employee_manager")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err.message));

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema({
    name: String,
    email: String,
    role: String,
  })
);

app.get("/api/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.post("/api/employees", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.json(employee);
  } catch (err) {
    console.log("Insert error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
