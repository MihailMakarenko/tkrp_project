const HistoryUser = require("../models/historyUser");

class HistoryUserService {
  async addHistory(data) {
    return await HistoryUser.create(data);
  }

  async getAllHistory() {
    return await HistoryUser.findAll();
  }

  async updateHistoryById(id, data) {
    const historyRecord = await HistoryUser.findByPk(id);
    if (!historyRecord) {
      throw new Error("Запись истории не найдена");
    }
    // Обновляем свойства записи истории
    Object.assign(historyRecord, data);
    await historyRecord.save();
    return historyRecord;
  }

  async deleteHistoryById(id) {
    const historyRecord = await HistoryUser.findByPk(id);
    if (!historyRecord) {
      throw new Error("Запись истории не найдена");
    }
    await historyRecord.destroy();
  }

  async getHistoryByUserId(userId) {
    const history = await HistoryUser.findAll({
      where: { ChangeableUserID: userId },
    });
    if (history.length === 0) {
      throw new Error("История не найдена для данного пользователя");
    }
    return history;
  }
}

module.exports = new HistoryUserService();
