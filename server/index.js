const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const XLSX = require("xlsx");
const cors = require("cors");

const app = express();
const PORT = 4000;

const mongoURI =
  "mongodb+srv://fazilfaizy4:o3dQW7Gie2DINDcP@samdatabase.ortca.mongodb.net/myDatabaseName?retryWrites=true&w=majority&appName=SamDatabase";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error Connecting to MongoDB", err));

const excelDataSchema = new mongoose.Schema({}, { strict: false });
const ExcelData = mongoose.model("ExcelData", excelDataSchema);

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(
      workbook.Sheets[firstSheetName],
      {
        raw: false,
        dateNF: "yyyy-mm-dd",
      }
    );

    await ExcelData.create(worksheet);

    res
      .status(200)
      .json({ message: "File uploaded and processed successfully" });
  } catch (error) {
    console.error("Error processing the file:", error);
    res.status(500).json({ message: "Error processing the file" });
  }
});

app.get("/data", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const data = await ExcelData.find({})
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalItems = await ExcelData.countDocuments();

    res.status(200).json({
      data,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.get("/dataForBarGraph", async (req, res) => {
  try {
    const data = await ExcelData.find({}, "Date Revenue")
      .sort({ Date: -1 })
      .limit(10);

    const formattedData = data.map((entry) => ({
      date: entry.Date,
      revenue: entry.Revenue,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
