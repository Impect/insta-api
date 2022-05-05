const env = require('./env/db.env.js');
const Sequelize = require('sequelize');
// const { defaultValueSchemable } = require('sequelize/types/lib/utils');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    dialectOptions: {
        decimalNumbers: true,
        dateStrings: true,
        typeCast: true
    },
    timezone: "+08:00",

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    },
    define: {
        timestamps: true,
        freezeTableName: true
    },
    logging: console.log,   
    logging: function (str) {
        console.log(str);
        console.log(new Date().toISOString());
    }
});

const db = {};

db.testtable = require('../api/models/test_model')(sequelize, Sequelize);
db.category = require('../api/models/category.model')(sequelize, Sequelize);
db.post_comment = require('../api/models/post_comment.model')(sequelize, Sequelize);
db.conversation = require('../api/models/conversation.model')(sequelize, Sequelize);
db.conversation_detail = require('../api/models/conversation_detail.model')(sequelize, Sequelize);
db.customer = require('../api/models/customer.model')(sequelize, Sequelize);
db.customer_follow = require('../api/models/customer_follow.model')(sequelize, Sequelize);
db.post_like = require('../api/models/post_like.model')(sequelize, Sequelize);
db.post = require('../api/models/post.model')(sequelize, Sequelize);
db.post_images  = require('../api/models/post_images.model')(sequelize, Sequelize);

db.category.belongsTo(db.customer, {foreignKey: 'customerId', targetKey: 'id'});
db.customer.hasMany(db.category, {foreignKey: 'customerId', targetKey: 'id'});

db.post.belongsTo(db.category, {foreignKey: 'categoryId', targetKey: 'id'});
db.category.hasMany(db.post, {foreignKey: 'categoryId', targetKey: 'id'});

db.post.belongsTo(db.customer, {foreignKey: 'customerId', targetKey: 'id'});
db.customer.hasMany(db.post, {foreignKey: 'customerId', targetKey: 'id'});

db.post_images.belongsTo(db.post, {foreignKey: 'postId', targetKey: 'id'});
db.post.hasMany(db.post_images, {foreignKey: 'postId', targetKey: 'id'});

db.customer_follow.belongsTo(db.customer, {foreignKey: 'customerId', targetKey: 'id'});
db.customer.hasMany(db.customer_follow, {foreignKey: 'customerId', targetKey: 'id'});
db.customer_follow.belongsTo(db.customer, {foreignKey: 'followerId', targetKey: 'id'});
db.customer.hasMany(db.customer_follow, {foreignKey: 'followerId', targetKey: 'id'});

db.post_like.belongsTo(db.post, {foreignKey: 'postId', targetKey: 'id'});
db.post.hasMany(db.post_like, {foreignKey: 'postId', targetKey: 'id'});
db.post_like.belongsTo(db.customer, {foreignKey: 'customerId', targetKey: 'id'});
db.customer.hasMany(db.post_like, {foreignKey: 'customerId', targetKey: 'id'});

db.post_comment.belongsTo(db.post, {foreignKey: 'postId', targetKey: 'id'});
db.post.hasMany(db.post_comment, {foreignKey: 'postId', targetKey: 'id'});
db.post_comment.belongsTo(db.customer, {foreignKey: 'customerId', targetKey: 'id'});
db.customer.hasMany(db.post_comment, {foreignKey: 'customerId', targetKey: 'id'});

db.conversation.belongsTo(db.customer, {foreignKey: 'customerId', targetKey: 'id'});
db.customer.hasMany(db.conversation, {foreignKey: 'customerId', targetKey: 'id'});
db.conversation.belongsTo(db.customer, {foreignKey: 'customerId1', targetKey: 'id'});
db.customer.hasMany(db.conversation, {foreignKey: 'customerId1', targetKey: 'id'});

db.conversation_detail.belongsTo(db.customer, {foreignKey: 'customerId', targetKey: 'id'});
db.customer.hasMany(db.conversation_detail, {foreignKey: 'customerId', targetKey: 'id'});
db.conversation_detail.belongsTo(db.conversation, {foreignKey: 'conversationId', targetKey: 'id'});
db.conversation.hasMany(db.conversation_detail, {foreignKey: 'conversationId', targetKey: 'id'});


db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;