import React,{useState, useRef} from "react";
import Button from '../commonComponents/Button';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';

import '../css/index.css';
import '../css/login.css';

export default function SendEmail() {
    const toast = useRef(null);

    const showFailure = () => {
        toast.current.show({severity:'error', summary: 'Failure', detail:'No such User found !!!', life: 3000});
    }

    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log(email);
        Axios({
            method:"post",
            url:"http://localhost:8000/userverify",
            data:{
                email:email,
            }
        }).then((response)=>{
            if(response.data=="Verified"){
                localStorage.setItem('user_email',email);
                Axios({
                    method:"post",
                    url:"http://localhost:8000/sendmail",
                    data:{
                        email:email,
                        choice:2
                    }
                })
                navigate("/Reset");
            }
            else{
                showFailure();
            }
        })  
    }
  return (
    <div className="loginFormContainer">
            <div className="left">
                <h1 id="login-logo">logo</h1>
            </div>

            <div className="right">
                <Toast ref={toast} />
                <form  className="CreateAccountForm" onSubmit={handleSubmit} >
                <div className="input-group">
                    <h1>Reset Password</h1>
                    <label htmlFor="mail">Email*</label>
                    <input type="email" name="email" placeholder="Enter your email" onInput={e=>setEmail(e.target.value)}/>
                    <Button value='Send OTP' id='sendOTPBtn' />
                    </div>
                </form>
            </div>
        </div>
  )
}
