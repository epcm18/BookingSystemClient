import React from "react";
import "./login.css";
import { useState, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const {loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => {
            return {...prev, [e.target.id]: e.target.value};
        });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
            navigate("/");
        } catch (err) {
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
        }
    };

    // console.log(user);

    return <div className="login">
        <div className="lcontainer">
            <input type="text" placeholder="username" id="username" onChange={handleChange} className="linput" />
            <input type="password" placeholder="password" id="password" onChange={handleChange} className="linput" />
            <button disabled={loading} onClick={handleClick} className="lbtn">Login</button>
            {error && <span className="lerror"> {error.message}</span>}
        </div>
        </div>;
};

export default Login;

