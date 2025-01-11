// Файл: seedNotifications.js
const Notification = require("../models/notification"); // Путь к модели Notification

class SeedNotifications {
  async seed() {
    const notifications = [
      {
        Message: "Ваш аккаунт успешно создан.",
        DateTime: new Date(),
        UserId: 1, // Убедитесь, что такие пользователи существуют
      },
      {
        Message: "Вы изменили свой пароль.",
        DateTime: new Date(),
        UserId: 2,
      },
      {
        Message: "У вас новое сообщение.",
        DateTime: new Date(),
        UserId: 1,
      },
      {
        Message: "Ваш профиль обновлен.",
        DateTime: new Date(),
        UserId: 3,
      },
      {
        Message: "Вы подписаны на рассылку.",
        DateTime: new Date(),
        UserId: 2,
      },
      {
        Message: "Ваш запрос на восстановление пароля принят.",
        DateTime: new Date(),
        UserId: 1,
      },
      {
        Message: "У вас новое уведомление.",
        DateTime: new Date(),
        UserId: 3,
      },
      {
        Message: "Профиль пользователя был изменен.",
        DateTime: new Date(),
        UserId: 2,
      },
    ];

    try {
      const existingNotifications = await Notification.count();

      if (existingNotifications === 0) {
        await Notification.bulkCreate(notifications);
        console.log("База данных уведомлений успешно заполнена.");
      } else {
        console.log(
          "База данных уведомлений уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных уведомлений:", error);
    }
  }
}

module.exports = SeedNotifications; // Экспортируем класс
