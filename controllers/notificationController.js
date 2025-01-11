const NotificationService = require("../services/NotificationService");

class NotificationController {
  // Добавить новое уведомление
  async addNotification(req, res) {
    const { Message, DateTime, UserId } = req.body;
    try {
      const newNotification = await NotificationService.addNotification({
        Message,
        DateTime,
        UserId,
      });
      res.status(201).json(newNotification);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Получить все уведомления
  async getAll(req, res) {
    try {
      const notifications = await NotificationService.getAllNotifications();
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Обновить уведомление по ID
  async updateNotificationById(req, res) {
    const { id } = req.params;
    const { Message, DateTime, UserId } = req.body;
    try {
      const updatedNotification =
        await NotificationService.updateNotificationById(id, {
          Message,
          DateTime,
          UserId,
        });
      res.status(200).json(updatedNotification);
    } catch (error) {
      if (error.message === "Уведомление не найдено") {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить уведомление по ID
  async deleteNotificationById(req, res) {
    const { id } = req.params;
    try {
      await NotificationService.deleteNotificationById(id);
      res.status(204).send(); // Успешное удаление
    } catch (error) {
      if (error.message === "Уведомление не найдено") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  // Получить уведомления по UserId
  async getNotificationsByUserId(req, res) {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Необходимо указать UserId" });
    }
    try {
      const notifications = await NotificationService.getNotificationsByUserId(
        userId
      );
      res.status(200).json(notifications);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Получить уведомление по ID
  async getNotificationById(req, res) {
    const { notificationId } = req.params;
    if (!notificationId) {
      return res
        .status(400)
        .json({ message: "Необходимо указать NotificationId" });
    }
    try {
      const notification = await NotificationService.getNotificationById(
        notificationId
      );
      res.status(200).json(notification);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new NotificationController();
