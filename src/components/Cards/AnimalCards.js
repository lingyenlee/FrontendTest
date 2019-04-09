import React, { Component, Fragment } from "react";

class AnimalCards extends Component {
  render() {
    const { sorted } = this.props;
    const Jobless = <div>No profession to show</div>;
    const NoFriends = <div>No friends to show</div>;
    return (
      <Fragment>
        <div className="stats">Number of gnomes: {sorted.length} </div>

        <div className="flip-card-container" data-test="flip-card-container" >
          {sorted.map(animal => {
            return (
              <div className="flip-card" key={animal.id}>
                <div className="flip-card-inner">
                  {/* ---------------START front ----------- */}
                  <div className="flip-card-front">
                    <div
                      className="flip-card-front-top"
                      style={{ backgroundColor: animal.hair_color }}
                    />
                    <div className="img-container">
                      <img
                        className="img-circle"
                        src={animal.thumbnail}
                        alt={`${animal.name}`}
                        style={{ border: "5px solid white" }}
                      />
                    </div>
                    <div className="flip-card-front-bottom">
                      <div className="name">{animal.name}</div>
                      <div className="attributes">
                        <div className="age-group">
                          <img
                            className="ageIcon"
                            src={require("../../images/axe.png")}
                            alt="ageIcon"
                          />
                          <div className="age">{animal.age + " "} yrs</div>
                        </div>
                        <div className="weight-group">
                          <img
                            className="weightIcon"
                            src={require("../../images/weight.png")}
                            alt="weightIcon"
                          />
                          <div className="weight"> {animal.weight} kg </div>
                        </div>
                        <div className="height-group">
                          <img
                            className="ageIcon"
                            src={require("../../images/height.png")}
                            alt="heightIcon"
                          />
                          <div className="height">{animal.height} cm </div>
                        </div>
                      </div>
                      <div className="professions">
                        Number of professions:
                        <div className="professions-num">
                          {animal.professions.length == 0
                            ? Jobless
                            : animal.professions.length}
                        </div>
                      </div>
                      <div className="friends">Number of friends: </div>
                      <div className="friends-num">
                        {animal.friends.length == 0
                          ? NoFriends
                          : animal.friends.length}
                      </div>
                    </div>
                  </div>
                  {/* ------------START front ----------- */}
                  {/* ------------START back ------------- */}
                  <div className="flip-card-back">
                    <div className="back-container">
                      <div className="back-header">Professions</div>
                      <div className="back-list">
                        {animal.professions.length === 0
                          ? Jobless
                          : animal.professions.join(", ")}
                      </div>
                    </div>
                    <div className="back-container">
                      <div className="back-header">Friends</div>
                      <div className="back-list">
                        {animal.friends.length === 0
                          ? NoFriends
                          : animal.friends.join(", ")}
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

export default AnimalCards;
