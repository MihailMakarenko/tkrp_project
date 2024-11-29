const Comment = require("../models/comment");

class CommentController {
  // Создать новый комментарий
  async createComment(req, res) {
    const { Text, DateTime, UserId, RequestId } = req.body;
    try {
      const newComment = await Comment.create({
        Text,
        DateTime,
        UserId,
        RequestId,
      });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Получить все комментарии
  async getAll(req, res) {
    try {
      const comments = await Comment.findAll();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Обновить комментарий по ID
  async updateCommentById(req, res) {
    const { id } = req.params;
    const { Text, DateTime, UserId, RequestId } = req.body;
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: "Комментарий не найден" });
      }
      // Обновление свойств комментария
      comment.Text = Text;
      comment.DateTime = DateTime;
      comment.UserId = UserId;
      comment.RequestId = RequestId;
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Удалить комментарий по ID
  async deleteCommentById(req, res) {
    const { id } = req.params;
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: "Комментарий не найден" });
      }
      await comment.destroy();
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = new CommentController();
