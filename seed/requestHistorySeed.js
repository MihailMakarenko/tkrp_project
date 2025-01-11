// Файл: seedRequestHistory.js
const RequestHistory = require("../models/requestHistory"); // Путь к модели RequestHistory

class SeedRequestHistory {
  async seed() {
    const requestHistoryEntries = [
      {
        RequestId: 1, // Убедитесь, что такие запросы существуют
        UserId: 1, // Убедитесь, что такие пользователи существуют
        Description: "Запрос создан.",
      },
      {
        RequestId: 1,
        UserId: 2,
        Description: "Запрос был обновлен.",
      },
      {
        RequestId: 2,
        UserId: 1,
        Description: "Запрос закрыт.",
      },
      {
        RequestId: 3,
        UserId: 3,
        Description: "Запрос был просмотрен.",
      },
      {
        RequestId: 2,
        UserId: 2,
        Description: "Запрос отправлен на доработку.",
      },
      {
        RequestId: 1,
        UserId: 3,
        Description: "Запрос был отклонен.",
      },
      {
        RequestId: 4,
        UserId: 1,
        Description: "Запрос принят.",
      },
      {
        RequestId: 5,
        UserId: 2,
        Description: "Запрос был изменен.",
      },
    ];

    try {
      const existingHistoryEntries = await RequestHistory.count();

      if (existingHistoryEntries === 0) {
        await RequestHistory.bulkCreate(requestHistoryEntries);
        console.log("База данных истории запросов успешно заполнена.");
      } else {
        console.log(
          "База данных истории запросов уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error(
        "Ошибка при заполнении базы данных истории запросов:",
        error
      );
    }
  }
}

module.exports = SeedRequestHistory; // Экспортируем класс
