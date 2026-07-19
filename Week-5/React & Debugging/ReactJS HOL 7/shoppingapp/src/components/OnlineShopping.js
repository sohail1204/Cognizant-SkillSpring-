import React, { Component } from 'react';
import Cart from './Cart';

class OnlineShopping extends Component {
  constructor(props) {
    super(props);
    
    // Module 5: Create an array of Cart data objects initializing exactly 5 shopping items
    this.cartItems = [
      { ItemName: "Laptop", Price: 65000 },
      { ItemName: "Mobile", Price: 25000 },
      { ItemName: "Keyboard", Price: 1800 },
      { ItemName: "Mouse", Price: 900 },
      { ItemName: "Headphones", Price: 3200 }
    ];
  }

  render() {
    return (
      <div className="shopping-container">
        <h1>Online Shopping</h1>
        
        <div className="items-list">
          {/* Module 6 & 7: Loop through the array using map() and pass items via Props */}
          {this.cartItems.map((item, index) => (
            <Cart 
              key={index} 
              ItemName={item.ItemName} 
              Price={item.Price} 
            />
          ))}
        </div>

        {/* Module 8: Default Props Demonstration Section */}
        <div className="default-props-demo">
          <h2>Default Props Demonstration</h2>
          <div className="demo-cards">
            {/* Missing Price prop */}
            <Cart ItemName="Smart Watch" />
            
            {/* Missing ItemName prop */}
            <Cart Price={1500} />
            
            {/* Missing both props */}
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

export default OnlineShopping;
