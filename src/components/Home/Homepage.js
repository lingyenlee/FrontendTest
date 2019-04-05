import React, { Component, Fragment } from "react";
import axios from "axios";
import _ from "lodash";
import AnimalCards from "../Cards/AnimalCards";
import ProfessionMenu from "../Menu/ProfessionMenu";
import OrderMenu from "../Menu/OrderMenu";
import HairColorMenu from "../Menu/HairColorMenu";

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
    axios
      .get(apiUrl)
      .then(({ data }) => {
        localStorage.setItem("data", JSON.stringify(data.Brastlewark));
        this.setState({
          data: data.Brastlewark,
          imageIsLoaded: true,
        });
      })
      .catch(err => console.log(err));
  }

  // --------- show data when component mounts ---------------------------
  componentDidMount() {
    this.fetchAnimals();
    // this.uniqueHairColor();
    // this.uniqueProfession();
  }

  //------------- handle and bind order value -----------------
  doOrderBy(val) {
    if (val == null) {
      this.setState({
        newOrderBy: "name",
      });
      // console.log(val);
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

  //-------- remove duplicate hair colors into an array----------------
  uniqueHairColor() {
    // const getData = JSON.parse(localStorage.getItem("data"));
    // console.log(getData);
    const allcolors = [
      ...new Set(this.state.data.map(item => item.hair_color)),
    ];
    return allcolors;
  }

  //---------remove duplicate and combine all professions in an array------
  uniqueProfession() {
    // const getData = JSON.parse(localStorage.getItem("data"));
    const allPro = this.state.data.map(item => item.professions);
    const combinePro = [].concat(...allPro);
    const uniqueProfession = [...new Set(combinePro)].sort();
    return uniqueProfession;
  }
  // -----------handle and bind hair color value ------------------------------
  handleColor(val) {
    if (val == "") {
      this.setState({
        hairColor: "",
      });
    } else {
      const newColor = val.map(item => item.value);
      this.setState({
        hairColor: newColor,
      });
    }
  }

  // -----------handle and bind profession value ------------------------------
  handlePro(val) {
    if (val == "") {
      this.setState({
        profession: "",
      });
    } else {
      const newProfession = val.map(item => item.value);
      this.setState({
        profession: newProfession,
      });
    }
  }

  render() {
    // console.log(this.state.data);
    const {
      data,
      imageIsLoaded,
      hairColor,
      orderBy,
      order,
      profession,
    } = this.state;

    let sorted = data;

    //------create options for hair color dropdown menu ------------
    const colors = this.uniqueHairColor().map(x => ({ label: x, value: x }));

    //------create options for hair color dropdown menu ------------
    const allProfessions = this.uniqueProfession().map(x => ({
      label: x,
      value: x,
    }));

    // ------------sort the gnomes according to selected properties -------------
    // sort by hair color
    if (hairColor) {
      sorted = _.filter(sorted, item => _.includes(hairColor, item.hair_color));
    }

    // sort by profession
    if (profession) {
      sorted = _.filter(sorted, { professions: profession });
    }

    // sort by age, weight, name, height
    if (orderBy !== ("number of friends" && "number of professions")) {
      sorted = _.orderBy(
        sorted,
        item => {
          return item[orderBy];
        },
        order
      );
    }

    // sort by number of friends
    if (orderBy === "number of friends") {
      sorted = _.orderBy(
        sorted,
        item => {
          return item.friends.length;
        },
        order
      );
    }

    // sort by number of professions
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

    const Animal = (
      <Fragment>
        <div className="main-container">
          <div className="header-image">
            <img src={require("../../images/gnome.jpg")} alt="gnome" />
            <div className="welcome">
              Welcome to the world's first Gnome Registry! Find your Gnome by
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
            />

            {/* --------dropdown list for hair color------------  */}

            <HairColorMenu
              handleInputColor={this.handleColor}
              colors={colors}
            />

            {/* -------dropdown list for professions --------------- */}

            <ProfessionMenu
              handleInputPro={this.handlePro}
              allProfessions={allProfessions}
            />
          </div>

          {/*  -------- pass sorted data as props into Gnome component -------- */}
          <AnimalCards sorted={sorted} />
        </div>
      </Fragment>
    );

    return (
      <Fragment>
        <div>{imageIsLoaded ? Animal : Loading}</div>
      </Fragment>
    );
  }
}

export default HomePage;
