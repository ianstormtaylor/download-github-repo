var wget = require('download');
var request = require('request-promise');

/**
 * Expose `download`.
 */

module.exports = { download: download, query: query };

/**
 * Query GitHub `repo` for commit hash.
 *
 * @param {String} repo
 * @return {Promise} Returns commit hash.
 */

function query(repo) {
  return new Promise((resolve, reject) => {
    var url = api(normalize(repo));
    request({ uri: url, json: true, headers: { 'User-Agent': 'Request-Promise'} })
      .then(json => {
        resolve(json.sha);
      })
      .catch(err => {
        reject(err);
      });
  });
}


/**
 * Download GitHub `repo` to `dest`
 *
 * @param {String} repo
 * @param {String} dest
 * @return {Promise} Returns commit hash.
 */

function download(repo, dest) {
  console.log("downloading", repo, dest);
  return new Promise((resolve, reject) => {
    query(repo).then(commit => {

      repo = normalize(repo);
      repo.commit = commit;
      var url = github(repo);
      var dl = wget(url, dest, { extract: true, strip: 1 });

      dl.on('error', () => { reject; } );
      dl.on('close', () => { resolve(commit); } );

    }).catch(reject);
  });
}

/**
 * Return a GitHub url for a given `repo` object.
 *
 * @param {Object} repo
 * @return {String}
 */

function github(repo){
  return 'https://github.com/'
    + repo.owner
    + '/'
    + repo.name
    + '/archive/'
    + (repo.commit || "master")
    + '.zip';
}

/**
 * Return a GitHub API url for a given `repo` object.
 *
 * @param {Object} repo
 * @return {String}
 */

function api(repo){
  return 'https://api.github.com/repos/'
    + repo.owner
    + '/'
    + repo.name
    + '/commits/'
    + repo.branch;
}

/**
 * Normalize a repo string.
 *
 * @param {String} string
 * @return {Object}
 */

function normalize(string){
  var owner = string.split('/')[0];
  var name = string.split('/')[1];
  var branch = 'master';

  if (~name.indexOf('#')) {
    branch = name.split('#')[1];
    name = name.split('#')[0];
  }

  return {
    owner: owner,
    name: name,
    branch: branch
  };
}
