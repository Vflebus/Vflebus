const { Restaurant } = require('../models');

module.exports = {
    async restaurant(cookingStyleRestaurant) {
        const restaurant = await Restaurant.findByPk(
            cookingStyleRestaurant.restaurant_id,
        );
        return restaurant;
    },
};
