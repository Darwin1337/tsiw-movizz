function  extenseWriting(arr) {
  let resultString = "";
  for (let i = 0; i < arr.length; i++) {
    if (i == arr.length - 1 && arr.length > 1) {
      resultString = resultString.slice(0, -2);
      resultString += " and " + (arr[i].name ? arr[i].name : arr[i]);
    } else {
      resultString += arr.length > 1 ? (arr[i].name ? arr[i].name : arr[i]) + ", " : arr[i].name ? arr[i].name : arr[i];
    }
  }
  return resultString;
}
module.exports = extenseWriting;