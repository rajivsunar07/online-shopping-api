// use the path of your model
const Product = require('../models/product');
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

describe('Product Schema test ', () => { 
    // the code below is for insert testing
    it('Add product test', () => {
        const product = {
            '_id': mongoose.Types.ObjectId(),
            'name': 'Tshirt',
            'price': '21',
            'for': ['sell'],
            'description': 'This is a whit tshirt'
        };
        return Product.create(product).then((product) => {
            expect(product.name).toEqual('Tshirt');
        });
    });

    it('Update product test', async () => {
        return Product.findOneAndUpdate({ name: 'Tshirt' }, { $set: { name: 'Pant' } }, {new: true})
            .then((product) => {
                expect(product.name).toEqual('Pant')
            })
    });

    // the code below is for delete testing
    it('Delete product test', async () => {
        const status = await Product.deleteMany(); expect(status.ok).toBe(1);
    });
    
})