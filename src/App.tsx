import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List'
import { useDispatch } from 'react-redux';
import { getList } from './redux/posts-reducer';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getList())
  }, [])
  return (
    <div className="App">
      <List />
    </div>
  );
}

export default App;
