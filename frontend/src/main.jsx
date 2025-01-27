import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client'; // Notez l'importation depuis 'react-dom/client'

import App from './App'; 

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);