const {
    City,
    Manager,
    RestaurantCookingStyle,
} = require('../models');

module.exports = {

    async city(restaurant) {
        const city = await City.findByPk(restaurant.city_id);
        return city;
    },

    async manager(restaurant) {
        const manager = await Manager.findByPk(restaurant.manager_id);
        return manager;
    },

    // Ca on ne peut pas faire car il faudrait ajouter une jointure
    async restaurant_cooking_styles(restaurant) {
        const cookingStyles = await RestaurantCookingStyle.findAll({
            where: { restaurant_id: restaurant.id },
        });
        return cookingStyles;
    },

};
