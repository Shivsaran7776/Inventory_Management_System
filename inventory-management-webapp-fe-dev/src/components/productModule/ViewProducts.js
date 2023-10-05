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

const ViewProducts = () => {
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
    const [categoryList,setCategoryList] = useState([]);
    const [typeList,setTypeList]=useState([])
    const [itemId, setItemId] = useState("")
    const [idList,setIdList]=useState([])
    const [productHasValue,setProductHasValue] = useState(false)
    const [product,setProduct]=useState([])


    
    const [selectedType, setSelectedType] = useState(null);
    

    //Form Values
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
            handleCategory()
          }
          else{
            categoryList.length=0;
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
              }
              else{
               idList.length=0
              } 
          })
      }, [selectedType]);

    const handleCategory = () =>{
        Axios.post("http://localhost:8000/getUniqueItemtype",{
            itemcategory: selectedCat
          }).then((res)=>{
              var arr=res.data.item_type;
              if(arr.length){
                console.log(res.data.item_type);
                //typeList.push(res.data.item_type);
                setTypeList(res.data.item_type)
              }
            })
          

        
              console.log(selectedType)
            }



            const handleSubmit = () => {
                Axios.post('http://localhost:8000/getItemOne',{
                        product_id:itemId
                        }).then(res=>{
                             var arr=res.data;
                             console.log('length',arr)
                            if(arr){
                              setProduct(res.data.product)
                              setProductHasValue(true)
                             }
                             else{
                              product.length=0
                              setProductHasValue(false)
                             }
                             
                             console.log('product',product.length)
                             console.log(res.data.product)
                             console.log(product);
                      })
                }
        
          
    const popup =(e)=> {
        e.preventDefault()
        handleSubmit()
        setVisible(true)
    }


    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={() => setVisible(false)} autoFocus />
        </div>
    );


    return(
        <div className="addprod">
            <form>
            <h2>View Products</h2>

                <div className="ap-grid">
                    <div className="vwform">

                            <div className="flex-1 p-inputgroup">
                                    <Dropdown value={selectedCat} onChange={(e) => setSelectedCat(e.value)} options={categoryList}  
                                    placeholder="Item Category" className="dp"/>
                            </div>

                            <div className="flex-1 p-inputgroup">
                                    <Dropdown value={selectedType} onChange={(e) => setSelectedType(e.value)} options={typeList} 
                                    placeholder="Item Type" className="dp"/>
                            </div>

                            <div className="flex-1 p-inputgroup">
                                    <Dropdown value={itemId} onChange={(e) => setItemId(e.value)} options={idList} 
                                    placeholder="Item ID" className="dp"/>
                            </div>
                            <div className="fbtns">
                        <Button label="Cancel" severity="danger" raised icon="pi pi-times" />
                        <Button label="View Product" raised severity="info" icon="pi pi-eye" onClick={popup} />
                    </div>
                    </div>
                    
                </div>
            </form>
            <Dialog header="Product Details" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <div className="dialog-span">
                    <span id="proid">Product ID: {product.product_id} </span>
                    <span> Product Category : {product.item_category} </span> 
                    <span>Product Type : {product.item_type} </span>
                    <span>Purchase Cost : {product.purchase_cost} </span> 
                    <span>Quantity : {product.quantity} </span> 

                </div>
            </Dialog> 
        </div>


    );
}

export default ViewProducts;