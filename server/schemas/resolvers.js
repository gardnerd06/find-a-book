const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        users: async () => {
            return User.find();
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            console.log(user);
            const token = signToken(user);
            console.log(token);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            // login: async (parent, { email, password }) => {
            const user = await User.findOne({ $or: [{ password: password }, { email: email }] });

            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { authors, description, bookId, image, link, title }, context) => {
            console.log(context.user);
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: { authors, description, bookId, image, link, title } } },
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, { bookId, userId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;

