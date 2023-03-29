import { Product } from "./models/product.js";
import { Category } from "./models/category.js";
const url = `http://localhost/Catalog/api`

// let threeDots = document.querySelectorAll(".three-dots-svg");
let overlay = null;
let newDiv = null;

export function getPagedItems(pageNumber, pageSize, containerSelector, categoryId = null) {
  let xhr = new XMLHttpRequest();
  let requestUrl = `${url}/Products/GetPagedProducts?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (categoryId) {
    requestUrl = `${url}/Products/GetItemByCategory?categoryId=${categoryId}`;
  }
  xhr.open("GET", requestUrl);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      console.log('API response data:', data);
      let products = data.Table.map((item) => new Product(
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
export function getAllCategories() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost/Catalog/api/Category/GetAllCategories`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      let categories = data.Table.map((category) => new Category(
        category.CategoryID,
        category.CategoryName
      ));

        // Generate select element with options
        let selectElement = document.createElement("select");
        selectElement.setAttribute("id", "CreateCategoryID");
        selectElement.setAttribute("name", "CreateCategoryID");
  

        categories.forEach((category) => {
          let optionElement = document.createElement("option");
          optionElement.setAttribute("value", category.categoryID);
          optionElement.textContent = category.categoryName;
          selectElement.appendChild(optionElement);
        });
  
        // Insert select element before category container
        let categorySelect = document.querySelector(
          "#CreateCategoryID"
        );
        categorySelect.insertAdjacentElement("beforebegin", selectElement);
  

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

  
  let cardWrapper = document.createElement('div');
  cardWrapper.innerHTML = categoryCard.trim();
  let cardElement = cardWrapper.firstChild;
 console.log(cardElement);
  cardElement.addEventListener('click', () => {
    console.log(category.categoryID);
    getPagedItems(1, 7, '.products-card-container', category.categoryID);
  });

  categoryContainer.appendChild(cardElement);
        categoryContainer.insertAdjacentHTML("beforeend", categoryCard);
      });
    } else {
      console.error("Error fetching items:", xhr.status);
    }
  };
  xhr.send();
}
export function getItemByCategory() {
  let xhr = new XMLHttpRequest();
  let requestUrl = `${url}/Products/GetItemByCategory?categoryId=${categoryId}`;

  xhr.open("GET", requestUrl);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      console.log('API response data:', data);
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
   // Get All categories card
   let allCategoriesCard = `
   <div class="category-card all-categories">
     <div class="thumb-image">
        <img src="path/to/default/image.jpg" alt="" />
     </div>
     <div class="category-name">All categories</div>
     <div style="display:none" class="category-id">all</div>
   </div>
 `;


      categoryFilter.insertAdjacentHTML("beforeend", allCategoriesCard);

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
getAllCategories();

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
export function deleteItem(itemID) {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", `${url}/Products/DeleteItem?id=${itemID}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Item deleted successfully");
      // Refresh the list of items or close the single display
    } else {
      console.error("Error deleting item:", xhr.status);
    }
  };
  xhr.send();
}
export function getItemById(id) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost/Catalog/api/Products/GetItemById/${id}`);
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
            <img class="cross" src="/images/corss.svg">
            </div>
              <div class="picture-container">
                <img class="product-picture" src="/images/products/${product.imageUrl}" alt="">
              </div>
              <div class="product-title">${product.name}</div>
              <div class="product-category">${product.categoryID}</div>
              <div class="product-abstract">${product.abstract}</div>
              <div class="product-price">${product.price}</div>
              <div data-item-id="${product.itemID}" class="product-delete">
              <img src="/images/delete.svg">
              </div>
              
            </div>
          </div>
        `;
      overlay = document.createElement("div");
      overlay.classList.add("overlay-wrapper");
      overlay.innerHTML = html;
      newDiv = overlay.querySelector(".single-component");
      document.body.appendChild(overlay);

      document.querySelector(".product-delete").addEventListener("click", function (event) {
        const itemID = event.currentTarget.getAttribute("data-item-id");
        deleteItem(itemID);});
    } else {
      console.error("Error fetching item:", xhr.status);
    }
  };
  xhr.send();
}
let productsContainer = document.querySelector(".products-card-container");
productsContainer.addEventListener("click", function(event) {
  // Check if the clicked element is a product card
  let productCard = event.target.closest(".products-card");
  if (productCard) {
    // Get the id of the clicked product card from the product-id class
    let productId = productCard.querySelector(".product-id").textContent;
    // Call the getItemById function with the productId
    getItemById(productId);
  }
});
let filterContainer = document.querySelector('.products-card-filter');
filterContainer.addEventListener('click', (event) =>{
  let productCard = event.target.closest(".products-card");
  if (productCard){
    let productId = productCard.querySelector(".product-id").textContent;
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


// Pagination
document.addEventListener("DOMContentLoaded", () => {
  const pageNumberLinks = document.querySelectorAll(".page-number");
  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");

  pageNumberLinks.forEach((link) =>
    link.addEventListener("click", handlePageNumberClick)
  );
  arrowLeft.addEventListener("click", handleArrowLeftClick);
  arrowRight.addEventListener("click", handleArrowRightClick);

  // Initialize the first page
  getPagedItems(1, 7, ".products-card-container", null);
  // nije dobra praksa, treba menjati
  getPagedItems(1, 7, ".products-card-filter", null);
});

let currentPage = 1;

function handlePageNumberClick(event) {
  event.preventDefault();
  const newPage = parseInt(event.target.textContent);
  changePage(newPage);
}

function handleArrowLeftClick(event) {
  event.preventDefault();
  if (currentPage > 1) {
    changePage(currentPage - 1);
  }
}

function handleArrowRightClick(event) {
  event.preventDefault();
  const lastPage = parseInt(
    document.querySelector(".page-numbers").lastElementChild.textContent
  );
  if (currentPage < lastPage) {
    changePage(currentPage + 1);
  }
}

function changePage(newPage) {
  // Update the currentPage variable
  currentPage = newPage;

  // Remove the active class from the current active page number
  document
    .querySelector(".page-number.active")
    .classList.remove("active");

  // Add the active class to the new active page number
  document
    .querySelector(`.page-number:nth-child(${newPage})`)
    .classList.add("active");

  // Fetch the items for the new page
  getPagedItems(currentPage, 7, ".products-card-container", null);
}



// Category input

let submitCategory = document.querySelector('.submit-adding-category');
submitCategory.addEventListener('click', function submitCategory() {
  let categoryName = document.getElementById('CategoryName').value;
  console.log(categoryName);
  fetch(url + `/Category/CreateCategory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      categoryName: categoryName
    })
  })
  .then(response => response.json())
  .then(category => {
    console.log(`Kategorija ${category} uspesno dodata`);
  
    // Reset form
    document.querySelector('#add-category-form').classList.add('hidden');
    document.querySelector('#CategoryName').value = '';
  })
  .catch(error => console.error(error));
});

// Get categoryById
export function getCategoryById(categoryID) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost/Catalog/api/Category/GetCategoryById/` + categoryID);
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
// getCategoryById(9);

let categorySelect = document.getElementById('CreateCategoryID');
