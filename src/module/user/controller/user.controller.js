
import cloudinary from '../../../services/cloudinary.js';
import userModel from './../../../../DB/models/user.model.js';

export const profile = (req, res) => {
    return res.json({ message: 'success' });
}

export const profilePic = async (req, res) => {

    if (!req.file) {
        return res.json({ message: 'file is required' });
    }
    const {secure_url} = await cloudinary.uploader.upload(req.file.path, { folder: 'saraha/user' });
    const user = await userModel.updateOne({ _id: req.id }, { profilePic: secure_url });
    return res.json({ message: 'profile updated successfully' });
}