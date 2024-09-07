import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import GraphDisplay from "./Pages/GraphDisplay/GraphDisplay";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graph" element={<GraphDisplay />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import React from 'react';
// import NewsInfo from './Components/NewsInfo/NewsInfo';
// import NotFound from './Components/NotFound/NotFound';
// import './App.scss';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//             <Routes>
//               <Route path="/" element={<NewsInfo />} />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
