const { Restaurant } = require('../models');

module.exports = {

    async restaurants(city) {
        const restaurants = await Restaurant.findAll({ where: { city_id: city.id } });
        return restaurants;
    },

};
