let Dataset = [];

const Data = function (obj) {
  this.quanity = 0;
  for (var i in obj) this[i] = obj[i];
  Dataset.push(this);
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

export default Dataset;
