import React, { useState } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

import EmailVerificationResult from './EmailVerificationResult';
const apikey = process.env.REACT_APP_API_KEY ;

function CsvInput() {
  const [email, setEmail] = useState('');
  const [results, setResults] = useState([]);

  // This function is to handel CSV INPUT //
  const handleFile = (e) => {
    // get the file object
    const file = e.target.files[0];
    // read the file as text string
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      // parse the data
      const data = e.target.result;
      const result = Papa.parse(data, {header: true}); // set header to true if the first row contains column names
      // get the data array
      const json = result.data;
      // filter the data by the email column
      const emails = json.map(row => row.email); // assuming email is the column name
      // update the state
      setEmail(emails);
      console.log(emails)
    }; 
  };

  const verifyEmail = async () => {
    const emails = email; //email.split(',');
    const newResults = [];

    for (let i = 0; i < emails.length; i++) {
      const response = await fetch(`http://apilayer.net/api/check?access_key=${apikey}&email=${emails[i]}`);
      const data = await response.json();
      console.log(data)

      //   // Check the 'score' field in the response
     
     
       if (data.score < 0.5 || !data.smtp_check || !data.format_valid || !data.mx_found) {
        newResults.push({ email: emails[i], isValid: false });
      } else {
        newResults.push({ email: emails[i], isValid: true });
      }
  

  }

  setResults(newResults);

    // Create a CSV string from the data array
    var csv = Papa.unparse([["Email", "IsValid"], ...newResults.map(r => [r.email, r.isValid])]);
  
    // Create a Blob object from the CSV string
    var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
  
    // Use FileSaver.js to save the Blob object as a CSV file
    saveAs(blob, "email_verification_results.csv");
  };
  
return (
  <>
  <div>
          <input type="file" onChange={handleFile} />
          <button onClick={verifyEmail}>Verify CSV</button>
    {results.map((result, index) => (
      <EmailVerificationResult key={index} email={result.email} isValid={result.isValid}  />
    ))}
          
        </div>

  {/* <div>
    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
    <button onClick={verifyEmail}>Verify</button>
    {results.map((result, index) => (
      <EmailVerificationResult key={index} email={result.email} isValid={result.isValid}  />
    ))}
  </div> */}

  </>


);
}

export default CsvInput;
