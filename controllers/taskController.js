const Task = require("../models/task");
class TaskController {
  // Добавить новую задачу
  async addTask(req, res) {
    const { Category, Description, PhotoPath, LocationId } = req.body;
    try {
      const newTask = await Task.create({
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
      const tasks = await Task.findAll();
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
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: "Задача не найдена" });
      }
      // Обновление свойств задачи
      task.Category = Category;
      task.Description = Description;
      task.PhotoPath = PhotoPath;
      task.LocationId = LocationId;
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить задачу по ID
  async deleteTaskById(req, res) {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: "Задача не найдена" });
      }
      await task.destroy();
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TaskController();
