#!/usr/bin/env node
require('shelljs/global');
var Upyun = require('upyun-classic');
var cfg = require('../config');
var clip = require('cliparoo');
var chalk = require('chalk');

var filename = process.argv[2];

var upyun = new Upyun(cfg.bucket, cfg.operator, cfg.password, 'v0'); 

if (process.argv[2] === 'ls'){

    upyun.listDir('/libs/',function(err,result){
        if (err) throw err;
        else {
            console.log(result.data);
        }
    })
    
} else if (process.argv[2] === 'del') {
    upyun.removeFile('/libs/'+ process.argv[3],function(err,result){
         if (err) throw err;
         else{
            console.log(process.argv[3] + " was deleted!");
         }

    })
}


else {
    upyun.uploadFile('/libs/'+filename, filename, String, false, function(err,result){
        if (err) throw err;
        else {
            clip('http://egetjs.b0.upaiyun.com/libs/' + filename,function(err){
                if (err) throw err;
            })
        }
        console.log(chalk.green("Uploaded!" ));
        console.log(chalk.gray("Url was copied to your clipboard!"));
    })
}
