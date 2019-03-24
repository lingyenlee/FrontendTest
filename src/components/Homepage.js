import React, { Component, Fragment } from "react";
import axios from "axios";
import _ from "lodash";
import AnimalCards from "./AnimalCards";
import ProfessionMenu from "./Menu/ProfessionMenu";
import OrderMenu from "./Menu/OrderMenu";
// import HairColorMenu from "./Menu/HairColorMenu";
import HairMenu from "./Menu/HairMenu";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      imageIsLoaded: false,
      orderBy: "",
      order: "",
      profession: "",
      hairColor: "",
    };
    this.doOrderBy = this.doOrderBy.bind(this);
    this.doOrder = this.doOrder.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handlePro = this.handlePro.bind(this);
  }

  // ----------------get data from API & save to local storage-------------------------
  fetchAnimals() {
    const apiUrl =
      "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";
    axios.get(apiUrl).then(({ data }) => {
      localStorage.setItem("data", data);
      this.setState({
        data: data.Brastlewark,
        imageIsLoaded: true,
      });
    });
  }

  // --------- show data when component mounts ---------------------------
  componentDidMount() {
    this.fetchAnimals();
  }

  //------------- handle and bind order value -----------------
  doOrderBy(e) {
    const newOrderBy = e.target.value;
    console.log(e.target.value);
    console.log(newOrderBy);
    this.setState({
      orderBy: newOrderBy,
    });
  }

  // ---------- handle and bind asc or desc order value -----------------
  doOrder(e) {
    const newOrder = e.target.getAttribute("data-value");
    this.setState({ order: newOrder });
  }

  // -----------handle and bind hair color value ------------------------------
  handleColor(e) {
    const uniqueHairColor = [
      ...new Set(this.state.data.map(item => item.hair_color)),
    ];
    const newColor = [...e.target.selectedOptions].map(opt => opt.value);
    const newValue = newColor == " " ? uniqueHairColor : newColor;
    this.setState({
      hairColor: newValue,
    });
  }

  // -----------handle and bind profession value ------------------------------
  handlePro(e) {
    const newProfession = [...e.target.selectedOptions].map(opt => opt.value);
    const allProfessions = this.state.data
      .map(item => item.professions)
      .flat(1);
    const uniqueProfession = [...new Set(allProfessions)].sort();
    const newValue = newProfession == " " ? uniqueProfession : newProfession;
    console.log(uniqueProfession);
    this.setState({
      profession: newValue,
    });
  }

  render() {
    const {
      data,
      imageIsLoaded,
      hairColor,
      orderBy,
      order,
      profession,
    } = this.state;
    let sorted = data;
    // ------------sort the gnomes according to selected properties -------------

    if (order) {
      if (orderBy !== ("number of friends" && "number of professions")) {
        sorted = _.orderBy(
          sorted,
          item => {
            return item[orderBy];
          },
          order
        );
      } else if (orderBy === "number of friends") {
        sorted = _.orderBy(
          sorted,
          item => {
            return item.friends.length;
          },
          order
        );
      } else {
        sorted = _.orderBy(
          sorted,
          item => {
            return item.professions.length;
          },
          order
        );
      }
    } else if (hairColor) {
      sorted = _.filter(sorted, item => _.includes(hairColor, item.hair_color));
    } else if (profession) {
      sorted = _.filter(sorted, { professions: profession });
    } else {
      sorted = data;
    }

    // const filterProperties = [orderBy, hairColor, profession];
    // filterProperties.forEach(function(filterBy) {
    //   let filterValue = [filterBy];
    //   if (filterValue) {
    //     sorted = sorted.filter(function(item) {
    //       return item[filterBy] === filterValue;
    //     });
    //   }
    // });

    const Loading = <div>Loading image....</div>;
    const GnomePage = (
      <Fragment>
        <div className="main-container">
          <div className="header-image">
            <img src={require("../images/gnome.jpg")} alt="gnome" />
            <div className="welcome">
              Welcome to the world first Gnome's Registry! Find your Gnome by
              name, age, weight, height, friends and professions.
            </div>
          </div>
          <div className="menu-container">
            {/* --------dropdown list for name, age, weight, height, no.friends by asc/desc order------------  */}
            <OrderMenu
              doOrder={this.doOrder}
              order={order}
              orderBy={orderBy}
              doOrderBy={this.doOrderBy}
              placeholder="Select by..."
            />
            {/* --------dropdown list for hair color------------  */}
            <HairMenu
              data={data}
              handleHairInput={this.handleColor}
              placeholder="Choose hair color..."
            />
            {/* -------dropdown list for professions --------------- */}
            <ProfessionMenu
              data={data}
              handleInputPro={this.handlePro}
              placeholder="Choose profession..."
            />
          </div>
          {/*  -------- pass sorted data as props into Gnome component -------- */}
          <AnimalCards sorted={sorted} data={data} />
        </div>
      </Fragment>
    );

    return (
      <Fragment>
        <div>{imageIsLoaded ? GnomePage : Loading}</div>
      </Fragment>
    );
  }
}

export default HomePage;
