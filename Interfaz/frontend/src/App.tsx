import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider} from './context/auth-context';
import MainPage from './pages/MainPage';
import SearchPagesPage from './pages/SearchPagesPage';


import './App.css';
import SearchWordsPage from './pages/SearchWordsPage';


function App() {
  return (
    <div className="App bg-zinc-900">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search-words" element = {<SearchWordsPage />} />
            <Route path="/search-pages" element = {<SearchPagesPage />} />

            {/*<Route path="/searchBlog" element = {<SeachRepositoryPage/>}/>
            <Route path="/blog/:id" element = {<RepositoryPage/>}/>
            <Route path="/blog/:id/AddFilePage" element = {<AddFilesPage/>}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/newBlog" element = {<NewRepositoryPage />} />
              <Route path="/user-profile" element = {<UserProfilePage/>}/>
            </Route>*/}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
