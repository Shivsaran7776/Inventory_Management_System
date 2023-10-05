import React from "react";
import '../css/index.css'

const Dashboard = () => {
    return(
        <>
        <div className="dash-container">
            <div className="dleft">
                <h2>Inventory Dashboard</h2>
                <div className="inventory">
                    <div className="blocks-grid">
                        <div className="block">
                            <div>
                                <p>Products</p>
                                <span>100</span>
                                </div>
                        </div>
                        <div className="block">
                            <div>
                                <p>Sales</p>
                                <span>500</span>
                                </div>                      </div>
                        <div className="block">
                            <div>
                                <p>Orders</p>
                                <span>423</span>
                                </div>                       </div>
                    </div>
                    <div className="dstats">

                    </div>
                </div>
            </div>
            <div className="dright">
                <h2>Summary</h2>
            </div>
            
        </div>
        </>
    );
}

export default Dashboard;