module.exports = (sequelize, Sequelize) => {
    const post_like = sequelize.define('post_like', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    });

    return post_like;
}