// GET products
const tableBody = document.querySelector(".adminProdTable");
const prodURL = "https://6151a65d4a5f22001701d33d.mockapi.io/products/";
const newProdBtn = document.querySelector(".addNewProd");
const newProdInput = document.querySelector(".newProdInput");
let newProdName = document.querySelector("#newName");
let newPrice = document.querySelector("#newPrice");
let newDescription = document.querySelector("#newDescription");
let newPicture = document.querySelector("#newPicture");

//  fetch products form API
fetch(prodURL)
  .then((response) => response.json())
  .then((data) => allProducts(data));

// display all products in a table
function allProducts(product) {
  let output = "";
  for (let i = 0; i < product.length; i++) {
    output += `

          <tr id=${product[i].id}>
            <th scope="row">${product[i].id}</th>
            <td>
              <img
                src="${product[i].picture}"
                class="adminIcon img-thumbnail"
                alt="${product[i].name}"
              />
            </td>
            <td>${product[i].name}</td>
            <td>${product[i].description}</td>
            <td>£${product[i].price}</td>
            
            <form>
            <td>
 
                <input type = "button"  value = "Update" id='updateAdminProd' class='updateAdminProd'>
            </td>
            <td>
                <input type = "button" value = "Delete" id='deleteAdminProd' class='deleteAdminProd'> 
            
            </td>
            </form>
          </tr>
         `;
  }
  document.getElementById("adminProdTable").innerHTML = output;
  updateProduct(product);
  deleteProduct(product);
  addNewProduct();
}

//   UPDATE PRODUCT

function updateProduct() {
  tableBody.addEventListener("click", (e) => {
    // check if the update button was pressed and get the row's id associated to the prod id
    if (e.target.classList.contains("updateAdminProd")) {
      // get the row's id
      let id = e.target.parentElement.parentElement.id;
      // console.log(id);
      //  fetch the product selected from API based on ID
      fetch(prodURL + id)
        .then((response) => response.json())
        .then((data) => dataInput(data));

      function dataInput(product) {
        // console.log(product);
        let displayProd = document.querySelector(".hidden");
        // remove class hidden from the table
        displayProd.classList.remove("hidden");

        //  add cladd visible to show table on update
        displayProd.classList.add("visible");

        let bodyTable = document.querySelector(".updateProdTable");
        // console.log(displayProd);

        // create table rows with data from API for that product
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="productId">${product.id}</td>
            <td><input type="text" class="form-control" id="img" 
            value='${product.picture}'>
            </td>
            <td><input type="text" class="form-control" id="name" 
            value='${product.name}'></td>
            <td><input type="text" class="form-control" id="description" 
            value='${product.description}'></td>
            <td><input type="text" class="form-control" id="price" 
            value='${product.price}'></td>
            
            <td><button class= "btn btn-outline-primary save">Save  </button></td>
            `;
        bodyTable.appendChild(row);
        // console.log(bodyTable);

        saveProduct(product);
      }

      function saveProduct(productUpdated) {
        let saveBtn = document.querySelector(".save");

        saveBtn.addEventListener("click", (e) => {
          let id = document.querySelector(".productId").innerHTML;
          let img = document.querySelector("#img").value;
          let name = document.querySelector("#name").value;
          let description = document.querySelector("#description").value;
          let price = document.querySelector("#price").value;

          let productUpdated = {
            id: id,
            name: name,
            picture: img,
            description: description,
            price: price,
          };

          fetch(prodURL + id, {
            method: "PUT",
            body: JSON.stringify(productUpdated),
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then((data) => allProducts(data))
            .catch((error) => {
              console.log(error);
            })
            .then(() => {
              window.location.reload();
            });
        });
      }
    }
  });
}

function deleteProduct(product) {
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteAdminProd")) {
      let id = e.target.parentElement.parentElement.id;

      fetch(prodURL + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => allProducts(data))
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          window.location.reload();
        });
    }
  });
}

function addNewProduct() {
  newProdBtn.addEventListener("click", (e) => {
    // console.log(newProdName.value, newPrice.value, newDescription.value, newPicture.value);

    let name = newProdName.value;
    let price = newPrice.value;
    let description = newDescription.value;
    let picture = newPicture.value;

    let newProd = {
      name: name,
      picture: picture,
      price: price,
      description: description,
    };

    // console.log(newProd);

    fetch(prodURL, {
      method: "POST",
      body: JSON.stringify(newProd),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => allProducts(data))
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        window.location.reload();
      });
  });
}
