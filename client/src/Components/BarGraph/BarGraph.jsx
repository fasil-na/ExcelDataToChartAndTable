import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "./BarGraph.css";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const BarGraph = () => {
  const [excelData, setExcelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/dataForBarGraph");

      if (response.status === 200 && response.data.length > 0) {
        const filteredData = response.data
          .map(({ date, revenue, profit }) => ({
            date,
            revenue,
            profit,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setExcelData(filteredData);
        setNoDataMessage("");
      } else {
        setNoDataMessage(
          "No data available. Please upload a file to add data."
        );
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

  const getChartData = () => {
    const labels = excelData.map((data) => {
      const [day, month, year] = data.date.split("/");
      const formattedDate = new Date(`${year}-${month}-${day}`);
      return formattedDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    });

    const revenueData = excelData.map((data) => data.revenue);

    return {
      labels,
      datasets: [
        {
          type: "bar",
          label: "Revenue",
          data: revenueData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Revenue and Profit",
      },
    },
  };

  return (
    <div className="bar-graph-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : noDataMessage ? (
        <p>{noDataMessage}</p>
      ) : (
        <Bar data={getChartData()} options={chartOptions} />
      )}
    </div>
  );
};

export default BarGraph;
