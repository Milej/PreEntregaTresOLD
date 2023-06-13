// Muestra el menu con las categorias
// const showCategories = document.querySelector("#showCategories");
// showCategories.addEventListener("click", () => {
//   document.querySelector("#categoriesList").classList.toggle("show");
// })

// Array de objetos productos
const products = JSON.parse(`[
  {
  "id": 1,
  "name": "Cat Chow Adulto Carne Y Pollo X 15 Kg",
  "category": "Alimento",
  "description": "Purina Cat Chow Defense Plus + es un alimento 100% balanceado y completo, con prebiótico natural, sin colorantes ni sabores artificiales, indicado para gato adulto a partir de 1 año de edad. Su fórmula refuerza la protección del tracto urinario y ayuda a reducir la acumulación de sarro, cuidando la piel y manteniendo su pelo saludable. Sabor a carne.",
  "image": "alimentos/alimento-catchow-cyp-gato.webp",
  "price": 19500,
  "stock": 10
  },
  {
    "id": 2,
    "name": "Cat Chow Adulto Pescado Y Pollo X 15 Kg",
    "category": "Alimento",
    "description": "Purina Cat Chow Defense Plus + es un alimento 100% balanceado y completo, con prebiótico natural, sin colorantes ni sabores artificiales, indicado para gato adulto a partir de 1 año de edad. Su fórmula refuerza la protección del tracto urinario y ayuda a reducir la acumulación de sarro, cuidando la piel y manteniendo su pelo saludable. Sabor a pescado.",
    "image": "alimentos/alimento-catchow-pyp-gato.webp",
    "price": 19500,
    "stock": 5
  },
  {
    "id": 3,
    "name": "Excellent Smart Gatito Pollo Y Arroz 7.5 Kg",
    "category": "Alimento",
    "description": "Purina Excellent Kitten Smart ofrece una alimentación completa y balanceada para tu gato durante su primer año de vida. Su fórmula está basada en proteínas de alta digestibilidad, esenciales para un correcto desarrollo estructural de sus músculos. Además, aporta ácidos grasos Omega 3 y 6, vitaminas y minerales en su justa proporción para promover la salud de su piel, su pelo y sus huesos.",
    "image": "alimentos/alimento-purina-pya-kitten.webp",
    "price": 17900,
    "stock": 3
  },
  {
    "id": 4,
    "name": "Sieger Gato Katze Kitten X 7.5 Kg",
    "category": "Alimento",
    "description": "Durante los primeros meses de vida, los gatitos se encuentran expuestos a agentes externos que pueden causarles diferentes patologías. Una nutrición específica es clave. Darle un alimento balanceado que lo proteja y que le aporte todos los nutrientes es primordial para que crezca y se desarrolle de manera saludable. Sieger Katze Kitten está especialmente formulado con L- Lisina para ayudar al gatito a fortalecer su sistema inmunológico y con DHA (ácido Omega 3) que promueve el óptimo desarrollo del cerebro y la visión.",
    "image": "alimentos/alimento-sieger-kitten.webp",
    "price": 14500,
    "stock": 3
  },
  {
    "id": 5,
    "name": "Royal Canin Gatito 36 X 7.5 Kg",
    "category": "Alimento",
    "description": "Royal Canin Kitten 36 es un alimento balanceado para gatitos hasta los 12 meses de edad (2° fase de crecimiento). Contribuye a una seguridad digestiva reforzada, el refuerzo de las defensas naturales, la reducción del olor fecal y el formato de sus croquetas se adaptan a la dentición definitiva del gatito. Ideado para proteger el sistema de defensas en los gatos más pequeños. Su contenido proteíco produce una mejor digestibilidad a la hora de su ingesta.",
    "image": "alimentos/alimento-royalcanin-kitten.webp",
    "price": 28000,
    "stock": 3
  },
  {
    "id": 6,
    "name": "Tiritas Blandas Raza Gatos Sabor Carne X 50 Gr",
    "category": "Snacks",
    "description": "El mejor alimento para tu mascota al mejor precio",
    "image": "snacks/tiritas-raza-gato.webp",
    "price": 360,
    "stock": 100
  },
  {
    "id": 7,
    "name": "Tiritas Blandas Raza Gatos Sabor Carne X 50 Gr",
    "category": "Snacks",
    "description": "Raza tiritas blandas sabor carne es una golosina rica y novedosa de excelente sabor, ideal para premiar todos los días a tu gato. Además, es fuente de calcio que contribuye a mejorar el cuidado de los huesos.",
    "image": "snacks/tiritas-raza-gato.webp",
    "price": 360,
    "stock": 100
  },
  {
    "id": 8,
    "name": "Purina Dentalife Perros Razas Gde X 196 Grs",
    "category": "Snacks",
    "description": "Purina Dentalife es un snack ideal para el cuidado diario de la salud oral de tu perro adulto de raza grande. Hecho de ingredientes saludables, sin colorantes ni sabores artificiales, sabor a pollo con textura porosa y fácil de masticar, lo que ayuda a limpiar los dientes en lugares difíciles de alcanzar llegando a la encía. Reduce la acumulación de sarro y refresca el aliento. Está especialmente diseñado para que tu mascota lo disfrute al máximo. Sus principales ingredientes son: arroz, harina de trigo, glicerina, harina de cebada malteada, harina de subproductos de pollo, fosfato mono y dicálcico, ácido sórbico (como conservador), propionato de calcio (como conservador), bicarbonato de sodio, BHA (como conservador), BHT (como conservador), carbonato de calcio, ácido cítrico.",
    "image": "snacks/dentalife-purina-perro.webp",
    "price": 1185,
    "stock": 25
  },
  {
    "id": 9,
    "name": "Dental Care Golomiau X 60 Grs",
    "category": "Snacks",
    "description": "Dental Care Golomiau por 60 grs es una golosina deliciosa sabor pollo para gatos adultos desde el destete en adelante. Gracia a sus ingredientes y textura mantendrá los dientes de tu gato limpios y libres de sarro.",
    "image": "snacks/dentalcare-golomiau.jpg",
    "price": 605,
    "stock": 10
  },
  {
    "id": 10,
    "name": "Bocaditos Golocan Carne, Pollo Y Chocolate X 100 G",
    "category": "Snacks",
    "description": "Sabrosos bocaditos húmedos, de consistencia soft y blanda. Se trata de un mix de tres tipos de bocaditos hechos a base de carne, pollo y trigo con aroma a chocolate, lo cual resulta delicioso pero también nutritivo para el perro. Su uso permite reemplazar galletitas, golosinas dulces y otros productos de consumo humano no aptos para perros.",
    "image": "snacks/bocaditos-golocan.webp",
    "price": 465,
    "stock": 40
  },
  {
    "id": 11,
    "name": "Mini Bocaditos Bajo En Grasas X 100 Gr",
    "category": "Snacks",
    "description": "El mejor alimento para tu mascota al mejor precio",
    "image": "snacks/mini-bocaditos-golocan.webp",
    "price": 500,
    "stock": 35
  },
  {
    "id": 12,
    "name": "Snack Natuplus Pescado Perro/Gato Balde X 100 Grs",
    "category": "Snacks",
    "description": "Snacks liofilizados con alto valor nutricional (70% proteínas) con sabor original a hígado y de fácil digestión. Con la misma tecnología utilizada en el alimento para astronautas (iofilización) y materia prima de alta calidad, como la comemos en nuestras casaas. Se le pueden dar a todos los animales de compañía: perros, gatos, hurones, erizos y hámsteres. Mejora el aliento. La carne no se pega a los dientes. Favorece la digestión ante la ausencia de harinas y el bajo nivel de fibras.",
    "image": "snacks/snack-natuplus.webp",
    "price": 3840,
    "stock": 20
  },
  {
    "id": 12,
    "name": "Collar",
    "category": "Paseos",
    "description": "Snacks liofilizados con alto valor nutricional (70% proteínas) con sabor original a hígado y de fácil digestión. Con la misma tecnología utilizada en el alimento para astronautas (iofilización) y materia prima de alta calidad, como la comemos en nuestras casaas. Se le pueden dar a todos los animales de compañía: perros, gatos, hurones, erizos y hámsteres. Mejora el aliento. La carne no se pega a los dientes. Favorece la digestión ante la ausencia de harinas y el bajo nivel de fibras.",
    "image": "snacks/snack-natuplus.webp",
    "price": 105000,
    "stock": 20
  }
]`)

