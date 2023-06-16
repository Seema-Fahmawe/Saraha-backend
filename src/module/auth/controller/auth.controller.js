
import userModel from './../../../../DB/models/user.model.js';
import { hash } from '../../../services/HashAndCompare.js';
import { compare } from '../../../services/HashAndCompare.js';
import { generateToken, verifyToken } from '../../../services/GenerateAndVerifyToken.js';
import { sendEmail } from '../../../services/sendEmail.js';

export const signup = async (req, res) => {

    const { userName, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        return res.status(409).json({ message: 'email already exists' });
    }
    const token = generateToken({ email }, process.env.EMAIL_TOKEN)
    const link = `http://localhost:3000/auth/confirmEmail/${token}`;
    const hashPassword = hash(password);
    sendEmail(email, 'confirm Email', `<a href="${link}">verify your email</a>`)
    const createUser = await userModel.create({ userName, email, password: hashPassword });
    return res.status(201).json({ message: 'success', user: createUser._id });
}


export const login = async (req, res) => {

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.json({ message: 'email not exists' });
    }
    if (!user.confirmEmail) {
        return res.json({ message: 'plz verify your email' });
    }
    const match = compare(password, user.password);
    if (!match) {
        return res.json({ message: 'invalid account' });
    } else {
        const token = generateToken({ id: user._id })
        return res.status(200).json({ message: 'success', token });
    }
}

export const confirmEmail = async (req, res) => {
    
    const { token } = req.params;
    const decode = verifyToken(token, process.env.EMAIL_TOKEN);
    const user = await userModel.updateOne({ email: decode.email }, { confirmEmail: true });
    return res.json({ message: 'your email is confirmed,your can login' });
}