var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var helper = require('./http-helpers');
//var fetcher = require('../workers/htmlfetcher');

exports.handleRequest = function (req, res) {
  // console.log(req);
  console.log('Serving ', req.method, ' for ', req.url);
  
  if (req.method === 'POST') {
    var statusCode = 302;
    var body = '';
    res.writeHead(statusCode, helper.headers);
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      //console.log('data:', body.slice(4));
      archive.addUrlToList(body.slice(4), (err) => {
        if (err) {
          throw err;
        }
        console.log('Stop complaining about needing callback. It is posted.');
      });
      res.end();
    });
  } else if ( req.method === 'GET') {
    var statusCode = 200;
    // var test = '';
    var asset;
    //console.log('jdfklfjldskjflsjflk');
    //console.log(archive.paths.siteAssets + '/index.html');
    res.writeHead(statusCode, helper.headers);
    if (req.url === '/' || req.url === '/index.html') {
      asset = archive.paths.siteAssets + '/index.html';
      helper.serveAssets(res, asset);
    } else {
      var check;
      archive.isUrlArchived(req.url.slice(1), (boolean) => { 
        check = boolean;
        // console.log('is this google?', req.url.slice(1));
        // console.log('boolean status', check); 
        if (check) {
          asset = archive.paths.archivedSites + req.url;
          // console.log('asset: ', asset);
        } else {
          statusCode = 404;
          res.writeHead(statusCode, helper.headers);
          asset = archive.paths.siteAssets + '/loading.html';   
        }
        helper.serveAssets(res, asset);
      });
    }
    
    
    
    // if (!archive.isUrlArchived(req.url)) {
    //   asset = archive.paths.siteAssets + '/loading.html';
    // } else if (archive.isUrlArchived(req.url)) {
    //   asset = archive.paths.archivedSites + request.url;
    // }
    // console.log('asset: ', asset);
    //helper.serveAssets(res, asset);//, () => {});
    
    
    //PASSSSSSSSSSSSING FIRST TSET HERE//////////
    // fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
    //   if (err) { 
    //     throw err; 
    //   }
    //   // test += JSON.stringify(data);
    //   //res.end(JSON.stringify(data));
    //   res.end(data);
    // });
    //res.end();
    //res.end(JSON.stringify());
  }
  //fetcher.htmlfetcher();
  //res.end(archive.paths.list);

};
