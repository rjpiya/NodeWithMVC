//const jwt= require('jsonwetoken');
var fs = require('fs');

//console.log(__dirname+'../Logs');

module.exports.log = function (message) {

    var date = new Date().toISOString().split('T')[0];
    var name = 'Errorlog' + date;
    var file ='C:/Users/dotnet-server/Desktop/Rajeshree/StudentManagement/Logs/' + name + '.txt';
    var stream = fs.createWriteStream(file, {
        flags: 'a'
    });
    stream.write("\n" + message + "\t" + new Date().toTimeString());
}

// module.exports.dataLog = function (message) {
//     var date = new Date().toISOString().split('T')[0];
//     var name = 'Datalog' + date;
//     var file = __dirname + '/Logs/' + name + '.txt';
//     var stream = fs.createWriteStream(file, {
//         flags: 'a'
//     });
//     stream.write("\n" + message + "\t" + new Date().toTimeString());
// }