const { CookingStyle } = require('../models');

module.exports = {
    async cooking_style(restaurantCookingStyle) {
        const restaurants = await CookingStyle.findByPk(
            restaurantCookingStyle.cooking_style_id,
        );
        return restaurants;
    },
};
