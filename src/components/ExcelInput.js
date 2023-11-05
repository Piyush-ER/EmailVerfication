// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';


// export default function ExcelInput() {
//     const [emails, setEmails] = useState([]);

//     const handleFile = (e) => {
//         // get the file object
//         const file = e.target.files[0];
//         // read the file as binary string
//         const reader = new FileReader();
//         reader.readAsBinaryString(file);
//         reader.onload = (e) => {
//           // parse the data
//           const data = e.target.result;
//           const workbook = XLSX.read(data, {type: "binary"});
//           const sheet = workbook.Sheets[workbook.SheetNames[0]];
//           // convert the data to JSON
//           const json = XLSX.utils.sheet_to_json(sheet, {header: 1});
//           // filter the data by the email column
//           const emaildata = json.map(row => row[0]); // assuming email is in column A
//           // update the state
//           setEmails(emaildata);
//           console.log(emaildata)
//         };

//       };


//       return (
//         <div>
//           <input type="file" onChange={handleFile} />
//           <ul>
//             {emails.map((email, index) => <li key={index}>{email}</li>)}
//           </ul>
//         </div>
//       );
// }

// Import necessary libraries and components
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import EmailVerificationResult from './EmailVerificationResult';
import Navbar from './Navbar';
import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from "react-spinners/BarLoader"


// Get the API key from the environment variables
const apikey = process.env.REACT_APP_API_KEY;

function ExcelInput() {
  // Initialize state variables
  const [email, setEmail] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);  // state for spinner



  // Function to handle file input and read the file
  const handleFile = (e) => {
    // Get the file object
    const file = e.target.files[0];
    // Create a new FileReader object
    const reader = new FileReader();
    // Read the file as binary string
    reader.readAsBinaryString(file);
    // Function to handle onload event of FileReader
    reader.onload = (e) => {
      // Parse the data
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      // Convert the data to JSON
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      // Find the column index that matches the header "email"
      const headerRow = json[0];
      const emailIndex = headerRow.findIndex(cell => cell.toLowerCase() === "email");
      // Filter the data by the email column
      const emails = json.slice(1).map(row => row[emailIndex]);
      // Update the state
      setEmail(emails);
      console.log(emails)
    };
  };

  const verifyEmail = async () => {
    setLoading(true);
    const emails = email;
    const newResults = [];

    for (let i = 0; i < emails.length; i++) {
      const response = await fetch(`https://apilayer.net/api/check?access_key=${apikey}&email=${emails[i]}`);
      const data = await response.json();
      console.log(data)

      if (data.score < 0.5 || !data.format_valid || !data.mx_found) {
        newResults.push({ email: emails[i], isValid: false });
      } else {
        newResults.push({ email: emails[i], isValid: true });
      }
    }

    setResults(newResults);


    var wb = XLSX.utils.book_new();
    var ws_name = "Email Verification Results";
    var ws_data = [["Email", "IsValid"], ...newResults.map(r => [r.email, r.isValid])];
    var ws = XLSX.utils.aoa_to_sheet(ws_data);

    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

    saveAs(blob, "email_verification_results.xlsx");

    setLoading(false);
  };

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  };

  // return (
  //   <>
  //     <div>
  //       {/* File input and button to trigger email verification */}
  //       <input type="file" onChange={handleFile} />
  //       <button onClick={verifyEmail}>Verify Excel</button>
  //       {/* Map over results and render EmailVerificationResult component for each result */}
  //       {results.map((result, index) => (
  //         <EmailVerificationResult key={index} email={result.email} isValid={result.isValid} />
  //       ))}
  //     </div>
  //   </>
  // );

  return (
    // <>
    //   <div>
    //     {/* File input and button to trigger email verification */}
    //     <input type="file" onChange={handleFile} />
    //     <button onClick={verifyEmail}>Verify Excel</button>
    //     {/* Table with headers */}
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th>Email</th>
    //           <th>Validity</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {/* Map over results and render EmailVerificationResult component for each result */}
    //         {results.map((result, index) => (
    //           <EmailVerificationResult key={index} email={result.email} isValid={result.isValid} />
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </>
    <>


      <div className="d-flex justify-content-center  mt-5">
        <div className="card shadow p-3 mb-5 bg-white rounded">
          <div className="card-body text-center">
            <h5 className="card-title">Email Verification Excel</h5>
            <input type="file" onChange={handleFile} className="form-control" />
            <button onClick={verifyEmail} className="btn btn-primary mt-3 mx-auto d-block">Verify Excel</button>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <BarLoader loading={loading} size={150} />
        {loading && <p className="text-center mt-2">Verifying emails...</p>}
      </div>


      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Email</th>
                <th>Validity</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <EmailVerificationResult key={index} email={result.email} isValid={result.isValid} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ExcelInput;

