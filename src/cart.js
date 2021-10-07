window.onload = () => {
  //   console.log("here");
  let cart = localStorage.getItem("cart");

  if (cart) {
    const cartObj = JSON.parse(cart);
    let output = `
    
            ${cartObj
              .map(
                (el) =>
                  `
                      <tr class='tableRow'>
                          <td>
                              <div class="product-item">
                                  <a class="product-thumb" href="#"><img src="${
                                    el.picture
                                  }" alt="${el.name}"></a>
                                  <div class="product-info">
                                      <h4 class="product-title"><a href="./details.html?id=${
                                        el.id
                                      }">${el.name}</a>
                                  </div>
                              </div>
                          </td>
                          <td class="text-center">
                              <div class="count-input">
                               <input type="number" class="qty" id="qty" name="qty"
                                value=${el.qty}>
                                  
                              </div>
                          </td>
                          <td class="text-center text-lg text-medium" id='subtotal'>£
                          
                          <span class='subtotal'>${(el.price * el.qty).toFixed(
                            2
                          )}</span>
                          </td>
                          
                          <td class="text-center">
                            <a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item">
                              <i class="fa fa-trash"></i>
                            </a>
                          </td>
                      </tr>
                      
                  </tbody>
              </table>
          </div>
         
                `
              )
              .join("")}
              

            <div class="shopping-cart-footer">
              
              <div class="column text-lg totalPrice" >Total: <span class="text-medium" id='total'>£${calculateTotal()}</span></div>
            </div>

          <div class="shopping-cart-footer">
              <div class="column ">
                <a class="btn btn-outline-primary" href="index.html"><i class="fas fa-arrow-alt-circle-left"></i>&nbsp;Back to Shopping</a>
              </div>

              <div class="column">
                <a class="btn btn-primary updateCart" href="#">Update Cart</a>
                <a class="btn btn-success checkout" href="#">Checkout</a></div>
          </div>
      </div>
            
            `;
    // console.log(output);
    document.querySelector(".tableBody").innerHTML = output;
    updateCart();
    deleteProduct();
    deleteCart();

    // update cart icons to show the number of prods
    let cartItems = localStorage.getItem("cart");
    cart = JSON.parse(cartItems);
    updateCartIcon(cart);
  } else {
    // display message for empty cart
    let msg = document.querySelector(".shopping-cart");
    let div = document.createElement("div");
    div.classList.add("msg");
    let para = document.createElement("h4");
    para.innerHTML = "Your cart is empty.";
    div.appendChild(para);
    // console.log(div);
    msg.appendChild(div);
    // console.log(msg);
  }
};

function calculateTotal() {
  let storedCart = localStorage.getItem("cart");

  let cart = JSON.parse(storedCart);
  let total = 0;

  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      let subtotal = Number(cart[i].price * cart[i].qty);
      // console.log(subtotal);
      total += Number(subtotal);
    }
  } else {
    total = 0;
  }

  return total.toFixed(2);
}

// update qties

function updateCart() {
  // add event pe butonul update
  let updateCart = document.querySelector(".updateCart");
  updateCart.addEventListener("click", (e) => {
    let storedCart = localStorage.getItem("cart");
    cart = JSON.parse(storedCart);

    // iau toate inputurile pt qty
    let qty = document.querySelectorAll(".qty");

    let qtyToStore = [];
    qty.forEach((productQty) => {
      qtyToStore.push(productQty.value);
    });

    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        cart[i].qty = Number(qtyToStore[i]);
      }
    }

    // cart[i].qty = qty[i];

    localStorage.setItem("cart", JSON.stringify(cart));
    calculateTotal();

    window.location.reload();
  });
}

function deleteProduct() {
  let trashBtns = document.querySelectorAll(".fa-trash");

  trashBtns.forEach((trashBtn) => {
    trashBtn.addEventListener("click", (e) => {
      let tableBody = document.querySelector(".tableBody");
      let rowToDelete = e.target.parentElement.parentElement.parentElement;
      tableBody.removeChild(rowToDelete);

      let storedCart = localStorage.getItem("cart");
      let cart = JSON.parse(storedCart);

      //  sterg rand
      // splice ia 2 valori: 1) indexul elementului de la indexul obtinut din tabel; 2) nr de elemente de sters
      let rowDeletedIndex = rowToDelete.rowIndex - 1;

      cart.splice(rowDeletedIndex, 1);

      localStorage.setItem("cart", JSON.stringify(cart));
      calculateTotal();
      window.location.reload();
    });
  });
}

function deleteCart() {
  let clearCartBtn = document.querySelector(".clearCart");

  let totalPriceDiv = document.querySelector(".totalPrice");

  clearCartBtn.addEventListener("click", (e) => {
    var tableHeaderRowCount = 1;
    var table = document.getElementById("table");
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
    }
    totalPriceDiv.innerHTML = "Your cart is empty";

    let storedCart = localStorage.getItem("cart");
    let cart = JSON.parse(storedCart);
    console.log(cart);
    localStorage.removeItem("cart");
  });
}

//  function to add cart icons
function updateCartIcon(arr) {
  const cartIcon = document.querySelector(".badge");
  if (arr) {
    cartIcon.innerHTML = arr.length;
  }
}
