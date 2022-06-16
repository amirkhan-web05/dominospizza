import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
