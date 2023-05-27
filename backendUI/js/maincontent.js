import { Product } from "./models/product.js";
import { Category } from "./models/category.js";
const url = `http://localhost/Catalog/api`
let currentCategory = null; // Initialize it outside any function
  document.addEventListener("DOMContentLoaded", function() {
    // Check if a token exists in the cookies
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    
    if (!tokenCookie || !JSON.parse(decodeURIComponent(tokenCookie.split('=')[1])).token) {
      // If a token does not exist, redirect to login.html
      window.location.href = 'login.html';
    }
  });

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
      productsContainer.innerHTML = '';

      if (products && products.length > 0) {
        productsContainer.innerHTML = `
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>Name</th>
                <th>Category Name</th>
                <th>Abstract</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="products-body">
            </tbody>
          </table>
        `;

        let productsBody = document.querySelector("#products-body");
        products.forEach((product) => {
          let productRow = `
            <tr class="product-row products-card">
              <td><input type="checkbox" class="product-select" value="${product.itemID}" /></td>
              <td>${product.itemID}</td>
              <td class="product-name">${product.name}</td>
              <td>${product.categoryID}</td>
              <td>${product.abstract}</td>
              <td>
                <div class="three-dots-for-crud" id="three-dots-for-crud-${product.itemID}" onclick="showDropdown(event)">
                  <img class="three-dots-svg" src="/images/elipsis.svg" alt="" />
                  <div class="dropdown">
                    <a href="#" data-item-id="${product.itemID}" class="view-product">View</a>
                    <a href="#">Edit</a>
                    <a href="#">Delete</a>
                  </div>
                </div>
              </td>
            </tr>
          `;
          productsBody.insertAdjacentHTML("beforeend", productRow);
        });

        let productNames = document.querySelectorAll(".product-name");
        productNames.forEach((nameCell, index) => {
          let currentProduct = products[index]; // capture current product in the closure
          nameCell.addEventListener("click", function() {
            getItemById(currentProduct.itemID);
          });
        });

        let productRowElements = document.querySelectorAll(".product-row");
        productRowElements.forEach((row, index) => {
          let currentProduct = products[index]; 
          setTimeout(() => {
            document.getElementById(`three-dots-for-crud-${currentProduct.itemID}`).addEventListener('click', showDropdown);
          }, 0);
        });
      } else {
        productsContainer.innerHTML = `<div class="empty-category-message">You don't have any items in this category.</div>`;
      }
    } else {
      console.error("Error fetching items:", xhr.status);
    }
  };
  xhr.send();
}



