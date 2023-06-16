import userModel from "../../../../DB/models/user.model.js";
import messageModel from '../../../../DB/models/messages.model.js';
import { response } from "express";

export const getMessage = async (req, res) => {
    const messageList = await messageModel.find({ receiverId: req.id });
    return res.json({ message: 'success', messageList });
}

export const sendMessage = async (req, res) => {
    const { receiverId } = req.params;
    const { message } = req.body;
    const user = await userModel.findById(receiverId);
    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }
    const createMessage = await messageModel.create({ receiverId, message });
    return res.json({ message: 'success', createMessage });
}

export const deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    const id = req.id;
    const message = await messageModel.deleteOne({ _id: messageId, receiverId: id });
    if (message.deletedCount == 0) {
        return res.status(400).json({ message: 'invalid user id or message id' });
    }
    return res.json({ message: 'success' });
}

