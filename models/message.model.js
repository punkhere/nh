const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  chat_id: { type: String, required: true },
  message_id: { type: Number, required: true },
  current: Number,
  history: [Number],
},  { timestamps: true });

module.exports = model("Message", messageSchema);
