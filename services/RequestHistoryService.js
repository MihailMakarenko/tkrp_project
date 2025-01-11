const RequestHistory = require("../models/requestHistory");

class RequestHistoryService {
  async addRequestHistory(data) {
    return await RequestHistory.create(data);
  }

  async getAllRequestHistories() {
    return await RequestHistory.findAll();
  }

  async updateRequestHistoryById(id, data) {
    const requestHistory = await RequestHistory.findByPk(id);
    if (!requestHistory) {
      throw new Error("Запись истории запроса не найдена");
    }
    // Обновляем свойства записи истории запроса
    Object.assign(requestHistory, data);
    await requestHistory.save();
    return requestHistory;
  }

  async deleteRequestHistoryById(id) {
    const requestHistory = await RequestHistory.findByPk(id);
    if (!requestHistory) {
      throw new Error("Запись истории запроса не найдена");
    }
    await requestHistory.destroy();
  }
}

module.exports = new RequestHistoryService();
