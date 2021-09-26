// use the path of your model
const Checkout = require('../models/checkout');
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

describe('Checkout Schema test ', () => { 
    // the code below is for insert testing
    it('Add Checkout test', () => {
        const checkout = {
            '_id': mongoose.Types.ObjectId(),
            'address': 'Kathmandu',
            'phone': '983846382973'
        };
        return Checkout.create(checkout).then((checkout) => {
            expect(checkout.address).toEqual('Kathmandu');
        });
    });

    it('Update Checkout test', async () => {
        return Checkout.findOneAndUpdate({ address: 'Kathmandu' }, { $set: { address: 'Nepal' } }, {new: true})
            .then((checkout) => {
                expect(checkout.address).toEqual('Nepal')
            })
    });

    // the code below is for delete testing
    it('Delete Checkout test', async () => {
        const status = await Checkout.deleteMany(); expect(status.ok).toBe(1);
    });
    
})