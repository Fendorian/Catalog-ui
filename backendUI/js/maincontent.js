const items = document.querySelectorAll(".products-card");
let overlay = null;
let newDiv = null;
console.log(Product);
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
      const product = new Product(1,'/image/heart.svg','testName',1,'testAbstract',123,);
      const html = `
          <div class="overlay">
          
            <div class="single-component">
              <div class="picture-container">
                <img src="${product.imageUrl}" alt="">
              </div>
              <div class="product-title">${product.name}</div>
              <div class="product-category">${product.categoryID}</div>
              <div class="product-delete">${product.abstract}</div>
            </div>
          </div>
        `;
      overlay = document.createElement("div");
      overlay.classList.add("overlay-wrapper");
      overlay.innerHTML = html;
      newDiv = overlay.querySelector(".single-component");
      document.body.appendChild(overlay);
    } else {
      overlay.style.display = "block";
    }
  });
});

// Event listener to close the overlay when clicking outside of it or pressing ESC key
document.addEventListener("click", (event) => {
  //  if (overlay && event.target.closest(".overlay-wrapper")) {
    if(event.target.classList.contains("overlay")){
    console.log(event.target);
    overlay.remove();
    overlay = null;
    newDiv = null;
  }
});