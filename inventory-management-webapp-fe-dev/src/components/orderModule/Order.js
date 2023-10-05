import React from 'react';
import '../../css/product.css';
import {Button} from 'primereact/button';
import {useNavigate} from "react-router-dom";

import '../../css/product.css'


function Order() {
  const navigate = useNavigate();
  const handleSalesButton = (buttonName) => {
    navigate('/SalesOrder');
  };

  const handleRentButton = (buttonName) => {
    navigate('/RentOrder');
  }

  return (
    <div className="orderCenter">
        <div className="addprod">
          <h1>MANAGE ORDERS</h1>
          <div className='ap-grid'>
            <div className='sl-grid'>
                <div className='sleft'>
                  <h3>Sale Order</h3>
                  <p>Add the product to the sales order by creating a new entry or line item in the sales order with the corresponding information 
                    by setting the product id, quantity desired by the customer and other relevant information.</p>
                    <Button label="Sales Order" severity="info" raised icon="pi pi-link" onClick={handleSalesButton}/>
                </div>

                <div className='sleft'>
                  <h3>Rental Order</h3>
                      <p>
                        Create a new rental order by providing the details of available product for rent from the inventory, the rental period from and to dates, the details of the customer and the initial deposit.
                      </p>
                      <Button label="Rent Order" severity="warning" raised icon="pi pi-check-square" onClick={handleRentButton}/>
                </div>
            </div>
            {/* 
                <br/>
                <br/>
                 */}
            </div>
        </div>
    </div>
  );
}

export default Order;