import { Product } from "./models/product.js";
import { Category } from "./models/category.js";
const url = `http://localhost/Catalog/api`;

const productsCardSelector = ".products-card";
const threeDotsSvgSelector = ".three-dots-svg";
const categoryIdSelector = ".category-id";
const productIdSelector = ".product-id";

function toggleDisplay(element) {
  element.style.display = element.style.display === "flex" ? "none" : "flex";
}

function renderOverlay(product) {
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
  const overlay = document.createElement("div");
  overlay.classList.add("overlay-wrapper");
  overlay.innerHTML = html;
  return overlay;
}

function addEventListenerToCards(selector, callback) {
  const items = document.querySelectorAll(selector);
  items.forEach((item) => item.addEventListener("click", callback));
}

export function getPagedItems(pageNumber, pageSize, containerSelector) {
  // ...
}

export function getCategoryById() {
  // ...
}

export function partCategories() {
  // ...
}

export function getCategoryPage() {
  // ...
}

getCategoryPage();
getCategoryById();
getPagedItems(1, 3, ".products-card-container");
getPagedItems(1, 3, ".products-card-filter");

addEventListenerToCards(productsCardSelector, function (event) {
  if (event.target.classList.contains(threeDotsSvgSelector.slice(1))) {
    toggleDisplay(document.querySelector(".dropdown"));
    return;
  }

  const items = document.querySelectorAll(productsCardSelector);
  items.forEach((item) => item.classList.remove("selected"));
  this.classList.add("selected");
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
const filterContainer = document.querySelector(".products-card-filter");

[productsContainer, filterContainer].forEach((container) =>
  container.addEventListener("click", function (event) {
    const productCard = event.target.closest(productsCardSelector);
    if (productCard) {
      const productId = productCard.querySelector(productIdSelector).textContent;
      getItemById(productId);
    }
  })
);
