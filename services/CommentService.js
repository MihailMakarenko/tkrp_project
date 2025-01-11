const Comment = require("../models/comment");

class CommentService {
  async createComment(data) {
    return await Comment.create(data);
  }

  async getAllComments() {
    return await Comment.findAll();
  }

  async updateCommentById(id, data) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error("Комментарий не найден");
    }
    // Обновляем свойства комментария
    Object.assign(comment, data);
    await comment.save();
    return comment;
  }

  async deleteCommentById(id) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error("Комментарий не найден");
    }
    await comment.destroy();
  }

  async getCommentsByUserId(userId) {
    const comments = await Comment.findAll({ where: { UserId: userId } });
    if (comments.length === 0) {
      throw new Error("Комментариев не найдено для этого пользователя");
    }
    return comments;
  }

  async getCommentsByRequestId(requestId) {
    const comments = await Comment.findAll({ where: { RequestId: requestId } });
    if (comments.length === 0) {
      throw new Error("Комментариев не найдено для данного RequestId");
    }
    return comments;
  }

  async getCommentById(commentId) {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      throw new Error("Комментарий не найден");
    }
    return comment;
  }
}

module.exports = new CommentService();
