// Dependencies
const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Please enter a username!',
            trim: true
        },
        email: {
            type: String,
            required: 'Please enter an email address!',
            unique: true,
            match: [/.+\@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('User', UserSchema);

// Export the User model
module.exports = User;

