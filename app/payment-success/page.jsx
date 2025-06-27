"use client";
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

const PaymentSuccess = () => {

    useEffect(()=>{
        localStorage.removeItem("cart");
    }, [])

  return (
    <div className="container py-5 text-center d-flex justify-content-center" style={{justifyContent:"center", alignItems:"center", height:"100vh"}}>
      <div className="row d-flex justify-content-center" style={{justifyContent:"center"}}>
        <div className="col-md-8 col-lg-8">
          <div className="card shadow-lg rounded-4 p-4">
            <div className="d-flex mb-4" style={{display:"flex", justifyContent:"center"}}>
                
            <FaCheckCircle size={80} className="text-success mb-3"  />
            </div>
            <h2 className="mb-3">Payment Successful!</h2>
            <p className="text-muted">
              Thank you for your purchase. Your transaction has been completed successfully.
            </p>

            {/* Order Summary (Optional) */}
            {/* <div className="border rounded-3 p-3 text-start my-4 bg-light">
              <h5>Order Summary</h5>
              <p><strong>Order ID:</strong> #123456</p>
              <p><strong>Amount:</strong> $99.99</p>
              <p><strong>Status:</strong> <span className="badge bg-success">Paid</span></p>
            </div> */}

            {/* Buttons */}
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Link href="/" className="btn btn-outline-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
