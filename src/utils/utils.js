export const objLen = (obj) => {
  // return the length of an object
  // https://stackoverflow.com/questions/5223/length-of-a-javascript-object
  let size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

export const cap = (str) => {
  // capitalise string
  return str.charAt(0).toUpperCase() + str.slice(1);
};
