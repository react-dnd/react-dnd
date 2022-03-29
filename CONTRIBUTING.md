# Contributing to React-DnD

So you want to contribute to React-DnD? Thank you! This library is a community effort, and your contributions are greatly appreciated.

## FAQ

### _What do I need to get started?_

You only need Node and Yarn 1 installed in your CLI. This project uses Yarn v2, but Yarn v1 will pick up the relevant binaries on this repository.

- node (https://nodejs.org)
- yarn (npm i -g yarn)

### 🤔 Why is my Pull Request failing?

The most likely cause is that you need to cut a Semver impact document using `yarn version check --interactive`

This project uses Yarn's [deferred release workflow](https://yarnpkg.com/features/release-workflow). By tracking the Semver impact of each PR we bump versions in a systematic manner.
