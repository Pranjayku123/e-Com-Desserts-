async function getPeople() {
    try {
      let response = await fetch("../data.json");
      let data = await response.json();
      console.log(data);
      
      let cardDesigns = data.map(item => `
        <div class="cardDesign">
          <div class="innerImgCard">
            <img src="${item.image.desktop}" alt="${item.name}" id="dessertImageId">
          </div>
          <div class="itemDiscription">
          <div class="dessertsName">${item.category}</div>
          <div class="dessertFullName">${item.name}</div>
          <div class="price">$${item.price.toFixed(2)}</div>
          </div>
        </div>
      `).join('');
  
      let container = document.getElementById("contentMainDivId");
      container.innerHTML = cardDesigns;
  
    } catch (error) {
      console.error("Error fetching and displaying data:", error);
    }
  }
  
  getPeople();
  