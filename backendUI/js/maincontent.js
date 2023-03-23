import { Product } from "./models/product.js";
import { Category } from "./models/category.js";
const url = `http://localhost/Catalog/api`

// let threeDots = document.querySelectorAll(".three-dots-svg");
let overlay = null;
let newDiv = null;

export function getPagedItems(pageNumber, pageSize, containerSelector) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}/Products/GetPagedProducts?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);

      let products = data.map((item) => new Product(
        item.ItemID,
        item.Name,
        item.Abstract,
        item.Desc,
        item.Price,
        item.CategoryID,
        item.ImageUrl
      ));

      let productsContainer = document.querySelector(containerSelector);
      console.log(productsContainer);
      productsContainer.innerHTML = '';

      products.forEach((product) => {
        let productCard = `
          <div class="products-card">
            <div style="display:none" class="product-id">${product.itemID}</div>
            <div class="thumb-image">
              <img src="${product.ImageUrl}" alt="" />
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-category">${product.categoryID}</div>
            <div class="three-dots-for-crud" id="three-dots-for-crud">
              <img class="three-dots-svg" src="/images/elipsis.svg" alt="" />
              <div class="dropdown">
                <a href="#">View</a>
                <a href="#">Edit</a>
                <a href="#">Delete</a>
              </div>
            </div>
          </div>
        `;
        productsContainer.insertAdjacentHTML("beforeend", productCard);
      });
    } else {
      console.error("Error fetching items:", xhr.status);
    }
  };
  xhr.send();
}

// Get all categories
export function getCategoryById() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost/Catalog/api/Category/GetAllCategories`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      let categories = data.Table.map((category) => new Category(
        category.CategoryID,
        category.CategoryName
      ));

      // Loop through the products and do something with each one
      let categoryContainer = document.querySelector(
        ".category-card-container"
      );
      categoryContainer.innerHTML = '';

      categories.forEach((category) => {
        let categoryCard = `
    <div class="category-card">
    <div style="display:none" class="product-id">${category.itemID}</div>
      <div class="thumb-image">
         <img src="${category.ImageUrl}" alt="" />
      </div>
      <div class="category-name">${category.categoryName}</div>
      <div style="display:none" class="category-id">${category.categoryID}</div>
    </div>
  `;
        categoryContainer.insertAdjacentHTML("beforeend", categoryCard);
      });
    } else {
      console.error("Error fetching items:", xhr.status);
    }
  };
  xhr.send();
}

// Selected categories
export function partCategories() {
  let categoryCards = document.querySelectorAll(".category-card");
  // add click event listener to each category card element
  categoryCards.forEach(card => {
    card.addEventListener("click", () => {
      // remove the 'selected' class from any previously selected card
      const previouslySelected = document.querySelector(".category-card.selected");
      if (previouslySelected) {
        previouslySelected.classList.remove("selected");
      }

      // add the 'selected' class to the clicked card
      card.classList.add("selected");
    });
  });
}
// Get category on side
export function getCategoryPage() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost/Catalog/api/Category/GetAllCategories`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      let categories = data.Table.map((category) => new Category(
        category.CategoryID,
        category.CategoryName
      ));

      // Loop through the products and do something with each one
      let categoryFilter = document.querySelector(
        ".category-filter"
      );
      categoryFilter.innerHTML = '';

      

      categories.forEach((category) => {
        let categoryCard = `
    <div class="category-card">
    <div style="display:none" class="product-id">${category.itemID}</div>
      <div class="thumb-image">
         <img src="${category.ImageUrl}" alt="" />
      </div>
      <div class="category-name">${category.categoryName}</div>
      <div style="display:none" class="category-id">${category.categoryID}</div>
    </div>
  `;
        categoryFilter.insertAdjacentHTML("beforeend", categoryCard);
      });

      partCategories();
    } else {
      console.error("Error fetching items:", xhr.status);
    }
  };
  xhr.send();
}
getCategoryPage();
getCategoryById();
getPagedItems(1,3, '.products-card-container');
getPagedItems(1,3, '.products-card-filter');
let items = document.querySelectorAll(".products-card");

