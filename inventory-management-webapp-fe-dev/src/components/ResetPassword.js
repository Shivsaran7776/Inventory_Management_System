import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../commonComponents/Button';
import Axios from 'axios';
// import constant from "./constant";

// css
import '../css/index.css';
import '../css/login.css';


export default function ResetPassword() {


    const [password1,setPassword1] = useState('');
    const [password2,setPassword2] = useState('');

    const[error,setError] = useState(false);
    const[error2,setError2] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password1 !== password2)
            setError(true);
        else if(!password1.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/))
            setError2(true);
        else{
            const email=localStorage.getItem('user_email');
            Axios({ 
                method:"patch",
                url:"http://localhost:8000/updateUserEmail",
                data:{
                    email:email,
                    password:password1
                }
            }).then((response)=>{
                console.log(response);
                navigate("/Login");
            })
            
        }
    }
  return (
    <div className="loginFormContainer">
            <div className="left">
                <h1 id="login-logo">logo</h1>
            </div>

            <div className="right">
               
                <form onSubmit={handleSubmit} className="CreateAccountForm" >
                <div className="input-group">
                    <h1>Reset Password</h1>
                    <label htmlFor="newPasswd">Enter new password</label>
                    <input type="password" placeholder="minimum 8 characters"  onChange={e=>setPassword1(e.target.value)} />
                    <label htmlFor="confirmPasswd">Confirm new password</label>
                   <input type="password" placeholder="minimum 8 characters" onChange={e=>setPassword2(e.target.value)} />
                    <Button value='Confirm' id='CreateUserButton' />
                    {error&&(password1 !== password2)?
                    <p className="login-alert">Passwords does not match</p>:""}
                    {error2?
                    <p className="login-alert">Password must contain at least one alphabet in upper case, one number and one special character</p>:""}
                    </div>
                </form>
            </div>
        </div>
  )
}
