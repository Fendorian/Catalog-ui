import { Product } from "./models/product.js";
let items = document.querySelectorAll(".products-card");
// let threeDots = document.querySelectorAll(".three-dots-svg");
let overlay = null;
let newDiv = null;

// export function getItems() {
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", "http://localhost/Catalog/api/Products/GetAllItems");
//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       let data = JSON.parse(xhr.responseText);

//       let products = data.Table.map((item) => new Product(
//         item.ItemID,
//         item.Name,
//         item.Abstract,
//         item.Desc,
//         item.Price,
//         item.CategoryID,
//         item.ImageUrl
//       ));

//       // Loop through the products and do something with each one
//       let productsContainer = document.querySelector(
//         ".products-card-container"
//       );

//       products.forEach((product) => {
//         console.log(product);
//         let productCard = `
//     <div class="products-card">
//     <div style="display:none" class="product-id">${product.itemID}</div>
//       <div class="thumb-image">
//          <img src="${product.ImageUrl}" alt="" />
//       </div>
//       <div class="product-name">${product.name}</div>
//       <div class="product-category">${product.categoryID}</div>
//       <div class="three-dots-for-crud" id="three-dots-for-crud">
//         <img
//           class="three-dots-svg"
//           src="/images/elipsis.svg"
//           alt=""
//         />
//         <div class="dropdown">
//           <a href="#">View</a>
//           <a href="#">Edit</a>
//           <a href="#">Delete</a>
//         </div>
//       </div>
//     </div>
//   `;
//         productsContainer.insertAdjacentHTML("beforeend", productCard);
//       });
//     } else {
//       console.error("Error fetching items:", xhr.status);
//     }
//   };
//   xhr.send();
// }
export function getPagedItems(pageNumber, pageSize) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost/Catalog/api/Products/GetPagedProducts?pageNumber=${pageNumber}&pageSize=${pageSize}`);
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

      // Loop through the products and do something with each one
      let productsContainer = document.querySelector(
        ".products-card-container"
      );
      productsContainer.innerHTML = '';

      products.forEach((product) => {
        console.log(product);
        let productCard = `
    <div class="products-card">
    <div style="display:none" class="product-id">${product.itemID}</div>
      <div class="thumb-image">
         <img src="${product.ImageUrl}" alt="" />
      </div>
      <div class="product-name">${product.name}</div>
      <div class="product-category">${product.categoryID}</div>
      <div class="three-dots-for-crud" id="three-dots-for-crud">
        <img
          class="three-dots-svg"
          src="/images/elipsis.svg"
          alt=""
        />
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
getPagedItems(1,2);
// getItems();
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
    // Create a new overlay or show the existing one
    // if (!overlay) {
    //   // getItems();
    //   const product = new Product(
    //     1,
    //     "/images/heart.svg",
    //     "testName",
    //     1,
    //     "testAbstract",
    //     123
    //   );
    //   const html = `
    //       <div class="overlay">

    //         <div class="single-component">
    //           <div class="picture-container">
    //             <img src="${product.imageUrl}" alt="">
    //           </div>
    //           <div class="product-title">${product.name}</div>
    //           <div class="product-category">${product.categoryID}</div>
    //           <div class="product-delete">${product.abstract}</div>
    //         </div>
    //       </div>
    //     `;
    //   overlay = document.createElement("div");
    //   overlay.classList.add("overlay-wrapper");
    //   overlay.innerHTML = html;
    //   newDiv = overlay.querySelector(".single-component");
    //   document.body.appendChild(overlay);
    // } else {
    //   overlay.style.display = "block";
    // }
  });
});

function getItemById(id) {
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

let productComponentForm = document.querySelector(".product-component-form");
let addProductButton = document.querySelector(".add-product");
let cancelButton = document.querySelector(".cancel-button");
// Hide the product-component-form on page load
productComponentForm.style.overflow = "hidden";
productComponentForm.style.height = "0";

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
cancelButton.addEventListener("click", () => {
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
function partCategories() {
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
partCategories();

