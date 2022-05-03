module.exports = (sequelize, Sequelize) => {
    const conversation_detail = sequelize.define('conversation_detail', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type : Sequelize.TEXT,
            allowNull : false
        },
    });

    return conversation_detail;
}