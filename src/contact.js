window.onload = () => {
  // update cart icons to show the number of prods
  let cartItems = localStorage.getItem("cart");
  let cart = JSON.parse(cartItems);
  updateCartIcon(cart);
};

//  function to add cart icons
function updateCartIcon(arr) {
  const cartIcon = document.querySelector(".badge");
  if (arr) {
    cartIcon.innerHTML = arr.length;
  }
}
