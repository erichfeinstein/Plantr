const db = require('./models')[0];
const Sequelize = require('sequelize');

db.sync({
        // force: true
    })
    .then(() => {
        console.log('DB Has Synced!')
    })
    .catch(err => {
        console.log('Disaster');
        console.log(err);
    })
    .finally(() => {
        // db.close()
    })


const Gardener = db.define('gardeners', {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER
})

const Plot = db.define('plot', {
    size: Sequelize.INTEGER,
    shaded: Sequelize.BOOLEAN
})

const Vegetable = db.define('vegetables', {
    name: Sequelize.STRING,
    color: Sequelize.STRING,
    planted_on: Sequelize.DATE
})

Vegetable.belongsToMany(Plot, {
    through: 'vegetable_plot'
})
Plot.belongsToMany(Vegetable, {
    through: 'vegetable_plot'
})
Gardener.hasOne(Plot);
Plot.belongsTo(Gardener);
Gardener.belongsTo(Vegetable, {
    as: 'favorite_vegetable'
});


//Make some vegetables
const okraPromise = new Promise(function(resolve, reject) {
    try {
        return Vegetable.create({
            name: 'okra',
            color: 'green',
            createdAt: new Date()
        });
    } catch (error) {
        console.log('problem is here', error);
    }
})
const spinachPromise = new Promise(function(resolve, reject) {
    try {
        return Vegetable.create({
            name: 'spinach',
            color: 'green',
            createdAt: new Date()
        });
    } catch (error) {
        console.log('problem is here', error);
    }
})
const carrotPromise = new Promise(function(resolve, reject) {
    try {
        return Vegetable.create({
            name: 'carrot',
            color: 'orange',
            createdAt: new Date()
        });
    } catch (error) {
        reject();
        console.log('problem is here', error);
    }
})

//Make some gardeners and their plots
Gardener.create({
    name: 'Michael Scott',
    age: 38
}).then(gardener => {
    return Plot.create({
        size: 100,
        shaded: true,
        createdAt: new Date(),
        gardenerId: gardener.id
    });
});

Gardener.create({
    name: 'Tom Haverford',
    age: 25
}).then(gardener => {
    return Plot.create({
        size: 1000,
        shaded: false,
        createdAt: new Date(),
        gardenerId: gardener.id
    });
});

Gardener.create({
    name: 'Walter White',
    age: 55
}).then(gardener => {
    return Plot.create({
        size: 400,
        shaded: true,
        createdAt: new Date(),
        gardenerId: gardener.id
    });
});
