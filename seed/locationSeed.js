// Файл: seedLocations.js
const Location = require("../models/location"); // Путь к модели Location

class SeedLocations {
  async seed() {
    const locations = [
      {
        CorpsNumber: 1,
        HullNumber: 101,
        RoomNumber: 201,
      },
      {
        CorpsNumber: 1,
        HullNumber: 102,
        RoomNumber: 202,
      },
      {
        CorpsNumber: 2,
        HullNumber: 201,
        RoomNumber: 301,
      },
      {
        CorpsNumber: 2,
        HullNumber: 202,
        RoomNumber: 302,
      },
      {
        CorpsNumber: 3,
        HullNumber: 301,
        RoomNumber: 401,
      },
      {
        CorpsNumber: 3,
        HullNumber: 302,
        RoomNumber: 402,
      },
      {
        CorpsNumber: 4,
        HullNumber: 401,
        RoomNumber: 501,
      },
      {
        CorpsNumber: 4,
        HullNumber: 402,
        RoomNumber: 502,
      },
    ];

    try {
      const existingLocations = await Location.count();

      if (existingLocations === 0) {
        await Location.bulkCreate(locations);
        console.log("База данных местоположений успешно заполнена.");
      } else {
        console.log(
          "База данных местоположений уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных местоположений:", error);
    }
  }
}

module.exports = SeedLocations; // Экспортируем класс
