// Файл: seedComments.js
const Comment = require("../models/comment"); // Путь к модели Comment

class SeedComments {
  async seed() {
    const comments = [
      {
        Text: "Это отличный пост!",
        DateTime: new Date(),
        UserId: 1, // Убедитесь, что такие пользователи существуют
        RequestId: 1, // Убедитесь, что такие запросы существуют
      },
      {
        Text: "Эта информация была очень полезной.",
        DateTime: new Date(),
        UserId: 2,
        RequestId: 1,
      },
      {
        Text: "Можете предоставить больше деталей?",
        DateTime: new Date(),
        UserId: 1,
        RequestId: 2,
      },
      {
        Text: "Спасибо за информацию!",
        DateTime: new Date(),
        UserId: 3,
        RequestId: 2,
      },
      {
        Text: "Я не согласен с некоторыми пунктами.",
        DateTime: new Date(),
        UserId: 2,
        RequestId: 3,
      },
      {
        Text: "Отличное написание!",
        DateTime: new Date(),
        UserId: 3,
        RequestId: 3,
      },
      {
        Text: "С нетерпением жду новых постов на эту тему.",
        DateTime: new Date(),
        UserId: 1,
        RequestId: 4,
      },
      {
        Text: "Не могли бы вы разъяснить последний раздел?",
        DateTime: new Date(),
        UserId: 2,
        RequestId: 4,
      },
      {
        Text: "Какой увлекательный विषय!",
        DateTime: new Date(),
        UserId: 3,
        RequestId: 5,
      },
      {
        Text: "Я многому научился из этой статьи.",
        DateTime: new Date(),
        UserId: 1,
        RequestId: 5,
      },
    ];

    try {
      const existingComments = await Comment.count();

      if (existingComments === 0) {
        await Comment.bulkCreate(comments);
        console.log("База данных комментариев успешно заполнена.");
      } else {
        console.log(
          "База данных комментариев уже содержит записи. Новые записи не будут добавлены."
        );
      }
    } catch (error) {
      console.error("Ошибка при заполнении базы данных комментариев:", error);
    }
  }
}

module.exports = SeedComments; // Экспортируем класс
