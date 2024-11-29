const Notification = require("../models/notification");

class NotificationController {
  // Добавить новое уведомление
  async addNotification(req, res) {
    const { Message, DateTime, UserId } = req.body;
    try {
      const newNotification = await Notification.create({
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
      const notifications = await Notification.findAll();
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
      const notification = await Notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ message: "Уведомление не найдено" });
      }
      // Обновление свойств уведомления
      notification.Message = Message;
      notification.DateTime = DateTime;
      notification.UserId = UserId;
      await notification.save();
      res.status(200).json(notification);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить уведомление по ID
  async deleteNotificationById(req, res) {
    const { id } = req.params;
    try {
      const notification = await Notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ message: "Уведомление не найдено" });
      }
      await notification.destroy();
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new NotificationController();
