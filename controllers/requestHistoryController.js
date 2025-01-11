const RequestHistoryService = require("../services/RequestHistoryService");

class RequestHistoryController {
  // Добавить новую запись истории запроса
  async addRequestHistory(req, res) {
    const { RequestId, UserId, Description } = req.body;
    try {
      const newRequestHistory = await RequestHistoryService.addRequestHistory({
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
      const requestHistories =
        await RequestHistoryService.getAllRequestHistories();
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
      const updatedRequestHistory =
        await RequestHistoryService.updateRequestHistoryById(id, {
          RequestId,
          UserId,
          Description,
        });
      res.status(200).json(updatedRequestHistory);
    } catch (error) {
      if (error.message === "Запись истории запроса не найдена") {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить запись истории запроса по ID
  async deleteRequestHistoryById(req, res) {
    const { id } = req.params;
    try {
      await RequestHistoryService.deleteRequestHistoryById(id);
      res.status(204).send(); // Успешное удаление
    } catch (error) {
      if (error.message === "Запись истории запроса не найдена") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RequestHistoryController();
