import React, { useEffect } from "react";
import 'primeicons/primeicons.css';
import '../css/index.css';
import logo from '../images/Ellipse.png';
import user from '../images/user.svg';
import { Avatar } from 'primereact/avatar';
import Axios from "axios";
import {useNavigate} from 'react-router-dom';

var dataName="temp"

const Header = (props) => {

    const navigate = useNavigate();
    dataName = localStorage.getItem('Name');
    
    // useEffect(() => {
    //     dataName = localStorage.getItem('Name');
    //     document.getElementById("name").innerHTML = dataName;
    // },[]);

    const logoutFunction =()=>{
        // alert("clicked")
        localStorage.clear();
        navigate('/Login');
    }

    return(
        <div className="header">
            <div className="header-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="header-elements">
                <div className="user-section">
                    <Avatar icon="pi pi-user" style={{ backgroundColor: '#0DD3AD', color: '#fff' }} shape="circle" />
                    <span id="name">{dataName}</span>
                </div>
                <span>
                    <i onClick={logoutFunction} class="fa-solid fa-right-from-bracket"></i>
                </span>
                
            </div>
        </div>
    );
}

export default Header;