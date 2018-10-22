var http = require("http");
var url = require("url");
var fp = require("./FilePersistence.js");
var express = require('express');
var router = express.Router();

var updateUser = function(userProfile){
    var users = fp.getUsers();
    
    var ok = false;
    for(var i=0;i<users.length;i++){
        if(users[i].id == userProfile.id){
            ok = true;
            //first_name and last_name are not editable.
            if(userProfile.username) users[i].username = userProfile.username;
            if(userProfile.age) users[i].age = userProfile.age;
            break;
        }
    }
    if(!ok){ 
        return;
    }
    file = "";
    for(var i=0;i<res.length;i++){
        file += JSON.stringify(res[i])+"\n";
    }
    var fs = require('fs')
    fs.writeFile(__dirname + '/../files/users.txt', file);
    console.log(file);
}

var deleteUser = function(stud){
    var users = fp.getUsers();
    var ok = false;
    for(var i=0;i<res.length;i++){
        if(res[i].id == stud.id){
            ok = true;
            res.splice(i, 1);
            break;
        }
    }
    if(!ok){
        return;
    }
    file = "";
    for(var i=0;i<res.length;i++){
        file += JSON.stringify(res[i])+"\n";
    }
    var fs = require('fs')
    fs.writeFile(__dirname + '/../files/users.txt', file);
    console.log(file);
}

var getJson = function(req) {
    var regex = /[?&]([^=#]+)=([^&#]*)/g, 
    url = req.url,
    params = {},
    match;
    while(match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    var jsn;
    try		
    {  
        jsn = JSON.parse(params); 
    }
    catch(e){  
        jsn = params;   
    }
    return jsn;
}

var app = express();

app.get('/profile/:id', function(req, res, next) {
    var jsn = getJson(req);
    console.log("GET Profile : " +req.url);
    var users = fp.getUsers();
    res.statusCode = 200;

    var id = req.params.id;
    for(var i in users) {
        var user = users[i];
        if(user.id == id) {
            res.end(JSON.stringify(users[i]));
        }
    }
    res.end("User Not Found");
});

app.get('/profiles', function(req, res, next) {
    var jsn = getJson(req);
    console.log("GET " +req.url);
    var users = fp.getUsers();
    res.statusCode = 200;
    res.end(JSON.stringify(users));
});

app.post('/profile/new', function(req, res, next) {
    var jsn = getJson(req);
    var body='';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function() {
           console.log("post : "+body);
            var user;
            try{ user = JSON.parse(body); }
            catch(e){  user = body;   }
            if(user == "") {
                try{ user = JSON.parse(jsn); }
                catch(e){  user = jsn;   }        
            }
            fp.createUser(user);
            res.statusCode = 200;
            console.log(user);
            res.end("sucess!")
    });
});


app.put('/profile/update', function(req,res,next) {
    var jsn = getJson(req);
    var body='';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function() {
            console.log("put : "+body);
            var user;
            try{ 
                user = JSON.parse(body); 
            }
            catch(e){  
                user = body;   
            }
            if(user == "") {
                try{ user = JSON.parse(jsn); }
                catch(e){  user = jsn;   }        
            }
            console.log(user);
            updateUser(user);
            res.statusCode = 200;
            res.end("sucess");
    });
    res.statusCode = 200;
    res.end("sucess");
});


app.delete('/profile/delete', function(req, res, next) {
    console.log("DELETE "+req.url);
    jsn = getJson(req);
    console.log(jsn);
    deleteUser(jsn);
    res.statusCode = 200;
    res.end("sucess");
});

var server = app.listen(8080, function () {
    var port = server.address().port;
    var fs = require('fs')
    fs.writeFile(__dirname + '/../files/users.txt', '');
    console.log("Example app listening at port %s", port)
});