const PN = require("../dist/persianNumber");

test("Converts positive and integer numbers to persian words.", () => {
  expect(PN.convert(123)).toMatch("صد و بیست و سه");
});

test("Converts negative float numbers to persian words.", () => {
  expect(PN.convert(-123.2)).toMatch("منفی صد و بیست و سه ممیز دو دهم");
});

test("Converts negative float percent numbers to persian words.", () => {
  expect(PN.convert("-123.26%")).toMatch("منفی صد و بیست و سه ممیز بیست و شش صدم درصد");
});

test("Slices numbers into 3 digits separated by ',' char.", () => {
  expect(PN.sliceNumber(12345)).toMatch("12,345");
});

test("Converts numbers to persian number digits.", () => {
  expect(PN.convertEnToPe(123)).toMatch("۱۲۳");
});

test("Converts persian number digits to numbers.", () => {
  expect(PN.convertPeToEn("۱۲۳")).toBe("123");
});