

function createItem(item) {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost/Catalog/api/Products/CreateItem";
    xhr.open("POST", url, true);
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
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Item created successfully");
      }
    };

    var data = JSON.stringify(item);
    xhr.send(data);
  }

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
    xhr.onload = function() {
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
  

  var form = document.getElementById("item-form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var newItem = {
      Name: document.getElementById("name").value,
      Abstract: document.getElementById("abstract").value,
      Desc: document.getElementById("desc").value,
      Price: parseInt(document.getElementById("price").value),
      CategoryID: parseInt(document.getElementById("category-id").value),
      ImageUrl: document.getElementById("image-url").value
    };

    createItem(newItem);
  });
function deleteItem() {

}

function getSideNav() {
    fetch("sidenav.html").then(response => 
        response.text()
    ).then(data => {
        document.querySelector('.side-nav-component').innerHTML = data;

    })
}
