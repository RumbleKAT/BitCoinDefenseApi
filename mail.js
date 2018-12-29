var nodeMailer = require('nodemailer');

var mail = (function(){
    let user = "***";

    var transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        secureConnection: true, //use SSL
        port: 465,
        auth: {
            user: user,
            pass: "***"
        }
    });

    let mailContext = {
        subject: "안녕하세요 비트코인 디펜스 운영진입니다.",
        context01: "<h1>해당 사용자 계정의 비밀번호가 변경되었습니다.</h1><hr><p>요청하신 계정의 비밀번호가 초기화되어<br>",
        context02: "으로 비밀번호가 변경되었습니다.<br>개인정보를 수정해주세요!.<br></p>",
        img: "<img src = data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAA6CAMAAACKwzt7AAAAJFBMVEX////MAADy1NTYbGzrv7/glJT14eHQQ0PlpaXNKSnUWFjcg4PoIbtuAAAAz0lEQVRoge3Z0Q6CMAyF4QljVHn/9/VCzhK61LYJRoznv5OV7duNXlhu16x8G2BEVy66ctGVq7tk8spPVndSJ4OrFi9MTidO6ipddNH1S6661zc3T8Nky0/K67MkXPd9YXFPw4KkJxseABpwrWEXbhB34TC66KKLLrrooouu48LVXEN00UUXXVFXsxaqNTm65kWFb/EHHpgu/Waf3KwFHLbpyXlwxTN/h86Mrlx05aIrV5nD4RX9v0KDa43v5abv/ib3juLv8YnooouuP3U9AaHjGugPCuL5AAAAAElFTkSuQmCC/>"
    }

    var mailOptions = {
        from : user,
        to : null,
        subject : null,
        //text : null,
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
        context: mailContext
    }

})();

module.exports = mail;
