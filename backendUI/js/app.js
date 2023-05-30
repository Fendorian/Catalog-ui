// import { Product } from "./models/product.js";
class Product {
  constructor(itemID, name, abstract, desc, price, categoryID, imageUrl, specIDs, values) {
    this.itemID = itemID;
    this.name = name;
    this.abstract = abstract;
    this.desc = desc;
    this.price = price;
    this.categoryID = categoryID;
    this.imageUrl = imageUrl;
    this.specs = specIDs.map((specID, i) => {
      return { specID: specID, value: values[i] };
    });
  }
}

// Run this function when the page is loaded
window.onload = function() {
  fetch('http://localhost/Catalog/api/Products/GetAllCategories')
    .then(response => response.json())
    .then(categories => {
      const categoryIDElement = document.getElementById('CreateCategoryID');
      categories.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category.CategoryID;
        optionElement.textContent = category.CategoryName;
        categoryIDElement.appendChild(optionElement);
      });
    });
}

function handleCategoryChange() {
  const categoryIDElement = document.getElementById('CreateCategoryID');
  const selectedCategoryID = categoryIDElement.value;

  fetch(`http://localhost/Catalog/api/Products/GetSpecForCategory/${selectedCategoryID}`)
    .then(response => response.json())
    .then(specialCategories => {
      const categorySpecificInputs = document.getElementById('categorySpecificInputs');
      categorySpecificInputs.innerHTML = '';  // Clear existing special category inputs

      specialCategories.forEach(specialCategory => {
        const labelElement = document.createElement('label');
        labelElement.htmlFor = `SpecialCategory${specialCategory.SpecCatID}`;
        labelElement.textContent = specialCategory.SpecialCategoryName;

        const inputElement = document.createElement('input');
        inputElement.id = `SpecialCategory${specialCategory.SpecCatID}`;
        inputElement.type = 'text';

        categorySpecificInputs.appendChild(labelElement);
        categorySpecificInputs.appendChild(inputElement);
      });
    });
}

// Initiating class product
function createItem() {
  const name = document.getElementById("CreateName").value;
  const abstract = document.getElementById("CreateAbstract").value;
  const desc = document.getElementById("CreateDescription").value;
  const price = document.getElementById("CreatePrice").value;
  const categoryID = document.getElementById("CreateCategoryID").value;
  const imageUrl = document.getElementById("CreateImageUrl").value;
  const specIDs = [];
  const values = [];

  const categorySpecificInputs = document.getElementById('categorySpecificInputs');
  const inputs = categorySpecificInputs.getElementsByTagName('input');
  for(let i=0; i<inputs.length; i++){
    specIDs.push(inputs[i].id.replace('SpecialCategory', ''));
    values.push(inputs[i].value);
  }

  const product = new Product(0, name, abstract, desc, price, categoryID, imageUrl, specIDs, values);
  console.log(product);

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.open("POST", "http://localhost/Catalog/api/Products/CreateItem2", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.setRequestHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  xhr.setRequestHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  xhr.send(JSON.stringify(product));
  alert('item added successfully');
}



// document
//   .getElementById("create-item-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     createItem();
//   });
document.getElementById("createItemButton").addEventListener("click", createItem);

// Ovde edit

function deleteItem(id) {
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "http://localhost/Catalog/api/Products/DeleteItem/" + id);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.setRequestHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  xhr.setRequestHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Item deleted successfully.");
    } else if (xhr.status === 404) {
      console.log("Item not found.");
    } else {
      console.log("Error deleting item.");
    }
  };
  xhr.send();
}

/* ovo je za posle */
// function getSideNav() {
//     fetch("sidenav.html").then(response =>
//         response.text()
//     ).then(data => {
//         document.querySelector('.side-nav-component').innerHTML = data;

//     })
// }

function logout() {
  // Delete all cookies
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  
  // Redirect to index.html
  window.location.href = 'login.html';
}