class Product {
  constructor(image, name, category,abstract, price,categoryID) {
    this.name = name;
    this.category = category;
    this.abstract = abstract;
    this.image = image;
    this.categoryID = categoryID;
    this.price = price;
  }
}

export { Product };