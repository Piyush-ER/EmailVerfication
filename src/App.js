// import { useState } from 'react';
// import { verifyEmail } from './MailboxLayer';
// import './App.css';

// function App() {
//   const [email, setEmail] = useState('');
//   const [result, setResult] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const data = await verifyEmail(email);

//     setResult(data);
//   };

//   return (
//     <div className='App'>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//         <button type="submit">Verify</button>
//       </form>

//       {result && (
        
//         <div>
//           <p>Email: {result.email}</p>
//           <p>Score: {result.score}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route  
} from "react-router-dom";
import EmailInput from './components/EmailInput';
import ExcelInput from './components/ExcelInput';
import CsvInput from './components/CsvInput'
import JsonInput from './components/JsonInput';
import Home from './screen/Home'
import TabCard from './screen/TabCard';

function App() {
  return (
    <>
      <Router>
    <div>
      <Routes>
        <Route exact path='/' element={<TabCard/>}/>
        <Route exact path='/excel' element={<ExcelInput/>}/>
        <Route exact path='/csv' element={<CsvInput/>}/>
        <Route exact path='/json' element={<JsonInput/>}/>
      </Routes>
    </div>
    </Router>

     
    
    </>
   
  );
}

export default App;

