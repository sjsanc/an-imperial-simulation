let dataset = [];

const Data = function (obj) {
  this.quantity = 0;
  for (var i in obj) this[i] = obj[i];
  dataset.push(this);
};

// FOOD
new Data({
  name: "fruit",
  type: "food",
});

new Data({
  name: "vegetables",
  type: "food",
});

new Data({
  name: "sticks",
  type: "material",
});

export default dataset;
