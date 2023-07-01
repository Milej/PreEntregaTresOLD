//Asigna los rangos del filtro de precio
const inputPriceRange = document.querySelector("#inputPriceRange");
const txtMaxPrice = document.querySelector("#maxPrice");

// Obtiene las categorias
let categories = [];
let categoryAlimentos = 0; 
let categorySnacks = 0; 
let categoryPaseos = 0;
let categoryJuguetes = 0;
let categoryCamas = 0;
let maxPrice = 0;

// Array de productos en el carrito
let cart = [];

// Flag para el carrito
let openCart = false;

const Start = async() => {

  const products = await GetProducts();

  //Crea todas las cards de productos en el dom
  products.forEach(product => {
    CreateCard(product.id, product.name, product.category, product.description, product.image, product.price, product.price);
  });

  for (let i = 0; i < products.length; i++) {
    
    !categories.find( item => item === products[i].category) 
      ? categories.push(products[i].category) 
      : false;
    
    products[i].category == "Alimento" ? categoryAlimentos++ : false;
    products[i].category == "Snacks" ? categorySnacks++ : false;
    products[i].category == "Paseos" ? categoryPaseos++ : false;
    products[i].category == "Juguetes" ? categoryJuguetes++ : false;
    products[i].category == "Camas" ? categoryCamas++ : false;

    // Busca el precio maximo
    if(products[i].price > maxPrice){
      maxPrice = products[i].price
      const price = products.find(item => item.price >= maxPrice);
      maxPrice = Number(price.price);
    }
  }

  inputPriceRange.value = maxPrice;  
  txtMaxPrice.textContent = maxPrice.toString();

  // Agregar la cantidad de productos al texto del dom
  UpdateQuantity("#filterQuantity", Number(products.length));

  // Actualiza la cantidad por categoria
  UpdateCategoriesQuantities();
}
Start();

// Filtro precio
inputPriceRange.addEventListener("mousemove", () => ChangeFilterRange())
inputPriceRange.addEventListener("click", () => ChangeFilterRange())
inputPriceRange.addEventListener("mouseup", () => SearchByPrice())

// Busqueda de producto
const inputSearch = document.querySelector("#inputSearch");
inputSearch.addEventListener("keyup", async () => {

  DeleteProducts();

  const products = await GetProducts();

  // Busca por expresion regular, lo que sería el valor que introduce el usuario
  const value = inputSearch.value;
  const expresion = new RegExp(`${value}.*`, "i")
  const findProducts = products.filter(product => expresion.test(product.name))
  
  findProducts.forEach(product => CreateCard(product.id, product.name, product.category, product.description, product.image, product.price, product.stock));
  UpdateQuantity("#filterQuantity", Number(findProducts.length))

})

// Dibujo el carrito con los datos del localstorage
const getShoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

if(getShoppingCart != ""){
  
  getShoppingCart.forEach(product => {
    cart.push(product)
    CreateCartCard(product.id, product.name, product.category, product.description, product.image, product.price, product.quantity)
  })

  UpdateCartNumber();
}