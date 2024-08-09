async function getItemData() {
  try {
    let response = await fetch("../data.json");
    let data = await response.json();
    let cardDesigns = data
      .map(
        (item) => `
        <div class="cardDesign">
          <div class="innerImgCard">
            <img src="${item.image.desktop}" alt="${item.name}">
          </div>
          <div class="addToCartBtn" id="addToCartBtn_${item.unique_id}">
           <div class="defultBtn" id="defultBtnId_${item.unique_id}">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                <g fill="#C73B0F" clip-path="url(#clip${item.unique_id})">
                  <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                  <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
                </g>
                <defs><clipPath id="clip${
                  item.unique_id
                }"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs>
              </svg>
            </div>
            <div><p>Add to Cart</p></div>
           </div>
          </div>
          <div class="itemDiscription">
            <div class="dessertsName">${item.category}</div>
            <div class="dessertFullName">${item.name}</div>
            <div class="price">$${item.price.toFixed(2)}</div>
          </div>
        </div>
      `
      )
      .join("");

    let container = document.getElementById("contentMainDivId");
    container.innerHTML = cardDesigns;

    addToCart(data);
  } catch (error) {
    console.error("Error fetching and displaying data:", error);
  }
}
function addToCart(data) {
  let cartBtns = document.querySelectorAll(".addToCartBtn");

  cartBtns.forEach((button) => {
    const unique_id = button.id.split("_")[1];
    let count = 0;

    button.addEventListener("click", function () {
      const cardDesign =
        this.closest(".cardDesign").querySelector(".innerImgCard img");
      cardDesign.style.border = "1px solid red";
      const counterBtn = `<div id='counterbtn'>
        <div class='decrementIcon'>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
          </svg>
        </div>
        <div class='itemCount'>${count}</div>
        <div class='incrementIcon'>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
            <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
          </svg>
        </div>
      </div>`;

      const addCounterBtn = document.getElementById(
        `addToCartBtn_${unique_id}`
      );
      if (addCounterBtn) {
        addCounterBtn.innerHTML = counterBtn;

        const incrementBtn = addCounterBtn.querySelector(".incrementIcon");
        const decrementBtn = addCounterBtn.querySelector(".decrementIcon");
        const itemCount = addCounterBtn.querySelector(".itemCount");

        incrementBtn.addEventListener("click", function () {
          count += 1;
          itemCount.innerText = count;
          const item = data.find((item) => item.unique_id === unique_id);
          if (item) {
            updateCartSection(item);
          }
        });

        decrementBtn.addEventListener("click", function () {
          if (count > 0) {
            count -= 1;
            itemCount.innerText = count;
            const item = data.find((item) => item.unique_id === unique_id);
              updateCartSection(item);
          }
        });
      }
    });
  });
}

function updateCartSection(item) {
  const cartSectionImg = document.getElementById("cartImageID");
  const countPicker =  document.querySelector(".itemCount").innerText
  const totalPriceOfOneItem = parseInt(countPicker*item.price);
  if (cartSectionImg) {
    const cartMenuItemList = `<div id='itemNameinCartList'>
    <li class="addedItemInCart"><div><div>${
      item.name
    }</div>
    <div class="priceCal"><span>${countPicker}x</span><span>@ $${item.price.toFixed(2)}</span> <span>$${totalPriceOfOneItem.toFixed(2)}</span></div></div>
    <div class="crossIcon"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" 
    viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4
     8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></div></li></div>`;
    cartSectionImg.innerHTML = cartMenuItemList;
    
  }
}

getItemData();
