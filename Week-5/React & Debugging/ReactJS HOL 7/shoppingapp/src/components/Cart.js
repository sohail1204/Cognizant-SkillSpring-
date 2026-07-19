import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  // Constructor to initialize state or bind methods
  constructor(props) {
    // Calling super(props) to pass props to the parent Component class
    super(props);

    // Properties inside the component instance representing Cart item properties
    this.ItemName = this.props.ItemName;
    this.Price = this.props.Price;
  }

  // Getter methods to safely fetch properties (if required)
  getItemName() {
    return this.props.ItemName;
  }

  getPrice() {
    return this.props.Price;
  }

  render() {
    // Destructuring properties from props to render
    const { ItemName, Price } = this.props;

    return (
      <div className="cart-card">
        <h3>Item Name : {ItemName}</h3>
        <p>Price : {typeof Price === 'number' ? `₹${Price}` : Price}</p>
      </div>
    );
  }
}

// Module 8: Default Props Demonstration
// If any prop is not passed from the parent component, these default values will be used.
Cart.defaultProps = {
  ItemName: "Unknown Item", // If ItemName is missing, show 'Unknown Item'
  Price: "Not Available"     // If Price is missing, show 'Not Available'
};

// Type validation using prop-types
Cart.propTypes = {
  ItemName: PropTypes.string,
  Price: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Cart;
