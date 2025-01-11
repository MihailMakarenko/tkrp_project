const Location = require("../models/location");

class LocationService {
  async addLocation(data) {
    return await Location.create(data);
  }

  async getAllLocations() {
    return await Location.findAll();
  }

  async updateLocationById(id, data) {
    const location = await Location.findByPk(id);
    if (!location) {
      throw new Error("Местоположение не найдено");
    }
    // Обновляем свойства местоположения
    Object.assign(location, data);
    await location.save();
    return location;
  }

  async deleteLocationById(id) {
    const location = await Location.findByPk(id);
    if (!location) {
      throw new Error("Местоположение не найдено");
    }
    await location.destroy();
  }
}

module.exports = new LocationService();
