


let bar = document.getElementById("bar");
let nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

let closs = document.getElementById("closs");

if (closs) {
  closs.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

let carts = document.querySelectorAll(".add-card");

let prodact = [
  {
    name: "T-Shirts",
    tag: "f1",
    price: 200,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "f2",
    price: 90,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "f3",
    price: 100,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "f4",
    price: 125,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "f5",
    price: 70,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "f6",
    price: 80,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "f7",
    price: 125,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "f8",
    price: 170,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "n1",
    price: 80,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "n2",
    price: 100,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "n3",
    price: 200,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "n4",
    price: 100,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "n5",
    price: 150,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "n6",
    price: 80,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "n7",
    price: 70,
    inCart: 0,
  },
  {
    name: "T-Shirts",
    tag: "n8",
    price: 160,
    inCart: 0,
  },
  // ... (add the rest of your existing products)
];

// Add event listeners to all cart buttons
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumber(prodact[i]);
    TotalCost(prodact[i]);
  });
}

function onlodNumber() {
  let prodactNumber = localStorage.getItem("cartNumber");
  if (prodactNumber) {
    document.getElementById("cart-haedr").textContent = prodactNumber;
  }
}

function cartNumber(prodact) {
  let prodactNumber = localStorage.getItem("cartNumber");
  prodactNumber = parseInt(prodactNumber);
  if (prodactNumber) {
    localStorage.setItem("cartNumber", prodactNumber + 1);
    document.getElementById("cart-haedr").textContent = prodactNumber + 1;
  } else {
    localStorage.setItem("cartNumber", 1);
    document.getElementById("cart-haedr").textContent = 1;
  }

  setItem(prodact);
}

function setItem(prodact) {
  let cartItems = localStorage.getItem("prodactInCard");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[prodact.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [prodact.tag]: prodact,
      };
    }
    cartItems[prodact.tag].inCart += 1;
  } else {
    prodact.inCart = 1;
    cartItems = {
      [prodact.tag]: prodact,
    };
  }
  localStorage.setItem("prodactInCard", JSON.stringify(cartItems));
}

function TotalCost(prodact) {
  let cartCost = localStorage.getItem("TotalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("TotalCost", cartCost + prodact.price);
  } else {
    localStorage.setItem("TotalCost", prodact.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("prodactInCard");
  cartItems = JSON.parse(cartItems);
  let prodactHeader = document.querySelector(".products");

  if (cartItems && prodactHeader) {
    prodactHeader.innerHTML = "";
    let totalCost = 0; // Initialize total cost

    Object.values(cartItems).forEach((item) => {
      totalCost += item.inCart * item.price; // Calculate total cost for each item

      prodactHeader.innerHTML += `
        <table>
        <tbody>
            <tr>
                <td><i class="far fa-times-circle" data-tag="${
                  item.tag
                }"></i><a href="#"></a></td>
                <td><img src="img/products/${item.tag}.jpg"></td>
                <td><p class="Tshirt">${item.name}</p></td>
                <td><p class="price">${item.price}</p></td>
                <td><p class="qu">${item.inCart}</p></td>
                <td><p>$${item.inCart * item.price},00</p></td>
            </tr>
        </tbody>
        </table>
      `;
    });

    // Add total price below the table
    prodactHeader.innerHTML += `
      <div class="total-cost">
        <h4>Total Cost:<span> $ ${totalCost},00</span></h4>
      </div>
    `;

    // Add event listeners to delete icons
    const deleteIcons = document.querySelectorAll(".far.fa-times-circle");
    deleteIcons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const tag = event.target.getAttribute("data-tag");
        removeItem(tag);
      });
    });
  } else {
    prodactHeader.innerHTML = "<p>No items in cart.</p>"; // Handle empty cart
  }
}

function removeItem(tag) {
  let cartItems = localStorage.getItem("prodactInCard");
  cartItems = JSON.parse(cartItems);

  if (cartItems && cartItems[tag]) {
    // Remove the item from the cart
    delete cartItems[tag];
    localStorage.setItem("prodactInCard", JSON.stringify(cartItems));

    // Update cart number and total cost
    updateCartNumberAndCost();
    displayCart(); // Refresh the cart display
  }
}

function updateCartNumberAndCost() {
  let cartItems = localStorage.getItem("prodactInCard");
  cartItems = JSON.parse(cartItems);

  let newCartNumber = 0;
  let newTotalCost = 0;

  if (cartItems) {
    Object.values(cartItems).forEach((item) => {
      newCartNumber += item.inCart;
      newTotalCost += item.inCart * item.price;
    });
  }

  localStorage.setItem("cartNumber", newCartNumber);
  localStorage.setItem("TotalCost", newTotalCost);
  document.getElementById("cart-haedr").textContent = newCartNumber;
}

//add email
let inputContact1 = document.getElementById("input-contact1");
let inputContact2 = document.getElementById("input-contact2");
let inputContact3 = document.getElementById("input-contact3");
let inputContact4 = document.getElementById("input-contact4");

let buttonContact = document.getElementById("button-contact");

function a() {
  if (
    inputContact1.value !== "" &&
    inputContact2.value !== "" &&
    inputContact3.value !== "" &&
    inputContact4.value !== ""
  ) {
    alert("Data Entered");
  } else {
    alert("Enter your data");
  }
}

let mainImg = document.getElementById("mainimg");
let smolleImg = document.getElementsByClassName("small-img");

for (let i = 0; i < smolleImg.length; i++) {
  smolleImg[i].onclick = function () {
    mainImg.src = smolleImg[i].src;
  };
}


onlodNumber();
displayCart();