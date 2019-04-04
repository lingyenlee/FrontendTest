import React from "react";
import { shallow, mount } from "enzyme";
import HomePage from "./Homepage";
import { create } from "react-test-renderer";
import axios from "axios";

describe("Homepage", () => {

  //mock API call
  it("should make an API call", () => {
    jest.mock("axios");
    const getSpy = jest.spyOn(axios, "get");
    mount(<HomePage />);
    expect(getSpy).toBeCalled();
  });

  //test for fetchAnimals
  it("Should call fetchAnimals", () => {
    const getSpy = jest.spyOn(HomePage.prototype, "fetchAnimals");
    mount(<HomePage />);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  //test for snapshot of Homepage
  it("Should matches snapshot", () => {
    const component = create(<HomePage />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  //calls for component did mount
  it("Should call componentDidMount", () => {
    jest.spyOn(HomePage.prototype, "componentDidMount");
    //use shallow at first but it doesn't work. why?
    mount(<HomePage />);
    expect(HomePage.prototype.componentDidMount.mock.calls.length).toBe(1);
  });
});