// Add an event listener to the products container
items.forEach((item, index) => {
  item.addEventListener("click", function (event) {
    // Check if the clicked element is the .three-dots-svg element
    if (event.target.classList.contains("three-dots-svg")) {
      // Execute a different function for the .three-dots-svg element
      let moreDetails = document.querySelector('.dropdown');
      if (moreDetails.style.display === "flex") {
        moreDetails.style.display = "none";
      } else {
        moreDetails.style.display = "flex";
      }
      return;
    }

    // Remove selected class from all items
    items.forEach((item) => {
      item.classList.remove("selected");
    });
    // Add selected class to clicked item
    this.classList.add("selected");
  });
});

export function getItemById(id) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost/Catalog/api/Products/GetItemById?id=${id}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      let item = data.Table[0];

      let product = new Product(
         item.ItemID,
         item.Name,
         item.Abstract,
         item.Desc,
         item.Price,
         item.CategoryID,
         item.ImageUrl
        
      );

      const html = `
          <div class="overlay">
            <div class="single-component">
            <div class="cross-svg">
            <img class="cross" src="/images/cross.svg">
            </div>
              <div class="picture-container">
                <img src="${product.imageUrl}" alt="">
              </div>
              <div class="product-title">${product.name}</div>
              <div class="product-category">${product.categoryID}</div>
              <div class="product-delete">${product.price}</div>
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
      console.error("Error fetching item:", xhr.status);
    }
  };
  xhr.send();
}
const productsContainer = document.querySelector(".products-card-container");
productsContainer.addEventListener("click", function(event) {
  // Check if the clicked element is a product card
  const productCard = event.target.closest(".products-card");
  if (productCard) {
    // Get the id of the clicked product card from the product-id class
    const productId = productCard.querySelector(".product-id").textContent;
    // Call the getItemById function with the productId
    getItemById(productId);
  }
});
let filterContainer = document.querySelector('.products-card-filter');
filterContainer.addEventListener('click', (event) =>{
  const productCard = event.target.closest(".products-card");
  if (productCard){
    const productId = productCard.querySelector(".product-id").textContent;
    // Call the getItemById function with the productId
    getItemById(productId);
  }
})
// Event listener to close the overlay when clicking outside of it or pressing ESC key
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    overlay.remove();
    overlay = null;
    newDiv = null;
  }
});

// Event listener to close the overlay when clicking outside of it or pressing ESC key
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    // overlay.remove();
    overlay = null;
    newDiv = null;
  }
});

// Toggle add product
let productComponentForm = document.querySelector(".product-component-form");
let addProductButton = document.querySelector(".add-product");
let categoryComponentForm = document.querySelector(".category-component-form");
let addCategoryButton = document.querySelector(".add-category");
let cancelButton = document.querySelector(".cancel-button");
// Hide the product-component-form on page load
productComponentForm.style.overflow = "hidden";
productComponentForm.style.height = "0";

categoryComponentForm.style.overflow = "hidden";
categoryComponentForm.style.height = "0";


addProductButton.addEventListener("click", () => {
  if (productComponentForm.classList.contains("hidden")) {
    productComponentForm.classList.remove("hidden");
    productComponentForm.style.transition = "height 0.5s ease-in-out";
    productComponentForm.style.height = "100%";
  } else {
    productComponentForm.style.height = "0";
    setTimeout(() => {
      productComponentForm.classList.add("hidden");
    }, 500);
  }
});

addCategoryButton.addEventListener("click", () => {
  if (categoryComponentForm.classList.contains("hidden")) {
    categoryComponentForm.classList.remove("hidden");
    categoryComponentForm.style.transition = "height 0.5s ease-in-out";
    categoryComponentForm.style.height = "100%";
  } else {
    categoryComponentForm.style.height = "0";
    setTimeout(() => {
      categoryComponentForm.classList.add("hidden");
    }, 500);
  }
});
cancelButton.addEventListener("click", () => {
  if (productComponentForm.classList.contains("hidden")) {
    productComponentForm.classList.remove("hidden");
    productComponentForm.style.transition = "height 0.5s ease-in-out";
    productComponentForm.style.height = "100%";
    console.log('radi1');
  } else {
    productComponentForm.style.height = "0";
    setTimeout(() => {
      productComponentForm.classList.add("hidden");
    }, 500);
    console.log('radi2');
  }
});


// Search function
