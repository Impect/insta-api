function initAdminRouters(app) {
    require('./category.route')(app);
    require('./test_route')(app);
    require('./customer.route')(app);
    require('./customer.route')(app);
    require('./post.route')(app);
    require('./post_comment.route')(app);
    require('./post_like.route')(app);
    require('./customer_follow.route')(app);
    require('./conversation.route')(app);

}

module.exports = initAdminRouters;
