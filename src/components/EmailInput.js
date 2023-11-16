import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


import EmailVerificationResult from './EmailVerificationResult';
const apikey = process.env.REACT_APP_API_KEY ;


function EmailInput() {
  const [email, setEmail] = useState('');
  const [results, setResults] = useState([]);

  // // This function is to handel EXCEL INPUT //
  // const handleFile = (e) => {
  //   // get the file object
  //   const file = e.target.files[0];
  //   // read the file as binary string
  //   const reader = new FileReader();
  //   reader.readAsBinaryString(file);
  //   reader.onload = (e) => {
  //     // parse the data
  //     const data = e.target.result;
  //     const workbook = XLSX.read(data, {type: "binary"});
  //     const sheet = workbook.Sheets[workbook.SheetNames[0]];
  //     // convert the data to JSON
  //     const json = XLSX.utils.sheet_to_json(sheet, {header: 1});
  //     // filter the data by the email column
  //     const emails = json.map(row => row[0]); // assuming email is in column A
  //     // update the state
  //     setEmail(emails);
  //     console.log(emails)
  //   }; 
  // };

  const verifyEmail = async () => {
    const emails = email.split(','); //email;
    const newResults = [];

    for (let i = 0; i < emails.length; i++) {
      const response = await fetch(`https://apilayer.net/api/check?access_key=${apikey}&email=${emails[i]}`);
      const data = await response.json();
      console.log(data)

      //   // Check the 'score' field in the response
     
     
       if (data.score < 0.5  || !data.format_valid || !data.mx_found) {
        newResults.push({ email: emails[i], isValid: false });
      } else {
        newResults.push({ email: emails[i], isValid: true });
      }
  

  }

  setResults(newResults);

  //   // Create a new workbook and a new worksheet
  //   var wb = XLSX.utils.book_new();
  //   var ws_name = "Email Verification Results";
  //   var ws_data = [["Email", "IsValid"], ...newResults.map(r => [r.email, r.isValid])];
  //   var ws = XLSX.utils.aoa_to_sheet(ws_data);
  
  //   // Add the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(wb, ws, ws_name);
  
  //   // Write the workbook to a binary string and create a Blob object
  //   var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});
  //   var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
  
  //   // Use FileSaver.js to save the Blob object as an Excel file
  //   saveAs(blob, "email_verification_results.xlsx");
  // };
  
  // // Function to convert a binary string to an array buffer (needed for the Blob object)
  // function s2ab(s) {
  //   var buf = new ArrayBuffer(s.length);
  //   var view = new Uint8Array(buf);
  //   for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  //   return buf;
};

return (
  <>
  {/* <div>
    
          <input type="file" onChange={handleFile} />
          <button onClick={verifyEmail}>Verify Excel</button>
    {results.map((result, index) => (
      <EmailVerificationResult key={index} email={result.email} isValid={result.isValid}  />
    ))}
          
        </div> */}

  {/* <div>
    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
    <button onClick={verifyEmail}>Verify</button>
    {results.map((result, index) => (
      <EmailVerificationResult key={index} email={result.email} isValid={result.isValid}  />
    ))}
  </div> */}
  <>
  <div className="d-flex justify-content-center mt-5">
    <div className="card shadow p-3 mb-5 bg-white rounded">
      <div className="card-body text-center">
        <h5 className="card-title">Email Verification</h5>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
        <button onClick={verifyEmail} className="btn btn-primary mt-3 mx-auto d-block">Verify</button>
      </div>
    </div>
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


  </>


);
}

export default EmailInput;


