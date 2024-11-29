const RequestHistory = require("../models/requestHistory");

class RequestHistoryController {
  // Добавить новую запись истории запроса
  async addRequestHistory(req, res) {
    const { RequestId, UserId, Description } = req.body;
    try {
      const newRequestHistory = await RequestHistory.create({
        RequestId,
        UserId,
        Description,
      });
      res.status(201).json(newRequestHistory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Получить все записи истории запросов
  async getAll(req, res) {
    try {
      const requestHistories = await RequestHistory.findAll();
      res.status(200).json(requestHistories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Обновить запись истории запроса по ID
  async updateRequestHistoryById(req, res) {
    const { id } = req.params;
    const { RequestId, UserId, Description } = req.body;
    try {
      const requestHistory = await RequestHistory.findByPk(id);
      if (!requestHistory) {
        return res
          .status(404)
          .json({ message: "Запись истории запроса не найдена" });
      }
      // Обновление свойств записи истории запроса
      requestHistory.RequestId = RequestId;
      requestHistory.UserId = UserId;
      requestHistory.Description = Description;
      await requestHistory.save();
      res.status(200).json(requestHistory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить запись истории запроса по ID
  async deleteRequestHistoryById(req, res) {
    const { id } = req.params;
    try {
      const requestHistory = await RequestHistory.findByPk(id);
      if (!requestHistory) {
        return res
          .status(404)
          .json({ message: "Запись истории запроса не найдена" });
      }
      await requestHistory.destroy();
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RequestHistoryController();
