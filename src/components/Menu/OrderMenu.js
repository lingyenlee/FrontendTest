import React, { Component } from "react";
import Select from "react-select";

class OrderMenu extends Component {
  // state = {
  //   selectedOption: "",
  // };
  // handleChange = selectedOption => {
  //   this.setState({ selectedOption: selectedOption });
  //   console.log("Option selected", selectedOption);
  // };

  render() {
    const { doOrder, doOrderBy, order } = this.props;
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
        <Select
          placeholder="Find by name, age, weight, height.."
          simpleValue={false}
          onChange={doOrderBy}
          className="basic-single"
          classNamePrefix="select"
          name="profession"
          options={orderProp.map(x => ({ label: x, value: x }))}
          isClearable
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
        </form>
      </div>
    );
  }
}

export default OrderMenu;
