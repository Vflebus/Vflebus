const { RestaurantCookingStyle } = require('../models');

module.exports = {
    async cooking_style_restaurants(cookingStyle) {
        const restaurants = await RestaurantCookingStyle.findAll({
            where: { cooking_style_id: cookingStyle.id },
        });
        return restaurants;
    },
};
