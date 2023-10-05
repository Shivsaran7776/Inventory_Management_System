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

const EditProducts = () => {
    const toast = useRef(null);
    let count = 0;
    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Product Updated Successfully', life: 2000});
    }
    const showFailure = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Invalid Quantity', life: 2000});
    }
    const [selectedCat, setSelectedCat] = useState(null);
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
    
    const [rent, setRent] = useState(false);
    const [sales, setSales] = useState(false);
    
    const [selectedType, setSelectedType] = useState(null);
    

    //Form Values
    const [availableQuantity, setAvailableQuantity] = useState("")
    const [addQuantity, setAddQuantity] = useState("")
    const [productID,setProductID] = useState('');

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
        console.log("Updated selectedType:", selectedType);
        Axios.post('http://localhost:8000/getItem',{
            item_category:selectedCat,
            item_type:selectedType
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

      useEffect(() => {
        console.log("Updated selectedItem:", itemId);
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



    const handleSubmit = (e) => {
        setVisible(false)
        e.preventDefault()
        // console.log(itemCategory,itemType,itemId,availableQuantity,addQuantity)
        if(addQuantity<0)
            showFailure()
        else {
        Axios.post('http://localhost:8000/updateItem',{
          item_category:selectedCat,
          item_type:typeList,
          quantity:addQuantity,
          itemid : itemId 
        })
        showSuccess()
    }

}
        
          
    const popup =(e)=> {
        e.preventDefault()
        setVisible(true)
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

        <h2>EDIT PRODUCT</h2>
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
                    <i className="pi pi-angle-double-right"></i>
                </span>
                <InputText placeholder="Available Quantity" value={availableQuantity} disabled/>
            </div>

            <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
                    <i className="pi pi-angle-double-right"></i>
                </span>
                <InputText placeholder="Update Quantity" onInput={(e)=>setAddQuantity(e.target.value)}  />
            </div>
            <div className="fbtns">
                    <Button label="Cancel" severity="danger" raised icon="pi pi-times"/>
                    <Button label="Update" raised severity="success" icon="pi pi-check" onClick={popup}  />
                    </div>

            </div>
            <div className="image-up">
            {/* <ImageUploader/> */}
            </div>
            </div>
            

             <Dialog header="Product Details" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <div className="dialog-span">
                    <span>Existing Quantity Value: {availableQuantity}</span>
                    <span>New Quantity Value: {addQuantity}</span>

                </div>
            </Dialog> 

            

        </div>
 
        </form>
        </div   >
    );
}

export default EditProducts;