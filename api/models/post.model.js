module.exports = (sequelize, Sequelize) => {
    const post = sequelize.define('post', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type : Sequelize.STRING,
            allowNull : false
        },
        descr : {
            type : Sequelize.STRING,
            allowNull : false
        },
        data : {
            type : Sequelize.BLOB("long"),
            allowNull: true
        },
        qty : {
            type : Sequelize.INTEGER,
            allowNull : false,
            defaultValue: 0
        },
        price : {
            type : Sequelize.INTEGER,
            allowNull : false,
            defaultValue: 0
        },
        order : {
            type : Sequelize.INTEGER,
            allowNull : false,
            defaultValue: 0
        },
    });

    return post;
}