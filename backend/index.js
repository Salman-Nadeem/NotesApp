const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const { DbConnection } = require("./public/Config/Db");
const userRoutes = require("./public/Routes/UserRoute");
const noteRoutes = require('./public/Routes/Notes')

const app = express();

// ✅ Secure HTTP headers

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Set Static & Views
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

// ✅ Database Connection
DbConnection();



// ✅ Routes
app.use("/user", userRoutes); 
app.use('/api/notes', noteRoutes);


// ✅ Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
