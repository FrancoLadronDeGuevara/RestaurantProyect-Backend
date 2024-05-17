const {Router} = require('express');
const { createUser,loginUser, getUser, logoutUser } = require('../controllers/user.controller');
const { isAuthenticated } = require('../middlewares/auth');
const route = Router();

route.post('/create', createUser); 

route.post('/login-user', loginUser);

route.get('/get-user', isAuthenticated, getUser)

route.get('/logout-user', logoutUser);

module.exports = route;
