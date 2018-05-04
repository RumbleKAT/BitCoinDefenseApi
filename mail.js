var nodeMailer = require('nodemailer');
//1.q.a.z.! DefenceItYourself@gmail.com

var mail = (function(){
    let user = "DefenceItYourself@gmail.com";

    var transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        secureConnection: true, //use SSL
        port: 465,
        auth: {
            user: user,
            pass: "1.q.a.z.!"
        }
    });

    var mailOptions = {
        from : user,
        to : null,
        subject : null,
        text : null,
        html : null
    };

    function writeMail(obj){
        console.log("Sending Email!!");

        mailOptions.to = obj.to;
        mailOptions.subject = obj.subject;
        mailOptions.text = obj.text;
        mailOptions.html = obj.html;

        sendMail();
    }

    function sendMail(){
        transporter.sendMail(mailOptions,function(error, info){
            if(error) return console.log(error);

            console.log("Message send : " + info.response);
        });
    }

    return{
        write : function(obj){
            writeMail(obj);
        },
    }

})();

module.exports = mail;