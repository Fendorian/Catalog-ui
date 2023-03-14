const items = document.querySelectorAll(".products-card");
let overlay = null;

items.forEach((item) => {
  item.addEventListener("click", function () {
    // Remove selected class from all items
    items.forEach((item) => {
      item.classList.remove("selected");
    });
    // Add selected class to clicked item
    this.classList.add("selected");
    // Create a new overlay or show the existing one
    if (!overlay) {
      const product = new Product(
        "path/to/image.jpg",
        "Dell",
        "Laptopovi",
        "Delete"
      );
      const html = `
          <div class="overlay">
            <div class="single-component">
              <div class="picture-container">
                <img src="${product.image}" alt="">
              </div>
              <div class="product-title">${product.name}</div>
              <div class="product-category">${product.category}</div>
              <div class="product-delete">${product.deleteText}</div>
            </div>
          </div>
        `;
      overlay = document.createElement("div");
      overlay.innerHTML = html;
      document.body.appendChild(overlay);
    } else {
      overlay.style.display = "block";
    }
  });
});

// Kreira overlay za single prikaz
document.addEventListener("click", (event) => {
  if (event.target.matches(".overlay")) {
    event.target.style.display = "none";
    event.target.querySelector("div").style.display = "none";
    overlay = null;
  }
});
// Creating new item
function generateProductCard(product) {
  return `
    <div class="products-card">
      <div class="picture-container">
        <img src="${product.image}" alt="">
      </div>
      <div class="product-title">${product.name}</div>
      <div class="product-category">${product.category}</div>
    </div>
  `;
}
