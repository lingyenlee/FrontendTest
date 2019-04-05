import React from "react";
import { shallow, mount } from "enzyme";
import HomePage from "./Homepage";

// import { create } from "react-test-renderer";
// import axios from "axios";

// const setUp = (props = []) => {
//   const component = mount(<HomePage {...props} />);
//   return component;
// };

describe("Homepage", () => {
  //   let component;
  //   beforeEach(() => {
  //     component = setUp();
  //   });

  const data = [
    {
      age: "1",
      weight: "2",
      height: "1",
      professions: ["a", "b"],
      friends: ["c", "d"],
    },
  ];

  // mock API call
  //   it("should make an API call", () => {
  //     jest.mock("axios");
  //     const getSpy = jest.spyOn(axios, "get");
  //     shallow(<HomePage />);
  //     expect(getSpy).toBeCalled();
  //   });

  // test for fetchAnimals
  it("Should call fetchAnimals", () => {
    const getSpy = jest.spyOn(HomePage.prototype, "fetchAnimals");
    mount(<HomePage data={[]} />);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  //test for fetchAnimals
  //   it("shall update state when fetch animal is called", () => {
  //     const setStateSpy = jest.spyOn(HomePage.prototype, "setState");
  //     const wrapper = shallow(
  //       <HomePage>
  //         <p>Data</p>
  //       </HomePage>
  //     ).instance();
  //     expect(setStateSpy).toHaveBeenCalled();
  //   });

  //test for snapshot of Homepage
  //   it("Should matches snapshot", () => {
  //     const component = create(<HomePage />);
  //     expect(component.toJSON()).toMatchSnapshot();
  //   });

  //calls for component did mount
  //   it("Should call componentDidMount", () => {
  //     jest.spyOn(HomePage.prototype, "componentDidMount");
  //     //use shallow at first but it doesn't work. why?
  //     mount(<HomePage />);
  //     expect(HomePage.prototype.componentDidMount.mock.calls.length).toBe(1);
  //   });
});
