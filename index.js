const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const oracledb = require("oracledb");

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
// Configure Oracle DB connection
const dbConfig = {
  user: "staff_zoo_management",
  password: "Admin0505",
  connectString: "localhost/orcl",
};

// Define a helper function to execute SQL queries
async function executeQuery(sql, binds = []) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql, binds, { autoCommit: true });
    return result.rows;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// Authentication

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const manhanvien = 1;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const sql =
    "INSERT INTO NHANVIEN (MA_NHAN_VIEN, EMAIL, PASSWORD) VALUES (:manhanvien, :email, :password)";
  const binds = {
    manhanvien,
    email,
    password,
  };
  try {
    await executeQuery(sql, binds);
    res.status(201).json({ message: "SIGNUP SUCCESSFULLY" });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({ message: "FAILED TO SIGNUP" });
  }
});

app.post("/signin", async (req, res) => {});

app.post("/currentUser", async (req, res) => {});
// REST API
app.get("/api/v1/animals", async (req, res) => {
  const sql = "SELECT * FROM DONGVAT";
  const data = await executeQuery(sql);
  res.json(data);
});

app.post("api/v1/animals", async (req, res) => {});
app.put("api/v1/animals/:id", async (req, res) => {});
app.delete("api/v1/animals/:id", async (req, res) => {});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
