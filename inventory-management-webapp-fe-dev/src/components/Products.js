import React from "react";
import {useReducer, useEffect, useRef, useState} from 'react';
import Header from "../commonComponents/Header"
import Sidebar from "../commonComponents/Sidebar"
import productfile from "./products.json"
import { Messages } from 'primereact/messages';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

import "../css/index.css"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css"; 

import DoughnutChart from "./Chart";


const Products = () => {
    const [result,setResult] = useState([]);
    const [tqty,setTqty] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await Axios.get("http://localhost:8000/fetchProductDetails");
            const data = response.data.product;
             if(data.length) {
               console.log("Array",data[0].product_id)
               var sum = 0;
               for(var i=0;i<data.length;i++) 
                    sum = sum+data[i].quantity;
                console.log("SUM",sum);
                setTqty(sum);
            }

            setResult(data);
            console.log("DATA FROM FETCH ALL PRODUCT API: ", data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);

            const navAddProducts = () => {
                navigate('/AddProduct')
            }

            const navViewProducts = () => {
                navigate("/ViewProducts")
            }

            const navDelProducts = () => {
                navigate('/DeleteProducts')
            }

            const navEditProducts = () => {
                navigate('/EditProducts')
            }

    return (
        <>
                <div className="grid-layout">
                <div className="ps-grid-top">
                    <div className="ps-grid-left">
                        <h1>Total Products</h1>
                        <span>{tqty}</span>
                    </div>
                    <div className="ps-grid-center">
                        <h3>Manage Products</h3>
                        <div className="ps-buttons">
                        <div>
                            <button id="b1" onClick={navAddProducts}><span class="material-symbols-outlined">library_add</span></button>
                            <p>Add Products</p>
                            <button id="b2" onClick={navEditProducts}><span class="material-symbols-outlined">edit_note</span></button>
                            <p>Edit Products</p>
                            </div>
                        <div>

                        <button id="b3" onClick={navViewProducts}><span class="material-symbols-outlined">table_view</span></button>
                        <p>View Products</p>
                        
                        <button id="b4" onClick={navDelProducts}><span class="material-symbols-outlined">delete_sweep</span></button>
                        <p>Delete Products</p>
                        </div>
                        </div>
                    </div>
                    <div className="ps-grid-right">
                        <h3>Product Categories</h3>
                        <DoughnutChart/>
                    </div>                    
                </div>
                <div className="ps-grid-bottom">
                <div className="ps-grid-bleft">
                <h3>Recently Added Products</h3>
                <div className="ps-dt-table">
                <DataTable value={result} scrollable scrollHeight="240px" size="small" tableStyle={{ width: '40rem' }}>
                    <Column field="product_id" header="PRODUCT ID"></Column>
                    <Column field="item_category" header="ITEM CATEGORY"></Column>
                    <Column field="item_type" header="ITEM TYPE"></Column>
                    <Column field="quantity" header="QUANTITY"></Column>
                </DataTable>
                </div>
                </div>
               {/*  <div className="ps-grid-bright">
                    <h2>This Month</h2>
                    <div>
                    <span>90</span>
                    <p>Products Added</p>
                    </div>

                    <div>
                    <span>231</span>
                    <p>Products Saled</p>
                    </div>

                    <div>
                        <span>21</span>
                        <p>Products Returned</p>
                    </div>
                    <div className="order-btn">
                        <button type="button">See Orders</button>
                    </div>

                </div> */}
                </div>
            </div>
        </>
    );
}

export default Products;