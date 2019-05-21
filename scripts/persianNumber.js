const PN = new (class {
  oneDigit = ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
  twoDigits = [
    [10, "ده"],
    [11, "یازده"],
    [12, "دوازده"],
    [13, "سیزده"],
    [14, "چهارده"],
    [15, "پانزده"],
    [16, "شانزده"],
    [17, "هفده"],
    [18, "هجده"],
    [19, "نوزده"],
    [20, "بیست"],
    [30, "سی"],
    [40, "چهل"],
    [50, "پنجاه"],
    [60, "شصت"],
    [70, "هفتاد"],
    [80, "هشتاد"],
    [90, "نود"]
  ];
  threeDigits = [
    [100, "صد"],
    [200, "دویست"],
    [300, "سیصد"],
    [400, "چهارصد"],
    [500, "پانصد"],
    [600, "شش صد"],
    [700, "هفت صد"],
    [800, "هشت صد"],
    [900, "نه صد"]
  ];

  types = ["تلیارد", "میلیارد", "میلیون", "هزار", ""];
  decimalTypes = ["دهم", "صدم", "هزارم", "ده هزارم"];
  numbers = [];
  decimals = [];
  //Convert Number To Words
  convert = number => {
    let negative = "";
    let decNumber = "";
    let decimal = "";
    let percent = "";
    if (this.isPercent(number)) {
      number = number.replace("%", "");
      percent = " درصد";
    }
    number = this.getString(number);
    if (number == "") return "";
    this.sliceNumber(number);
    if (this.isNegative(number)) {
      negative = "منفی ";
    }
    number = number.replace("-", "");
    if (this.isDecimal(number)) {
      let index = number.indexOf(".");
      let decNumberStr = "";
      decNumber = number.substr(index + 1, number.length);
      number = number.substr(0, index);
      decNumberStr = parseInt(decNumber).toString();
      if (decNumberStr.length === 1) {
        if (decNumberStr != "0") {
          decimal =
            this.oneDigit[decNumberStr] +
            " " +
            this.decimalTypes[decNumber.length - 1];
        }
      } else {
        decimal = this.calculateDigits(this.decimals);
        decimal += " " + this.decimalTypes[decNumber.length - 1];
      }
    }
    if (number.length === 1) {
      if ((number == "0" && decimal == "") || (number != "0" && decimal == ""))
        return negative + this.oneDigit[number] + percent;
      else if (number == "0" && decimal != "")
        return negative + decimal + percent;
      else
        return negative + this.oneDigit[number] + " ممیز " + decimal + percent;
    }
    if (decimal == "") {
      return negative + this.calculateDigits(this.numbers) + decimal + percent;
    } else {
      return (
        negative +
        this.calculateDigits(this.numbers) +
        " ممیز " +
        decimal +
        percent
      );
    }
  };

  //split number 3 by 3 with a separator (123456789.3025=>123,456,789.3,025) Do Not Give It Persian Numbers
  sliceNumber = (number, separator = ",") => {
    let percent = "";
    if (this.isPercent(number)) {
      number = number.replace("%", "");
      percent = "%";
    }
    number = this.getString(number);
    let neg = "";
    let counter = 0;
    let dNum = "";
    let n = "";
    let d = "";
    if (number == "") return "";
    if (this.isNegative(number)) {
      neg = "-";
    }
    number = number.replace("-", "");
    if (this.isDecimal(number)) {
      let index = number.indexOf(".");
      dNum = number.substr(index + 1, number.length);
      number = number.substr(0, index);
    }
    for (let i = number.length - 1; i >= 0; i--) {
      if (counter == 3) {
        n += separator;
        counter = 0;
      }
      n += number[i];
      counter++;
    }

    let nRes = "";
    for (let i = n.length - 1; i >= 0; i--) {
      nRes += n[i];
    }
    this.numbers = nRes.split(separator);

    let dRes = "";
    if (dNum != "") {
      counter = 0;
      for (let i = dNum.length - 1; i >= 0; i--) {
        if (counter == 3) {
          d += separator;
          counter = 0;
        }
        d += dNum[i];
        counter++;
      }
      for (let i = d.length - 1; i >= 0; i--) {
        dRes += d[i];
      }
      this.decimals = dRes.split(separator);
      dRes = "." + dRes;
    }
    return neg + nRes + dRes + percent;
  };

  //Processing on Digits of A Number
  calculateDigits = arrNum => {
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
        this.getPersian(sadgan, dahgan, yekan, i, arrNum) +
        " " +
        this.getType(i, arrNum);
    }

    return result;
  };

  //Main Process That Turn a Number Into a String(122=>100+20+2)
  getPersian = (sadgan, dahgan, yekan, index, numbers) => {
    let flag = false;
    let result = "";

    for (let i = 0; i < this.threeDigits.length; i++) {
      if (sadgan === this.threeDigits[i][0]) {
        if (yekan > 0 || dahgan > 0) result += this.threeDigits[i][1] + " و ";
        else result += this.threeDigits[i][1];
        break;
      }
    }

    for (let i = 0; i < this.twoDigits.length; i++) {
      if (dahgan + yekan == this.twoDigits[i][0]) {
        result += this.twoDigits[i][1] + " ";
        flag = true;
        break;
      }
    }
    if (!flag) {
      for (let i = 0; i < this.twoDigits.length; i++) {
        if (dahgan === this.twoDigits[i][0]) {
          result += this.twoDigits[i][1] + " و ";
          break;
        }
      }
      if (
        numbers.length === 2 &&
        index === 0 &&
        yekan === 1 &&
        dahgan === 0 &&
        sadgan === 0
      ) {
        result += "";
      } else if (
        numbers.length > 2 &&
        index === numbers.length - 2 &&
        yekan === 1 &&
        dahgan === 0 &&
        sadgan === 0
      ) {
        result += "";
      } else if (yekan > 0) result += this.oneDigit[yekan] + " ";
    }
    return result;
  };

  //getting The Type Of Each Number (Billion, Million,...)
  getType = (i, numbers) => {
    let parsedNum = parseInt(numbers[i]);
    if (isNaN(parsedNum)) return "";
    if (!parsedNum) return "";
    let length = numbers.length - i;
    let index = this.types.length - length;
    return this.types[index];
  };

  //Calculate if number:String is Negative Or Not
  isNegative = number => {
    number = this.getString(number);
    if (!number) return false;
    if (number[0] != "-") return false;
    number = number.replace("-", "");
    return number != "0";
  };

  //Calculate if number:String has '%' as Percent
  isPercent = string => {
    if (typeof string !== "string") return false;
    let index = string.indexOf("%");
    let lIndex = string.lastIndexOf("%");
    if (index != lIndex) return false;
    return index > 0;
  };

  //is number:String:Number is a Valid Number? if type is Number turn it to String And Return it
  getString = number => {
    if (number === undefined) return "";
    if (number === null) return "";
    if (isNaN(number)) return "";
    if (typeof number === "number") return number.toString();
    return number.trim();
  };

  //Calculate if number:String has Decimal Point Or Not
  isDecimal = number => {
    number = this.getString(number);
    if (number == "") return false;
    let index = number.indexOf(".");
    let lIndex = number.lastIndexOf(".");
    if (index != lIndex) return false;
    return index > -1;
  };
  //Convert English Numbers To Persian Numbers
  convertEnToPe = number => {
    if (number == null || number == undefined) return "";
    if (typeof number == "number") number = number.toString();
    let res = "";
    for (let i = 0; i < number.length; i++) {
      if (number[i] === "\u0030") res += "\u06F0";
      else if (number[i] === "\u0031") res += "\u06F1";
      else if (number[i] === "\u0032") res += "\u06F2";
      else if (number[i] === "\u0033") res += "\u06F3";
      else if (number[i] === "\u0034") res += "\u06F4";
      else if (number[i] === "\u0035") res += "\u06F5";
      else if (number[i] === "\u0036") res += "\u06F6";
      else if (number[i] === "\u0037") res += "\u06F7";
      else if (number[i] === "\u0038") res += "\u06F8";
      else if (number[i] === "\u0039") res += "\u06F9";
      else res += number[i];
    }
    return res;
  };
  //Convert Persian Numbers To English Numbers
  convertPeToEn = number => {
    if (number == null || number == undefined) return "";
    let res = "";
    for (let i = 0; i < number.length; i++) {
      if (number[i] === "\u06F0") res += "\u0030";
      else if (number[i] === "\u06F1") res += "\u0031";
      else if (number[i] === "\u06F2") res += "\u0032";
      else if (number[i] === "\u06F3") res += "\u0033";
      else if (number[i] === "\u06F4") res += "\u0034";
      else if (number[i] === "\u06F5") res += "\u0035";
      else if (number[i] === "\u06F6") res += "\u0036";
      else if (number[i] === "\u06F7") res += "\u0037";
      else if (number[i] === "\u06F8") res += "\u0038";
      else if (number[i] === "\u06F9") res += "\u0039";
      else res += number[i];
    }
    return res;
  };
})();
