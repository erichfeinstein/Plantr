const db = require('./models')[0];
const Sequelize = require('sequelize');

db.sync({force: true})
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

function init() {
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
        plated_on: Sequelize.DATE
    })

    Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'})
    Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'})
    Gardener.hasOne(Plot);
    Plot.belongsTo(Gardener);
    Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'});
    //Vegetable.hasMany(Gardener);
}

init();