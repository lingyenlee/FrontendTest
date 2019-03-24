import React, { Component } from "react";

class ProfessionMenu extends Component {
  render() {
    const { data, handleInputPro, placeholder } = this.props;
    const allProfessions = data.map(item => item.professions).flat(1);
    const uniqueProfession = [...new Set(allProfessions)].sort();

    return (
      <div className="profession-menu">
        <span>Filter by profession</span>
        <select className="selectProfession" onChange={handleInputPro} multiple>
          <option value=" ">{placeholder}</option>
          {uniqueProfession.map(item => (
            <option key={item} value={item} options={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ProfessionMenu;
