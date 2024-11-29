const HistoryUser = require("../models/historyUser");

class HistoryUserController {
  // Добавить запись истории
  async addHistory(req, res) {
    const { ActionType, ActionTime, ChangeableUserID, AdminUserID } = req.body;
    try {
      const newHistory = await HistoryUser.create({
        ActionType,
        ActionTime,
        ChangeableUserID,
        AdminUserID,
      });
      res.status(201).json(newHistory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Получить все записи истории
  async getAll(req, res) {
    try {
      const historyRecords = await HistoryUser.findAll();
      res.status(200).json(historyRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Обновить запись истории по ID
  async updateHistoryById(req, res) {
    const { id } = req.params;
    const { ActionType, ActionTime, ChangeableUserID, AdminUserID } = req.body;
    try {
      const historyRecord = await HistoryUser.findByPk(id);
      if (!historyRecord) {
        return res.status(404).json({ message: "Запись истории не найдена" });
      }
      // Обновление свойств записи истории
      historyRecord.ActionType = ActionType;
      historyRecord.ActionTime = ActionTime;
      historyRecord.ChangeableUserID = ChangeableUserID;
      historyRecord.AdminUserID = AdminUserID;
      await historyRecord.save();
      res.status(200).json(historyRecord);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить запись истории по ID
  async deleteHistoryById(req, res) {
    const { id } = req.params;
    try {
      const historyRecord = await HistoryUser.findByPk(id);
      if (!historyRecord) {
        return res.status(404).json({ message: "Запись истории не найдена" });
      }
      await historyRecord.destroy();
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new HistoryUser();
