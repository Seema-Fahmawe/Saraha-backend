import userModel from "../../DB/models/user.model.js";
import { verifyToken } from "../services/GenerateAndVerifyToken.js";

export const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
        return res.json({ message: 'invalid bearer key' });
    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    if (!token) {
        return res.json({ message: 'invalid token' });
    }
    const decoded = verifyToken(token);
    const authUser = await userModel.findById(decoded.id).select('userName email');
    if (!authUser) {
        return res.json({ message: 'not register account' });
    }
    req.id = decoded.id;
    next();
}