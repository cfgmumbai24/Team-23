const { faker } = require("@faker-js/faker");
const { default: mongoose } = require("mongoose");
const fs = require("fs");

const generateFakerData = () => {
  const users = [];

  // Generate admin user
  users.push({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "password123", // use a consistent password for simplicity
    accessLevel: 1,
    parentId: null,
  });

  // Generate manager user
  const adminId = faker.string.uuid(); // Simulate an admin user ID
  users.push({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "password123",
    accessLevel: 2,
    parentId: adminId,
  });

  // Generate regular user
  const managerId = faker.string.uuid(); // Simulate a manager user ID
  users.push({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "password123",
    accessLevel: 3,
    parentId: managerId,
  });

  return users;
};

const generateProductData = () => {
  return {
    images: [faker.image.url(), faker.image.url()],
    category: faker.helpers.arrayElement(["1", "2", "3", "4", "5", "6"]),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    length: faker.number.float({ min: 10, max: 100 }),
    breadth: faker.number.float({ min: 10, max: 100 }),
    weight: faker.number.float({ min: 1, max: 50 }),
    unitCost: faker.number.int({ min: 10, max: 1000 }),
    timeToMake: faker.number.int({ min: 1, max: 72 }), // In hours
    status: faker.datatype.boolean(),
    quantity: faker.number.int({ min: 1, max: 100 }),
    color: faker.color.human(),
    creatorId: new mongoose.Types.ObjectId().toString(),
    localId: new mongoose.Types.ObjectId().toString(),
    keywords: [],
  };
};

const generateProduct = () => {
  // Generate and add products
  const products = [];
  for (let i = 0; i < 10; i++) {
    const productData = generateProductData();
    products.push(productData);
  }
  console.log(products);
  return products;
};

// Replace with the path to your JSON file
const filePath = `${__dirname}/dataset.json`;

// Read and parse the JSON file
const exampleData = JSON.parse(fs.readFileSync(filePath, "utf8"));
const generateSKU = (name, length, breadth, color) => {
  const namePart = name.substring(0, 3).toUpperCase();
  const lengthPart = length.toFixed(0);
  const breadthPart = breadth.toFixed(0);
  const colorPart = color.substring(0, 3).toUpperCase();
  return `${namePart}${lengthPart}${breadthPart}${colorPart}`;
};

const convertToProductSchema = (data) => {
  const { details } = data;

  // Generate random values for length, breadth, and color
  const length = faker.number.float({ min: 10, max: 100 });
  const breadth = faker.number.float({ min: 10, max: 100 });
  const color = faker.color.human();

  // Generate SKU based on the product details
  const skuId = generateSKU(details.name, length, breadth, color);
  return {
    skuId,
    images: details.images,
    category: faker.helpers.arrayElement(["1", "2", "3", "4", "5", "6"]),
    title: details.name,
    description: details.description,
    length: faker.number.float({ min: 10, max: 100 }),
    breadth: faker.number.float({ min: 10, max: 100 }),
    weight: faker.number.float({ min: 1, max: 50 }),
    unitCost:
      parseFloat(details.price.replace(/[^\d.-]/g, "")) ||
      faker.number.int({ min: 10, max: 1000 }),
    timeToMake: faker.number.int({ min: 1, max: 72 }), // In hours
    status: parseInt(details.stock) > 0,
    quantity: parseInt(details.stock),
    color: faker.color.human(),
    creatorId: new mongoose.Types.ObjectId().toString(),
    localId: new mongoose.Types.ObjectId().toString(),
    keywords: [],
  };
};

const transformedData = exampleData.filter((index) => {
  if (index / 2 === 0) {
    convertToProductSchema;
  }
});

// Output transformed data (for example, to console or save to a new file)

// Optionally, save the transformed data to a new JSON file
// const outputFilePath = "path/to/your/transformed_products.json";
// fs.writeFileSync(outputFilePath, JSON.stringify(transformedData, null, 2));

const fakerData = generateFakerData();

module.exports = { generateProduct, generateProductData, transformedData };
