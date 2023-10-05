import React , {useReducer, useEffect , useState, useRef} from 'react';
import Axios from 'axios';
import { Toast } from 'primereact/toast'

import { Tag } from 'primereact/tag';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primeicons/primeicons.css";             

// Data table
//import userfile from './user.json';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

var data, shopName, token;

function UserManagement() {
        const toast = useRef(null);
        const [result,setResult] = useState([]);
        const showSuccess = () => {
            toast.current.show({severity:'success', summary: 'Success', detail:'User Registered Successfully', life: 2000});
        }
        const showFailure = (name) => {
          toast.current.show({severity:'error', summary: 'Error', detail:'User ' + name + ' already registered', life: 2000});
        }
        token = localStorage.getItem('token');
        
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response1 = await Axios.post("http://localhost:8000/getuserdetails", {
                token: token
              });
              const shopName = response1.data.shopname;
              console.log("SHOP NAME: ", shopName);
        
              const response2 = await Axios.get("http://localhost:8000/fetchallUser");
              const data = response2.data.result;
              setResult(data);
              console.log("Res from fetchUsers: ", data);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
        
          fetchData();
        }, [token]);

        const [shopname, setShopName] = useState("");
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [role, setRole] = useState("");

      
            

            const getSeverity = (status) => {
              switch(status) {
                case 'Active':
                  return 'success';
                case 'Pending':
                  return 'warning';
                default:
                  return 'default';
              }
            }

          const statusBodyTemplate = (rowData) => {
            return <Tag value={rowData.status} severity={getSeverity(rowData.status)}/>
          };


          const ellipsisAction = (rowData) => {
            return <i className="pi pi-ellipsis-v" style={{fontSize: '1.5rem', color: '#8F8F8F'}} />
          };


          const handleSubmit = (e) => {
            e.preventDefault();
            console.log(shopname);
            console.log(name);
            console.log(email);
            console.log(role);
            
            Axios({
              method:"post",
              url:"http://localhost:8000/addUser",
              data:{
                shopname:shopname,
                name:name,
                email:email,
                roles:role
              }
            }).then((response)=>{
              if (response.data==="Registered Successfully!"){
                showSuccess()
                Axios({
                  method:"post",
                  url:"http://localhost:8000/sendmail",
                  data:{
                      email:email,
                      choice:1
                  }
                })
              }
              else
                  showFailure(name)
            })
          }

  return (
    <>
      <div className='grid-layout'>
        <div className='top-grid'>
          <div className='top-grid-left'>
          <p className='center-head'>Access Role Description</p>
          <p>
              <b>Admin</b><br/>
              Account owner - who created this App account and has all permissions and can give access to other users. <br/><br/>
              <b>Sales</b><br/>
              The sales team of the company - has access to view, edit and add products, product combos customers and orders. They don’t have edit access 
              on any of these modules. <br/><br/>
              <b>Accounts</b><br/>   
              The account team has access to only view the order and the dashboard
              </p>
          </div>
            <form className="top-grid-right" onSubmit={handleSubmit} action="">
            <Toast ref={toast}/>
                <h3>Invite Team</h3>
                   <div className='field'>
                    <p>Shop Name </p>
                    <input type='text' placeholder='Enter the name of shop' onInput={e=>setShopName(e.target.value)}/>
                   </div>    
                   <div className='field'>
                    <p>Name </p>
                    <input type='text' placeholder='Enter the name of shop member' onInput={e=>setName(e.target.value)}/>
                   </div>
                   <div className='field'>
                   <p>Email Address</p>
                    <input type='text' id="email" placeholder='Enter the email of shop member' onInput={e=>setEmail(e.target.value)} />
                   </div>
                   <div className='field'>
                   <p>Role</p>
                   <select name="role" onChange={e=>setRole(e.target.value)}>
                           <option value="" hidden selected >Choose the role of the team member</option>
                           <option value="Admin">Admin</option>
                           <option value="Sales">Sales</option>
                          <option value="Accounts">Accounts</option>
                       </select>
                   </div>
                   <input type="submit" value={"REGISTER"} className='userRegisterBtn'/>
                   {/* <button onClick={mailSender} className='top-grid-right userRegisterBtn'>REGISTER</button> */}
                </form>
  
        </div>
        <div className='bottom-grid'>
                    <div className='dataTable'>
                      <p className='center-head'>Current Members</p>
                       <DataTable value={result} scrollable scrollHeight="240px" showGridlines tableStyle={{ textAlign:'center' }}>
                       <Column field="name" header="Name"></Column>
                       <Column field="email" header="Email"></Column>
                       <Column field="roles" header="Role"></Column>
                       <Column field="statuses" header="Status" body={statusBodyTemplate}></Column>
                       <Column header="" body={ellipsisAction}></Column>
                       </DataTable>
                   </div>
        </div>
      </div>
      </>
  );
}

export default UserManagement;
