// Agregar como hijo una card con los datos del producto
const Card = (id, name, category, description, image, price, stock) => {
    
  const container = document.querySelector("#productsContainer");
  const card = CreateCard(id, name, category, description, image, price, stock);
  
  container.appendChild(card);

}

// Crea una card
function CreateCard(id, name, category, description, imageName, price, stock){

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
    <button class="button button--success" onclick="addToCart()">Agregar al carrito</button>
  </div>
  `;

  return card;
} 

// Convierte a moneda
const toPeso = (value) => new Intl.NumberFormat("es-ES").format(value);

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

let flag = false;
function searchByPrice(input) {
  
  flag = true;

  deleteProducts();

  const txtCurrent = document.querySelector('#currentPrice');
  const price = (input.value * maxPrice) / 100;

  txtCurrent.textContent = price.toString();

  const findProducts = products.filter(product => product.price <= price)
  findProducts.forEach(product => Card(product.id, product.name, product.category, product.description, product.image, product.price, product.stock));
  updateQuantity("#filterQuantity", Number(findProducts.length))

  if(flag) {input.addEventListener("onmousemove", console.log(''))}
  
}

function searchByCategory(button){

  deleteProducts();

  const category = button.getAttribute("category");
  const findProducts = products.filter(product => product.category === category)
  findProducts.forEach(product => Card(product.id, product.name, product.category, product.description, product.image, product.price, product.stock));
  updateQuantity("#filterQuantity", Number(findProducts.length))

}