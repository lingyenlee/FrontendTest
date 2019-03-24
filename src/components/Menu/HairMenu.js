import React, { Component } from "react";

class HairMenu extends Component {
  // state = {
  //   selectedOption: "",
  // };
  // handleChange = e => {
  //   [e.target.name] = e.target.value;
  //   this.setState({ selectedOption: e.target.value });
  //   console.log("Option selected", e.target.value);
  // };

  render() {
    const { handleHairInput, placeholder, data } = this.props;
    const uniqueHairColor = [...new Set(data.map(item => item.hair_color))];

    return (
      <div className="hairColor-menu">
        <span>Filter by hair color</span>
        <select className="selectHairColor" onChange={handleHairInput} multiple>
          <option value=" ">{placeholder}</option>
          {uniqueHairColor.map(item => (
            <option key={item} value={item} options={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default HairMenu;
