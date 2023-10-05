import React,{useState, useRef} from "react";
import Button from '../commonComponents/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../css/index.css';
import '../css/login.css';
import { Toast } from 'primereact/toast'

const SendOTP = () => {
    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'OTP have been sent again !!!', life: 2000});
    }

    const navigate = useNavigate();
    const [otp1,setOtp1] = useState('');
    const [otp2,setOtp2] = useState('');
    const [otp3,setOtp3] = useState('');
    const [otp4,setOtp4] = useState('');
    const [invalidOTP,setValid] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        var otp=otp1.toString()+otp2.toString()+otp3.toString()+otp4.toString();
        console.log(otp);
        const email=localStorage.getItem('user_email');
        Axios({
            method:"post",
            url:"http://localhost:8000/verifyotp",
            data:{
                email:email,
                otp:otp
            }
        }).then((response)=>{
            console.log(response);
            const res=response.data.data
            if(res=="valid"){
                navigate('/ResetPassword')
            }
            else{
                setValid(true);
            }
        })
    }

    const handleOTPResend = () => {
        const email=localStorage.getItem('user_email');
        Axios({
            method:"post",
            url:"http://localhost:8000/sendmail",
            data:{
                email:email,
                choice:2
            }
        })
        showSuccess();
    }

    return(
        <div className="loginFormContainer">
            <Toast ref={toast}/>
        <div className="left">
            <h1 id="login-logo">logo</h1>
        </div>
        <div className="right">
            <form className="CreateAccountForm" onSubmit={handleSubmit}  >
                <div className="input-group">
                    <h1>Reset Password</h1>
                    <p id="otp">Enter OTP recieved via email</p>
                    <div className="input-group-otp">
                        <input type="number" name="otp1" className="otpin" onInput={e=>setOtp1(e.target.value)}/>
                        <input type="number" name="otp2" className="otpin" onInput={e=>setOtp2(e.target.value)}/>
                        <input type="number" name="otp3" className="otpin" onInput={e=>setOtp3(e.target.value)}/>
                        <input type="number" name="otp4" className="otpin" onInput={e=>setOtp4(e.target.value)}/>
                    </div>
                    {/* <p id="resend">Resend OTP</p> */}
                    <Link id="resend" to="/Reset" onClick={handleOTPResend}>
                            Resend OTP
                    </Link>
                    <Button value='Continue' id='RPContinue' />
                    {invalidOTP?
                    <p className="login-alert" style={{"width":"50%"}}>Invalid OTP</p>:""}  
                </div>   
            </form>
        </div>
        </div>
    );
}

export default SendOTP;