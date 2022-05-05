module.exports = (sequelize, Sequelize) => {
    const post_videos = sequelize.define('post_videos', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        video : {
            type : Sequelize.STRING,
            
        },
    });

    return post_videos;
}