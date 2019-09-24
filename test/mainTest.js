const assert = require("assert");
const PN = require("./../src/persianNumber");

describe("test main functions", () => {
  it("number is converted to persian letters", () => {
    assert.equal(PN.convert(123), "صد و بیست و سه");
  });

  it("decimal numbers is converted to persian letters", () => {
    assert.equal(PN.convert(123.25), "صد و بیست و سه ممیز بیست و پنج صدم");
  });

  it("negative and percent and decimal numbers is converted to persian letters", () => {
    assert.equal(
      PN.convert("-123.25%"),
      "منفی صد و بیست و سه ممیز بیست و پنج صدم درصد"
    );
  });

  it("number is converted to persian letters", () => {
    assert.equal(PN.convert(123), "صد و بیست و سه");
  });

  it("number is separated", () => {
    assert.equal(PN.sliceNumber(123456), "123,456");
  });

  it("number is converted to adad", () => {
    assert.equal(PN.convertEnToPe(123), "۱۲۳");
  });

  it("adad is converted to number", () => {
    assert.equal(PN.convertPeToEn("۱۲۳"), "123");
  });
});
