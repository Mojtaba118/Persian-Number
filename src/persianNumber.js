const oneDigit = [
  "صفر",
  "یک",
  "دو",
  "سه",
  "چهار",
  "پنج",
  "شش",
  "هفت",
  "هشت",
  "نه"
];
const twoDigits = {
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
};
const threeDigits = {
  100: "صد",
  200: "دویست",
  300: "سیصد",
  400: "چهارصد",
  500: "پانصد",
  600: "شش صد",
  700: "هفت صد",
  800: "هشت صد",
  900: "نه صد"
};

const types = ["تلیارد", "میلیارد", "میلیون", "هزار", ""];
const decimalTypes = ["دهم", "صدم", "هزارم", "ده هزارم"];
let numbers = [];
let decimals = [];

//Convert Number To Words
const convert = number => {
  let negative = "";
  let decNumber = "";
  let decimal = "";
  let percent = "";

  if (isPercent(number)) {
    number = number.replace("%", "");
    percent = " درصد";
  }

  number = getString(number);
  if (number == "") return "";
  sliceNumber(number);
  if (isNegative(number)) negative = "منفی ";
  number = number.replace("-", "");

  if (isDecimal(number)) {
    let index = number.indexOf(".");
    let decNumberStr = "";

    decNumber = number.substr(index + 1, number.length);
    number = number.substr(0, index);
    decNumberStr = parseInt(decNumber).toString();

    if (decNumberStr.length === 1 && decNumberStr != "0") {
      decimal += oneDigit[decNumberStr] + " ";
      decimal += decimalTypes[decNumber.length - 1];
    } else {
      decimal = calculateDigits(decimals);
      decimal += " " + decimalTypes[decNumber.length - 1];
    }
  }

  if (number.length === 1) {
    if (!decimal) {
      return negative + oneDigit[number] + percent;
    }

    if (number == "0") {
      return negative + decimal + percent;
    }

    return negative + oneDigit[number] + " ممیز " + decimal + percent;
  }

  if (!decimal) {
    return negative + calculateDigits(numbers) + percent;
  }

  return negative + calculateDigits(numbers) + " ممیز " + decimal + percent;
};

//split number 3 by 3 with a separator (123456789.3025=>123,456,789.3,025) Do Not Give It Persian Numbers
const sliceNumber = (number, separator = ",") => {
  let percent = "";
  let neg = "";
  let dNum = "";
  let n = "";
  let d = "";

  if (isPercent(number)) {
    number = number.replace("%", "");
    percent = "%";
  }

  number = getString(number);

  if (number == "") return "";
  if (isNegative(number)) neg = "-";

  number = number.replace("-", "");

  if (isDecimal(number)) {
    let index = number.indexOf(".");
    dNum = number.substr(index + 1, number.length);
    number = number.substr(0, index);
  }

  n = putSeparator(number, separator);
  numbers = n.split(separator);

  if (!dNum) return neg + n + percent;

  d = putSeparator(dNum, separator);
  decimals = d.split(separator);

  return neg + n + "." + d + percent;
};

//Puts a separator between the chunks of the given numString.
const putSeparator = (numString, separator = ",") => {
  if (typeof numString !== "string") return "";
  if (numString.length < 4) return numString;

  let result = "";
  for (let i = numString.length - 1, counter = 0; i >= 0; i--) {
    if (counter == 3) {
      result += separator;
      counter = 0;
    }
    result += numString[i];
    counter++;
  }

  result = result
    .split("")
    .reverse()
    .join("");
  return result;
};

//Processing on Digits of A Number
const calculateDigits = arrNum => {
  let result = "";
  for (let i = 0; i < arrNum.length; i++) {
    let parsedNum = parseInt(arrNum[i]);
    let number = parsedNum;
    let sadgan = Math.floor(number / 100) * 100;
    number = number % 100;
    let dahgan = Math.floor(number / 10) * 10;
    let yekan = number % 10;
    result += i !== 0 && parsedNum ? " و " : "";

    result +=
      getPersian(sadgan, dahgan, yekan, i, arrNum) + " " + getType(i, arrNum);
  }

  return result.trim();
};

