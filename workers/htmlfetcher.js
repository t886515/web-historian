// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var https = require('https');
var request = require('request');
var helper = require('../helpers/archive-helpers');
var fs = require('fs');

// helper.readListOfUrls((urlArray) => {
//  helper.downloadUrls((urlArray));
// });

exports.htmlfetcher = () => {
  console.log('THIS HERE????????');
  helper.readListOfUrls((urlArray) => {
    helper.downloadUrls((urlArray));
    console.log('SO AM I EVEN RAN?');
    fs.readdir(helper.paths.archivedSites, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      data.forEach((url) => {
        request('https://' + url, (err, response, body) => {
          fs.writeFile(helper.paths.archivedSites + '/' + url, body, 'utf8', (err) => {
            if (err) {
              throw err;
            }
            console.log('This worked.');
          });
        });
        // var options = {
        //   hostname: url,
        //   path: '/',
        //   method: 'GET'
        // };

        // var req = https.request(options, (res) => {
        //   //console.log('============statusCode:', res.statusCode);
        //   //console.log('================headers:', res.headers);
        //   res.setEncoding('utf8');
        //   var body = '';
        //   res.on('data', (d) => {
        //     body += d;
        //     console.log(body, '');
        //   });
        //   res.on('end', () => {
        //     fs.writeFile(helper.paths.archivedSites + '/' + url, body, 'utf8', (err) => {
        //       if (err) {
        //         throw err;
        //       }
        //       console.log('This worked.');
        //     });
        //   });
        // });
        // req.on('error', (e) => {
        //   console.error(e);
        // });
        // req.end();    

      });
    });
  });
};

exports.htmlfetcher();
// var options = {
//   hostname: 'encrypted.google.com',
//   port: 443,
//   path: '/',
//   method: 'GET'
// };

// var req = https.request(options, (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);

//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
// });

// req.on('error', (e) => {
//   console.error(e);
// });
// req.end();