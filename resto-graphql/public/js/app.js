const app = {
    async init() {
        const data = await app.getData();
        console.log(data);
        app.displayData(data);
    },

    async getData() {
        const reponse = await fetch('/api/cooking-styles');
        const cookingStyles = await reponse.json();
        const cookingStylesWithRestaurants = await cookingStyles.map((cookingStyle) => {
            const cookingStyleToReturn = { ...cookingStyle };
            const promises = cookingStyle.restaurants.map(
                (restaurantUrl) => fetch(restaurantUrl),
            );
            cookingStyleToReturn.restaurants = Promise.all(promises.map(
                (p) => p.then((response) => response.json()),
            ));
            return cookingStyleToReturn;
        });
        const cookingStylesWithRestaurantsResolved = await Promise.all(
            cookingStylesWithRestaurants.map(
                (cookingStyle) => cookingStyle.restaurants.then((restaurants) => {
                    cookingStyle.restaurants = restaurants;
                    return cookingStyle;
                }),
            ),
        );

        return cookingStylesWithRestaurantsResolved;
    },

    displayData(data) {
        const container = document.querySelector('#container');
        const ul = document.createElement('ul');
        container.appendChild(ul);
        data.forEach(async (cookingStyle) => {
            const viewCookingStyle = { ...cookingStyle };
            const li = document.createElement('li');
            li.textContent = cookingStyle.label;
            ul.appendChild(li);
            const restaurantUl = document.createElement('ul');

            viewCookingStyle.restaurants.forEach((restaurant) => {
                const restaurantLi = document.createElement('li');
                restaurantLi.textContent = restaurant.name;
                restaurantUl.appendChild(restaurantLi);
            });
            li.appendChild(restaurantUl);
        });
    },
};

document.addEventListener('DOMContentLoaded', app.init);
