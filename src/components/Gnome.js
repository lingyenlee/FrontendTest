import React, { Component, Fragment } from "react";

class Gnome extends Component {
  render() {
    const { data, imageIsLoaded, orderBy } = this.props;
    if (!imageIsLoaded) {
      return <div>Loading image....</div>;
    } else {
      return (
        <Fragment>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div
                  className="flip-card-front-top"
                  style={{ backgroundColor: data.hair_color }}
                />
                <div className="img-container">
                  <img
                    className="img-circle"
                    src={data.thumbnail}
                    alt={`${data.name}`}
                    style={{ border: "5px solid white" }}
                  />
                </div>
                <div className="flip-card-front-bottom">
                  <p className="name">{data.name}</p>
                  <div className="attributes">
                    <div className="age-group">
                      <img
                        className="ageIcon"
                        src={require("../images/axe.png")}
                      />
                      <p>
                        {data.age + " "}
                        yrs <br />
                      </p>
                    </div>
                    <div className="weight-group">
                      <img
                        className="weightIcon"
                        src={require("../images/weight.png")}
                      />
                      <p className="weight"> {data.weight} kg </p>
                    </div>
                    <div className="height-group">
                      <img
                        className="ageIcon"
                        src={require("../images/height.png")}
                      />
                      <p className="height">{data.height} cm </p>
                    </div>
                  </div>
                  <div className="professions">
                    {" "}
                    <p>
                      Professions:
                      <br />
                    </p>
                    <span> {data.professions + " "} </span>
                  </div>
                  <div className="friends">
                    <p>
                      Number of friends:
                      <br />
                      {data.friends.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flip-card-back">
                <p>Friends: {data.friends}</p>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default Gnome;
