var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // console.log('callback ', callback);
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    //console.log('data--------------', data);
    //console.log('the type data==================', data.split('\n'));
    
    var urlArray = data.split('\n');
    callback(urlArray);
  });
};

exports.isUrlInList = function(url, callback) {
  //console.log('url: ', url);
  //console.log('callback: ', callback);
  //console.log('readListOfUrls: ', exports.readListOfUrls);

  // var check;
  // var helperFun = (urlArray) => { check = urlArray.includes(url); console.log('here????==============', check); callback(check); };
  // console.log('is this giving me true???', exports.readListOfUrls(helperFun));
  // exports.readListOfUrls(helperFun);
  
  //v- This is undefined because the fs.readFile in readListOfUrls is asynchronous - needs to return results inside of the function
  //console.log('fjdishfodsjfodsjfs==========', check);
  //callback(check);
  // callback(exports.readListOfUrls.includes(url));
  
  exports.readListOfUrls((urlArray) => { callback(urlArray.includes(url)); });

};

exports.addUrlToList = function(url, callback) {
  // var urlArray = [url];
  // fs.readFile(exports.paths.list, 'utf8', (err, data) => {
  //   console.log('Before: ', data)
  // })

  exports.isUrlInList(url, (include) => {
    //console.log('include', include, '=====================================')
    if (!include) {
      fs.appendFile(exports.paths.list, url + '\n', 'utf8', callback);
    }
  });
  // exports.isUrlInList(url, (isInList) => {
  //   if (!isInList) {
  //   }
  // });


  // fs.readFile(exports.paths.list, 'utf8', (err, data) => {
  //   console.log('after', data)
  // })
};

exports.isUrlArchived = function(url, callback) {
  // console.log('URL: ', url);
  // console.log('Full Path: ', exports.paths.archivedSites + '/' + url);
  // fs.readdir(exports.paths.archivedSites + '/' + url, 'utf8', callback);
  
  fs.readdir(exports.paths.archivedSites, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    //console.log('what do u actually get??????????', url);
    callback(data.includes(url));
    //console.log('what does these look like?', data);
  });
};

exports.downloadUrls = function(urls) {

  urls.pop();
  urls.forEach((url) => {
    //var fixtureName = url;
    exports.isUrlArchived(url, (include) => {
      if (!include) {
        var fixturePath = exports.paths.archivedSites + '/' + url;
        // Create or clear the file.
        // var fd = fs.writ(fixturePath, 'w');
        // console.log(url, 'this i sthe urls');
        // fs.write(fd, 'google');
        // fs.close(fd);
        // console.log('is it here???')
        // // Write data to the file.
        fs.appendFile(fixturePath, 'HTML STUFF', 'utf8', (err) => {
          if (err) {
            throw err;
          }
          console.log('It has done its job, gives it a break');
        // });
    //   }
        });
    // fs.readFile(fixturePath, 'utf8', (err, data) => {
    //   console.log('DATA: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', data);
    // });
      }
    }); 
  });

};


