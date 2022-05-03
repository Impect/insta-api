module.exports = (sequelize, Sequelize) => {
    const testtable = sequelize.define('user', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        mail: {
            type: Sequelize.STRING(90),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return testtable;

}