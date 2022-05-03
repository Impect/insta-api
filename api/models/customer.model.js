module.exports = (sequelize, Sequelize) => {
    const customer = sequelize.define('customer', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        lastname : {
            type : Sequelize.STRING,
            allowNull : true
        },
        firstname : {
            type : Sequelize.STRING,
            allowNull : true
        },
        username : {
            type : Sequelize.STRING,
            allowNull : false
        },
        email : {
            type : Sequelize.STRING,
            allowNull : false
        },
        phonenumber : {
            type : Sequelize.INTEGER,
            allowNull : true
        },
        password : {
            type : Sequelize.STRING,
            allowNull : false
        },
        gender : {
            type : Sequelize.STRING(10),
            allowNull : true
        },
        birth : {
            type : Sequelize.DATEONLY,
            allowNull : true,
        },
        profileImage : {
            type : Sequelize.STRING,
            allowNull : true
        },
        coverImage : {
            type : Sequelize.STRING,
            allowNull : true
        },
        token : {
            type : Sequelize.STRING,
            allowNull : true
        }
    });

    return customer;
}