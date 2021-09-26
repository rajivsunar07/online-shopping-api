// use the path of your model
const OrderItem = require('../models/orderItem');
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

describe('Order Item Schema test ', () => { 
    // the code below is for insert testing
    it('Add Order Item test', () => {
        const orderItem = {
            '_id': mongoose.Types.ObjectId(),
            'quantity': 2,
            'price': 1000,
            'for': 'sell'
        };
        return OrderItem.create(orderItem).then((orderItem) => {
            expect(orderItem.price).toEqual(1000);
        });
    });

    it('Update Order Item test', async () => {
        return OrderItem.findOneAndUpdate({ quantity : 2 }, { $set: { price: 3000 } }, {new: true})
            .then((orderItem) => {
                expect(orderItem.price).toEqual(3000)
            })
    });

    // the code below is for delete testing
    it('Delete Order Item test', async () => {
        const status = await OrderItem.deleteMany(); expect(status.ok).toBe(1);
    });
    
})