import React, { Component, Fragment } from "react";
import Select from "react-select";
import "./menu.css";

class HairColorMenu extends Component {
  // state = {
  //   selectedOption: "",
  // };
  // handleChange = selectedOption => {
  //   this.setState({ selectedOption: selectedOption });
  //   console.log("Option selected", selectedOption);
  //  };

  render() {
    // const { isClearable, isSearchable, isLoading } = this.state;
    const { data, handleInputColor } = this.props;
    const uniqueColor = [...new Set(data.map(item => item.hair_color))];
    return (
      <Fragment>
        <Select
          placeholder="Find by Hair Color"
          // simpleValue={true}
          isMulti
          onChange={handleInputColor}
          className="basic-multi-select"
          classNamePrefix="select"
          name="hairColor"
          options={uniqueColor.map(x => ({ label: x, value: x }))}
        />
      </Fragment>
    );
  }
}

export default HairColorMenu;