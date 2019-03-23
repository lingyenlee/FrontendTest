import React, { Component, Fragment } from "react";
import axios from "axios";
import _ from "lodash";
import Gnome from "./Gnome";
import ProfessionMenu from "./Menu/ProfessionMenu";
import OrderMenu from "./Menu/OrderMenu";
import HairColorMenu from "./Menu/HairColorMenu";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      imageIsLoaded: false,
      orderBy: [],
      order: "",
      hairColor: "",
      profession: "",
      hair: "",
    };
    this.doOrderBy = this.doOrderBy.bind(this);
    this.doOrder = this.doOrder.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handlePro = this.handlePro.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  // ----------------get data from API & save to local storage-------------------------
  fetchGnomes() {
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
    this.fetchGnomes();
  }

  //------------- handle and bind order value -----------------
  doOrderBy(val) {
    const newOrderBy = Object.keys(val).map(key => val[key])[0];
    console.log(newOrderBy);
    this.setState({
      orderBy: newOrderBy,
    });
  }

  //   const value = chosenValue === null ? '' : chosenValue.value
  // this.setState({ value });

  // ---------- handle and bind asc or desc order value -----------------
  doOrder(e) {
    const newOrder = e.target.getAttribute("data-value");
    this.setState({ order: newOrder });
  }

  // -----------handle and bind hair color value ------------------------------
  handleColor(val) {
    console.log(val);
    const newColor = val.map(item => item.value);
    console.log(newColor);
    // const newColor = Object.keys(val).map(key => val[key].value);
    this.setState({
      hairColor: newColor,
    });
  }

  // -----------handle and bind profession value ------------------------------
  handlePro(val) {
    const newPro = val.map(item => item.value);
    console.log(newPro);
    this.setState({
      profession: newPro,
    });
  }
  // ---------reset ------------------
  handleReset(e) {
    // const newValue = e.target.getAttribute("value");
    // console.log(e);
    // this.setState({
    //   ..._.filter(sorted, item => _.includes(hairColor, item.hair_color));
    //   orderBy: [],
    //   order: "",
    //   hairColor: "",
    //   profession: "",
    //   hair: "",
    // });
  }

  render() {
    const {
      data,
      imageIsLoaded,
      hairColor,
      hair,
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
    } else if (hair) {
      sorted = _.filter(sorted, item => _.includes(hair, item.hair_color));
    } else if (profession) {
      sorted = _.filter(sorted, { professions: profession });
    } else {
      sorted = data;
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
              resetHandle={this.handleReset}
              data={data}
            />
            {/* --------dropdown list for hair color------------  */}
            <HairColorMenu data={data} handleInputColor={this.handleColor} />
            {/* -------dropdown list for professions --------------- */}{" "}
            <ProfessionMenu data={data} handleInputPro={this.handlePro} />
          </div>

          {/*  -------- pass sorted data as props into Gnome component -------- */}
          <Gnome sorted={sorted} />
        </div>
      </Fragment>
    );

    return (
      <Fragment>
        {/* <div className="header-image">
          <img src={require("../../images/cover.jpg")} alt="gnome" />
        </div> */}
        <div>{imageIsLoaded ? GnomePage : Loading}</div>
      </Fragment>
    );
  }
}

export default HomePage;
