import { response, request } from 'express';
import { generateJWT } from '../helpers/index.js';
import  {User} from '../models/index.js';
import { comparePassword, encryptPassword } from '../utils/index.js';

export const createUser = async (req = request, res = response) => {
  const { password } = req.body;

  try {
    const user = new User(req.body);

    // Encriptar contraseña
    user.password = await encryptPassword(password);
    await user.save();

    // Generar JWT
    const token = await generateJWT(user.id,user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

export const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const verifyPassword = await comparePassword(password, user.password);
    if (!verifyPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario y/o contraseña incorrectos',
      });
    };

    // Generar JWT
    const token = await generateJWT(user.id,user.name);

    res.status(200).json({
      ok: true,
      uid: user.id,
      email: user.email,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

export const renewToken = async(req, res = response) => {

  const { uid,name } = req;

  // Generar nuevo JWT
  const token = await generateJWT(uid,name);

  res.json({
    ok: true,
    token,
  });
};
