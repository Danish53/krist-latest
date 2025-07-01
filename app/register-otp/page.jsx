"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import "./enter-otp.css";
import "../../public/assets/css/theme/main.css";
import { IoIosArrowBack } from "react-icons/io";
import { ResponseContext } from "../login/ResponseContext";
import { AiOutlineClose } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const { response_Context } = useContext(ResponseContext);
  console.log(response_Context, "Response API...");

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [confirmForm, showConfirmForm] = useState(false);
  const [resetFormData, setResetFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const user_Email =
    response_Context?.data?.user?.email || "No email available";
  // const userId = response_Context?.data?.user?.id || "No ID available";
  // const userId = localStorage.getItem("userId") || "No ID available";
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id || "No ID available");
    }
  }, []);

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Auto-focus on first input
  }, []);

  const handleOtpChange = (index, value) => {
    if (!/^[a-zA-Z0-9]$/.test(value)) return; // Only allow single numeric characters

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (index < 5 && value) {
      inputRefs.current[index + 1]?.focus(); // Move to next input
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move back
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const otpCode = otpValues.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      setLoading(false);
      return;
    }

    const requestData = {
      email: user_Email,
      reset_token: otpCode,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}api/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
    //   console.log(result, "otp data respone......");
      if (result.status === true) {
        toast.success("OTP Verified!");
        router.push("/login")
      } else {
        toast.error(result.message || "Invalid OTP!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to verify OTP!");
    } finally {
      setLoading(false);
    }
  };

//   const handleBackBtn = () => {
//     router.push("/forget-password");
//   };


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="otp" id="otp">
        <div className="container">
          <div className="row login-container height_width">
            <div className="col-lg-7">
              <img src="/assets/images/forms/otp_pic.png" alt="OTP" />
            </div>

            <div className="col-lg-5 j-center">
              
              <h2>Enter OTP</h2>
              {/* <p className="text-muted">
                We’ve sent a code to your registered email: <br />
                {user_Email}
              </p> */}

              <form className="mt-2" onSubmit={handleOtpSubmit}>
                <div className="input_parent_div">
                  {otpValues.map((val, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      className="square-input"
                      maxLength="1"
                      value={val}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100 mt-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Verifying...
                    </>
                  ) : (
                    "Verify"
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
