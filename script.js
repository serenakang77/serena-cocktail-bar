const app = {}

app.apiKey = "1"
const $dropdown = $("#dropdown")
const $cocktailDescription = $("#cocktailDescription")

app.populateDropdown = function () {
  $.ajax({
    url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c",
    method: "GET",
    dataType: "json",
    data: {
      api_key: app.apiKey,
    },
  }).then(function (response) {
    response.drinks.forEach((individual) => {
      $dropdown.append(
        `
        <option hidden disabled selected value>Please select cocktail</option>
        <option class="cocktail" value=${individual.idDrink}>${individual.strDrink}</option>
        `
      )
    })
  })
}

app.changeHalnder = function () {
  $dropdown.change(function (e) {
    app.getSelectedCocktail(e.target.value)
  })
}

app.getSelectedCocktail = function (cocktailId) {
  $.ajax({
    url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`,
    method: "GET",
    dataType: "json",
    data: {
      api_key: app.apiKey,
    },
  }).then(function (data) {
    console.log(data)
    const empty = []
    for (let i = 1; i <= 15; i++) {
      if (data.drinks[0].strIngredient + `${i}`) {
        // console.log(`${data.drinks[0].strIngredient${i}}`)
        console.log(empty)
      }
    }
    const cocktailContent = `
    <div class="imageClass">
        <img class="cocktailImage" src="${data.drinks[0].strDrinkThumb}" alt="Cocktail">
    </div>
    <div class="divide">
        <div class="nameClass">
            <h2>🍸Name: ${data.drinks[0].strDrink}</h2>
        </div>
        <div class="ingredientClass">
            <h2>🍸Ingredient: if(data.drinks[0].strIngredient1){console.log("test")}</h2>
        </div>
        <div class="instructionClass">
            <h2>🍸Instruction: </h2>
        </div>
    </div>
    `
    $cocktailDescription.append(cocktailContent)
  })
}

app.init = function () {
  app.populateDropdown()
  app.changeHalnder()
}

$(function () {
  app.init()
})
