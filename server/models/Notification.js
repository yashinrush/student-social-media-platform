import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Recipient
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Triggered by
    type: { type: String, enum: ['like', 'comment', 'follow', 'reply'], required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Optional, related post
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
