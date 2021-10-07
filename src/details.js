function changeImage(element) {
  var main_prodcut_image = document.getElementById("main_product_image");
  main_prodcut_image.src = element.src;
}

window.onload = () => {
  let searchParamString = window.location.search;
  const searchParam = new URLSearchParams(searchParamString);

  // console.log(searchParam.get("id"));
  const id = searchParam.get("id");

  const prodURL = "https://6151a65d4a5f22001701d33d.mockapi.io/products/";

  fetch(prodURL)
    .then((response) => response.json())
    .then((data) => displayProd(data));

  function displayProd(data) {
    let output = "";

    data.forEach((product) => {
      if (product.id === id) {
        output += `
          <div class="card">
          <div class="row g-0">
            <div class="col-md-6 border-end">
              <div class="d-flex flex-column justify-content-center">
                <div class="main_image">
                  <img
                    src=${product.picture}
                    id="main_product_image"
                    width="350"
                  />
                </div>
                <div class="thumbnail_images">
                  <ul id="thumbnail">
                    <li>
                      <img
                        onclick="changeImage(this)"
                        src=${product.picture}
                        width="70"
                      />
                    </li>
                    
                    
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 right-side">
                <div class="d-flex justify-content-between align-items-center">
                  <h3>${product.name}</h3>
                  <span class="heart"><i class="bx bx-heart"></i></span>
                </div>
                <div class="mt-2 pr-3 content">
                  <p>
                  ${product.description}
                  </p>
                </div>
                <h3>£${product.price}</h3>
                <div class="ratings d-flex flex-row align-items-center">
                  <div class="d-flex flex-row">
                    <i class="fas fa-star"></i> <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i> <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                  <span>441 reviews</span>
                </div>
                <div class="mt-5">
                  <span class="fw-bold">Colour</span>
                  <div class="colors">
                    <ul id="marker">
                      <li id="marker-1"></li>
                      <li id="marker-2"></li>
                      <li id="marker-3"></li>
                      <li id="marker-4"></li>
                      <li id="marker-5"></li>
                    </ul>
                  </div>
                </div>
                <div class="buttons d-flex flex-row mt-5 gap-3">
                <form>
                <div class="form-group qty">
                  <label for="item-qty">Qty</label>
                  <input type="number" class="form-control" id="item-qty"  placeholder="Enter quantity">
                  
                </div>
                <br>
                  <button class="btn btn-outline-primary addToCartBtn" id="addToCartBtn">Add to Basket</button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
              
            `;
        // console.log(product.id);
        document.getElementById("product").innerHTML = output;
        addToCart(product);

        // update cart icons to show the number of prods
        let cartItems = localStorage.getItem("cart");
        let cart = JSON.parse(cartItems);
        updateCartIcon(cart);
      }
    });
  }

  function addToCart(prod) {
    // iau datele din product si le salvez in prodId array
    let prodId = prod;
    // console.log(prod);

    let cartBtn = document.querySelector(".addToCartBtn");
    // console.log(cartBtn);
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // iau cantitatea sa lucrez cu ea
      // prod.qty -> am creeat o noua cheie care stocheaza valoarea pe care o ia din input
      prodId.qty = document.getElementById("item-qty").value;
      // console.log(prod.qty);

      //  creez cart array gol ca sa-mi stochez obj
      let cart = [];

      // creez variabila pt local storage existent din care sa-mi iau produsele
      let storedCart = localStorage.getItem("cart");

      if (prodId.qty > 0) {
        if (storedCart) {
          cart = JSON.parse(storedCart);
          checkProductExists(cart, prodId.id, prodId);
        } else {
          //and add my product

          cart.push(prodId);

          // alert("Product added to your cart!");
        }
      } else {
        alert("Please add at least one product");
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Product added to your cart!");
    });
  }
};

// functie cu 3 parametri: 1- array with prods from local storage;
// 2 param - id-ul prod din pagina
//  3 param - prod itself

function checkProductExists(cart, id, product) {
  const found = cart.some((product) => product.id === id);

  // check if the prod from the local storage cart[] already exists
  if (found) {
    //  if exists, don't let it to be added to the cart again
    alert("Acest produs exista deja in cos!");
  } else if (!found) {
    // create new item in local storage cart[]
    cart.push(product);
  }

  return cart;
}

//  function to add cart icons
function updateCartIcon(arr) {
  const cartIcon = document.querySelector(".badge");
  if (arr) {
    cartIcon.innerHTML = arr.length;
  }
}
