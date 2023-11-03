import React from 'react'

export default function BulkFinder() {
  return (
    <>
    
    <div className="d-flex justify-content-center  mt-5">
      <div className="card shadow p-3 mb-5 bg-white rounded">
        <div className="card-body text-center">
          <h5 className="card-title">Email Finder Excel</h5>
          <input type="file"  className="form-control" />
          <button  className="btn btn-primary mt-3 mx-auto d-block">Find</button>
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
            
          </tbody>
        </table>
      </div>
    </div>
  </>
  )
}
