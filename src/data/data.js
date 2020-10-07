let dataset = [];

const Data = function (obj) {
  this.quantity = 0;
  for (var i in obj) this[i] = obj[i];
  dataset.push(this);
};

// FOOD
new Data({
  name: "fruit",
  type: "foodstuff",
  desc: "Delicious fruit, harvested from a generous wild.",
  icon: 10,
  quantity: 5,
});

new Data({
  name: "vegetables",
  type: "foodstuff",
  desc: "Nutritious and versatile.",
  icon: 11,
});

new Data({
  name: "sticks",
  type: "material",
  desc: "Useful for all sorts of things",
  icon: 12,
});

new Data({
  name: "golden orb",
  type: "arcane",
  desc: "A shiny golden orb. Good for all sorts of magic!",
  quantity: 10,
});

new Data({
  name: "Tom Smith",
  type: "what",
  desc: "this is tom's res",
  quantity: 20,
});
export default dataset;
