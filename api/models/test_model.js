module.exports = (sequelize, Sequelize) => {
    const testtable = sequelize.define('testtable', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(90),
            allowNull: false
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return testtable;

}