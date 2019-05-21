# Persian-Number
A Library That With It You Can Turn Any Number Into Word (In Persian). 
This Library Supports Decimal Point, Negative Numbers And Percent.

### `persianNumber.js`

Main Library File Is persianNumber.js. Copy It In Your Project The Add It Into Your HTML File. Enjoy :)

### `Functions`

To Use This Library You Can Call All Of It's Function With **PN.functionName();**

#### `PN.convert(number);`

Input: a number as int or float or string

Output: Converted Number To It's Word (string)

Example:
```javascript
PN.convert(123); // صد و بیست و سه
PN.convert(-123.2); // منفی صد و بیست و سه ممیز دو دهم
PN.convert("-123.26%") //منفی صد و بیست و سه ممیز بیست و شش صدم درصد
```

#### `PN.sliceNumber(number,separator=",");`

Input: a number as int or float or string and a separator(Optional) (number should be in english)

Output: The number is separated by three digits of the three digits, then return it. (string)

Example:
```javascript
PN.sliceNumber(12345); // 12,345
```

#### `PN.convertEnToPe(number);`

Input: a number as int or float or string (English  Digits)

Output: returns converted English Digits Into Persian Digits. (string)

Example:
```javascript
PN.convertEnToPe(123); // ۱۲۳
```

#### `PN.convertPeToEn(number);`

Input: a number as string (Persian  Digits)

Output: returns converted Persian Digits Into English Digits. (string)

Example:
```javascript
PN.convertPeToEn("۱۲۳"); // 123
```

`For More Examples See index.js`
