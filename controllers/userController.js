const UserService = require("../services/UserService");

class UserController {
  // Метод для входа
  async login(req, res) {
    const { Email, Password } = req.body;
    try {
      const user = await UserService.login(Email, Password);
      // Здесь можно добавить логику для генерации JWT или сеанса
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  // Метод для регистрации
  async registration(req, res) {
    const {
      Email,
      FirstName,
      SecondName,
      LastName,
      PhoneNumber,
      Password = "rttrstrstr",
      Role,
    } = req.body;

    // Проверка обязательных полей
    if (!Email || !FirstName || !LastName || !Password || !Role) {
      return res
        .status(400)
        .json({ message: "Все поля обязательны для заполнения." });
    }

    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({ message: "Некорректный формат email." });
    }

    // Проверка длины пароля
    if (Password.length < 6) {
      // Минимальная длина пароля
      return res
        .status(400)
        .json({ message: "Пароль должен содержать минимум 6 символов." });
    }

    try {
      const newUser = await UserService.registration({
        Email,
        FirstName,
        SecondName,
        LastName,
        PhoneNumber,
        Password,
        Role,
      });
      res.status(201).json({
        message: "Пользователь успешно зарегистрирован",
        user: newUser,
      });
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      res.status(400).json({ message: error.message });
    }
  }

  // Метод для получения всех пользователей
  async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Метод для обновления пользователя по ID
  async updateUserById(req, res) {
    const { id } = req.params;
    const {
      Email,
      FirstName,
      SecondName,
      LastName,
      Password,
      PhoneNumber,
      Role,
      StatusNow,
    } = req.body;
    try {
      const updatedUser = await UserService.updateUserById(id, {
        Email,
        FirstName,
        SecondName,
        LastName,
        Password, // Не забудьте хешировать пароль
        PhoneNumber,
        Role,
        StatusNow,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error.message === "Пользователь не найден") {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  // Метод для удаления пользователя по ID
  async deleteUserById(req, res) {
    const { id } = req.params;
    try {
      await UserService.deleteUserById(id);
      res.status(204).send(); // Успешное удаление
    } catch (error) {
      if (error.message === "Пользователь не найден") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  // Метод для получения пользователя по ID
  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      if (error.message === "Пользователь не найден") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
