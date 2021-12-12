
This is solid benchmark copied from [krausest/js-framework-benchmark](https://github.com/krausest/js-framework-benchmark),
embedded into this monorepo so it can be built with modified version of solid.

## how to run

First, follow the steps from the main monorepo README here if you have not done that already,
 and run `install --mode=skip-build` and `build-dev-dependencies` in the root of this monorepo


```sh
yarn install --mode=skip-build
yarn run build-dev-dependencies
```

Then, build the benchmark, again in the root of this monorepo

```sh
yarn workspace js-framework-benchmark-solid-patched run build-prod
```

Then, create a clone of [krausest/js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) somewhere and link `examples/benchmark` from here under `frameworks/keyed` there:

```sh
cd ~/somewhere/js-framework-benchmark/frameworks/keyed
ln -s ../../../where-this-monorepo-is/examples/benchmark solid-patched
```

And follow the steps there for [running single `solid-patched` framework](https://github.com/krausest/js-framework-benchmark#11-prerequisites), skipping 
the "Building and viewing a single framework" step because solid-patched is linked in in the already built state, so that finally you can run

```sh
npm run bench keyed/solid-patched
```
