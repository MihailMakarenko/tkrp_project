const Location = require("../models/location");

class LocationController {
  // Добавить новое местоположение
  async addLocation(req, res) {
    const { CorpsNumber, HullNumber, RoomNumber } = req.body;
    try {
      const newLocation = await Location.create({
        CorpsNumber,
        HullNumber,
        RoomNumber,
      });
      res.status(201).json(newLocation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Получить все местоположения
  async getAll(req, res) {
    try {
      const locations = await Location.findAll();
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Обновить местоположение по ID
  async updateLocationById(req, res) {
    const { id } = req.params;
    const { CorpsNumber, HullNumber, RoomNumber } = req.body;
    try {
      const location = await Location.findByPk(id);
      if (!location) {
        return res.status(404).json({ message: "Местоположение не найдено" });
      }
      // Обновление свойств местоположения
      location.CorpsNumber = CorpsNumber;
      location.HullNumber = HullNumber;
      location.RoomNumber = RoomNumber;
      await location.save();
      res.status(200).json(location);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить местоположение по ID
  async deleteLocationById(req, res) {
    const { id } = req.params;
    try {
      const location = await Location.findByPk(id);
      if (!location) {
        return res.status(404).json({ message: "Местоположение не найдено" });
      }
      await location.destroy();
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new LocationController();
