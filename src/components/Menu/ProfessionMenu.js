import React, { Component } from "react";
import Select from "react-select";

class ProfessionMenu extends Component {
  render() {
    const { allProfessions, handleInputPro } = this.props;
    // const allProfessions = data.map(item => item.professions).flat(1);
    // const uniqueProfession = [...new Set(allProfessions)].sort();

    return (
      <div className="profession-menu">
        <Select
          placeholder="Find by Profession"
          simpleValue={false}
          isMulti
          onChange={handleInputPro}
          className="basic-multi-select"
          classNamePrefix="select"
          name="profession"
          options={allProfessions}
          isClearable
        />
      </div>
    );
  }
}

export default ProfessionMenu;
