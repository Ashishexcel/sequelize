const { sequelize } = require("sequelize");

module.exports = (sequelize,DataTpes)=>{
    const User = sequelize.define('user',{
        firstname:DataTpes.STRING,
        lastname:DataTpes.STRING,
        username:DataTpes.STRING,
        email:DataTpes.STRING,
        password:DataTpes.STRING,
        confirmpassword:DataTpes.STRING,     
    },
    {
        freezeTableName:true
    }
    )

    User.associate = models => {
        User.hasMany(models.Address, {
          foreignKey: 'userid' ,
          as: "address"
        });
      }
    return User;
}