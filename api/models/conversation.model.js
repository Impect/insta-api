module.exports = (sequelize, Sequelize) => {
    const conversation = sequelize.define('conversation', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    });

    return conversation;
}