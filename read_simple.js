fs = require('fs');
filename = process.argv[2];
if (!filename) {
   throw Error("A filename must be specified!");
}

fs.readFile(filename, function (err, data) {
         if (err) {
              throw err ;
         }
         console.log(data.toString());
});


