

function processObjectData(obj) {
  let byType = {
    strings: {},
    numbers: {},
    booleans: {}
  };

  let transformed = {};

  for (let key in obj) {
    let value = obj[key];
    let type = typeof value;

    // Filter properties berdasarkan tipe data
    if (type === "string") {
      byType.strings[key] = value;
    } else if (type === "number") {
      byType.numbers[key] = value;
    } else if (type === "boolean") {
      byType.booleans[key] = value;
    }

    // Transform values
    let newKey = key.toUpperCase();
    let newValue;

    if (type === "string") {
      newValue = value.toUpperCase();
    } else if (type === "number") {
      newValue = value * 2;
    } else {
      newValue = value;
    }

    transformed[newKey] = newValue;
  }

  return {
    original: obj,
    byType: byType,
    transformed: transformed
  };
}


let data = {
  name: "Product A",
  price: 100,
  inStock: true,
  category: "Electronics",
  rating: 4.5
};
console.log(processObjectData(data));
