## Setup

### Update submodules
```sh
git submodule update --init
```

### Install dependencies

```sh
node .yarn/releases/yarn-3.0.2.cjs install --mode=skip-build
```

**Note: `--mode=skip-build` option** is necessary because otherwise it will run post-install scripts in the nested development repositories which will use npm which will conflict with the intended package resolution set up in this toplevel repo.

### Build dev dependencies

```sh
./node_modules/.bin/yarn run build-dev-dependencies
```

## Run solid site in dev mode, using solid-js source code

```sh
cd submodules/solid-site
npm run dev
```

Changes to solid sources should be applied immediately. Try changing, for example, `submodules/solid/packages/solid/src/reactive/signal.ts` file,
and add some console logging to the [`writeSignal` function](https://github.com/fictitious/solid/blob/solid-sources-monorepo/packages/solid/src/reactive/signal.ts#L1191):

```javascript
    console.log(`writeSignal value=${JSON.stringify(value)}`, node);
```
