import React, { Component, Fragment } from "react";

class Gnome extends Component {
  render() {
    const { sorted } = this.props;
    // const friends = sorted.map(x => ({ friends: x.friends, id: x.id }));
    // console.log(friends);
    // const showFriends = friends.map(x => {
    //   return (
    //     <div className="friends-num" key={x.id}>
    //       <img src={require("../../images/gnome.png")} alt="friends" />
    //     </div>
    //   );
    // });
    // console.log(showFriends);
    const Jobless = <div>No profession to show</div>;
    const NoFriends = <div>No friends to show</div>;
    return (
      <Fragment>
        <div className="flip-card-container">
          {sorted.map(gnome => {
            return (
              <div className="flip-card" key={gnome.id}>
                <div className="flip-card-inner">
                  {/* ---------------START front ----------- */}
                  <div className="flip-card-front">
                    <div
                      className="flip-card-front-top"
                      style={{ backgroundColor: gnome.hair_color }}
                    />
                    <div className="img-container">
                      <img
                        className="img-circle"
                        src={gnome.thumbnail}
                        alt={`${gnome.name}`}
                        style={{ border: "5px solid white" }}
                      />
                    </div>
                    <div className="flip-card-front-bottom">
                      <div className="name">{gnome.name}</div>
                      <div className="attributes">
                        <div className="age-group">
                          <img
                            className="ageIcon"
                            src={require("../images/axe.png")}
                            alt="ageIcon"
                          />
                          <div className="age">{gnome.age + " "} yrs</div>
                        </div>
                        <div className="weight-group">
                          <img
                            className="weightIcon"
                            src={require("../images/weight.png")}
                            alt="weightIcon"
                          />
                          <div className="weight"> {gnome.weight} kg </div>
                        </div>
                        <div className="height-group">
                          <img
                            className="ageIcon"
                            src={require("../images/height.png")}
                            alt="heightIcon"
                          />
                          <div className="height">{gnome.height} cm </div>
                        </div>
                      </div>
                      <div className="professions">
                        Number of professions:
                        <div className="professions-num">
                          {gnome.professions.length === 0
                            ? Jobless
                            : gnome.professions.length}
                        </div>
                      </div>
                      <div className="friends">Number of friends: </div>
                      <div className="friends-num">
                        {gnome.friends.length === 0
                          ? NoFriends
                          : gnome.friends.length}
                      </div>
                    </div>
                  </div>
                  {/* ------------START front ----------- */}
                  {/* ------------START back ------------- */}
                  <div className="flip-card-back">
                    <div className="back-container">
                      <div className="back-header">Professions</div>
                      <div className="back-list">
                        {gnome.professions.length === 0
                          ? Jobless
                          : gnome.professions.join(", ")}
                      </div>
                    </div>
                    <div className="back-container">
                      <div className="back-header">Friends</div>
                      <div className="back-list">
                        {gnome.friends.length === 0
                          ? NoFriends
                          : gnome.friends.join(", ")}
                      </div>
                    </div>
                  </div>
                  {/* -------------END back ------------- */}
                </div>
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}

export default Gnome;
