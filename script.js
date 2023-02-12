const app = {}

app.apiKey = "1"
const $dropdown = $("#dropdown")

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
        <option value=${individual.strDrink}>${individual.strDrink}</option>
        `
      )
    })
  })
}

app.init = function () {
  app.populateDropdown()
}

$(function () {
  app.init()
})
