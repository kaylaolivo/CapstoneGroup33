const express = require("express");
const connectDB = require("./config/db");
const booksRoutes = require("./routes/api/books");
const coursesRoutes = require("./routes/api/courses");
const listingsRoutes = require("./routes/api/listings");
const usersRoutes = require("./routes/api/users");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware
// for the /api/books path
app.use("/api/books", booksRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/users", usersRoutes);
// Connect Database
connectDB();

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));