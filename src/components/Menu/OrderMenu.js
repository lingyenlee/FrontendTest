import React, { Component, Fragment } from "react";

class OrderMenu extends Component {
  // handleReset = e => {};

  // handleChange = event => {
  // const value = event.target.getAttribute("value");
  //   this.setState({ selectedOption: value });
  //   console.log("Option selected", this.state.selectedOption);
  // };

  render() {
    const { doOrder, doOrderBy, order, placeholder, data } = this.props;
    //------ define options of dropdown menu -----------
    const orderProp = [
      "name",
      "age",
      "weight",
      "height",
      "number of friends",
      "number of professions",
    ];
    return (
      <div className="order-menu">
        <span>Filter by name, age, weight, height, friends, professions</span>
        <br />
        <select className="selectBy" onChange={doOrderBy}>
          <option value=" ">{placeholder}</option>
          {orderProp.map(item => (
            <option key={item} value={item} options={item}>
              {item}
            </option>
          ))}
        </select>

        <form className="order-btn-container">
          <div className="form-check">
            <label className="radio">
              <input
                type="radio"
                name="order"
                data-value="asc"
                checked={order === "asc" ? this.checked : null}
                className="form-check-input"
                onChange={doOrder}
              />
              Ascending
            </label>
          </div>
          <div className="form-check">
            <label className="radio">
              <input
                type="radio"
                name="order"
                data-value="desc"
                checked={order === "desc" ? this.checked : null}
                className="form-check-input"
                onChange={doOrder}
              />
              Descending
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default OrderMenu;
