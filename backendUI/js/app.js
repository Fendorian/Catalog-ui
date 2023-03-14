class Product {
  constructor(imageUrl, name, category, abstract, price, desc) {
    this.name = name;
    this.category = category;
    this.abstract = abstract;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
function createItem() {
  const name = document.getElementById("CreateName").value;
  const abstract = document.getElementById("CreateAbstract").value;
  const desc = document.getElementById("CreateDescription").value;
  const price = document.getElementById("CreatePrice").value;
  const imageUrl = document.getElementById("CreateImageUrl").value;
  const categoryID = document.getElementById("CreateCategoryID").value;

  const product = new Product(
    imageUrl,
    name,
    categoryID,
    desc,
    abstract,
    price
  );

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
  xhr.open("POST", "http://localhost/Catalog/api/Products/CreateItem", true);
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
}

document
  .getElementById("create-item-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    createItem();
  });

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
