const {
  hashingPassword,
  passwordChecking,
} = require("../helpers/passwordHashing");
const {
  getUserService,
  createUserService,
  getByEmailService,
  getAllUsersService,
  editUserService,
  deleteUserService,
  getUserCartService,
} = require("../services/user.services");
const sendToken = require("../helpers/jwtToken");

const strongPasswordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const strongEmailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const firstnameRegex = /^[a-zA-Z]{3,15}$/;
const lastnameRegex = /^[a-zA-Z ]{2,30}$/;

const createUser = async (req, res) => {
  try {
    const user = req.body;

    const userExist = await getByEmailService(user.email);

    if (userExist)
      return res
        .status(400)
        .json({ message: "El email ya se encuentra registrado" });

    if (!user.password || !user.email || !user.firstname || !user.lastname)
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });

    if (!strongPasswordRegex.test(user.password))
      return res.status(400).json({
        message:
          "La contraseña debe tener al menos 8 carácteres y contener al menos una letra mayúscula, una letra minúscula y un número",
      });

    if (!strongEmailRegex.test(user.email))
      return res
        .status(400)
        .json({ message: "El correo ingresado no es valido" });

    if (!firstnameRegex.test(user.firstname))
      return res
        .status(400)
        .json({ message: "El nombre debe ser de 3 a 15 caracteres" });

    if (!lastnameRegex.test(user.lastname))
      return res
        .status(400)
        .json({ message: "El apellido debe ser de 2 a 30 caracteres" });

    const userWithPassHash = await hashingPassword(user);

    const userCreated = await createUserService(userWithPassHash);
    res
      .status(201)
      .json({ message: "Usuario creado con exito", user: userCreated });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const payload = req.body;
    const user = await getByEmailService(payload.email);

    if (!user)
      return res.status(400).json({ message: "El usuario no esta registrado" });

    const passMatch = await passwordChecking(payload.password, user.password);

    if (!passMatch)
      return res
        .status(400)
        .json({ message: "La contraseña ingresada no es valida" });

    sendToken(user, 201, res);
  } catch (error) {
    return res.status(400).json({ message: "Error al loguearse", error });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      message: "Cerraste sesion con exito!",
    });
  } catch (error) {
    return res.status(400).json({ message: "Error al cerrar sesión", error });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await getUserService(req.user.id);

    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el usuario", error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    if (!users) {
      return res.status(400).json({ message: "No hay usuarios registrados" });
    }

    res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const userEdited = await editUserService(id, payload);
    if (!userEdited) return res.status(404).json("Usuario no encontrado");
    res
      .status(200)
      .json({ message: "Usuario editado con exito", user: userEdited });
  } catch (error) {
    res.status(500).json({ message: "Error al editar el usuario", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userDeleted = await deleteUserService(id);

    if (!userDeleted) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    res
      .status(200)
      .json({ message: "Usuario eliminado con exito", user: userDeleted });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userWithPopulateCart = await getUserCartService(req.user.id);
    if(userWithPopulateCart.cart.length == 0) return res.status(400).json({ message: "No hay productos en el carrito" });
    res.status(200).json(userWithPopulateCart.cart);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el carrito", error });
  }
};

module.exports = {
  createUser,
  getUser,
  loginUser,
  logoutUser,
  getAllUsers,
  editUser,
  deleteUser,
  getUserCart,
};
