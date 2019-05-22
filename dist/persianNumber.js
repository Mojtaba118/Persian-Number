"use strict";

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PN = new (_temp = function _temp() {
  var _this = this;

  _classCallCheck(this, _temp);

  _defineProperty(this, "oneDigit", ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"]);

  _defineProperty(this, "twoDigits", {
    10: "ده",
    11: "یازده",
    12: "دوازده",
    13: "سیزده",
    14: "چهارده",
    15: "پانزده",
    16: "شانزده",
    17: "هفده",
    18: "هجده",
    19: "نوزده",
    20: "بیست",
    30: "سی",
    40: "چهل",
    50: "پنجاه",
    60: "شصت",
    70: "هفتاد",
    80: "هشتاد",
    90: "نود"
  });

  _defineProperty(this, "threeDigits", {
    100: "صد",
    200: "دویست",
    300: "سیصد",
    400: "چهارصد",
    500: "پانصد",
    600: "شش صد",
    700: "هفت صد",
    800: "هشت صد",
    900: "نه صد"
  });

  _defineProperty(this, "types", ["تلیارد", "میلیارد", "میلیون", "هزار", ""]);

  _defineProperty(this, "decimalTypes", ["دهم", "صدم", "هزارم", "ده هزارم"]);

  _defineProperty(this, "numbers", []);

  _defineProperty(this, "decimals", []);

  _defineProperty(this, "convert", function (number) {
    var negative = "";
    var decNumber = "";
    var decimal = "";
    var percent = "";

    if (_this.isPercent(number)) {
      number = number.replace("%", "");
      percent = " درصد";
    }

    number = _this.getString(number);
    if (number == "") return "";

    _this.sliceNumber(number);

    if (_this.isNegative(number)) negative = "منفی ";
    number = number.replace("-", "");

    if (_this.isDecimal(number)) {
      var index = number.indexOf(".");
      var decNumberStr = "";
      decNumber = number.substr(index + 1, number.length);
      number = number.substr(0, index);
      decNumberStr = parseInt(decNumber).toString();

      if (decNumberStr.length === 1 && decNumberStr != "0") {
        decimal += _this.oneDigit[decNumberStr] + " ";
        decimal += _this.decimalTypes[decNumber.length - 1];
      } else {
        decimal = _this.calculateDigits(_this.decimals);
        decimal += " " + _this.decimalTypes[decNumber.length - 1];
      }
    }

    if (number.length === 1) {
      if (!decimal) {
        return negative + _this.oneDigit[number] + percent;
      }

      if (number == "0") {
        return negative + decimal + percent;
      }

      return negative + _this.oneDigit[number] + " ممیز " + decimal + percent;
    }

    if (!decimal) {
      return negative + _this.calculateDigits(_this.numbers) + percent;
    }

    return negative + _this.calculateDigits(_this.numbers) + " ممیز " + decimal + percent;
  });

  _defineProperty(this, "sliceNumber", function (number) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ",";
    var percent = "";
    var neg = "";
    var dNum = "";
    var n = "";
    var d = "";

    if (_this.isPercent(number)) {
      number = number.replace("%", "");
      percent = "%";
    }

    number = _this.getString(number);
    if (number == "") return "";
    if (_this.isNegative(number)) neg = "-";
    number = number.replace("-", "");

    if (_this.isDecimal(number)) {
      var index = number.indexOf(".");
      dNum = number.substr(index + 1, number.length);
      number = number.substr(0, index);
    }

    n = _this.putSeparator(number, 3, separator);
    _this.numbers = n.split(separator);
    if (!dNum) return neg + n + percent;
    d = _this.putSeparator(dNum, 3, separator);
    _this.decimals = d.split(separator);
    return neg + n + "." + d + percent;
  });

  _defineProperty(this, "putSeparator", function (numString) {
    var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ",";
    if (typeof numString !== "string") return "";
    if (numString.length < chunkSize + 1) return numString;
    var result = "";

    for (var i = numString.length - 1, counter = 0; i >= 0; i--) {
      if (counter == chunkSize) {
        result += separator;
        counter = 0;
      }

      result += numString[i];
      counter++;
    }

    result = result.split("").reverse().join("");
    return result;
  });

  _defineProperty(this, "calculateDigits", function (arrNum) {
    var result = "";

    for (var i = 0; i < arrNum.length; i++) {
      var parsedNum = parseInt(arrNum[i]);
      var number = parsedNum;
      var sadgan = Math.floor(number / 100) * 100;
      number = number % 100;
      var dahgan = Math.floor(number / 10) * 10;
      var yekan = number % 10;
      result += i !== 0 && parsedNum ? " و " : "";
      result += _this.getPersian(sadgan, dahgan, yekan, i, arrNum) + " " + _this.getType(i, arrNum);
    }

    return result.trim();
  });

  _defineProperty(this, "getPersian", function (sadgan, dahgan, yekan, index, numbers) {
    var result = "";
    var dahganPlusYekan = dahgan + yekan;

    if (_this.threeDigits[sadgan]) {
      result += yekan > 0 || dahgan > 0 ? _this.threeDigits[sadgan] + " و " : _this.threeDigits[sadgan];
    }

    if (_this.twoDigits[dahganPlusYekan]) {
      result += _this.twoDigits[dahganPlusYekan] + " ";
      return result;
    }

    if (_this.twoDigits[dahgan]) {
      result += _this.twoDigits[dahgan] + " و ";
    }

    if (numbers.length === 2 && index === 0 && yekan === 1 && dahgan === 0 && sadgan === 0) {
      return result;
    }

    if (numbers.length > 2 && index === numbers.length - 2 && yekan === 1 && dahgan === 0 && sadgan === 0) {
      return result;
    }

    if (yekan > 0) result += _this.oneDigit[yekan] + " ";
    return result;
  });

  _defineProperty(this, "getType", function (i, numbers) {
    var parsedNum = parseInt(numbers[i]);
    if (isNaN(parsedNum)) return "";
    if (!parsedNum) return "";
    var length = numbers.length - i;
    var index = _this.types.length - length;
    return _this.types[index];
  });

  _defineProperty(this, "isNegative", function (number) {
    number = _this.getString(number);
    if (!number) return false;
    if (number[0] != "-") return false;
    number = number.replace("-", "");
    return number != "0";
  });

  _defineProperty(this, "isPercent", function (string) {
    if (typeof string !== "string") return false;
    var index = string.indexOf("%");
    var lIndex = string.lastIndexOf("%");
    if (index != lIndex) return false;
    return index > 0;
  });

  _defineProperty(this, "getString", function (number) {
    if (number === undefined) return "";
    if (number === null) return "";
    if (isNaN(number)) return "";
    if (typeof number === "number") return number.toString();
    return number.trim();
  });

  _defineProperty(this, "isDecimal", function (number) {
    number = _this.getString(number);
    if (number == "") return false;
    var index = number.indexOf(".");
    var lIndex = number.lastIndexOf(".");
    if (index != lIndex) return false;
    return index > 0;
  });

  _defineProperty(this, "convertEnToPe", function (number) {
    if (number === null || number === undefined) return "";
    if (typeof number == "number") number = number.toString();
    var res = "";

    for (var i = 0; i < number.length; i++) {
      switch (number[i]) {
        case "0":
          res += "\u06F0";
          break;

        case "1":
          res += "\u06F1";
          break;

        case "2":
          res += "\u06F2";
          break;

        case "3":
          res += "\u06F3";
          break;

        case "4":
          res += "\u06F4";
          break;

        case "5":
          res += "\u06F5";
          break;

        case "6":
          res += "\u06F6";
          break;

        case "7":
          res += "\u06F7";
          break;

        case "8":
          res += "\u06F8";
          break;

        case "9":
          res += "\u06F9";
          break;

        default:
          res += number[i];
      }
    }

    return res;
  });

  _defineProperty(this, "convertPeToEn", function (number) {
    if (number === null || number === undefined) return "";
    var res = "";

    for (var i = 0; i < number.length; i++) {
      switch (number[i]) {
        case "\u06F0":
          res += "0";
          break;

        case "\u06F1":
          res += "1";
          break;

        case "\u06F2":
          res += "2";
          break;

        case "\u06F3":
          res += "3";
          break;

        case "\u06F4":
          res += "4";
          break;

        case "\u06F5":
          res += "5";
          break;

        case "\u06F6":
          res += "6";
          break;

        case "\u06F7":
          res += "7";
          break;

        case "\u06F8":
          res += "8";
          break;

        case "\u06F9":
          res += "9";
          break;

        default:
          res += number[i];
      }
    }

    return res;
  });
}, _temp)();
module.exports = exports = PN;
//# sourceMappingURL=persianNumber.js.map