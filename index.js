const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const oracledb = require("oracledb");
const crypto = require("crypto");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
// Configure Oracle DB connection
const dbConfig = {
  user: "zoo_management",
  password: "DinhLoc0505",
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

function generateRandomId(length) {
  const characters = "0123456789";
  const characterCount = characters.length;

  let randomId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characterCount);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
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

// REST API
app.get("/api/v1/animals", async (req, res) => {
  const sql = "SELECT * FROM LoaiThucAn";
  const data = await executeQuery(sql);
  res.json(data);
});

app.post("api/v1/animals", async (req, res) => {});
app.put("api/v1/animals/:id", async (req, res) => {});
app.delete("api/v1/animals/:id", async (req, res) => {});

// RESTful API Staff
app.get("/api/v1/staffs", async (req, res) => {
  const sql =
    "SELECT Ma_Nhan_Vien, Ho_Ten, Ngay_Sinh, Vi_Tri, Muc_Luong FROM NHANVIEN";
  const data = await executeQuery(sql);
  res.status(200).json({
    status: "success",
    data,
  });
});

app.get("/api/v1/staffs/:MA_NHAN_VIEN", async (req, res) => {
  const MA_NHAN_VIEN = req.params.MA_NHAN_VIEN;
  const sql =
    "SELECT Ma_Nhan_Vien, Ho_Ten, Ngay_Sinh, Vi_Tri, Muc_Luong, SO_DIEN_THOAI FROM NHANVIEN WHERE MA_NHAN_VIEN = :MA_NHAN_VIEN ";
  const binds = { MA_NHAN_VIEN };
  const data = await executeQuery(sql, binds);
  const staff = data[0];
  console.log(staff);
  res.status(200).json({
    status: "success",
    staff,
  });
});

app.post("/api/v1/staffs", async (req, res) => {
  const { HO_TEN, NGAY_SINH, VI_TRI, MUC_LUONG, SO_DIEN_THOAI } = req.body;
  console.log(HO_TEN, NGAY_SINH, VI_TRI, MUC_LUONG, SO_DIEN_THOAI);
  if (!HO_TEN || !NGAY_SINH || !VI_TRI || !MUC_LUONG || !SO_DIEN_THOAI) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const MA_NHAN_VIEN = generateRandomId(6);
  const sql =
    "INSERT INTO NHANVIEN (MA_NHAN_VIEN, HO_TEN, NGAY_SINH, VI_TRI, MUC_LUONG, SO_DIEN_THOAI ) VALUES (:MA_NHAN_VIEN, :HO_TEN, to_date (:NGAY_SINH, 'dd-mon-rrrr'), :VI_TRI, :MUC_LUONG, :SO_DIEN_THOAI)";
  const binds = {
    MA_NHAN_VIEN,
    HO_TEN,
    NGAY_SINH,
    VI_TRI,
    MUC_LUONG,
    SO_DIEN_THOAI,
  };
  try {
    await executeQuery(sql, binds);
    res.status(201).json({ message: "Record created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create record" });
  }
});

app.patch("/api/v1/staffs/:MA_NHAN_VIEN", async (req, res) => {
  const MA_NHAN_VIEN = req.params.MA_NHAN_VIEN;
  const { HO_TEN, NGAY_SINH, VI_TRI, MUC_LUONG, SO_DIEN_THOAI } = req.body;

  if (!HO_TEN || !NGAY_SINH || !VI_TRI || !MUC_LUONG || !SO_DIEN_THOAI) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql =
    "UPDATE NHANVIEN SET HO_TEN = :HO_TEN, NGAY_SINH = to_date (:NGAY_SINH, 'dd-mon-rrrr'), VI_TRI = :VI_TRI, MUC_LUONG = :MUC_LUONG, SO_DIEN_THOAI = :SO_DIEN_THOAI WHERE MA_NHAN_VIEN = :MA_NHAN_VIEN";
  const binds = {
    MA_NHAN_VIEN,
    HO_TEN,
    NGAY_SINH,
    VI_TRI,
    MUC_LUONG,
    SO_DIEN_THOAI,
  };
  try {
    await executeQuery(sql, binds);
    res.json({ message: "Record updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to updated record" });
  }
});

app.delete("/api/v1/staffs/:Ma_NHAN_VIEN", async (req, res) => {
  const MA_NHAN_VIEN = req.params.Ma_NHAN_VIEN;
  console.log(MA_NHAN_VIEN);
  const sql = "DELETE FROM NHANVIEN WHERE MA_NHAN_VIEN = :MA_NHAN_VIEN";
  const binds = {
    MA_NHAN_VIEN: MA_NHAN_VIEN,
  };

  try {
    await executeQuery(sql, binds);
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete record" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
