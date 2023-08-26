const nodeMailer = require('../config/nodemailer');


// this is another way to exporting  arrow function
exports.newComment = (comment) => {
    console.log('yeah its working newComment inside new comments',comment);

    nodeMailer.transporter.sendMail({
        from: 'bendkolinanda12@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: '<h1>Your Comment is now published</h1>'


    }, (err, info) => {
        if (err) { console.log('error in sending mail', err); return; }

        console.log('Message sent', info);
        return;



    });

}