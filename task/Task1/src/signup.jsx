import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import CreateToast from "./createToast";
// import { Alert } from "react-bootstrap";
import { CREATE_USER } from "./Mutation";
import { useMutation } from "@apollo/client";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    task: [],
  });
  const [createUser]=useMutation(CREATE_USER);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // let users = JSON.parse(localStorage.getItem("users")) || [];

    let newErrors = { name: "", email: "", password: "", confirmPassword: "" };
    let hasError = false; 
    if (!form.name.trim()) {
      newErrors.name = "Full Name is required.";
      hasError = true;
    } else if (!/^[A-Za-z ]+$/.test(form.name)) {
      newErrors.name = "Name should contain only letters and spaces.";
      hasError = true;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email Address is required.";
      hasError = true;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = "Enter a valid email.";
      hasError = true;
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
      hasError = true;
    } else if (form.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters.";
      hasError = true;
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required.";
      hasError = true;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
      hasError = true;
    }
    setErrors(newErrors);

    if (hasError) {
      return;
    }
    try{
      const {data}=await createUser({
        variables:{
        userName:form.name,
        email:form.email,
        password:form.password
        }
      })
      if(data)
      {
        CreateToast({message:"Signup successful!",type:"success"});
    navigate("/login");
      }
    }
    catch(e){
      CreateToast({message:e.message,type:"error"});
      console.error()
    }

  };

  return (
    <div className="signup-container">
      <div className="logo-container">
        <img src="./tringapps-copy-2.png" alt="Office Logo" onClick={() => navigate("/")} />
      </div>
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="login-text">
          Already have an account?{" "}
          <a href="/login" className="login-link">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
