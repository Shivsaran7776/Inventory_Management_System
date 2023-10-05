/* 
  --> quantity check sale order and rent order
*/


import React from "react";
import { useState,useRef,useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from "primereact/checkbox";
import { Dialog } from 'primereact/dialog';
import Axios from "axios";
import { Calendar } from 'primereact/calendar';

import { Toast } from 'primereact/toast';

import "primereact/resources/themes/tailwind-light/theme.css"; 
import '../../css/product.css'

const RentOrder = () => {
    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Rent Order Details Inserted Successfully', life: 2000});
    }

    const showFailure = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Invalid Quantity Value', life: 2000});
  }
    const [selectedCat, setSelectedCat] = useState(null);
    const [visible, setVisible] = useState(false);
    const [totalCost,setTotalCost] = useState('');
    const [categoryList,setCategoryList] = useState([]);
    const [categoryListHasValue,setCategoryListHasValue] = useState(false)
    const [typeList,setTypeList]=useState([])
    const [typeListHasValue,setTypeListHasValue] = useState(false)

    const [fromdate,setFromDate] = useState();
    const [todate,setToDate] = useState();
    const [rentPerDay,setRentPerDay] = useState();
    const [customername,setCustomerName] = useState();
    const [customeraddress,setCustomerAddress] = useState();
    const [phonenumber,setPhoneNumber] = useState();
    const [payment,setPayment] = useState();

    const [selectedType, setSelectedType] = useState(null);
    const [availableQuantity, setAvailableQuantity] = useState("")

    const [CategoryOther,setCategoryOther] = useState(false);
    const [ItemTypeOther,setItemTypeOther] = useState(false);

    const [itemId, setItemId] = useState(null)
    const [idList,setIdList]=useState([])
    const [idListHasValue,setIdListHasValue] = useState(false)
    const [buttondisabled,setbuttondisabled]=useState(true)

    useEffect(() => {
      Axios.post("http://localhost:8000/uniqueCategory").then((res)=>{
        var arr=res.data.category;
        console.log('length',arr.length)
        if(arr.length){
          console.log(res.data.category);
          //categoryList.push(res.data.category);
          setCategoryList(res.data.category);
          setCategoryListHasValue(true);
          handleCategory()
        }
        else{
          categoryList.length=0;
          setCategoryListHasValue(false);
        }
      })
  }, [selectedCat]);

  var itemList = new Array();
  useEffect(() => {
      Axios.post('http://localhost:8000/getItem',{
          item_category:selectedCat,
          item_type:selectedType,
          }).then(res=>{
            var arr=res.data.product;
            console.log('length',arr.length)
           if(arr.length){
             //idList.push(res.data.product)
             console.log("Array",arr[0].product_id)
             for(var i=0;i<arr.length;i++)
                  itemList.push(arr[i].product_id);
              console.log("New Array",itemList);
             setIdList(itemList)
             console.log("Ids",idList )
             setIdListHasValue(true)
            }
            else{
             idList.length=0
             setIdListHasValue(false)
            } 
        })
    }, [selectedType]);

