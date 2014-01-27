
var assert = require('assert');
var download = require('..');
var read = require('fs-readdir-recursive');
var rm = require('rimraf').sync;

describe('download-github-repo', function(){
  beforeEach(function(){
    rm('test/tmp');
  });

  it('should work', function(done){
    download('ianstormtaylor/matchuppps', 'test/tmp', function(err){
      if (err) return done(err);
      var actual = read('test/tmp');
      var expected = read('test/fixture');
      assert.deepEqual(actual, expected);
      done();
    });
  });
});