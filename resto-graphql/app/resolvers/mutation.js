const { Restaurant, RestaurantCookingStyle } = require('../models');

module.exports = {
    async createRestaurant(_, { input }) {
        const restaurant = await Restaurant.create(input);

        if (restaurant && input.cooking_style_ids.length) {
            const promises = [];
            input.cooking_style_ids.forEach((cookingStyleId) => {
                promises.push(RestaurantCookingStyle.create({
                    restaurant_id: restaurant.id,
                    cooking_style_id: cookingStyleId,
                }));
            });
            await Promise.all(promises);
        }

        return restaurant;
    },

    async updateRestaurant(_, { id, input }) {
        // eslint-disable-next-line no-unused-vars
        const [updateCount, [restaurant]] = await Restaurant.update(input, {
            where: { id },
            returning: true,
        });

        if (restaurant && input.cooking_style_ids.length) {
            const deletePromises = [];
            const createPromises = [];
            input.cooking_style_ids.forEach((cookingStyleId) => {
                deletePromises.push(RestaurantCookingStyle.destroy({
                    where: {
                        restaurant_id: restaurant.id,
                    },
                }));
                createPromises.push(RestaurantCookingStyle.create({
                    restaurant_id: restaurant.id,
                    cooking_style_id: cookingStyleId,
                }));
            });
            await Promise.all(deletePromises);
            await Promise.all(createPromises);
        }

        return restaurant;
    },
};
