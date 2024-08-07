async function getPeople() {
  let response = await fetch("../data.json");
  let data = await response.json();
  console.log(data);
  let cardDesign = `
    <div class="cardDesign">
          <div class="innerImgCard">
            <img src="" alt="" id="dessertImageId">
          </div>
          <div class="dessertsName"></div>
          <div class="dessertFullName"></div>
          <div class="price"></div>
        </div>
    `;

    
}
getPeople();
