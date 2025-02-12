let allMeals = [];
let allDesserts = [
    { strMeal: "Құрт", strMealThumb: "images/kurt.jpg", strInstructions: "Қатты кептірілген сүт өнімі." },
    { strMeal: "Балқаймақ", strMealThumb: "images/balkaymak.jpg", strInstructions: "Бал мен қаймақтан жасалған тәтті тағам." }
];

async function fetchMeals() {
    try {
        const response = await fetch("json/meals.json");
        if (!response.ok) {
            throw new Error("fetchMeals.JSON");
        }
        const data = await response.json();
        allMeals = data.meals;
        displayMeals(allMeals);
    } catch (error) {
        console.error("Тағамдарды алу кезінде қате орын алды:", error);
    }
}

function displayMeals(meals) {
    const container = document.getElementById("meal-container");
    container.innerHTML = "";
    meals.forEach((meal) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("card");
        newDiv.innerHTML = `
            <div class="front">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="card-content">
                    <h3>${meal.strMeal}</h3>
                    <h4>${meal.strArea}</h4>
                    <p>⏳ ${meal.strTime} |🔥 ${meal.strCalories}</p>
                </div>
            </div>
            <div class="back">
                <div class="card-content">
                    <h3>${meal.strMeal}</h3>
                    <p>${meal.strInstructions}</p>
                </div>
            </div>
        `;
        newDiv.addEventListener("click", function() {
            this.classList.toggle("flipped");
        });
        container.appendChild(newDiv);
    });
}

function searchMeals() {
    const searchText = document.getElementById("search").value.toLowerCase();
    const filteredMeals = allMeals.filter(meal => meal.strMeal.toLowerCase().includes(searchText));
    displayMeals(filteredMeals);
}

fetchMeals();