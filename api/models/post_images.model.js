module.exports = (sequelize, Sequelize) => {
    const post_images = sequelize.define('post_images', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image : {
            type : Sequelize.STRING,
            
        },
    });

    return post_images;
}