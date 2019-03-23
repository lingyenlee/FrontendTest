import React, { Component, Fragment } from "react";
import Select from "react-select";
import "./menu.css";

class OrderMenu extends Component {
  state = {
    selectedOption: "",
  };

  // handleReset = e => {};

  handleChange = event => {
    // const value = event.target.getAttribute("value");
    this.setState({ selectedOption: value });
    console.log("Option selected", this.state.selectedOption);
  };

  render() {
    // const { isClearable } = this.state;
    const { doOrder, doOrderBy, order, handleReset, data } = this.props;

    //------ map the label of dropdown menu -----------
    const orderProp = [
      "name",
      "age",
      "weight",
      "height",
      "number of friends",
      "number of professions",
    ];
    console.log(order);
    return (
      <div className="order-menu">
        <Select
          placeholder="Filter by name, age, weight or height"
          simpleValue={true}
          onChange={doOrderBy}
          className="basic-single"
          classNamePrefix="select"
          options={orderProp.map(x => ({ label: x, value: x }))}
        />
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
          <div className="submit-btn">
            <button type="button" onClick={this.handleChange} value={data}>
              RESET
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default OrderMenu;
