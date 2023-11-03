import React, { useState } from 'react';
import { saveAs } from 'file-saver';

import EmailVerificationResult from './EmailVerificationResult';
const apikey = process.env.REACT_APP_API_KEY ;

function JsonInput() {
  const [email, setEmail] = useState('');
  const [results, setResults] = useState([]);

  // This function is to handle JSON INPUT //
  const handleFile = (e) => {
    // get the file object
    const file = e.target.files[0];
    // read the file as text
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      // parse the data
      const data = JSON.parse(e.target.result);
      // filter the data by the email column
      const emails = data.map(row => row.email); // assuming email is in 'email' field
      // update the state
      setEmail(emails);
      console.log(emails)
    }; 
  };

  const verifyEmail = async () => {
    const emails = email;
    const newResults = [];

    for (let i = 0; i < emails.length; i++) {
      const response = await fetch(`http://apilayer.net/api/check?access_key=${apikey}&email=${emails[i]}`);
      const data = await response.json();
      console.log(data)

       if (data.score < 0.5 || !data.format_valid || !data.mx_found) {
        newResults.push({ email: emails[i], isValid: false });
      } else {
        newResults.push({ email: emails[i], isValid: true });
      }
    }

    setResults(newResults);

    // Create a Blob object with the results in JSON format
    var blob = new Blob([JSON.stringify(newResults)], {type: "application/json"});
  
    // Use FileSaver.js to save the Blob object as a JSON file
    saveAs(blob, "email_verification_results.json");
  };

return (
  <>
  <div>
          <input type="file" onChange={handleFile} />
          <button onClick={verifyEmail}>Verify JSON</button>
    {results.map((result, index) => (
      <EmailVerificationResult key={index} email={result.email} isValid={result.isValid}  />
    ))}
          
        </div>
  </>
);
}

export default JsonInput;
