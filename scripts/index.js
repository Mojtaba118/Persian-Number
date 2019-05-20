let convert = document.getElementById("convert");
let result = document.getElementById("result");
convert.addEventListener("click", function(e) {
  e.preventDefault();
  let number = document.getElementById("number").value;
  result.innerHTML = PN.convert(number) + "</br>";
  result.innerHTML += PN.sliceNumber(number) + "</br>";
  result.innerHTML += PN.convertEnToPe(number) + "</br>";
  result.innerHTML += PN.convertPeToEn(PN.convertEnToPe(number)) + "</br>";
  result.innerHTML += PN.convertEnToPe(PN.sliceNumber(number)) + "</br>";
});
