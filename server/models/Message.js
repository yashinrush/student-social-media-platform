import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For 1:1
    community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' }, // For Group Chat
    content: { type: String },
    image: { type: String }, // Optional image
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;
