const RequestService = require("../services/RequestService");

class RequestController {
  // Добавить новый запрос
  async addRequest(req, res) {
    const { RequestPriority, DateTime, RequestStatus, TaskId, UserId } =
      req.body;
    try {
      const newRequest = await RequestService.addRequest({
        RequestPriority,
        DateTime,
        RequestStatus,
        TaskId,
        UserId,
      });
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Получить все запросы
  async getAll(req, res) {
    try {
      const requests = await RequestService.getAllRequests();
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Обновить запрос по ID
  async updateRequestById(req, res) {
    const { id } = req.params;
    const { RequestPriority, DateTime, RequestStatus, TaskId, UserId } =
      req.body;
    try {
      const updatedRequest = await RequestService.updateRequestById(id, {
        RequestPriority,
        DateTime,
        RequestStatus,
        TaskId,
        UserId,
      });
      res.status(200).json(updatedRequest);
    } catch (error) {
      if (error.message === "Запрос не найден") {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить запрос по ID
  async deleteRequestById(req, res) {
    const { id } = req.params;
    try {
      await RequestService.deleteRequestById(id);
      res.status(204).send(); // Успешное удаление
    } catch (error) {
      if (error.message === "Запрос не найден") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  // Получить запросы по UserId
  async getRequestsByUserId(req, res) {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Необходимо указать UserId" });
    }
    try {
      const requests = await RequestService.getRequestsByUserId(userId);
      res.status(200).json(requests);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Получить запросы по диапазону дат
  async getRequestsByDateRange(req, res) {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Необходимо указать начальную и конечную даты" });
    }
    try {
      const requests = await RequestService.getRequestsByDateRange(
        startDate,
        endDate
      );
      res.status(200).json(requests);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new RequestController();
