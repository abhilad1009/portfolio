
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import Projects from './pages/Projects';
import Skills from './pages/Attributes';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/attributes" element={<Skills />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
