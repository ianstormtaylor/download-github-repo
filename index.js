
var fs = require('fs');
var rm = require('rimraf');
var tar = require('tar');
var wget = require('wget');
var zlib = require('zlib');

/**
 * Expose `download`.
 */

module.exports = download;

/**
 * Download GitHub `repo` to `dest`.
 *
 * @param {String} repo
 * @param {String} dest
 * @param {Function} fn
 */

function download(repo, branch, dest, fn){

  // branch is optional; defaults to master
  if (arguments.length === 3) {
    fn = dest
    dest = branch
    branch = 'master'
  }

  var url = 'https://codeload.github.com/' + repo + '/legacy.tar.gz/' + branch;
  var file = dest + '.tar.gz';
  var dl = wget.download(url, dest + '.tar.gz');

  dl.on('error', function(err){
    fn(err);
  });

  dl.on('end', function(file){
    fs.createReadStream(file)
      .pipe(zlib.createGunzip())
      .pipe(tar.Extract({ path: dest, strip: 1 }))
      .on('error', function(err){ fn(err); })
      .on('end', function(){
        rm(file, fn);
      });
  });
}