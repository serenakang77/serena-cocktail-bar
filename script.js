const app = {}

app.apiKey = "1"
const $dropdown = $("#dropdown")
const $cocktailDescription = $("#cocktailDescription")

app.apiCall = function (format) {
  return $.ajax({
    url: `https://www.thecocktaildb.com/api/json/v1/1/${format}`,
    method: "GET",
    dataType: "json",
    data: {
      api_key: app.apiKey,
    },
  })
}

app.populateDropdown = function () {
  app.apiCall("search.php?f=c").then(function (response) {
    response.drinks.forEach((individual) => {
      $dropdown.append(
        `
        <option hidden disabled selected value>Please select cocktail</option>
        <option class="cocktailName" value=${individual.idDrink}>${individual.strDrink}</option>
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
  app.apiCall(`lookup.php?i=${cocktailId}`).then(function (data) {
    console.log(data)
    const cocktailContent = `
    <div class="imageClass">
        <img class="cocktailImage" src="${
          data.drinks[0].strDrinkThumb
        }" alt="Cocktail">
    </div>
    <div class="divide">
        <div class="nameClass">
            <h2>🍸Name: ${data.drinks[0].strDrink}</h2>
        </div>
        <div class="ingredientClass">
            <h2>🍸Ingredient: ${app.getIngredient(data)}</h2>
        </div>
        <div class="instructionClass">
            <h2>🍸Instruction: ${data.drinks[0].strInstructions}</h2>
        </div>
    </div>
    `
    $cocktailDescription.append(cocktailContent)
  })
}

app.getIngredient = function (data) {
  const objData = Object.keys(data.drinks[0])
  const match = objData.filter((str) =>
    str.match(/^strIngredient([0-9]|1[0-5])+/)
  )
  const filteredIngredients = match
    .map((strIngredientNumber) => data.drinks[0][strIngredientNumber])
    .filter((value) => value != null)
  console.log(filteredIngredients)
  return filteredIngredients
}

app.init = function () {
  app.populateDropdown()
  app.changeHalnder()
}

$(function () {
  app.init()
})
