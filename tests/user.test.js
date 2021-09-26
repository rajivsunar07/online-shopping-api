// use the path of your model
const User = require('../models/user');
const mongoose = require('mongoose');

// use the new name of the database
const url = 'mongodb://localhost:27017/hamroshop-test';

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Schema test ', () => { 
    // the code below is for insert testing
    it('Add user test', () => {
        const user = {
            '_id': mongoose.Types.ObjectId(),
            'name': 'user',
            'password': 'password',
            'email': 'user@email.com'
        };
        return User.create(user).then((user) => {
            expect(user.name).toEqual('user');
        });
    });

    it('Update user test', async () => {
        return User.findOneAndUpdate({ name: 'user' }, { $set: { email: 'user1@email.com' } }, {new: true})
            .then((user) => {
                expect(user.email).toEqual('user1@email.com')
            })
    });

    // the code below is for delete testing
    it('Delete user test', async () => {
        const status = await User.deleteMany(); expect(status.ok).toBe(1);
    });
    
})