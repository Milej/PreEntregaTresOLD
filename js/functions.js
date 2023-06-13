// Crea una card
function CreateCard(id, name, category, description, imageName, price, stock){

  const container = document.querySelector("#productsContainer");

  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("product", id);

  card.innerHTML += `
  <img src="./img/productos/${imageName}" class="card__image">
  <div class="card-body">
    <h5 class="card-body__title">$ ${toPeso(price)}</h5>
    <p class="card-body__text">${name}</p>
  </div>
  <div class="card-footer">
    <button class="button button--success" onclick="addToCart(this)">Agregar al carrito</button>
  </div>
  `;

  container.appendChild(card)
} 

// Crea card para el carrito
function CreateCartCard(id, name, category, description, imageName, price, quantity){

  const container = document.querySelector("#shoppingCart");

  const card = document.createElement("div");
  card.className = "cart-card";
  card.setAttribute("product", id);

  card.innerHTML += `
  <img src="./img/productos/${imageName}" class="cart-card__img">
        
  <span class="cart-card__name">${name}</span>
  
  <span class="cart-card__price">$ ${toPeso(price)}</span>
  
  <div class="cart-card__buttons">
    <button class="button button--info btnSubstract">-</button>
    <span class="cart-card__quantity">${quantity}</span>
    <button class="button button--info btnAdd">+</button>
  </div>
  <button class="button button--wrong" onclick="deleteProduct(this)"><span class="material-symbols-outlined">
    delete
    </span></button>
  `;

  container.appendChild(card)
} 

// Convierte a moneda
const toPeso = (value) => new Intl.NumberFormat("es-AR").format(value);

// Actualiza la cantidad de productos
const updateQuantity = (dom, value) => {
  const txtFilterQuantity = document.querySelector(dom);
  txtFilterQuantity.textContent = value.toString();
}

// Borra las cards
const deleteProducts = () => document.querySelector("#productsContainer").innerHTML = "";

// Actualiza la cantidad de todas las categorias
const updateCategoriesQuantities = () => {
  updateQuantity("#txtAlimentos", categoryAlimentos)
  updateQuantity("#txtSnacks", categorySnacks)
  updateQuantity("#txtPaseos", categoryPaseos)
  updateQuantity("#txtJuguetes", categoryJuguetes)
  updateQuantity("#txtCamas", categoryCamas)
}

function searchByPrice() {

  deleteProducts();

  const input = document.querySelector("#inputPriceRange");
  const price = (input.value * maxPrice) / 100;
  const findProducts = products.filter(product => product.price <= price)
  findProducts.forEach(product => Card(product.id, product.name, product.category, product.description, product.image, product.price, product.stock));
  updateQuantity("#filterQuantity", Number(findProducts.length))

}

function changeFilterRange(){
  
  const input = document.querySelector("#inputPriceRange");
  const txtCurrent = document.querySelector('#currentPrice');
  const price = (input.value * maxPrice) / 100;

  txtCurrent.textContent = price.toString();

}

function searchByCategory(button){

  deleteProducts();

  const category = button.getAttribute("category");
  const findProducts = products.filter(product => product.category === category)
  findProducts.forEach(product => Card(product.id, product.name, product.category, product.description, product.image, product.price, product.stock));
  updateQuantity("#filterQuantity", Number(findProducts.length))

}

const searchByID = (id, array) => array.find(product => product.id === Number(id));

function addToCart(productCard){

  const id = productCard.parentElement.parentElement.getAttribute("product");
  const productInCart = searchByID(id, cart);
  const product = searchByID(id, products);

  // Si el producto es undefined es porque no está en el carrito todavía, sino se le agrega 1
  if(productInCart === undefined){
    
    if(product.stock > 0){
      
      product.quantity = 1;
      cart.push(product)
      CreateCartCard(product.id, product.name, product.category, product.description, product.image, product.price, product.quantity)

      // localStorage.setItem("shoppingCart", JSON.stringify(cart))

      showAlert("Bien", `Has agregado ${product.name} al carrito`, "success")

    }else{

      showAlert("Error", `No puedes agregar el producto, porque ya no tenemos este articulo disponible`, "info");
    }

  }else{

    const existentProduct = searchByID(id, cart);
    
    if(product.stock > existentProduct.quantity){
      existentProduct.quantity++;
      showAlert("Bien", `Has agregado ${product.name} al carrito`, "success")
      
    }else{

      showAlert("Error", `No puedes agregar el producto, porque ya no tenemos este articulo disponible`, "info");
    }

    
  }

  localStorage.setItem("shoppingCart", JSON.stringify(cart))

  updateCartNumber();

}

function showAlert(title, message, icon){
  Swal.fire(
    title,
    message,
    icon
  )
}

function updateCartNumber(){

  const productsInCart = cart.length;
  const cartItems = document.querySelector("#cartItems");

  if(productsInCart > 0 || getShoppingCart > 0){
    cartItems.style.visibility = "visible"
    cartItems.textContent = productsInCart.toString();
  }else{
    cartItems.style.visibility = "hidden";
  }

  totalShoppingCart()
}

function toggleCart(){
  const cart = document.querySelector("#cart")

  if(openCart){

    cart.className = "cart close";

    setTimeout(() => {
      openCart = false;
    }, 1000);
  
  }else{
    cart.className = "cart open";

    setTimeout(() => {
      openCart = true;
    }, 1000);
  }
}

function deleteProduct(input){
  
  const id = input.parentElement.parentElement.getAttribute("product");

  const product = cart.find(product => product.id === Number(id))

  console.log(product)
  
}

function totalShoppingCart(){
  const total = cart.reduce( (accum, product) => accum + product.price, 0)
  const txtTotal = document.querySelector("#txtTotalCart");

  txtTotal.textContent = `$${toPeso(total)}`;
}

function deleteAll(){
  cart = [];
  localStorage.setItem("shoppingCart", JSON.stringify(cart))
  document.querySelector("#shoppingCart").innerHTML = "";

  updateCartNumber()
}