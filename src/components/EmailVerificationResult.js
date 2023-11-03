// import React from 'react';

// function EmailVerificationResult({ email, isValid }) {

//   return (
//     <div>
//      <p>{email} is {isValid ? 'valid' : 'invalid'}</p> 
      
//     </div>
//   );
// }

// export default EmailVerificationResult;
import React from 'react';

function EmailVerificationResult({ email, isValid }) {
  return (
    <tr>
      <td>{email}</td>
      <td>{isValid ? 'Valid' : 'Invalid'}</td>
    </tr>
  );
}

export default EmailVerificationResult;
