import Enzyme, { configure, shallow, mount, render } from "enzyme";
import Adaptor from "enzyme-adapter-react-16";
import React from "react";

configure({ adapter: new Adaptor() });
export { shallow, mount, render };
export default Enzyme;

// Make Enzyme functions available in all test files without importing
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
