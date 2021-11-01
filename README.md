## Setup

### Update submodules
```sh
git submodule update --init
```

### Install dependencies

Then, if you have `yarn`

```sh
yarn install --mode=skip-build
```

If you don't have yarn, but have node [16.9 or later with corepack](https://nodejs.org/docs/latest-v16.x/api/corepack.html)

```sh
corepack yarn install --mode=skip-build
```

Or, if you don't have node 16.9 with corepack, you can use version of yarn [stored locally in this project repo](https://classic.yarnpkg.com/en/docs/cli/policies/), for example

```sh
node .yarn/releases/yarn-3.0.2.cjs install --mode=skip-build
```

**Note:** you have to use `yarn install` **with `--mode=skip-build` option** otherwise it will run post-install scripts in the nested development repositories which will use npm which will conflict with the intended package resolution set up in this toplevel repo.

### Build dev dependencies

```sh
yarn run build-dev-dependencies
```
