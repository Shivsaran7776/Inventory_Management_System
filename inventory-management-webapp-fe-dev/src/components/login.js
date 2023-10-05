import React, { useState, useRef } from "react";
import Button from '../commonComponents/Button';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import '../css/index.css';
import '../css/login.css';

const Login = (props) => {

    const [state,setState] = useState({
        email:"",
        password:"",
    });

    const[logCheck,setCheck] = useState(false);

    const [error,setError] = useState(false);
 
    const handleChange = (e) => {
        const{id, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
          }));
        };

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault()
        var dataName;
        if(state.email === "" || state.password === "")
            setError(true);
        else {
            setError(false);
            Axios({
                method:"post",
                url:"http://localhost:8000/login",
                data:{
                    email:state.email,
                    password:state.password
                }
            }).then((response)=>{
                const data=response.data.data;
                Axios({
                    method:"post",
                    url:"http://localhost:8000/fetchUser",
                    data:{
                        email:state.email
                    }
                }).then((res)=>{
                    console.log("RESPONSE :", res.data);
                    dataName=res.data.result.name;
                    console.log("Data Name : "+dataName);
                    localStorage.setItem('Name',dataName);
                })
                if(data=="false"){
                    setCheck(true);
                }
                else{
                    console.log('INSIDE LOGIN TOKEN : '+response.data.data)
                    const token=response.data.data;
                    localStorage.setItem('token',token);
                    //localStorage.setItem('email',state.email);
                    navigate("/userManagement");
                }
            })        
        }
    }

    return(
        <div className="loginFormContainer">
            <div className="left">
                <h1 id="login-logo">logo</h1>
            </div>
            <div className="right">              
                <form action="/loginSuccess" className="CreateAccountForm" onSubmit={handleSubmit}>
                <div className="input-group">
                    <h1>Login</h1>
                    <label htmlFor="newPasswd">Email*</label>
                    <input  type="email" id="email" placeholder="Enter your email" onChange={handleChange} value={state.email}  />
                    <label htmlFor="newPasswd">Password*</label>
                    <input type="password" id="password" placeholder="Minimum 8 characters" value={state.password} onChange={handleChange} />
                    <br/>
                    <div className="loginEl">
                        {/* <div className="check">
                        <input type="checkbox"/>
                        <label>Remember Me</label>
                        </div> */}
                        <Link to="/SendEmail" className="loginEl-link">Forgot Password</Link>
                    </div>
                    <Button value='Login' id='CreateUserButton' />
                    {error?
                    <p className="login-alert">Please Enter email and password</p>:""}
                    {logCheck?
                    <p className="login-alert">Invalid Email or Password</p>:""}
                    </div>
                </form>
            </div>
        </div>
    );
    }

export default Login;