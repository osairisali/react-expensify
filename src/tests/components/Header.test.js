import React from "react";
import ReactShallowRenderer from "react-test-renderer/shallow";
import Header from "../../components/Header";
import { shallow } from "enzyme";

// test suite pakai react-test-renderer package
test("should render Header correctly", () => {
  // renderer berfungsi untuk render react component yg bs dilihat
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);

  // expect().toMatchSnapshot() untuk pertama kali akan membuat file snapshot hasil render
  // jika ada perubahan pada komponen yg berbeda dgn snapshot yg telah diambil, maka test fail
  // pada terminal bisa klik u untuk update snapshot sesuai perubahan
  expect(renderer.getRenderOutput()).toMatchSnapshot();
  // console.log(renderer.getRenderOutput())
});

// test suite yang sama dgn di atas, tp pakai Enzyme yg lbh user friendly & komprehensif
test("should render Header correctly", () => {
  // shallow berfungsi untuk render react component tidak sampai pada komponen children
  const wrapper = shallow(<Header />);

  // pada jest.config.json ada konfigurasi "enzyme-to-json/serializer" yg menyederhanakan
  // hasil snapshot pada Header.test.js.snap agar cm menampilkan bagian komponen react tanpa internal enzyme

  // raf sendiri adalah request animation frame untuk mensimulasikan animasi browser pada test suite

  expect(wrapper.find("h1").text()).toBe("Expensify");
});
