const { ArchiveRestaurant } = require('../models/archive');

module.exports = (app) => {
    app.on('restaurant:deleted', async (restaurant) => {
        const literalRestaurant = restaurant.toJSON();
        await ArchiveRestaurant.create(literalRestaurant);
    });
};
