// Import React core libraries

import React from 'react';
// React → required to use JSX

import ReactDOM from 'react-dom/client';
// ReactDOM → used to render app into browser

//  IMPORT COMPONENTS

import { Edit } from './pages/visitors/Edit';
// Edit page component

import { Navbar } from './components/layout';
// Navbar component (top menu)

import { BrowserRouter, Route, Routes } from "react-router-dom";
// BrowserRouter → enables routing
// Routes → group of routes
// Route → defines each path

import { Register } from './pages/visitors/Register';
// Register page

import VisitorsList from './pages/visitors/VisitorsList';
// Visitors list page

import { NotFound } from './pages/NotFound';
// 404 page

//  MAIN APP COMPONENT

export function App() {

  return (

    <BrowserRouter>
      {/* Enables routing in entire app */}

      <Navbar />
      {/* Navbar will appear on all pages */}

      <Routes>
        {/* Define all routes */}

        <Route path='/' element={<VisitorsList />} />
        {/* Default home page */}

        <Route path='/pages/visitors' element={<VisitorsList />} />
        {/* Visitors list page */}

        <Route path="/edit/:id" element={<Edit />} />
        {/* Dynamic route for edit (id comes from URL) */}

        <Route path='/Register' element={<Register />} />
        {/* Register page */}

        <Route path='*' element={<NotFound />} />
        {/* 404 page for invalid URL */}

      </Routes>

    </BrowserRouter>
  );
}

//  RENDER APP TO DOM

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
// Select root div from index.html

root.render(
  <React.StrictMode>
    {/* Helps find errors in development */}

    <App />
    {/* Render main App component */}

  </React.StrictMode>
);