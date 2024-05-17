const {hashingPassword, passwordChecking} = require('../helpers/passwordHashing');
const { getUserService, createUserService, getByEmailService } = require('../services/user.services');
const sendToken = require('../helpers/jwtToken');

const createUser = async (req, res) => {
    try {
        const user = req.body;

        const userWithPassHash = await hashingPassword(user);

        const userCreated = await createUserService(userWithPassHash);
        res.status(201).json({message:"Usuario creado con exito", user: userCreated});
    } catch (error) {
        res.status(500).json({message:"Error al crear usuario", error});
    }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getByEmailService(email);

    if (!user) return res.status(400).json({message:"El usuario no esta registrado"});

    const passMatch = await passwordChecking(password, user.password);

    if (!passMatch) return res.status(400).json({message:"La contraseña ingresada no es valida"});

    sendToken(user, 201, res);
  } catch (error) {
    return res.status(400).json({message:"Error al loguearse", error});
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.status(200).json({
      message: 'Cerraste sesion con exito!',
    });
  } catch (error) {
    return res.status(400).json({message:"Error al cerrar sesión", error});
  }
};

const getUser = async (req, res, next) => {
    try {
      const user = await getUserService(req.user.id);
  
      if (!user) {
        return res.status(400).json({message:"El usuario no existe"});
      }
      
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({message:"Error al obtener el usuario", error});
    }
  };
  



module.exports = { createUser, getUser, loginUser, logoutUser};