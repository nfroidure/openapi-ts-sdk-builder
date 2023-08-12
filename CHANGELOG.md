# [6.0.0](https://github.com/nfroidure/openapi-ts-sdk-builder/compare/v5.0.0...v6.0.0) (2023-08-12)



# [5.0.0](https://github.com/nfroidure/openapi-ts-sdk-builder/compare/v4.0.0...v5.0.0) (2022-09-01)



# [4.0.0](https://github.com/nfroidure/openapi-ts-sdk-builder/compare/v3.0.1...v4.0.0) (2022-05-25)


### Bug Fixes

* **sdk:** convert non-string types to strings in headers ([1e88ec9](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/1e88ec9a0cbdb2f40a7a1a12784682951e26600a))


### Code Refactoring

* **api:** remove axios dependency ([5abcce3](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/5abcce305478e8a17cc615fc01a9e53dce2ecb95))


### BREAKING CHANGES

* **api:** Users now needs to choose their own client.



## [3.0.1](https://github.com/nfroidure/openapi-ts-sdk-builder/compare/v3.0.0...v3.0.1) (2021-12-02)


### Bug Fixes

* **sdk:** export correct sdk name ([9d33cf1](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/9d33cf1fb4aab7a65ed9f9726e835e2cbcd67e44))


### Features

* **options:** allow to generate only uri/request params ([bf54dcd](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/bf54dcd65576f90b988b7e25c2466995a3518a1e))



# [3.0.0](https://github.com/nfroidure/openapi-ts-sdk-builder/compare/v2.2.0...v3.0.0) (2021-10-19)


### Features

* **types:** better handling of OpenAPI components ([78ee269](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/78ee269d445b6c8baf674048542907aec9c0d8d0))



# [2.2.0](https://github.com/nfroidure/openapi-ts-sdk-builder/compare/v2.1.0...v2.2.0) (2021-07-28)


### Features

* **types:** export API and Components types ([0f36a2f](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/0f36a2f8e4c8c0404aa46fb8db858075cacc9972)), closes [#7](https://github.com/nfroidure/openapi-ts-sdk-builder/issues/7)



# [2.1.0](https://github.com/nfroidure/openapi-ts-sdk-builder/compare/v2.0.3...v2.1.0) (2021-06-25)


### Bug Fixes

* **ts:** fix ts errors in code and generated code ([26332c7](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/26332c739964f4583f33ccd55faae5ebd412384b))


### Features

* **api:** allow to filter statuses to only generate subpart of responses ([30eda25](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/30eda258aa7a7565e6ceaba80235b46c588666b1))



## [2.0.3](https://github.com/nfroidure/openapi-ts-sdk-builder/compare/v2.0.2...v2.0.3) (2021-04-10)



## [2.0.2](https://github.com/nfroidure/openapi-ts-sdk-builder/compare/v2.0.1...v2.0.2) (2020-12-01)


### Bug Fixes

* **types:** fix headers types ([55fcb3f](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/55fcb3f825a7feb6a0acc4e1656268aef899f2aa))



## [2.0.1](https://github.com/nfroidure/openapi-ts-sdk-builder/compare/v2.0.0...v2.0.1) (2020-10-26)


### Bug Fixes

* **types:** fix qs types ([9903fc8](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/9903fc84ec20811e11927707e1d36b1fdc43a952))



# [2.0.0](https://github.com/nfroidure/openapi-ts-sdk-builder/compare/v1.0.0...v2.0.0) (2020-10-02)


### Bug Fixes

* **docs:** fix doc typings and add more infos ([e84d88e](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/e84d88ee873a6b52027934e3c6df7ae59422fc28))
* **jsdocs:** fix JSDocs generation ([2a7ba53](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/2a7ba53b095d1baf636f715cc9046c1d058247c3))


### Code Refactoring

* **options:** add new options ([dfa6ffb](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/dfa6ffbd33aac50cdbf7ac59634257641d715ba2)), closes [#1](https://github.com/nfroidure/openapi-ts-sdk-builder/issues/1)


### BREAKING CHANGES

* **options:** The second argument of the generator is now an option object



# 1.0.0 (2020-09-04)


### Features

* **core:** first working version ([45c1617](https://github.com/nfroidure/openapi-ts-sdk-builder/commit/45c1617d7c4402b05961fb78d56b8f6be4abffe3))



