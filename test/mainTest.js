const assert = require("assert");
const PN = require("./../dist/persianNumber.min");

describe("test main functions", () => {
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
