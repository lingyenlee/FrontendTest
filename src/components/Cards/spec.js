import React from "react";
import { shallow, mount } from "enzyme";
import AnimalCards from "./AnimalCards";
import { create } from "react-test-renderer";

const sorted = [
  {
    age: "1",
    weight: "2",
    height: "1",
    professions: ["a", "b"],
    friends: ["c", "d"],
  },
];

describe("AnimalCards Component", () => {
  describe("mapping of input data", () => {
    it("renders animals-properties", () => {

      const wrapper = shallow(<AnimalCards sorted={sorted} />);
      expect(wrapper.find(".flip-card-container")).toBeDefined();
      expect(wrapper.find(".flip-card-container")).toHaveLength(sorted.length);
    });

    it("should have 4 images display in a card", () => {
      const wrapper = shallow(<AnimalCards sorted={sorted} />);
      expect(wrapper.find("img")).toHaveLength(4);
    });

    it("accept sorted data props", () => {
      const wrapper = mount(<AnimalCards sorted={sorted} />);
      expect(wrapper.props().sorted).toEqual(sorted);
    });
  });
});
