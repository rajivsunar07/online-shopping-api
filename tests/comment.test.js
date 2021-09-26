const Comment = require('../models/comment');
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

describe('Comment Schema test ', () => { 
    // the code below is for insert testing
    it('Add comment test', () => {
        const comment = {
            '_id': mongoose.Types.ObjectId(),
            'description': 'this is a comment'
        };
        return Comment.create(comment).then((comment) => {
            expect(comment.description).toEqual('this is a comment');
        });
    });

    it('Update comment test', async () => {
        return Comment.findOneAndUpdate({ description : 'this is a comment' }, { $set: { description: 'new description' } }, {new: true})
            .then((comment) => {
                expect(comment.description).toEqual('new description')
            })
    });

    // the code below is for delete testing
    it('Delete comment test', async () => {
        const status = await Comment.deleteMany(); expect(status.ok).toBe(1);
    });
    
})