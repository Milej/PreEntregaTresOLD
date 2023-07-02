// Obtenemos los datos del json con una funcion asincrona
const GetProducts = async() => {
  const response = await fetch("./js/products.json");
  return await response.json();
}

// Crea una card
function CreateCard(id, name, category, description, imageName, price, stock){

  const container = document.querySelector("#productsContainer");

  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("product", id);

  card.innerHTML += `
  <img src="./img/productos/${imageName}" class="card__image">
  <div class="card-body">
    <h5 class="card-body__title">$ ${ToPeso(price)}</h5>
    <p class="card-body__text">${name}</p>
  </div>
  <div class="card-footer">
    <button class="button button--success" onclick="AddToCart(this)">Agregar al carrito</button>
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
  
  <span class="cart-card__price">$ ${ToPeso(price)}</span>
  
  <div class="cart-card__buttons">
    <button type="button" class="button button--info" onclick="Substract(this)">-</button>
    <span class="cart-card__quantity">${quantity}</span>
    <button type="button" class="button button--info" onclick="Add(this)">+</button>
  </div>
  <button type="button" class="button button--wrong" onclick="deleteProduct(${id})"><span class="material-symbols-outlined">
    delete
    </span></button>
  `;

  container.appendChild(card)
} 

// Convierte a moneda
const ToPeso = (value) => new Intl.NumberFormat("es-AR").format(value);

// Actualiza la cantidad de productos
const UpdateQuantity = (dom, value) => {
  const txtFilterQuantity = document.querySelector(dom);
  txtFilterQuantity.textContent = value.toString();
}

// Borra las cards
const DeleteProducts = () => document.querySelector("#productsContainer").innerHTML = "";

// Actualiza la cantidad de todas las categorias
const UpdateCategoriesQuantities = () => {
  UpdateQuantity("#txtAlimentos", categoryAlimentos)
  UpdateQuantity("#txtSnacks", categorySnacks)
  UpdateQuantity("#txtPaseos", categoryPaseos)
  UpdateQuantity("#txtJuguetes", categoryJuguetes)
  UpdateQuantity("#txtCamas", categoryCamas)
}

async function SearchByPrice() {

  DeleteProducts();

  const products = await GetProducts();

  const input = document.querySelector("#inputPriceRange");
  const price = (input.value * maxPrice) / 100;
  const findProducts = products.filter(product => product.price <= price)
  findProducts.forEach(product => CreateCard(product.id, product.name, product.category, product.description, product.image, product.price, product.stock));
  UpdateQuantity("#filterQuantity", Number(findProducts.length))

}

function ChangeFilterRange(){
  
  const input = document.querySelector("#inputPriceRange");
  const txtCurrent = document.querySelector('#currentPrice');
  const price = parseInt((input.value * maxPrice) / 100);

  txtCurrent.textContent = price.toString();

}

async function SearchByCategory(button){

  DeleteProducts();

  const products = await GetProducts();

  const category = button.getAttribute("category");
  const findProducts = products.filter(product => product.category === category)
  findProducts.forEach(product => CreateCard(product.id, product.name, product.category, product.description, product.image, product.price, product.stock));
  UpdateQuantity("#filterQuantity", Number(findProducts.length))

}

const SearchByID = (id, array) => array.find(product => product.id === Number(id));

async function AddToCart(productCard){

  const products = await GetProducts();

  const id = productCard.parentElement.parentElement.getAttribute("product");
  const productInCart = SearchByID(id, cart);
  const product = SearchByID(id, products);

  // Si el producto es undefined es porque no está en el carrito todavía, sino se le agrega 1
  if(productInCart === undefined){
    
    if(product.stock > 0){
      
      product.quantity = 1;
      
      cart.push(product)
      CreateCartCard(product.id, product.name, product.category, product.description, product.image, product.price, product.quantity)

      ToastMessage(`Has agregado ${product.name} al carrito`, "success", `./img/productos/${product.image}`);

    }else{

      ToastMessage(`No puedes agregar el producto, porque ya no tenemos este articulo disponible`, "error")
    }

  }else{
    
    if(product.stock > productInCart.quantity){
      productInCart.quantity++;
      ToastMessage(`Has agregado ${product.name} al carrito`, "success", `./img/productos/${product.image}`);
      
    }else{

      ToastMessage(`No puedes agregar el producto, porque ya no tenemos este articulo disponible`, "error")
    }
    
  }

  localStorage.setItem("shoppingCart", JSON.stringify(cart))

  UpdateCart();

}

function ToastMessage(text, type = "success", avatar){
  Toastify({
    avatar,
    text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    className: `toastify--${type}`
  }).showToast();
}

function showAlert(title, message, icon){
  Swal.fire(
    title,
    message,
    icon
  )
}

