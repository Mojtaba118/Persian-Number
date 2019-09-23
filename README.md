# Persian-Number

A Library that Makes You Able to Convert any Number to Persian Word.
This Library Supports Decimal Point, Negative Numbers and Percent.

### `persianNumber.js`

Main Library File is `./dist/persianNumber.js`. Copy it in Your Project, then Add It into Your HTML File. Enjoy :)

### `With npm`

use `npm i persian-number` or `yarn add persian-number`
then use:

```javascript
const PN = require("persian-number");
```

or you can use:

```javascript
import PN from "persian-number";
```

### `Functions`

To Use This Library You Can Call All of it's Functions using **PN.functionName();**

#### `PN.convert(number);`

Input: a number as int or float or string

Output: Converted Number to it's Word (string)

Example:

```javascript
PN.convert(123); // صد و بیست و سه
PN.convert(-123.2); // منفی صد و بیست و سه ممیز دو دهم
PN.convert("-123.26%"); //منفی صد و بیست و سه ممیز بیست و شش صدم درصد
```

#### `PN.sliceNumber(number,separator=",");`

Input: a number as int or float or string and a separator(Optional) (number should be in english)

Output: The number is separated by three digits of the three digits, then return it. (string)

Example:

```javascript
PN.sliceNumber(12345); // 12,345
```

#### `PN.convertEnToPe(number);`

Input: a number as int or float or string (English Digits)

Output: Returns Converted English Digits into Persian Digits. (string)

Example:

```javascript
PN.convertEnToPe(123); // ۱۲۳
```

#### `PN.convertPeToEn(number);`

Input: a number as string (Persian Digits)

Output: Returns Converted Persian Digits into English Digits. (string)

Example:

```javascript
PN.convertPeToEn("۱۲۳"); // 123
```

`For More Examples See index.js`