/*     useEffect(() => {
      console.log("Updated selectedItem:", itemId);
      Axios.post('http://localhost:8000/getQuantity',{
        item_category:selectedCat,
        item_type:selectedType,
        itemId:itemId
      }).then(res=>{
          console.log("Product qty: ",res.data.product)
         setAvailableQuantity(res.data.product)
         if(res.data.product[0].quantity!=0){
              setbuttondisabled(true)
         }
         else{
          setbuttondisabled(false)
         }
      })
     
    }, [itemId]); */

    useEffect(() => {
        console.log("Updated selectedItem:", itemId);
        console.log("Select Item | Selected Cat | ITem ID ",selectedCat,selectedType,itemId)
        Axios.post('http://localhost:8000/getQuantity',{
          item_category:selectedCat,
          item_type:selectedType,
          product_id:itemId
        }).then(res=>{
            console.log("Product qty: ",res.data.product)
           setAvailableQuantity(res.data.product[0].quantity)
           if(res.data.product[0].quantity!=0){
                setbuttondisabled(true)
           }
           else{
            setbuttondisabled(false)
           }
        })
       
      }, [itemId]);

  const getData=(e)=>{
      setItemId(e.target.value)
      console.log("Set Item ID: ",itemId);
    }



  const handleCategory = () =>{
      Axios.post("http://localhost:8000/getUniqueItemtype",{
          itemcategory: selectedCat
        }).then((res)=>{
            var arr=res.data.item_type;
            if(arr.length){
              console.log(res.data.item_type);
              //typeList.push(res.data.item_type);
              setTypeList(res.data.item_type)
              setTypeListHasValue(true);
            }
            else{
              typeList.length=0;
              setTypeListHasValue(false);
            }
          })
            console.log(selectedType)
          }

    //Form Values
    const [quantity,setQuantity] = useState('');
    const [productID,setProductID] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        setVisible(false)
        if(quantity>availableQuantity || quantity<0){
          console.log("Stock exceeded")
          showFailure()
          return;
        } 
        showSuccess()
        console.log(selectedCat)
        console.log(selectedType)
        Axios.post("http://localhost:8000/rentOrderDetails",{
          item_category:selectedCat,
          item_type:selectedType,
          product_id:itemId,
          requiredQuantity:quantity,
          fromDate:fromdate,
          toDate:todate,
          rentPerDay:rentPerDay,
          customer_name:customername,
          customer_address:customeraddress,
          phone_number:phonenumber,
          advanceAmount:payment
        }).then((res)=>{
          console.log(res);
        })
    }

    const popup =(e)=> {
        e.preventDefault()
        console.log(customername,customeraddress,phonenumber,payment)
        setVisible(true)
    }

    const clearForm = () => {
        setSelectedCat(null);
        setSelectedType(null);
        setProductID('');
        setQuantity('');
    }

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={handleSubmit} autoFocus />
        </div>
    );



    return(

        <div className="addprod">
        <Toast ref={toast} />

        <h1>Rent Product</h1>
        <form>
        <div className="ap-grid">
        <div className="card flex flex-column md:flex-row top gap-3">

        <div className="bsform">
            <div className="flex-1 p-inputgroup">
                <Dropdown value={selectedCat}  onChange={(e)=>setSelectedCat(e.target.value)} options={categoryList}
                    placeholder="Select a Category" className="dp"/>
            </div>

            
            <div className="flex-1 p-inputgroup">
            <Dropdown value={selectedType}  onChange={(e)=>setSelectedType(e.target.value)} options={typeList} placeholder="Select a Type" className="dp"/>
             </div>

             <div className="p-inputgroup flex-1">
             <span className="p-inputgroup-addon">
                    <i className="pi pi-hashtag"></i>
                </span>
                <Dropdown placeholder="Product ID" value={itemId}  onChange={getData} options={idList} />
            </div>

             <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                <i className="pi pi-cart-plus"></i>
                </span>
                <InputText disabled placeholder="Available Quantity" value={availableQuantity} required />
            </div>

            <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
                    <i className="pi pi-angle-double-right"></i>
                </span>
                <InputText placeholder="Required Quantity" onInput={(e)=>setQuantity(e.target.value)}  />
            </div>

            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                <i className="pi pi-calendar-minus"></i></span>
                <Calendar value={todate} placeholder="From Date" onChange={(e) => setToDate(e.value)} />
            </div>

            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                <i className="pi pi-calendar-plus"></i></span>
                <Calendar value={fromdate} placeholder="To Date" onChange={(e) => setFromDate(e.value)} />
            </div>

            

            <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
                    <i className="pi pi-angle-double-right"></i>
                </span>
                <InputText placeholder="Rent Per Day" onInput={(e)=>setRentPerDay(e.target.value)}  />
            </div>

            <h1>Customer Details</h1>

            <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="Customer Name" onInput={(e)=>setCustomerName(e.target.value)}  />
            </div>

            <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
            <i className="pi pi-map-marker"></i>
                </span>
                <InputText placeholder="Customer Address" onInput={(e)=>setCustomerAddress(e.target.value)}  />
            </div>

            <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
            <i className="pi pi-mobile"></i>
                </span>
                <InputText placeholder="Phone Number" onInput={(e)=>setPhoneNumber(e.target.value)}  />
            </div>
            

            <h1>Payment Details</h1>

            <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
                    <i className="pi pi-angle-double-right"></i>
                </span>
                <InputText placeholder="Initial Deposit Amount" onInput={(e)=>setPayment(e.target.value)}  />
            </div>            

            <div className="fbtns">
                    <Button label="Cancel" severity="danger" raised icon="pi pi-times" onClick={clearForm} />
                    <Button label="Rent" raised severity="success" icon="pi pi-plus" onClick={popup}  />
            </div>

            </div>
            <div className="image-up">
            {/* <ImageUploader/> */}
            </div>
            </div>
            

              <Dialog header="Product Details" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <div className="dialog-span">
                    <span>Product ID: {itemId}</span>
                    <span>Quantity : {quantity}</span> 
                    <span> Deposit Amount : {payment} </span>
                </div>
            </Dialog> 

            

        </div>

        {/* <div className="card flex flex-wrap justify-content-center gap-3">
        <Button label="Add Product" icon="pi pi-plus"/>
        
        </div>
 */}
        </form>
        </div   >
    );
}

export default RentOrder;