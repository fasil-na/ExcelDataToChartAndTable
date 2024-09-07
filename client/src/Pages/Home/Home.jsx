import React from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import FileUploadTable from "../../Components/FileUploadTable/FileUploadTable";

const Home = () => {
  return (
    <div>
      <Header />
      <FileUploadTable />
    </div>
  );
};

export default Home;
