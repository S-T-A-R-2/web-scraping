import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider} from './context/auth-context';
import './App.css';

import MainPage from './pages/MainPage';
import SearchPagesPage from './pages/SearchPagesPage';
import SearchWordsPage from './pages/SearchWordsPage';
import WordStatisticsPage from './pages/WordStatisticsPage';
import TopTagsPage from './pages/TopTagsPage'
import SearchPercentagePage from './pages/SearchPercentagePage';


function App() {
  return (
    <div className="App bg-zinc-900">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search-words" element = {<SearchWordsPage />} />
            <Route path="/word-statistics" element = {<WordStatisticsPage />} />
            <Route path="/top-tags" element = {<TopTagsPage />} />
            <Route path="/search-percentage" element = {<SearchPercentagePage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
