import React, { Component, Fragment } from "react";
import axios from "axios";
import _ from "lodash";
import AnimalCards from "./AnimalCards";
import ProfessionMenu from "./Menu/ProfessionMenu";
import OrderMenu from "./Menu/OrderMenu";
import HairColorMenu from "./Menu/HairColorMenu";
// import HairMenu from "./Menu/HairMenu";

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
      console.log(data);
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
  doOrderBy(val) {
    if (val == null) {
      this.setState({
        newOrderBy: "name",
      });
      console.log(val);
    } else {
      const newOrderBy = Object.keys(val).map(key => val[key])[0];
      this.setState({
        orderBy: newOrderBy,
      });
    }
  }

  // ---------- handle and bind asc or desc order value -----------------
  doOrder(e) {
    const newOrder = e.target.getAttribute("data-value");
    this.setState({ order: newOrder });
  }

  // -----------handle and bind hair color value ------------------------------
  handleColor(val) {
    const newColor = val.map(item => item.value);
    const uniqueHairColor = [
      ...new Set(this.state.data.map(item => item.hair_color)),
    ];
    const newValue = newColor === "" ? uniqueHairColor : newColor;

    this.setState({
      hairColor: newValue,
    });
  }

  // -----------handle and bind profession value ------------------------------
  handlePro(val) {
    const newProfession = val.map(item => item.value);
    const allProfessions = this.state.data
      .map(item => item.professions)
      .flat(1);
    const uniqueProfession = [...new Set(allProfessions)].sort();
    const newValue = newProfession === " " ? uniqueProfession : newProfession;

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

    if (hairColor) {
      sorted = _.filter(sorted, item => _.includes(hairColor, item.hair_color));
    }

    if (profession) {
      sorted = _.filter(sorted, { professions: profession });
    }

    if (orderBy !== ("number of friends" && "number of professions")) {
      sorted = _.orderBy(
        sorted,
        item => {
          return item[orderBy];
        },
        order
      );
    }

    if (orderBy === "number of friends") {
      sorted = _.orderBy(
        sorted,
        item => {
          return item.friends.length;
        },
        order
      );
    }

    if (orderBy === "number of professions") {
      sorted = _.orderBy(
        sorted,
        item => {
          return item.professions.length;
        },
        order
      );
    }

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
              data={data}
              sorted={data}
            />
            {/* --------dropdown list for hair color------------  */}
            <HairColorMenu data={data} handleInputColor={this.handleColor} />

            {/* -------dropdown list for professions --------------- */}
            <ProfessionMenu data={data} handleInputPro={this.handlePro} />
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
