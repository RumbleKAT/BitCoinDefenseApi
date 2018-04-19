var nullCheck = function(obj){

    if(Object.keys(obj).length == 0){
        console.log("This obj is null");
        return false
    }else{
        console.log("This obj has value");
        return true
    }
}

module.exports = {
    nullCheck : nullCheck
}