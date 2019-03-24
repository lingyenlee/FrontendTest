import React, { Component, Fragment } from "react";
import Select from "react-select";

class HairColorMenu extends Component {

  render() {
    const { data, handleInputColor } = this.props;
    const uniqueColor = [...new Set(data.map(item => item.hair_color))];
    return (
      <Fragment>
        <Select
          placeholder="Find by Hair Color"
          simpleValue={false}
          isMulti
          onChange={handleInputColor}
          className="basic-multi-select"
          classNamePrefix="select"
          name="hairColor"
          options={uniqueColor.map(x => ({ label: x, value: x }))}
          isClearable
        />
      </Fragment>
    );
  }
}

export default HairColorMenu;
