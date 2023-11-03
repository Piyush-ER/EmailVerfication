// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link
// import logo1 from "../images/logo.png"
// import logo2 from "../images/Marketjoy_White_Logo4x_jj.png"

// function Navbar() {
    
//     const navbarStyle = {
//         backgroundColor: 'blue', // Change this to your desired background color
//         boxShadow: '0 .125rem .25rem rgba(0, 0, 0, 0.75)' // Customize the shadow properties as needed
//       };

//     const imageStyle = {
//         marginRight: '10px', // Add space to the right of the image
//         borderRadius: '50%', // Make the image circular
        
//     };
  
//   return (
   
//     <nav className="navbar navbar-dark bg-primary" style={navbarStyle}>
//       <div className="container-fluid">
//         <Link to="/" className="navbar-brand"> {/* Add Link here */}
//             <img src={logo2} alt="" width="150" height="36" className="d-inline-block align-text-top"  />
            
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import logo1 from "../images/logo.png"
import logo2 from "../images/Marketjoy_White_Logo4x_jj.png"

function Navbar() {
    
    const navbarStyle = {
        backgroundColor: 'blue', // Change this to your desired background color
        boxShadow: '0 .125rem .25rem rgba(0, 0, 0, 0.75)' // Customize the shadow properties as needed
    };

    
  
  return (
   
    <nav className="navbar navbar-dark bg-primary" style={navbarStyle}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand"> 
            <img src={logo2} alt="" width="150" height="36" className="d-inline-block align-text-top"  />
        </Link>
        <div className="ml-auto">
            <Link to="/about" className="navbar-brand">About</Link> 
            <Link to="/login" className="navbar-brand">Login</Link> 
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