// Array de productos en el carrito
let cart = [];

let openCart = false;

// Agregar la cantidad de productos al texto del dom
updateQuantity("#filterQuantity", Number(products.length));

// Crea todas las cards de productos en el dom
products.forEach(product => CreateCard(product.id, product.name, product.category, product.description, product.image, product.price, product.stock));

// Obtiene las categorias
let categories = [];
let categoryAlimentos = 0; 
let categorySnacks = 0; 
let categoryPaseos = 0;
let categoryJuguetes = 0;
let categoryCamas = 0;
let maxPrice = 0;
let minPrice = 0;

for (let i = 0; i < products.length; i++) {
  
  !categories.find( item => item === products[i].category) ? categories.push(products[i].category) : false;
  
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

//Asigna los rangos del filtro de precio
const inputPriceRange = document.querySelector("#inputPriceRange");
inputPriceRange.value = maxPrice;
const txtMaxPrice = document.querySelector("#maxPrice");
txtMaxPrice.textContent = maxPrice.toString();

// Filtro precio
inputPriceRange.addEventListener("mousemove", () => changeFilterRange())
inputPriceRange.addEventListener("click", () => changeFilterRange())
inputPriceRange.addEventListener("mouseup", () => searchByPrice())

// Busqueda de producto
const inputSearch = document.querySelector("#inputSearch");
inputSearch.addEventListener("keyup", () => {

  deleteProducts();

  // Busca por expresion regular, lo que sería el valor que introduce el usuario
  const value = inputSearch.value;
  const expresion = new RegExp(`${value}.*`, "i")
  const findProducts = products.filter(product => expresion.test(product.name))
  
  findProducts.forEach(product => Card(product.id, product.name, product.category, product.description, product.image, product.price, product.stock));
  updateQuantity("#filterQuantity", Number(findProducts.length))

})

// Actualiza la cantidad por categoria
updateCategoriesQuantities();

// Dibujo el carrito con los lados del localstorage
const getShoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

if(getShoppingCart != ""){
  
  // getShoppingCart.forEach(product => );
  getShoppingCart.forEach(product => {
    cart.push(product)
    CreateCartCard(product.id, product.name, product.category, product.description, product.image, product.price, product.quantity)
  })

  updateCartNumber();
}