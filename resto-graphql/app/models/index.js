const sequelize = require('../db/sequelize');

// Soit on pass par un stockage de la factory dans une variable
const cityFactory = require('./city');
// que l'on appelle ensuite
const City = cityFactory(sequelize);

// Soit on appelle directement la factory qui retourne le model
const CookingStyle = require('./cookingStyle')(sequelize);
const RestaurantCookingStyle = require('./restaurantCookingStyle')(sequelize);
const Manager = require('./manager')(sequelize);
const Restaurant = require('./restaurant')(sequelize);

module.exports = {
    City,
    CookingStyle,
    RestaurantCookingStyle,
    Manager,
    Restaurant,
};
