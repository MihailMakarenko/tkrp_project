const Request = require("../models/request");
const { Op } = require("sequelize");

class RequestService {
  async addRequest(data) {
    return await Request.create(data);
  }

  async getAllRequests() {
    return await Request.findAll();
  }

  async updateRequestById(id, data) {
    const request = await Request.findByPk(id);
    if (!request) {
      throw new Error("Запрос не найден");
    }
    // Обновляем свойства запроса
    Object.assign(request, data);
    await request.save();
    return request;
  }

  async deleteRequestById(id) {
    const request = await Request.findByPk(id);
    if (!request) {
      throw new Error("Запрос не найден");
    }
    await request.destroy();
  }

  async getRequestsByUserId(userId) {
    const requests = await Request.findAll({
      where: { UserId: userId },
    });
    if (requests.length === 0) {
      throw new Error("Запросы не найдены для данного пользователя");
    }
    return requests;
  }

  async getRequestsByDateRange(startDate, endDate) {
    const requests = await Request.findAll({
      where: {
        DateTime: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
    });
    if (requests.length === 0) {
      throw new Error("Запросов не найдено за указанный период");
    }
    return requests;
  }
}

module.exports = new RequestService();
