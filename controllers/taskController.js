const TaskService = require("../services/TaskService");

class TaskController {
  // Добавить новую задачу
  async addTask(req, res) {
    const { Category, Description, PhotoPath, LocationId } = req.body;
    try {
      const newTask = await TaskService.addTask({
        Category,
        Description,
        PhotoPath,
        LocationId,
      });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Получить все задачи
  async getAll(req, res) {
    try {
      const tasks = await TaskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Обновить задачу по ID
  async updateTaskById(req, res) {
    const { id } = req.params;
    const { Category, Description, PhotoPath, LocationId } = req.body;
    try {
      const updatedTask = await TaskService.updateTaskById(id, {
        Category,
        Description,
        PhotoPath,
        LocationId,
      });
      res.status(200).json(updatedTask);
    } catch (error) {
      if (error.message === "Задача не найдена") {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить задачу по ID
  async deleteTaskById(req, res) {
    const { id } = req.params;
    try {
      await TaskService.deleteTaskById(id);
      res.status(204).send(); // Успешное удаление
    } catch (error) {
      if (error.message === "Задача не найдена") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  // Получить задачи по номеру комнаты
  async getTasksByRoomNumber(req, res) {
    const { roomNumber } = req.params;
    try {
      const tasks = await TaskService.getTasksByRoomNumber(roomNumber);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Получить задачи по категории
  async getTasksByCategory(req, res) {
    const { category } = req.params;
    if (!category) {
      return res.status(400).json({ message: "Необходимо указать категорию" });
    }
    try {
      const tasks = await TaskService.getTasksByCategory(category);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new TaskController();
