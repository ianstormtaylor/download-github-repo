
var assert = require('assert');
var repo = require('..');
var read = require('fs-readdir-recursive');
var rm = require('rimraf').sync;

describe('download-github-repo', function(){
  beforeEach(function(){
    rm('test/tmp');
  });

  it('downloads the master branch by default', function(done){
    repo.download('zeke/download-github-repo-fixture', 'test/tmp').then((hash) => {
      var actual = read('test/tmp');
      var expected = read('test/fixtures/master');
      assert.deepEqual(actual, expected);
      assert.equal(hash, 'ff95faeda055a8061fe45742a46f80b39c633ddd');
      done();
    })
    .catch(err => {
      return done(err);
    });
  });

  it('download custom branch', function(done){
    repo.download('zeke/download-github-repo-fixture#my-branch', 'test/tmp').then((hash) => {
      var actual = read('test/tmp');
      var expected = read('test/fixtures/my-branch');
      assert.deepEqual(actual, expected);
      assert.equal(hash, '619f72b64bf3bc9457e4b578373eb675481d2ff5');
      done();
    })
    .catch(err => {
      return done(err);
    });
  });

  it('queries master branch commit', function(done){
    repo.query('zeke/download-github-repo-fixture').then((hash) => {
      assert.equal(hash, 'ff95faeda055a8061fe45742a46f80b39c633ddd');
      done();
    })
    .catch(err => {
      return done(err);
    });
  });

  it('queries custom branch commit', function(done){
    repo.query('zeke/download-github-repo-fixture#my-branch').then((hash) => {
      assert.equal(hash, '619f72b64bf3bc9457e4b578373eb675481d2ff5');
      done();
    })
    .catch(err => {
      return done(err);
    });
  });


});
