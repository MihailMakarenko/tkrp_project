const User = require("../models/user");

class UserController {
  // Метод для входа
  async login(req, res) {
    const { Email, Password } = req.body;
    try {
      const user = await User.findOne({ where: { Email, Password } });
      if (!user) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }
      // Здесь можно добавить логику для генерации JWT или сеанса
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Метод для регистрации
  async registration(req, res) {
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
      const newUser = await User.create({
        Email,
        FirstName,
        SecondName,
        LastName,
        Password,
        PhoneNumber,
        Role,
        StatusNow,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Метод для получения всех пользователей
  async getAll(req, res) {
    try {
      const users = await User.findAll();
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
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      // Обновление свойств пользователя
      user.Email = Email;
      user.FirstName = FirstName;
      user.SecondName = SecondName;
      user.LastName = LastName;
      user.Password = Password; // Не забудьте хешировать пароль
      user.PhoneNumber = PhoneNumber;
      user.Role = Role;
      user.StatusNow = StatusNow;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Метод для удаления пользователя по ID
  async deleteUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      await user.destroy();
      res.status(204).send(); // Успешное удаление, но без содержимого
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new User();

// const User = require("../models/user"); // Импорт модели User
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// require("dotenv").config();
// // const { Sequelize } = require("sequelize");
// // const { mergeDefaults } = require("sequelize/lib/utils");

// class UserController {
//   // Получить список пользователей
//   async getAllUsers(req, res) {
//     try {
//       const users = await User.findAll();
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//   // Получить пользователя по UserId
//   async getUserById(req, res) {
//     const { UserId } = req.params;
//     try {
//       const user = await User.findByPk(UserId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//   // Добавить нового пользователя
//   async createUser(req, res) {
//     console.log(req.body);
//     // res.status(201).json({ message: "Мы сюда дошли" });
//     const saltRounds = 10;
//     const {
//       FirstName,
//       LastName,
//       Email,
//       PhoneNumber,
//       isGetNotifications,
//       Password,
//       Role,
//     } = req.body;

//     try {
//       // Хешируем пароль
//       const hashedPassword = bcrypt.hashSync(Password, saltRounds);
//       // console.log("Пользователь создан");

//       // Создаем нового пользователя
//       const user = await User.create({
//         FirstName,
//         LastName,
//         Email,
//         PhoneNumber,
//         Password: hashedPassword,
//         isGetNotifications,
//       });

//       // Возвращаем созданного пользователя
//       res.status(201).json(user);
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({ message: "Ошибка регистрации пользователя" }); // Обработка ошибок
//     }
//   }

//   // Обновить пользователя
//   async updateUser(req, res) {
//     const { UserId } = req.params;
//     const {
//       FirstName,
//       LastName,
//       Email,
//       PhoneNumber,
//       isGetNotifications,
//       Password,
//     } = req.body;
//     try {
//       const user = await User.findByPk(UserId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       user.FirstName = FirstName;
//       user.LastName = LastName;
//       user.Email = Email;
//       user.PhoneNumber = PhoneNumber;
//       user.isGetNotifications = isGetNotifications;
//       user.Password = Password;
//       await user.save();
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   // Удалить пользователя
//   async deleteUser(req, res) {
//     const { UserId } = req.params;
//     try {
//       const user = await User.findByPk(UserId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       await user.destroy();
//       res.status(204).send(); // Успешное удаление, но без содержимого
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//   async login(req, res) {
//     const candidate = await User.findOne({ where: { Email: req.body.Email } });
//     if (candidate) {
//       const passwordResult = bcrypt.compareSync(
//         req.body.Password,
//         candidate.Password
//       );

//       if (passwordResult) {
//         const token = jwt.sign(
//           {
//             Email: candidate.Email,
//             userId: candidate.UserId,
//             role: candidate.Role,
//           },
//           `${process.env.SECRET_KEY}`,
//           { expiresIn: 60 * 60 }
//         );
//         res.status(200).json({
//           token: `Bearer ${token}`,
//           userRole: candidate.Role,
//         });
//       } else {
//         res.status(401).json({
//           message: "Пароли не совпадают",
//         });
//       }
//     } else {
//       res.status(404).json({
//         message: "пользователь с таким email не найден",
//       });
//     }
//   }

//   // async register(req, res) {}
// }

// module.exports = new UserController();
