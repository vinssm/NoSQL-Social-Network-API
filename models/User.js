// Dependencies
const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Enter your  username',
            trim: true
        },
        email: {
            type: String,
            required: 'Enter your email address',
            unique: true,
            validate: {
                validator(validEmail) {
                  return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
                    validEmail
                  );
                },
                message: "Enter a valid email address",
              },
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

// Friend Count
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


const User = model('User', UserSchema);

// Export Users
module.exports = User;

