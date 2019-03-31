import React from "react";
import { shallow } from "../../enzyme";
import AnimalCards from "../AnimalCards";

describe("mapping of input data", () => {
  it("renders animals-properties", () => {
    const sorted = [
      {
        age: "1",
        weight: "2",
        height: "1",
        professions: ["a", "b"],
        friends: ["c", "d"],
      },
    ];
    const wrapper = shallow(<AnimalCards sorted={sorted} />);
   

    //expect the wrapper object to be defined
    expect(wrapper.find(".flip-card-container")).toBeDefined();
    expect(wrapper.find(".flip-card-container")).toHaveLength(sorted.length);
  });

  it("should have 4 images display in a card", () => {
    const sorted = [
      {
        age: "1",
        weight: "2",
        height: "1",
        professions: ["a", "b"],
        friends: ["c", "d"],
      },
    ];
    const wrapper = shallow(<AnimalCards sorted={sorted} />);
    expect(wrapper.find("img")).toHaveLength(4);
  });
});
