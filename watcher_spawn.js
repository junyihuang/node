const fs = require('fs'),
      spawn = require('child_process').spawn;
      filename = process.argv[2];

if (!filename) {
     throw Error("A filename must be specified!");
}


fs.watch(filename, function () {
          ls = spawn('ls', ['-hl',filename]);
          output = '';
          ls.stdout.on('data', function (chunk) {
               output += chunk.toString();
          });
          ls.on('close', function () {
               parts = output.split(/\s+/);
               console.log(parts);
               console.dir([parts[0],parts[4],parts[8]]);
          });
});

console.log("Now watching target.txt for changes....");
