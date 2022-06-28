const dbConfig = require('../config/db_config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DATABASE,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.DIALECT
});

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require('./userschema')(sequelize,Sequelize.DataTypes)
db.models.Address = require('./address')(sequelize,Sequelize.DataTypes)


db.models.User.belongsTo(db.models.Address);
db.models.Address.hasMany(db.models.User);



module.exports = db
