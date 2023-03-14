window.addEventListener('load', () => {
  window.setTimeout(() => {
    let sideNavTransition = document.querySelector('.side-nav');
    sideNavTransition.style.transform = "translateX(250px)";  
  }, 1000); 
});

function productsComponent(){
  let productComponent = document.querySelector('.product-component');
  productComponent.style.display = 'block';
  console.log("Ovo je product component");
  let hideHomeComponent = document.querySelector('.content-wrapper');
  hideHomeComponent.style.display = 'none';
  let selectHover = document.querySelector('.products-link');
  selectHover.style.backgroundColor = 'green';
};
function showCreateForm() {

}

function categoryComponent(){
  console.log("Ovo je category component");
};

function subCategoryComponent(){
  console.log("Ovo je subcategory component");
};