module.exports = (sequelize, Sequelize) => {
    const post_comment = sequelize.define('post_comment', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text : {
            type : Sequelize.TEXT,
            allowNull : false
        },
    });

    return post_comment;
}