import React, { Component, Fragment } from "react";
import Select from "react-select";

class HairMenu extends Component {
  state = {
    isClearable: true,
  };
  state = {
    selectedOption: "",
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption });
    console.log("Option selected", selectedOption);
  };

  render() {
    const { data, handleHairInput } = this.props;
    const uniqueColor = [...new Set(data.map(item => item.hair_color))];
    console.log(uniqueColor);
    console.log(uniqueColor.map(x => ({ label: x, value: x })));
    return (
      <Fragment>
        <Select
          placeholder="Hair Color"
          simpleValue={false}
          onChange={handleHairInput}
          isMulti
          name="hair"
          className="basic-multi-select"
          classNamePrefix="select"
          options={uniqueColor.map(x => ({ label: x, value: x }))}
        />
      </Fragment>
    );
  }
}

export default HairMenu;
