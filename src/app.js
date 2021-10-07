// GET products

const prodURL = "https://6151a65d4a5f22001701d33d.mockapi.io/products/";

fetch(prodURL)
  .then((response) => response.json())
  .then((data) => {
    let output = "";

    data.forEach((product) => {
      output += `

      <div class="card product-card col-md-3 m-3 col-sm-4 col-xl-3 text-center">
      <!-- Product image-->
      <img class="card-img-top" src=${product.picture} alt=${product.name} />
      <!-- Product details-->
      <div class="card-body p-4">
          <div class="text-center">
              <!-- Product name-->
              <h5 class="prodName">${product.name}</h5>
              <!-- Product price-->
              <h5 class='prodPrice'>£ ${product.price}</h5>
          </div>
      </div>
      <!-- Product actions-->
      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center"><a class="btn btn-outline-primary mt-auto details-btn" href="./details.html?id=${product.id}">Details</a></div>
      </div>
</div>
           
            
         `;
    });
    document.getElementById("products").innerHTML = output;
    // update cart icons to show the number of prods
    let cartItems = localStorage.getItem("cart");
    cart = JSON.parse(cartItems);
    updateCartIcon(cart);
  });

//  function to add cart icons
function updateCartIcon(arr) {
  const cartIcon = document.querySelector(".badge");
  if (arr) {
    cartIcon.innerHTML = arr.length;
  }
}
