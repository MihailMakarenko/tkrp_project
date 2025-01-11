// Файл: seedHistoryUsers.js
const HistoryUser = require("../models/historyUser"); // Путь к модели HistoryUser

class SeedHistoryUsers {
  async seed() {
    const historyEntries = [
      {
        ActionType: "Создание аккаунта",
        ActionTime: new Date(),
        ChangeableUserID: 1, // Убедитесь, что такие пользователи существуют
        AdminUserID: 1,
      },
      {
        ActionType: "Изменение профиля",
        ActionTime: new Date(),
        ChangeableUserID: 2,
        AdminUserID: 1,
      },
      {
        ActionType: "Удаление аккаунта",
        ActionTime: new Date(),
        ChangeableUserID: 3,
        AdminUserID: 2,
      },
      {
        ActionType: "Сброс пароля",
        ActionTime: new Date(),
        ChangeableUserID: 1,
        AdminUserID: 1,
      },
      {
        ActionType: "Добавление информации",
        ActionTime: new Date(),
        ChangeableUserID: 2,
        AdminUserID: 1,
      },
      {
        ActionType: "Изменение настроек",
        ActionTime: new Date(),
        ChangeableUserID: 3,
        AdminUserID: 2,
      },
      {
        ActionType: "Обновление аккаунта",
        ActionTime: new Date(),
        ChangeableUserID: 1,
        AdminUserID: 1,
      },
      {
        ActionType: "Удаление информации",
        ActionTime: new Date(),
        ChangeableUserID: 2,
        AdminUserID: 1,
      },
    ];

    try {
      const existingHistory = await HistoryUser.count();

      if (existingHistory === 0) {
        await HistoryUser.bulkCreate(historyEntries);
        console.log(
          "База данных истории действий пользователей успешно заполнена."
        );
      } else {
        console.log(
          "База данных истории действий пользователей уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error(
        "Ошибка при заполнении базы данных истории действий пользователей:",
        error
      );
    }
  }
}

module.exports = SeedHistoryUsers; // Экспортируем класс
