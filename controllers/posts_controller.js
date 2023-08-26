const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function (req, res) {

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'post created!'

            });

        }

        req.flash('success', 'post published');
        // call back function
        return res.redirect('back');

    }
    catch (err) {
        req.flash('error', err);
        return res.redirect('back');


    }


}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        //.id covert id to string
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'post deleted'
                });
            }
            req.flash('success', 'post and associated comments are deleted succesfuly');

            return res.redirect('back');


        } else {
            req.flash('error', 'you can not delete this post');

            res.redirect('back');
        }


    }
    catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }

}