// Three dots solution
window.showDropdown = function(event) {
  event.stopPropagation();
  let dropdown = event.currentTarget.querySelector('.dropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'flex' : 'none';
};
export function showDropdown(event) {
  event.stopPropagation();
  let dropdown = event.target.querySelector('.dropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'flex' : 'none';
}


let currentPage = 1;
let totalItemsCount;

// Function to initialize pagination based on total items count
function initializePagination() {
  let totalPages = Math.ceil(totalItemsCount / 7);
  
  let paginationContainer = document.querySelector('.pagination .page-numbers');
  paginationContainer.innerHTML = '';
  
  for (let i = 1; i <= totalPages; i++) {
    let pageElement = document.createElement('a');
    pageElement.href = '#';
    pageElement.classList.add('page-number');
    if (i === 1) pageElement.classList.add('active');
    pageElement.textContent = i;
    pageElement.addEventListener('click', handlePageNumberClick);
    paginationContainer.appendChild(pageElement);
  }
  
  let arrowLeft = document.querySelector(".arrow-left");
  let arrowRight = document.querySelector(".arrow-right");

  if (totalPages <= 1) {
    arrowLeft.style.display = "none";
    arrowRight.style.display = "none";
  } else {
    arrowLeft.style.display = "";
    arrowRight.style.display = "";
    arrowLeft.addEventListener("click", handleArrowLeftClick);
    arrowRight.addEventListener("click", handleArrowRightClick);
  }
}

// Function to fetch the total items count from the backend
function getTotalItemsCount() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}/Products/GetTotalItemsCount`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      totalItemsCount = parseInt(xhr.responseText);
      initializePagination();
      getPagedItems(currentPage, 7, ".products-card-container", currentCategory);
    } else {
      console.error("Error fetching total items count:", xhr.status);
    }
  };
  xhr.send();
}

// Call this function once the document has loaded
document.addEventListener("DOMContentLoaded", getTotalItemsCount);

// Get all categories
// export function getAllCategories() {
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", `${url}/Category/GetAllCategories`);
//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       let data = JSON.parse(xhr.responseText);
//       let categories = data.Table.map((category) => new Category(
//         category.CategoryID,
//         category.CategoryName
//       ));
//                 // Reference to the existing select element
//                 let selectElement = document.querySelector("#CreateCategoryID");

//                 categories.forEach((category) => {
//                   let optionElement = document.createElement("option");
//                   optionElement.setAttribute("value", category.categoryID);
//                   optionElement.textContent = category.categoryName;
//                   selectElement.appendChild(optionElement);
//                 });
        
  
//         // Insert select element before category container
//         let categorySelect = document.querySelector(
//           "#CreateCategoryID"
//         );
//         categorySelect.insertAdjacentElement("beforebegin", selectElement);
  

//       // Loop through the products and do something with each one
//       let categoryContainer = document.querySelector(
//         ".category-card-container"
//       );
//       categoryContainer.innerHTML = '';

//       categories.forEach((category) => {
//         let categoryCard = `
//     <div class="category-card">
//     <div style="display:none" class="product-id">${category.itemID}</div>
//       <div class="thumb-image">
//          <img src="${category.ImageUrl}" alt="" />
//       </div>
//       <div class="category-name">${category.categoryName}</div>
//       <div style="display:none" class="category-id">${category.categoryID}</div>
//     </div>
//   `;

//   let currentCategory = null;
//   // Get items with clicked category
//   let cardWrapper = document.createElement('div');
//   cardWrapper.innerHTML = categoryCard.trim();
//   let cardElement = cardWrapper.firstChild;
//  console.log(cardElement);
//   cardElement.addEventListener('click', () => {
//     console.log(category.categoryID);
//     currentCategory = category.categoryID;
//     getPagedItems(1, 7, '.products-card-container', currentCategory);
//   });

//   categoryContainer.appendChild(cardElement);
//       });
//     } else {
//       console.error("Error fetching items:", xhr.status);
//     }
//   };
//   xhr.send();
// }
export function getAllCategories() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}/Category/GetAllCategories`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      let categories = data.Table.map((category) => new Category(
        category.CategoryID,
        category.CategoryName
      ));

      let selectElement = document.querySelector("#CreateCategoryID");

      // Create "All Items" category
      let allItemsOptionElement = document.createElement("option");
      allItemsOptionElement.setAttribute("value", "");
      allItemsOptionElement.textContent = "All Items";
      selectElement.appendChild(allItemsOptionElement);

      categories.forEach((category) => {
        let optionElement = document.createElement("option");
        optionElement.setAttribute("value", category.categoryID);
        optionElement.textContent = category.categoryName;
        selectElement.appendChild(optionElement);
      });

      let categorySelect = document.querySelector(
        "#CreateCategoryID"
      );
      categorySelect.insertAdjacentElement("beforebegin", selectElement);

      let categoryContainer = document.querySelector(
        ".category-card-container"
      );
      categoryContainer.innerHTML = '';

      // Create "All Items" card
      let allItemsCard = document.createElement('div');
      allItemsCard.classList.add("category-card");
      allItemsCard.innerHTML = `
        <div class="thumb-image">
          <img src="/default_image_path" alt="" /> <!-- Replace with a path to a default image -->
        </div>
        <div class="category-name">All Items</div>
      `;
      allItemsCard.addEventListener('click', () => {
        getPagedItems(1, 7, '.products-card-container', null);
      });
      categoryContainer.appendChild(allItemsCard);

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

        let currentCategory = null;
        let cardWrapper = document.createElement('div');
        cardWrapper.innerHTML = categoryCard.trim();
        let cardElement = cardWrapper.firstChild;
        cardElement.addEventListener('click', () => {
          currentCategory = category.categoryID;
          getPagedItems(1, 7, '.products-card-container', currentCategory);
        });

        categoryContainer.appendChild(cardElement);
      });
    } else {
      console.error("Error fetching items:", xhr.status);
    }
  };
  xhr.send();
}

export function getItemByCategory(categoryId, containerSelector) {
  let xhr = new XMLHttpRequest();
  let requestUrl = `${url}/Products/GetItemByCategory?categoryId=${categoryId}`;

  xhr.open("GET", requestUrl);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      let productsContainer = document.querySelector(containerSelector);
      productsContainer.innerHTML = '';

      if (data && data.length > 0) { 
        let products = data.map((item) => new Product(
          item.ItemID,
          item.Name,
          item.Abstract,
          item.Desc,
          item.Price,
          item.CategoryID,
          item.ImageUrl
        ));

        let tableHead = `
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category Name</th>
              <th>Abstract</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="products-body">
          </tbody>
        </table>
      `;

        productsContainer.insertAdjacentHTML("beforeend", tableHead);
        let productsBody = document.querySelector("#products-body");

        products.forEach((product) => {
          let productCard = `
            <tr class="products-card">
              <td><input type="checkbox" class="product-select" value="${product.itemID}" /></td>
              <td>${product.itemID}</td>
              <td class="product-name">${product.name}</td>
              <td>${product.categoryID}</td>
              <td>${product.abstract}</td>
              <td>
                <div class="three-dots-for-crud" id="three-dots-for-crud-${product.itemID}" onclick="showDropdown(event)">
                  <img class="three-dots-svg" src="/images/elipsis.svg" alt="" />
                  <div class="dropdown">
                    <a href="#" data-item-id="${product.itemID}" class="view-product">View</a>
                    <a href="#">Edit</a>
                    <a href="#">Delete</a>
                  </div>
                </div>
              </td>
            </tr>
          `;
          productsBody.insertAdjacentHTML("beforeend", productCard);
        });

        // add click event to name cell
        let productNames = document.querySelectorAll(".product-name");
        productNames.forEach((nameCell, index) => {
          let currentProduct = products[index]; // capture current product in the closure
          nameCell.addEventListener("click", function() {
            getItemById(currentProduct.itemID);
          });
        });
      } else {
        productsContainer.innerHTML = `
          <div class="empty-category-message">
            You don't have any items in this category.
          </div>
        `;
      }
    } else {
      console.error("Error fetching items:", xhr.status);
    }
  };
  xhr.send();
}



function onProductContainerClick(event) {
  // Check if clicked element or its parent has the "view-product" class
  if (event.target.classList.contains("view-product") || event.target.parentNode.classList.contains("view-product")) {
    const itemId = event.target.getAttribute("data-item-id");
    console.log(itemId);
    getItemById(itemId);
  }
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
  xhr.open("GET", `${url}/Category/GetAllCategories`);
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

export function deleteItem(itemID) {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", `${url}/Products/DeleteItem?id=${itemID}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Item deleted successfully");
      location.reload();
      // Refresh the list of items or close the single display
    } else {
      console.error("Error deleting item:", xhr.status);
    }
  };
  xhr.send();
}
export function getItemById(id) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}/Products/GetItemById/${id}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      console.log('Received data:', data);
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

      // Add click event listener to the cross image
      overlay.querySelector(".cross").addEventListener("click", function() {
        overlay.remove();
        overlay = null;
        newDiv = null;
      });

      document.querySelector(".product-delete").addEventListener("click", function (event) {
        const itemID = event.currentTarget.getAttribute("data-item-id");
        if (confirm("Are you sure you want to delete this item?")) {
          deleteItem(itemID);
        }
      });
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
// let filterContainer = document.querySelector('.products-card-filter');
// filterContainer.addEventListener('click', (event) =>{
//   let productCard = event.target.closest(".products-card");
//   if (productCard){
//     let productId = productCard.querySelector(".product-id").textContent;
//     // Call the getItemById function with the productId
//     getItemById(productId);
//   }
// })
let filterContainer = document.querySelector('.products-card-filter');
filterContainer.addEventListener('click', (event) =>{
  console.log("test");
  let productCard = event.target.closest(".products-card");
  if (productCard){
    let productId = productCard.children[1].textContent; // children[1] selects the second <td> element where the ID is located.
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
    productComponentForm.style.height = "60%";
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
    categoryComponentForm.style.height = "60%";
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
    productComponentForm.style.height = "60%";
    console.log('radi1');
  } else {
    productComponentForm.style.height = "0";
    setTimeout(() => {
      productComponentForm.classList.add("hidden");
    }, 500);
    console.log('radi2');
  }
});

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
  getPagedItems(1, 7, ".products-card-container", currentCategory);
  // nije dobra praksa, treba menjati
  getPagedItems(1, 7, ".products-card-filter", currentCategory);

  document.addEventListener('click', (event) =>{
    let productCard = event.target.closest(".product-row");
    if (productCard && productCard.closest('.products-card-filter')){
      let productId = productCard.children[1].textContent; // children[1] selects the second <td> element where the ID is located.
      // Call the getItemById function with the productId
      getItemById(productId);
    }
  })

});



function handlePageNumberClick(event) {
  event.preventDefault();
  const newPage = parseInt(event.target.textContent);
  changePage(newPage, currentCategory);
}

function handleArrowLeftClick(event) {
  event.preventDefault();
  if (currentPage > 1) {
    changePage(currentPage - 1, currentCategory);
  }
}

function handleArrowRightClick(event) {
  event.preventDefault();
  const lastPage = parseInt(
    document.querySelector(".page-numbers").lastElementChild.textContent
  );
  if (currentPage < lastPage) {
    changePage(currentPage + 1, currentCategory);
  }
}

function changePage(newPage, categoryId) {
  // Update the currentPage variable
  currentPage = newPage;
  currentCategory = categoryId;

  // Remove the active class from the current active page number
  document
    .querySelector(".page-number.active")
    .classList.remove("active");

  // Add the active class to the new active page number
  document
    .querySelector(`.page-number:nth-child(${newPage})`)
    .classList.add("active");

  // Fetch the items for the new page
  getPagedItems(currentPage, 7, ".products-card-container", currentCategory);
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
  xhr.open("GET", `${url}/Category/GetCategoryById/` + categoryID);
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
let categorySelect = document.getElementById('CreateCategoryID');

