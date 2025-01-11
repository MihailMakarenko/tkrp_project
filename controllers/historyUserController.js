const HistoryUserService = require("../services/HistoryUserService");

class HistoryUserController {
  // Добавить запись истории
  async addHistory(req, res) {
    const { ActionType, ActionTime, ChangeableUserID, AdminUserID } = req.body;
    try {
      const newHistory = await HistoryUserService.addHistory({
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
      const historyRecords = await HistoryUserService.getAllHistory();
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
      const updatedHistory = await HistoryUserService.updateHistoryById(id, {
        ActionType,
        ActionTime,
        ChangeableUserID,
        AdminUserID,
      });
      res.status(200).json(updatedHistory);
    } catch (error) {
      if (error.message === "Запись истории не найдена") {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить запись истории по ID
  async deleteHistoryById(req, res) {
    const { id } = req.params;
    try {
      await HistoryUserService.deleteHistoryById(id);
      res.status(204).send(); // Успешное удаление
    } catch (error) {
      if (error.message === "Запись истории не найдена") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  // Получить историю по ChangeableUserID
  async getHistoryByUserId(req, res) {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "Необходимо указать ChangeableUserID" });
    }
    try {
      const history = await HistoryUserService.getHistoryByUserId(userId);
      res.status(200).json(history);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new HistoryUserController();
