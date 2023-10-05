/* 
    ---> Heading center
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
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/tailwind-light/theme.css"; 
import '../../css/product.css'


function SalesOrder() {

    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Order Rented Successfully', life: 2000});
    }
    const showFailure = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Invalid Quantity Value', life: 2000});
  }

    const [selectedCat, setSelectedCat] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [visible, setVisible] = useState(false);
    const [totalCost,setTotalCost] = useState('');
    const [categoryList,setCategoryList] = useState([]);
    const [categoryListHasValue,setCategoryListHasValue] = useState(false)
    const [typeList,setTypeList]=useState([])
    const [typeListHasValue,setTypeListHasValue] = useState(false)

    const [CategoryOther,setCategoryOther] = useState(false);
    const [ItemTypeOther,setItemTypeOther] = useState(false);

    const [itemId, setItemId] = useState("")
    const [idList,setIdList]=useState([])
    const [idListHasValue,setIdListHasValue] = useState(false)
    const [buttondisabled,setbuttondisabled]=useState(true)

  const [itemCategory, setItemCategory] = useState("")
  const [itemType, setItemType] = useState("")
  const [availableQuantity, setAvailableQuantity] = useState("")
  const [stock, setStock] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

//   useEffect(() => {
//     Axios.post("http://localhost:8000/uniqueCategory").then((res)=>{
//       var arr=res.data.category;
//     //   console.log('length',arr.length)
//       if(arr.length){
//         // console.log(res.data.category);
//         //categoryList.push(res.data.category);
//         setCategoryList(res.data.category)
//         setCategoryListHasValue(true);
//       }
//       else{
//         categoryList.length=0;
//         setCategoryListHasValue(false);
//       }
//     })
//     .catch(e => {
//         console.log(e);
//     })
// }, []);

useEffect(() => {
    Axios.post("http://localhost:8000/uniqueCategory").then((res)=>{
      var arr=res.data.category;
    //   console.log('length',arr.length)
      if(arr.length){
        // console.log(res.data.category);
        //categoryList.push(res.data.category);
        setCategoryList(res.data.category)
        setTypeListHasValue(true);
        // console.log(typeListHasValue)
         handleCategory()
      }
      else{
        categoryList.length=0;
        setTypeListHasValue(false);
      }
    })
    .catch(e => {
        console.log(e);
    })
}, [selectedCat]);

var itemList = new Array();
useEffect(() => {
    console.log("Updated selectedType:", selectedType);
    Axios.post('http://localhost:8000/getItem',{
        item_category:selectedCat,
        item_type:selectedType
        }).then(res=>{
          var arr=res.data.product;
        //   console.log('length',arr.length)
         if(arr.length){
           //idList.push(res.data.product)
        //    console.log("Array",arr[0].product_id)
           for(var i=0;i<arr.length;i++)
                itemList.push(arr[i].product_id);
            // console.log("New Array",itemList);
            idList.push(itemList)
           setIdList(itemList)
        //    console.log("Ids",idList )
           setIdListHasValue(true)
          }
          else{
           idList.length=0
           setIdListHasValue(false)
          } 
      })
  }, [selectedType]);

  useEffect(() => {
    console.log("Updated selectedItem:", itemId);
    Axios.post('http://localhost:8000/getQuantity',{
      item_category:selectedCat,
      item_type:typeList,
      product_id:itemId
    }).then(res=>{
        // console.log("Product qty: ",res.data.product)
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
    // console.log("Set Item ID: ",itemId);
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    setVisible(false)
    if(stock>availableQuantity || stock<0){
      console.log("Stock exceeded")
      showFailure()
      return;
    }
    console.log(selectedCat,selectedType,availableQuantity,stock,customerName,customerAddress,phoneNumber)
    Axios.post("http://localhost:8000/orderDetails",{
        item_category:selectedCat,
        item_type:selectedType,
        product_id:itemId,
        stock:stock,
        customer_name:customerName,
        customer_address:customerAddress,
        phone_number:phoneNumber

    })
    showSuccess()
  }


  const handleCategory = () =>{
    Axios.post("http://localhost:8000/getUniqueItemtype",{
        itemcategory: selectedCat
      }).then((res)=>{
          var arr=res.data.item_type;
          if(arr.length){
            // console.log(res.data.item_type);
            //typeList.push(res.data.item_Type);
            setTypeList(res.data.item_type)
            // console.log("Type List : "+typeList);
            setTypeListHasValue(true);
          }
          else{
            typeList.length=0;
            setTypeListHasValue(false);
          }
        })
        .catch(e => {
            console.log(e);
        })
}

//   Axios({
//     method:"post",
//     url:"http://localhost:8000/orderDetails",
//     data:{
//         item_category:itemCategory,
//         item_type:itemType,
//         product_id:itemId,
//         stock:stock,
//         customer_name:customerName,
//         customer_address:customerAddress,
//         phone_number:phoneNumber
//     }
//   }).then((response)=>{
//     showSuccess();
//   })

  const clearForm = () => {
    // setSelectedCat(null);
    // setSelectedType(null);
    // setProductID('');
    // setPurchaseCost('');
    // setQuantity('');
    // setNotes('');
    // setDepositAmount('');
    // SetSalesPrice('');
    // setRent(false);
    // setSales(false);
}

const popup =(e)=> {
    e.preventDefault()
    console.log(selectedCat,selectedType,availableQuantity,stock,customerName,customerAddress,phoneNumber)

    setVisible(true)

}

const footerContent = (
    <div>
        <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
        <Button label="Yes" icon="pi pi-check" onClick={handleSubmit} autoFocus />
    </div>
);


  return (
    <div className="addprod">
        <Toast ref={toast} />
        
        <form>
        <div className="ap-grid" >
        <h1>PRODUCT DETAILS</h1>

        <div className="card flex flex-column md:flex-row top gap-3">
          <div className="bsform">

            <div className="flex-1 p-inputgroup">
                <Dropdown value={selectedCat}  onChange={(e)=>setSelectedCat(e.target.value)} options={categoryList}
                    placeholder="Select a Category" className="dp"/>
            </div>

            <div className="flex-1 p-inputgroup">
            <Dropdown value={selectedType}  options={typeList}  onChange={(e) => setSelectedType(e.target.value)} 
                placeholder="Select a Type" className="dp"/>
             </div>

             <div className="p-inputgroup flex-1">
             <span className="p-inputgroup-addon">
                    <i className="pi pi-hashtag"></i>
                </span>
                <Dropdown value={itemId}  onChange={getData} options={idList} 
                    placeholder="Select Item Id" className="dp"/>
            </div>

             <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-cart-plus"></i>
                </span>
                <InputText placeholder="Available Quantity" value={availableQuantity} />
            </div>

            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-angle-double-right"></i>
                </span>
                <InputText placeholder="Stock for sale" onChange={(e)=> setStock(e.target.value)} />
            </div>

            <br></br>
            <div>
            <h1>CUSTOMER DETAILS</h1>

            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="Customer Name" onInput={(e)=>setCustomerName(e.target.value)}/>
            </div>

            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                </span>
                <InputText placeholder="Customer Address" onInput={(e)=>setCustomerAddress(e.target.value)}/>
            </div>

            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-mobile"></i>
                </span>
                <InputText placeholder="Phone Number" onInput={(e)=>setPhoneNumber(e.target.value)}/>
            </div>
            <div className="fbtns">
                    <Button label="Cancel" severity="danger" raised icon="pi pi-times" onClick={clearForm} />
                    <Button label="Add" raised severity="success" icon="pi pi-check" onClick={popup}  />
            </div>
            </div>
            <div className="image-up">
            {/* <ImageUploader/> */}
            </div>
          </div>
        </div>

             <Dialog header="Product Details" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <div className="dialog-span">
                    <span>Item Category: {selectedCat}</span>
                    <span>Item Type: {selectedCat}</span>
                    <span>Item id: {itemId}</span>
                    <span>Available Quantity: {availableQuantity}</span>
                    <span>Stock: {stock}</span>
                    <span>Customer Name: {customerName}</span>
                    <span>Customer Address: {customerAddress}</span>
                    <span>Phone Number: {phoneNumber}</span>

                </div>
            </Dialog> 

            <div className="card flex flex-column md:flex-row gap-3 bflex">
                
                <div className="rform">
                    
                </div>
            </div>

        </div>

        {/* <div className="card flex flex-wrap justify-content-center gap-3">
        <Button label="Add Product" icon="pi pi-plus"/>
        
        </div>
 */}
        </form>
        </div   >
  )
}

export default SalesOrder;