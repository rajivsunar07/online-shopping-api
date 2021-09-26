// use the path of your model
const Order = require('../models/order');
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

describe('Order Schema test ', () => { 
    // the code below is for insert testing
    it('Add order test', () => {
        const order = {
            '_id': mongoose.Types.ObjectId(),
            'total_price': 2000,
        };
        return Order.create(order).then((order) => {
            expect(order.total_price).toEqual(2000);
        });
    });

    it('Update order test', async () => {
        return Order.findOneAndUpdate({ total_price : 2000 }, { $set: { total_price: 3000 } }, {new: true})
            .then((order) => {
                expect(order.total_price).toEqual(3000)
            })
    });

    // the code below is for delete testing
    it('Delete order test', async () => {
        const status = await Order.deleteMany(); expect(status.ok).toBe(1);
    });
    
})