const DateTime = luxon.DateTime;

let cart = [];
const shippingTotal = 2000;
const rayoShipping = 4500;

const shippingTime = 7;
const rayoTime = 2;

const txtSubtotal = document.querySelector("#txtSubtotal");
const txtShipping = document.querySelector("#txtShipping");

const today = DateTime.local();

async function LoadPage() {

  const products = await JSON.parse(localStorage.getItem("shoppingCart"));

  if(products != ""){
    products.forEach(product => {
      cart.push(product)
      CreateCartCard(product.id, product.name, product.category, product.description, product.image, product.price, product.quantity)
    });
  }

  if(products.length <= 0){
    Redirection()
  }
  
  txtShipping.textContent = `$${ToPeso(shippingTotal)}`;
  txtShipping.setAttribute("shipping", shippingTotal);
  
  totalShoppingCart();
}

LoadPage();

const inputShipping = document.querySelectorAll("input[name='shipping']");

if(inputShipping){

  inputShipping.forEach(input => {

    input.addEventListener("click", (e) => {

      if(e.target.id === "shippingYes"){

        txtShipping.textContent = `$${ToPeso(shippingTotal)}`;
        txtShipping.setAttribute("shipping", shippingTotal);
      
      }else if(e.target.id === "shippingFast"){

        txtShipping.textContent = `$${ToPeso(rayoShipping)}`;
        txtShipping.setAttribute("shipping", rayoShipping);
      
      }else{

        txtShipping.textContent = `$${ToPeso(0)}`;
        txtShipping.setAttribute("shipping", 0);

      }

      UpdateOrder();

    })

  });
  
}

const form = document.querySelector("#checkoutForm");

if(form){

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#inputName").value;
    const lastname = document.querySelector("#inputLastname").value;
    const phone = document.querySelector("#inputPhone").value;
    const email = document.querySelector("#inputEmail").value;
    const province = document.querySelector("#inputProvince").value;
    const location = document.querySelector("#inputLocation").value;
    const cp = document.querySelector("#inputPC").value;

    const cardFullname = document.querySelector("#inputCardName").value;
    const cardNumber = document.querySelector("#inputCardNumber").value;
    const cardDate = document.querySelector("#inputCardDate").value;
    const cardCode = document.querySelector("#inputCardCode").value;

    const total = document.querySelector("#txtTotal").getAttribute("total");

    if(name && lastname && phone && email && province && location && cp && cardFullname && cardNumber && cardDate && cardCode){

      Swal.fire({
        title: `${name}`,
        html: 
        `Deseas finalizar tu compra?<br>` +
        `Total a abonar: $${ToPeso(total)}<br>` + 
        `Enviaremos el pedido a: ${location}, ${province} (${cp})`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "No estoy seguro"
      }).then(result => {
        if(result.isConfirmed){

          form.reset();
          localStorage.removeItem("shoppingCart")
          
          Swal.fire({
            title: `Gracias ${name}`,
            text: "Muchas gracias por tu compra",
            icon: "success",
            confirmButtonText: "Aceptar",
          }).then(() => {
            Redirection();
          })

        }
      })

    }else{
      showAlert("Atención", "Completa todos los campos para finalizar la compra", "warning");
    }
   
  })
}

let cleave = new Cleave('#inputCardNumber', {
  creditCard: true
});

let cleave2 = new Cleave('#inputCardDate', {
  date: true,
  datePattern: ["m", "y"]
});