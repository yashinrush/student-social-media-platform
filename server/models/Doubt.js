import mongoose from 'mongoose';

const doubtSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: String, required: true },
    subject: { type: String, required: true }, // DSA, DBMS, CN
    description: { type: String }, // Code snippet or details
    isSolved: { type: Boolean, default: false },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    answers: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        isAccepted: { type: Boolean, default: false },
        upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        date: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

const Doubt = mongoose.model('Doubt', doubtSchema);
export default Doubt;
