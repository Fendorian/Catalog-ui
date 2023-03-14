window.addEventListener("load", () => {
  window.setTimeout(() => {
    let sideNavTransition = document.querySelector(".side-nav");
    sideNavTransition.style.transform = "translateX(250px)";
  }, 1000);
});
function toggleDisplay(id) {
  let divs = document.getElementsByClassName("content");
  let menuItems = document.getElementsByClassName("menu-item");
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].id == id) {
      divs[i].style.display = "block";
      if (id != "home") {
        document.getElementById("home").style.display = "none";
      }
    } else {
      divs[i].style.display = "none";
    }
  }
  if (id == "home") {
    document.getElementById("home").style.display = "block";
  }
  for (var i = 0; i < menuItems.length; i++) {

    if (menuItems[i].dataset.target === id) {
      menuItems[i].classList.add("selected");
    } else {
      menuItems[i].classList.remove("selected");
    }
  }
}