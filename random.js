
var randomize = (function(){
    var password = Array(8).fill(0);

    function stringRandom(){
        return String.fromCharCode(Math.floor(Math.random() * (122 - 65 + 1) + 65));
    }

    function numberRandom(){
        return Math.floor(Math.random() * 10) + 1;
    }

    function getPassword(){
        password.map((index, i)=>{
            if(i % 2 == 0){
                password[i] = stringRandom();
            }else {
                password[i] = numberRandom();
            }
        });
        password = password.join('');

        return password;
    }

    return {
        getPassword : function(){
            return getPassword();
        }
    }
})();

module.exports = randomize;