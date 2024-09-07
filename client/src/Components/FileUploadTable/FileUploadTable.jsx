import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FileUploadTable.css";
import { useNavigate } from "react-router-dom";

const FileUploadTable = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [noDataMessage, setNoDataMessage] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 

  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const graphDisplay = () => {
    navigate("/graph");
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:4000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("File uploaded successfully!");
        fetchData(); 
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchData = async (page = 1) => {
    setIsLoading(true); 
    try {
      const response = await axios.get(
        `http://localhost:4000/data?page=${page}&limit=10`
      );
      if (response.status === 200) {
        const filteredData = response.data.data
          .map(({ _id, __v, ...rest }) => rest)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setExcelData(filteredData);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);

        if (filteredData.length === 0) {
          setNoDataMessage(
            "No data available. Please upload a file to add data."
          );
        } else {
          setNoDataMessage(""); 
        }
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setNoDataMessage("Error fetching data. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const handlePageChange = (newPage) => {
    fetchData(newPage);
  };

  return (
    <div className="upload-container">
      <div className="upload-controls">
        <input type="file" onChange={handleFileUpload} className="file-input" />
        <button className="file-upload-button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="toggle-button" onClick={graphDisplay}>
          Graph view 
        </button>
      </div>

      {isLoading ? (
        <p className="message">Loading data...</p>
      ) : excelData.length > 0 ? (
        <>
          <table className="styled-table">
            <thead>
              <tr>
                {Object.keys(excelData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="message">{noDataMessage}</p>
      )}
    </div>
  );
};

export default FileUploadTable;
