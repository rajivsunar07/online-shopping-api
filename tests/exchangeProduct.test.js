// use the path of your model
const ExchangeProduct = require('../models/exchangeProduct');
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

describe('Exchange Product Schema test ', () => { 
    // the code below is for insert testing
    it('Add Exchange Product test', () => {
        const exchangeProduct = {
            '_id': mongoose.Types.ObjectId(),
            'name': 'Tshirt',
            'description': 'This is a white tshirt'
        };
        return ExchangeProduct.create(exchangeProduct).then((exchangeProduct) => {
            expect(exchangeProduct.name).toEqual('Tshirt');
        });
    });

    it('Update Exchange Product test', async () => {
        return ExchangeProduct.findOneAndUpdate({ name: 'Tshirt' }, { $set: { name: 'Pant' } }, {new: true})
            .then((exchangeProduct) => {
                expect(exchangeProduct.name).toEqual('Pant')
            })
    });

    // the code below is for delete testing
    it('Delete Exchange Product test', async () => {
        const status = await ExchangeProduct.deleteMany(); expect(status.ok).toBe(1);
    });
    
})