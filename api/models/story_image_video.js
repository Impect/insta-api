module.exports = (sequelize, Sequelize) => {
    const story_image_video = sequelize.define('story_image_video', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        file : {
            type : Sequelize.STRING,
            allowNull : false
        },
    });

    return story_image_video;
}