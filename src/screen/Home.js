import React from 'react'
import '../App.css';
import { Link } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="p-5 mb-4 bg-light rounded-3" style={{ boxShadow: "10px 10px 5px grey" }}>
        <div className="container-fluid py-5 d-flex flex-column align-items-center">
          <h1 className="display-10 fw-bold">INPUT FILE</h1>
          <div className="d-flex justify-content-center">
            <Link to="/excel">
              <Button variant="primary" className="m-3" style={{ boxShadow: "3px 3px 2px grey" }}>Use Excel</Button>
            </Link>
            <Link to="/csv">
              <Button variant="secondary" className="m-3" style={{ boxShadow: "3px 3px 2px grey" }}>Use CSV</Button>
            </Link>
            <Link to="/json">
              <Button variant="success" className="m-3" style={{ boxShadow: "3px 3px 2px grey" }}>Use JSON</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
