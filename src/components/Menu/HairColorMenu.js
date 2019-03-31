import React, { Component, Fragment } from "react";
import Select from "react-select";

class HairColorMenu extends Component {
 

  render() {
    const { handleInputColor, colors } = this.props;
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
          options={colors}
          isClearable
        />
      </Fragment>
    );
  }
}

export default HairColorMenu;
