module.exports = (sequelize, Sequelize) => {
    const customer_follow = sequelize.define('customer_follow', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    });

    return customer_follow;
}