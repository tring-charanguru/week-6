import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setauth, setUser } from "./Redux/userSlice";
import "./Login.css";
import CreateToast from "./createToast";
import { GET_USER } from "./Query.js";
import { useLazyQuery } from "@apollo/client";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [getUser] = useLazyQuery(GET_USER);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorLogin(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await getUser({
      variables: {
        email: form.email,
        password: form.password,
      },
    });
  
    if (error) {
      console.error(error.message);
      CreateToast({ message: error.message, type: "error" });
      return;
    }
  
    if (data && data.getUser) {
      setErrorLogin(false);
      dispatch(setUser(data.getUser));
      dispatch(setauth(true));
      CreateToast({ message: "Login successful!", type: "success" });
      navigate(`/${data.getUser.user_id}`);
    } 
  };
  return (
    <div className="login-container">
      <div className="logo-container">
        <img
          src="/tringapps-copy-2.png"
          alt="Office Logo"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
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
          </div>
          {errorLogin && <p style={{ fontSize: "12px", color: "red" }}>Invalid email or password!</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-text">
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
