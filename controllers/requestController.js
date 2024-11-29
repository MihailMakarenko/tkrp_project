const Request = require("../models/request");

class RequestController {
  // Добавить новый запрос
  async addRequest(req, res) {
    const { RequestPriority, DateTime, RequestStatus, TaskId, UserId } =
      req.body;
    try {
      const newRequest = await Request.create({
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
      const requests = await Request.findAll();
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
      const request = await Request.findByPk(id);
      if (!request) {
        return res.status(404).json({ message: "Запрос не найден" });
      }
      // Обновление свойств запроса
      request.RequestPriority = RequestPriority;
      request.DateTime = DateTime;
      request.RequestStatus = RequestStatus;
      request.TaskId = TaskId;
      request.UserId = UserId;
      await request.save();
      res.status(200).json(request);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить запрос по ID
  async deleteRequestById(req, res) {
    const { id } = req.params;
    try {
      const request = await Request.findByPk(id);
      if (!request) {
        return res.status(404).json({ message: "Запрос не найден" });
      }
      await request.destroy();
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RequestController();
