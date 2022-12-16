const {
    Restaurant,
    CookingStyle,
    City,
    Manager,
} = require('../models');

module.exports = {
    appName() {
        return "Rest'O";
    },

    async getRestaurants() {
        const restaurants = await Restaurant.findAll();
        return restaurants;
    },

    async getRestaurant(_, { id }) {
        const restaurant = await Restaurant.findByPk(id);
        return restaurant;
    },

    async getCookingStyles() {
        const cookingStyles = await CookingStyle.findAll();
        return cookingStyles;
    },

    async getCookingStyle(_, { id }) {
        const cookingStyle = await CookingStyle.findByPk(id);
        return cookingStyle;
    },

    async getCities() {
        const cities = await City.findAll();
        return cities;
    },

    async getCity(_, { id }) {
        const city = await City.findByPk(id);
        return city;
    },

    async getManagers() {
        const managers = await Manager.findAll();
        return managers;
    },

    async getManager(_, { id }) {
        const manager = await Manager.findByPk(id);
        return manager;
    },
};
