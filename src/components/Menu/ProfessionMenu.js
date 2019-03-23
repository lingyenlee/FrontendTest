import React, { Component, Fragment } from "react";
import Select from "react-select";

class ProfessionMenu extends Component {
  render() {
    const { data, handleInputPro } = this.props;
    const allProfession = data.map(item => item.professions).flat(1);

    const uniqueProfession = [...new Set(allProfession)].sort();
    // console.log(uniqueProfession);
    return (
      <Fragment>
        <Select
          placeholder="Find by Profession"
          simpleValue={true}
          onChange={handleInputPro}
          isMulti
          name="profession"
          className="basic-multi-select"
          classNamePrefix="select"
          options={uniqueProfession.map(x => ({ label: x, value: x }))}
        />
      </Fragment>
    );
  }
}

export default ProfessionMenu;
