// Файл: seedRequests.js
const Request = require("../models/request"); // Путь к модели Request

class SeedRequests {
  async seed() {
    const requests = [
      {
        RequestPriority: "Высокий",
        DateTime: new Date(),
        RequestStatus: "Открыт",
        TaskId: 1, // Убедитесь, что такие задачи существуют
        UserId: 1, // Убедитесь, что такие пользователи существуют
      },
      {
        RequestPriority: "Средний",
        DateTime: new Date(),
        RequestStatus: "В процессе",
        TaskId: 2,
        UserId: 2,
      },
      {
        RequestPriority: "Низкий",
        DateTime: new Date(),
        RequestStatus: "Закрыт",
        TaskId: 1,
        UserId: 3,
      },
      {
        RequestPriority: "Высокий",
        DateTime: new Date(),
        RequestStatus: "Открыт",
        TaskId: 3,
        UserId: 1,
      },
      {
        RequestPriority: "Средний",
        DateTime: new Date(),
        RequestStatus: "В процессе",
        TaskId: 2,
        UserId: 2,
      },
      {
        RequestPriority: "Низкий",
        DateTime: new Date(),
        RequestStatus: "Закрыт",
        TaskId: 4,
        UserId: 3,
      },
      {
        RequestPriority: "Высокий",
        DateTime: new Date(),
        RequestStatus: "Открыт",
        TaskId: 5,
        UserId: 1,
      },
      {
        RequestPriority: "Средний",
        DateTime: new Date(),
        RequestStatus: "В процессе",
        TaskId: 6,
        UserId: 2,
      },
    ];

    try {
      const existingRequests = await Request.count();

      if (existingRequests === 0) {
        await Request.bulkCreate(requests);
        console.log("База данных запросов успешно заполнена.");
      } else {
        console.log(
          "База данных запросов уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных запросов:", error);
    }
  }
}

module.exports = SeedRequests; // Экспортируем класс
