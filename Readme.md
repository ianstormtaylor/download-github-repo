
# download-github-repo

  Download and extract a GitHub repository from node.

## Installation

    $ npm install download-github-repo

## API

### download(repo, destination, callback)

  Download a `repo` (eg. `"ianstormtaylor/router"`) to a `destination` folder and `callback`. Defaults to the master branch.

### download(repo, branch, destination, callback)

  Download a `branch` of `repo` (eg. `"ianstormtaylor/router/tree/my-branch"`) to a `destination` folder and `callback`.

## License

  MIT