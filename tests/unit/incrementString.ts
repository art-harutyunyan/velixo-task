export function incrementString(str: string): string {
  const regExString = /^([A-Za-z]{1,4})(\d{1,4})$/.exec(str);
  if (!regExString) return "Error";

  const strArr: string[] = [];
  const numArr: string[] = [];
  for (let char of str) {
    let x = char.charCodeAt(0);
    if ((x >= 65 && x <= 90) || (x >= 97 && x <= 122)) {
      strArr.push(char);
    } else if (x >= 48 && x <= 57) {
      numArr.push(char);
    }
  }

  let result = (parseInt(numArr.join("")) + 1).toString().split("");

  if (result.length > numArr.length) {
    result.shift();
  } else {
    while (result.length != numArr.length) {
      result.unshift("0");
    }
  }
  return `${strArr.join("")}${result.join("")}`;
}
