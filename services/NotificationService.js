const Notification = require("../models/notification");

class NotificationService {
  async addNotification(data) {
    return await Notification.create(data);
  }

  async getAllNotifications() {
    return await Notification.findAll();
  }

  async updateNotificationById(id, data) {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      throw new Error("Уведомление не найдено");
    }
    // Обновляем свойства уведомления
    Object.assign(notification, data);
    await notification.save();
    return notification;
  }

  async deleteNotificationById(id) {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      throw new Error("Уведомление не найдено");
    }
    await notification.destroy();
  }

  async getNotificationsByUserId(userId) {
    const notifications = await Notification.findAll({
      where: { UserId: userId },
    });
    if (notifications.length === 0) {
      throw new Error("Уведомлений не найдено для данного пользователя");
    }
    return notifications;
  }

  async getNotificationById(notificationId) {
    const notification = await Notification.findByPk(notificationId);
    if (!notification) {
      throw new Error("Уведомление не найдено");
    }
    return notification;
  }
}

module.exports = new NotificationService();
