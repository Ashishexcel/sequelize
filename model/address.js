module.exports = (sequelize,DataTpes)=>{
    const Address = sequelize.define('address',{
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTpes.INTEGER,
          },
        userid :DataTpes.INTEGER,
        city:DataTpes.STRING,
        state:DataTpes.STRING,
        pin:DataTpes.INTEGER,
        
    },
    {
        freezeTableName:true
    }
    )
    Address.associate = (models) => {
        Address.belongsTo(models.User, {
          foreignKey: 'userid',
          as: "users",
        })
      }
    return Address;
}