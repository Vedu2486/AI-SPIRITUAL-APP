import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Meditation from './pages/Meditation';
import Journal from './pages/Journal';
import Insights from './pages/Insights';
import Practices from './pages/Practices';
import { AIProvider } from './context/AIContext';
import './styles/animations.css';

function App() {
  return (
    <AIProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meditation" element={<Meditation />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/practices" element={<Practices />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AIProvider>
  );
}

export default App;