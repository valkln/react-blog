import React, { useEffect } from 'react';
import './App.css';
import List from './components/List'
import { useDispatch } from 'react-redux';
import { getList } from './redux/posts-reducer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from './components/Post';
import Header from './components/Header';
import { Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Container maxWidth='lg'>
          <Routes>
            <Route path='/posts/:id' element={<Post />} />
            <Route path='/' element={<List />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}
export default App;
