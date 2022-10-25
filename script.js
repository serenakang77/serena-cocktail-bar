const app = {};

app.apiKey = "1";

const $dropdown = $("#dropdown");
const $alcoholPicture = $("#alcoholPicture");

// This function populates dropdown
app.populateDropdown = function(){
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a",
        method: "GET",
        dataType: "json",
        data: {
            api_key: app.apiKey
        } 
    }).then(function(response){        
        response.drinks.forEach(function(data){
            const cocktailName = data.strDrink;
            const cocktailId = data.idDrink; 
            const htmlToAppend = `
                <option hidden disabled selected value>-- Select your Cocktail --</option>
                <option class="cocktailName" value ="${cocktailId}">${cocktailName}</option>
            `;
            if(data.strIngredient4 && data.strMeasure4){
                $dropdown.append(htmlToAppend);
            }
        })         
        })     
}
// This function gets the value that we selected
app.getSelectValue = function(){
    $dropdown.on("change", function(){
        const selection = $('option:selected').val();
        $alcoholPicture.empty();
        app.getCocktail(selection);
    })
}
// This function allows us to choose 1 cocktail by id
app.getCocktail = function(cocktailId){
    $.ajax ({
        url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`,
        method: "GET",
        dataType: "json",
        data: {
            api_key: app.apiKey
        }
    }).then(function(response){
        app.displayCocktail(response);
    })  
}    
// This function allows us to show image, name, ingredient, and instruction
app.displayCocktail = function(data){
    const htmltoAppend2 = `
        <div class="imageClass">
            <img class="cocktailImage" src="${data.drinks[0].strDrinkThumb}" alt="Cocktail">
        </div>
        <div class="divide">
            <div class="nameClass">    
                <h2>🍸Name: ${data.drinks[0].strDrink}</h2>
            </div>    
            <div class="ingredientClass">    
                <h2>🍸Ingredient: ${data.drinks[0].strIngredient1}( ${data.drinks[0].strMeasure1}), ${data.drinks[0].strIngredient2}( ${data.drinks[0].strMeasure2}), ${data.drinks[0].strIngredient3}( ${data.drinks[0].strMeasure3}), ${data.drinks[0].strIngredient4}( ${data.drinks[0].strMeasure4})</h2>
            </div>    
            <div class="instructionClass">    
                <h2>🍸Instruction: ${data.drinks[0].strInstructions}</h2>
            </div>
        </div>        
        `;
    $alcoholPicture.append(htmltoAppend2);
}

app.init = function(){
    app.getCocktail("17222");
    app.populateDropdown();
    app.getCocktail();
    app.getSelectValue();
}

$(function(){
    app.init();
})