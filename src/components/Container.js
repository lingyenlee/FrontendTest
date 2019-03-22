import React, { Component, Fragment } from "react";
import axios from "axios";
import _ from "lodash";
import Gnome from "./Gnome";
import ProfessionMenu from "./Menu/ProfessionMenu";
import OrderMenu from "./Menu/OrderMenu";
import HairColorMenu from "./Menu/HairColorMenu";
import HairMenu from "./Menu/HairMenu";
import SelectBox from "./Select/selectBox";
import DropdownExampleSelection from "./example";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      imageIsLoaded: false,
      orderBy: [],
      order: "",
      hairColor: "",
      profession: "",
      hair: null,
      reset: false,
    };
    this.doOrderBy = this.doOrderBy.bind(this);
    this.doOrder = this.doOrder.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handlePro = this.handlePro.bind(this);
    this.handleHair = this.handleHair.bind(this);
    this.reset = this.reset.bind(this);
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
    this.setState({
      data: this.state.data,
    });
  }

  //------------- handle and bind order value -----------------
  doOrderBy(val) {
    // const newOrderBy = val.map(item => item.value);
    console.log(val);

    const newOrderBy = Object.keys(val).map(key => val[key])[0];
    if (val === undefined || null) {
      return val === {};
    } else {
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
  // ---------reset
  reset(e) {
    const newReset = e.target.getAttribute("data-value");
    console.log(newReset);
  }

  handleHair(val) {
    console.log(val);
    const newHair = val.map(item => item.value);
    console.log(val);
    this.setState({
      hair: newHair,
    });
  }

  render() {
    console.log(this.state.data);
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
      if (orderBy !== "number of friends") {
        sorted = _.orderBy(
          sorted,
          item => {
            return item[orderBy];
          },
          order
        );
      } else if (orderBy === null || undefined || "") {
        // const friends = sorted.map(item => item.friends);
        sorted = data;
      } else {
        sorted = _.orderBy(
          sorted,
          item => {
            return item.friends.length;
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

    // -------- pass sorted data as props into Gnome component -------------
    const gnomes = sorted.map(item => {
      return (
        <Gnome
          hair={hair}
          data={item}
          key={item.id}
          imageIsLoaded={imageIsLoaded}
        />
      );
    });
    // ------------imaging loading---------------------
    if (!imageIsLoaded) {
      return <div>Loading image....</div>;
    } else {
      return (
        <Fragment>
          <div className="menu-container">
            {/* --------dropdown list for name, age, weight, height, no.friends by asc/desc order------------  */}
            <HairMenu data={data} handleHairInput={this.handleHair} />
            <OrderMenu
              doOrder={this.doOrder}
              order={order}
              orderBy={orderBy}
              doOrderBy={this.doOrderBy}
              resetHandle={this.reset}
            />

            {/* --------dropdown list for hair color------------  */}

            {/* <HairColorMenu data={data} handleInputColor={this.handleColor} /> */}

            {/* -------dropdown list for professions --------------- */}

            {/* <ProfessionMenu data={data} handleInputPro={this.handlePro} /> */}
          </div>
          <div>{gnomes}</div>
        </Fragment>
      );
    }
  }
}

export default Container;
