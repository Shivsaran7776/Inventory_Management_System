import React,{useState} from 'react'
import './addProduct.css'

import Header  from '../../commonComponents/Header'
import Sidebar from '../../commonComponents/Sidebar'
const AddProduct = () => {

  const [rentCheckbox,setRentCheckbox] = useState(false)
  const [salesCheckbox,setSalesCheckbox] = useState(false)

  const [singleItemForm, setSingleItemForm] = useState(true)
  const [groupItemForm, setGroupItemForm] = useState(false)

  const [groupItemCat1, setGroupItemCat1] = useState(false)
  const [groupItemCat2, setGroupItemCat2] = useState(false)
  const [groupItemCat3, setGroupItemCat3] = useState(false)
  const [groupItemCat4, setGroupItemCat4] = useState(false)

  const handleUploadImage = (e) =>
  {
    e.preventDefault()
    const imgEle = document.getElementById('output')
    imgEle.src = e.target.value;
    console.log(e.target.value)
    console.log(imgEle)
  }

  const handleSalesType = (e) =>
  {
    e.preventDefault()
    // console.log(e.target.checked)
    // console.log(e.target.id)

    if(e.target.id === "rent")
    {
      setRentCheckbox(e.target.checked)
      console.log(rentCheckbox)
    }
    else if(e.target.id == "sales") {
      setSalesCheckbox(e.target.checked)
    }
  }

  
  const handleAddItemsType = (e) => 
  {
    e.preventDefault()
    console.log(e.target.id)

    if(e.target.id == 'single')
    {
      setSingleItemForm(true)
      setGroupItemForm(false)
    } 
    else if(e.target.id == 'group')
    {
      setGroupItemForm(true)
      setSingleItemForm(false)
    }
  }

  const handleGroupItemCat = (e)=> {
    e.preventDefault()
    console.log(e.target.id)

    console.log(!groupItemCat1)

    if(e.target.id == 'gItemCat1') setGroupItemCat1(!groupItemCat1)
    else if(e.target.id == 'gItemCat2') setGroupItemCat2(!groupItemCat2)
    else if(e.target.id == 'gItemCat3') setGroupItemCat3(!groupItemCat3)
    else if(e.target.id == 'gItemCat4') setGroupItemCat4(!groupItemCat4)

    console.log(groupItemCat1,groupItemCat2,groupItemCat3,groupItemCat4)
  }

  return (
    <>
      <div className="container-addProduct">
        <form action="">
          

        { singleItemForm &&
        <div className="right-addProduct">
          <h2>Add single Item</h2>
          <div className="row">
            <div className="col25">
              <label htmlFor="addItemType">Add Item as</label>
            </div>
            <div className="col75 addItemType">
              <div className="aitype">
                <input type="radio" id="single" name="aitype" onClick={handleAddItemsType} checked/>
              <label htmlFor="single">Single Item</label>
              </div>
              <div className="aitype">
                <input type="radio" id="group" name="aitype" onClick={handleAddItemsType} />
              <label htmlFor="group">Group Items</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="itemCategory">Item Category</label>
            </div>
            <div className="col75">
              <select id="itemCategory" name="itemCategory">
                <option value="itemCat1">itemCat1</option>
                <option value="itemCat2">itemCat2</option>
                <option value="itemCat3">itemCat3</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="itemType">Item Type</label>
            </div>
            <div className="col75">
              <select id="itemType" name="itemType">
                <option value="itemType1">itemType1</option>
                <option value="itemType2">itemType2</option>
                <option value="itemType3">itemType3</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="purchaseCost">Purchase Cost</label>
            </div>
            <div className="col75">
              <input type="text" id="purchaseCost" name="purchaseCost" />
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="quantity">Quantity</label>
            </div>
            <div className="col75">
              <input type="text" id="quantity" name="quantity" />
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="totalCost">Total Cost</label>
            </div>
            <div className="col75">
              <input type="text" id="totalCost" name="totalCost" disabled value="Rs. 3000"/>
            </div>
          </div>
          
          <div className="row">
            <div className="col25">
              <label htmlFor="notes">Notes</label>
            </div>
            <div className="col75">
              <textarea type="text" id="notes" name="notes" />
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="salesType">Sales Type</label>
            </div>
            <div className="col75 salesType">
              <div className="stype">
                <input type="checkbox" id="rent" name="rent" onInput={handleSalesType} />
              <label htmlFor="rent">Rent</label>
              </div>
              <div className="stype">
                <input type="checkbox" id="sales" name="sales" onInput={handleSalesType} />
              <label htmlFor="sales">Sales</label>
              </div>
            </div>
          </div>
          

        { rentCheckbox && 
          <div className="row">
              <div className="col25">
               <label htmlFor="depositAmount">Deposite Amount</label>

            </div>
            <div className="col75">
              <input type="text" id="depositAmount" name="depositAmount"/>
            </div>
            </div>
        }

        
        {salesCheckbox && 
            <div className="row">
              <div className="col25">
               <label htmlFor="salesPrice">Sales Price</label>

            </div>
            <div className="col75">
              <input type="text" id="salesPrice" name="salesPrice"/>
            </div>
            </div>
        }
            <div className="row">
              <div className="col50">
               <input type="button" className="addProduct-btns" name="cancel" value="CANCEL" />
            </div>
            <div className="col50">
              <input type="submit" className="addProduct-btns" value="SUBMIT" />
            </div>
            </div>
        </div> 
        }
        <div className="image-upload">
                <p><input type="file"  accept="image/*" name="image" id="file" onChange={handleUploadImage}/></p>
                <p><label htmlFor="file">Upload Image</label></p>
                <p><img id="output" width="200" style={{background:"blue"}}/></p>
          </div>  

{/* ------------GROUP ITEMS ------------- */}

        { groupItemForm &&
        <div className="right-addProduct">
          <h2>Add Group Items</h2>
          <div className="row">
            <div className="col25">
              <label htmlFor="addItemType">Add Item as</label>
            </div>
            <div className="col75 addItemType">
              <div className="aitype">
                <input type="radio" id="single" name="aitype" onInput={handleAddItemsType} />
              <label htmlFor="single">Single Item</label>
              </div>
              <div className="aitype">
                <input type="radio" id="group" name="aitype" onInput={handleAddItemsType} checked/>
              <label htmlFor="group">Group Items</label>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col25">
              <label htmlFor="gitemType">Group Type</label>
            </div>
            <div className="col75">
              <select id="gitemType" name="gitemType">
                <option value="gitemType1">gitemType1</option>
                <option value="gitemType2">gitemType2</option>
                <option value="gitemType3">gitemType3</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="gItemCat">Select GroupItem Category</label>
            </div>
            <div className="col75 gItemCat">
              <div className="gCat">
                <input type="checkbox" id="gItemCat1" name="gItemCat1" onInput={handleGroupItemCat} />
              <label htmlFor="gItemCat1">Category 1</label>
              </div>
              <div className="gCat">
                <input type="checkbox" id="gItemCat2" name="gItemCat2" onInput={handleGroupItemCat} />
              <label htmlFor="gItemCat2">Category 2</label>
              </div>
              <div className="gCat">
                <input type="checkbox" id="gItemCat3" name="gItemCat3" onInput={handleGroupItemCat} />
              <label htmlFor="gItemCat3">Category 3</label>
              </div>
              <div className="gCat">
                <input type="checkbox" id="gItemCat4" name="gItemCat4" onInput={handleGroupItemCat} />
              <label htmlFor="gItemCat4">Category 4</label>
              </div>
            </div>
          </div>


        { groupItemCat1 &&

          <div className="groupCat1">
<h3>Category 1</h3>
           
          <div className="row">
            <div className="col25">
              <label htmlFor="catImage">Upload Image</label>
            </div>
            <div className="col75">
              <input type="file" name="catImage" />
            </div>
          </div>

                      <div className="row">
            <div className="col25">
              <label htmlFor="purchaseCost">Purchase Cost</label>
            </div>
            <div className="col75">
              <input type="text" id="purchaseCost" name="purchaseCost" />
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="quantity">Quantity</label>
            </div>
            <div className="col75">
              <input type="text" id="quantity" name="quantity" />
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="totalCost">Total Cost</label>
            </div>
            <div className="col75">
              <input type="text" id="totalCost" name="totalCost" disabled value="Rs. 3000"/>
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="notes">Notes</label>
            </div>
            <div className="col75">
              <textarea type="text" id="notes" name="notes" />
            </div>
          </div>

            <div className="row">
              <div className="col50">
               <input type="button" className="addProduct-btns addCategory-btns" name="Discard" value="DISCARD" />
            </div>
            <div className="col50">
              <input type="button" className="addProduct-btns addCategory-btns" name="Add" value="ADD" />
            </div>
            </div>

        </div> 

        }



        { groupItemCat2 &&

          <div className="groupCat2">
<h3>Category 2</h3>


          <div className="row">
            <div className="col25">
              <label htmlFor="catImage">Upload Image</label>
            </div>
            <div className="col75">
              <input type="file" name="catImage" />
            </div>
          </div>
           
                      <div className="row">
            <div className="col25">
              <label htmlFor="purchaseCost">Purchase Cost</label>
            </div>
            <div className="col75">
              <input type="text" id="purchaseCost" name="purchaseCost" />
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="quantity">Quantity</label>
            </div>
            <div className="col75">
              <input type="text" id="quantity" name="quantity" />
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="totalCost">Total Cost</label>
            </div>
            <div className="col75">
              <input type="text" id="totalCost" name="totalCost" disabled value="Rs. 3000"/>
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="notes">Notes</label>
            </div>
            <div className="col75">
              <textarea type="text" id="notes" name="notes" />
            </div>
          </div>

           <div className="row">
              <div className="col50">
               <input type="button" className="addProduct-btns addCategory-btns" name="Discard" value="DISCARD" />
            </div>
            <div className="col50">
              <input type="button" className="addProduct-btns addCategory-btns" name="Add" value="ADD" />
            </div>
            </div>
        </div> 
        }

        <h3>Grouped Items</h3>
          <div className="row">
            <div className="col25">
              <label htmlFor="groupId">Group Id</label>
            </div>
            <div className="col75">
              <input type="text" id="groupId" name="groupId" disabled value="101"/>
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="gitems">Items</label>
            </div>
            <div className="col75">
              <ul>
                <li>Item1</li>
                <li>Item2</li>
                <li>Item3</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col25">
              <label htmlFor="groupedCost">Grouped Cost</label>
            </div>
            <div className="col75">
              <input type="text" id="groupedCost" name="groupedCost" disabled value="Rs. 7000"/>
            </div>
          </div>



          <div className="row">
            <div className="col25">
              <label htmlFor="salesType">Sales Type</label>
            </div>
            <div className="col75 salesType">
              <div className="stype">
                <input type="checkbox" id="rent" name="rent" onInput={handleSalesType} />
              <label htmlFor="rent">Rent</label>
              </div>
              <div className="stype">
                <input type="checkbox" id="sales" name="sales" onInput={handleSalesType} />
              <label htmlFor="sales">Sales</label>
              </div>
            </div>
          </div>

        { rentCheckbox && 
          <div className="row">
              <div className="col25">
               <label htmlFor="depositAmount">Deposite Amount</label>

            </div>
            <div className="col75">
              <input type="text" id="depositAmount" name="depositAmount"/>
            </div>
            </div>
        }

        
        {salesCheckbox && 
            <div className="row">
              <div className="col25">
               <label htmlFor="salesPrice">Sales Price</label>

            </div>
            <div className="col75">
              <input type="text" id="salesPrice" name="salesPrice"/>
            </div>
            </div>
        }

          <div className="row">
              <div className="col50">
               <input type="button" className="addProduct-btns" name="cancel" value="CANCEL" />
            </div>
            <div className="col50">
              <input type="submit" className="addProduct-btns" value="SUBMIT" />
            </div>
            </div>

        </div>  
        }






        </form>
        </div>

    </>
  )
}

export default AddProduct