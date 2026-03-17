import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewAnalysisPage from './pages/NewAnalysisPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-analysis" element={<NewAnalysisPage />} />
      </Routes>
    </Router>
  );
};

export default App;
