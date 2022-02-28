const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
//const reactionSchema = require('./Reaction');
//const User = require('./User.js');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Enter a comment',           
        },
        username: {
            type: String,
            required: 'Enter your name',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Enter your thought',
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Enter your username'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    },
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.replies.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;