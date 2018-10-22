var UserProfile = function(id, first_name, last_name, username, age){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.age = age;
};

exports.getUsers = function () {
    err = {};
    res = Array();
    fs = require('fs');
        var studs  = fs.readFileSync(__dirname + '/../files/users.txt').toString().trim().split("\n");
        for(var i in studs){
            try{
                 js = JSON.parse(studs[i].trim());
                 res.push(js);
            }
            catch(e){
                console.log("Error " + e);
            }
    }
    console.log(res);
    return res;
};

exports.createUser = function (userProfile) {
    var err = {};
    try{
        fs = require('fs');
        console.log(JSON.stringify(userProfile));
        fs.appendFileSync(__dirname + '/../files/users.txt', JSON.stringify(userProfile)+"\n");
    }
    catch(e){
        console.log(e);
    }
};
