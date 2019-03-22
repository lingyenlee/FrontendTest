import React, { Component, Fragment } from "react";
import Select from "react-select";

class OrderMenu extends Component {
  state = {
    selectedOption: "",
  };

  handleReset = (e) => {
    
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption });
    console.log("Option selected", selectedOption);
  };

  render() {
    const { isClearable } = this.state;
    const { doOrder, doOrderBy, order, resetHandle } = this.props;
    //------ map the label of dropdown menu -----------
    const option = ["name", "age", "weight", "height", "number of friends"];
    console.log(option.map(x => ({ label: x, value: x })));
    console.log(doOrderBy);

    return (
      <Fragment>
        <Select
          simpleValue={true}
          onChange={doOrderBy}
          className="basic-single"
          classNamePrefix="select"
          options={option.map(x => ({ label: x, value: x }))}
        />
        <form>
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
            <button onClick={this.handleReset}>RESET</button>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default OrderMenu;