function UpdateCartNumber(){
  const productsInCart = cart.reduce( (accum, product) => accum + product.quantity, 0)
  const cartItems = document.querySelector("#cartItems");

  if(cartItems){
    if(productsInCart > 0 || getShoppingCart > 0){
      cartItems.style.visibility = "visible"
      cartItems.textContent = productsInCart.toString();
    }else{
      cartItems.style.visibility = "hidden";
    }
  
    totalShoppingCart()
  }
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

function deleteProduct(id){

  Swal.fire({
    title: "Advertencia",
    text: "Seguro que quieres quitar el producto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Quitar producto',
    cancelButtonText: 'Mejor no'
  }).then( result => {
    if(result.isConfirmed){
      cart = cart.filter(product => product.id !== Number(id))

      localStorage.setItem("shoppingCart", JSON.stringify(cart));

      UpdateCart();
    }
  })
  
}

function totalShoppingCart(){
  const total = cart.reduce( (accum, product) => accum + (product.price * product.quantity), 0)
  const txtSubtotal = document.querySelector("#txtSubtotal");

  txtSubtotal.textContent = `$${ToPeso(total)}`;
  txtSubtotal.setAttribute("subtotal", total);

  UpdateOrder();
}

function deleteAll(){
  
  Swal.fire({
    title: "Estás seguro?",
    text: "Vas a vaciar el carrito de compras",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Vaciar carrito',
    cancelButtonText: 'Mejor no'
  }).then( result => {
    if(result.isConfirmed){
      cart = [];
      localStorage.setItem("shoppingCart", JSON.stringify(cart))
      document.querySelector("#shoppingCart").innerHTML = "";
    
      UpdateCart()
    }
  })

}

function UpdateCart(){

  const container = document.querySelector("#shoppingCart");
  container.innerHTML = "";
  const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

  shoppingCart.forEach(product => {
    CreateCartCard(product.id, product.name, product.category, product.description, product.image, product.price, product.quantity)
  })

  UpdateCartNumber();

  totalShoppingCart();

  ShowCartButtons();

  if(shoppingCart.length <= 0 && document.querySelector("#finishOrder")){
    window.location.href = "/"
  }
}

function Substract(e){
  const id = e.parentElement.parentElement.getAttribute("product");

  const product = cart.find(product => product.id === Number(id))
  
  if(product.quantity > 1){
    product.quantity--;
  }else{
    deleteProduct(id);
  }

  localStorage.setItem("shoppingCart", JSON.stringify(cart));

  UpdateCart();
  
}

async function Add(e){
  const id = e.parentElement.parentElement.getAttribute("product");

  const products = await GetProducts();

  const product = cart.find(product => product.id === Number(id))
  const {stock} = SearchByID(id, products);

  if(product.quantity < stock){
    product.quantity++;
  }else{
    ToastMessage(`No puedes agregar el producto, porque ya no tenemos este articulo disponible`, "error")
  }

  localStorage.setItem("shoppingCart", JSON.stringify(cart));

  UpdateCart();
  
}

async function ShowAllProducts(){

  DeleteProducts();

  const products = await GetProducts();

  //Crea todas las cards de productos en el dom
  products.forEach(product => {
    CreateCard(product.id, product.name, product.category, product.description, product.image, product.price, product.price);
  });

  UpdateQuantity("#filterQuantity", Number(products.length));
}

function ShowCartButtons(){

  const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
  const btnRemoveAll = document.querySelector("#btnRemoveAll");
  const btnBuy = document.querySelector("#btnBuy");

  if(btnRemoveAll || btnBuy){

    if(shoppingCart != ""){
      btnRemoveAll.classList.remove("no-show");
      btnBuy.classList.remove("no-show");
    }else{
      btnRemoveAll.classList.add("no-show");
      btnBuy.classList.add("no-show");
    }

  }
  
}

function UpdateOrder(){

  const txtTotal = document.querySelector("#txtTotal");
  const txtShipping = document.querySelector("#txtShipping");
  const txtShippingYes = document.querySelector("#txtShippingYes");
  const txtShippingFast = document.querySelector("#txtShippingFast");

  if(txtShipping){

    const total = Number(txtShipping.getAttribute("shipping")) + Number(txtSubtotal.getAttribute("subtotal"));

    txtTotal.textContent = `$${ToPeso(total)}`;
    txtTotal.setAttribute("total", total);
  
    const arrive = today.plus({days: shippingTime}).toLocaleString();
    txtShippingYes.textContent = `Envío a domicilio (${arrive})`

    const fastArrive = today.plus({days: rayoTime}).toLocaleString();
    txtShippingFast.textContent = `Envío rayo (${fastArrive})`
  }
}