//Main Process That Turn a Number Into a String(122=>100+20+2)
const getPersian = (sadgan, dahgan, yekan, index, numbers) => {
  let flag = false;
  let result = "";
  let dahganPlusYekan = dahgan + yekan;

  if (threeDigits[sadgan]) {
    result +=
      yekan > 0 || dahgan > 0
        ? threeDigits[sadgan] + " و "
        : threeDigits[sadgan];
  }

  if (twoDigits[dahganPlusYekan]) {
    result += twoDigits[dahganPlusYekan] + " ";
    return result;
  }

  if (twoDigits[dahgan]) {
    result += twoDigits[dahgan] + " و ";
  }

  if (
    numbers.length === 2 &&
    index === 0 &&
    yekan === 1 &&
    dahgan === 0 &&
    sadgan === 0
  ) {
    return result;
  }

  if (
    numbers.length > 2 &&
    index === numbers.length - 2 &&
    yekan === 1 &&
    dahgan === 0 &&
    sadgan === 0
  ) {
    return result;
  }

  if (yekan > 0) result += oneDigit[yekan] + " ";

  return result;
};

//getting The Type Of Each Number (Billion, Million,...)
const getType = (i, numbers) => {
  let parsedNum = parseInt(numbers[i]);
  if (isNaN(parsedNum)) return "";
  if (!parsedNum) return "";
  let length = numbers.length - i;
  let index = types.length - length;
  return types[index];
};

//Calculate if number:String is Negative Or Not
const isNegative = number => {
  number = getString(number);
  if (!number) return false;
  if (number[0] != "-") return false;
  number = number.replace("-", "");
  return number != "0";
};

//Calculate if number:String has '%' as Percent
const isPercent = string => {
  if (typeof string !== "string") return false;
  let index = string.indexOf("%");
  let lIndex = string.lastIndexOf("%");
  if (index != lIndex) return false;
  return index > 0;
};

//is number:String:Number is a Valid Number? if type is Number turn it to String And Return it
const getString = number => {
  if (number === undefined) return "";
  if (number === null) return "";
  if (isNaN(number)) return "";
  if (typeof number === "number") return number.toString();
  return number.trim();
};

//Calculate if number:String has Decimal Point Or Not
const isDecimal = number => {
  number = getString(number);
  if (number == "") return false;
  let index = number.indexOf(".");
  let lIndex = number.lastIndexOf(".");
  if (index != lIndex) return false;
  return index > 0;
};
//Convert English Numbers To Persian Numbers
const convertEnToPe = number => {
  if (number == null || number == undefined) return "";
  if (typeof number == "number") number = number.toString();
  let res = "";
  for (let i = 0; i < number.length; i++) {
    switch (number[i]) {
      case "\u0030":
        res += "\u06F0";
        break;
      case "\u0031":
        res += "\u06F1";
        break;
      case "\u0032":
        res += "\u06F2";
        break;
      case "\u0033":
        res += "\u06F3";
        break;
      case "\u0034":
        res += "\u06F4";
        break;
      case "\u0035":
        res += "\u06F5";
        break;
      case "\u0036":
        res += "\u06F6";
        break;
      case "\u0037":
        res += "\u06F7";
        break;
      case "\u0038":
        res += "\u06F8";
        break;
      case "\u0039":
        res += "\u06F9";
        break;
      default:
        res += number[i];
    }
  }
  return res;
};
//Convert Persian Numbers To English Numbers
const convertPeToEn = number => {
  if (number == null || number == undefined) return "";
  let res = "";
  for (let i = 0; i < number.length; i++) {
    switch (number[i]) {
      case "\u06F0":
        res += "\u0030";
        break;
      case "\u06F1":
        res += "\u0031";
        break;
      case "\u06F2":
        res += "\u0032";
        break;
      case "\u06F3":
        res += "\u0033";
        break;
      case "\u06F4":
        res += "\u0034";
        break;
      case "\u06F5":
        res += "\u0035";
        break;
      case "\u06F6":
        res += "\u0036";
        break;
      case "\u06F7":
        res += "\u0037";
        break;
      case "\u06F8":
        res += "\u0038";
        break;
      case "\u06F9":
        res += "\u0039";
        break;
      default:
        res += number[i];
    }
  }
  return res;
};

module.exports = exports = {
  convert,
  sliceNumber,
  convertEnToPe,
  convertPeToEn
};
