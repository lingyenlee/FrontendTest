import React, { Component } from "react";
import Select from "react-select";

class ProfessionMenu extends Component {
  render() {
    const { data, handleInputPro } = this.props;
    const allProfessions = data.map(item => item.professions).flat(1);
    const uniqueProfession = [...new Set(allProfessions)].sort();

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
          options={uniqueProfession.map(x => ({ label: x, value: x }))}
          isClearable
        />
      </div>
    );
  }
}

export default ProfessionMenu;
