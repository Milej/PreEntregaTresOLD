const products = JSON.parse(localStorage.getItem("shoppingCart"));

if(products != ""){
  products.forEach(product => {
    CreateCartCard(product.id, product.name, product.category, product.description, product.image, product.price, product.quantity)
  });
}