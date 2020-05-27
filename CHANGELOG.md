# [](https://github.com/react-dnd/react-dnd/compare/v11.1.2...v) (2020-05-27)

## [11.1.2](https://github.com/react-dnd/react-dnd/compare/v11.1.1...v11.1.2) (2020-05-27)

### docs

- update changelog ([64c80cf](https://github.com/react-dnd/react-dnd/commit/64c80cfe3b352b7814941d4baf17febee58ec232))

## [11.1.1](https://github.com/react-dnd/react-dnd/compare/v10.0.2...v11.1.1) (2020-05-26)

### build

- add formatting check to lint stage (#2464) ([9db96b4](https://github.com/react-dnd/react-dnd/commit/9db96b4baf6f56ed51f1eb1e72a6a6992026b265)), closes [#2464](https://github.com/react-dnd/react-dnd/issues/2464)
- move automerge if-statement to automerge step (#2489) ([68a1879](https://github.com/react-dnd/react-dnd/commit/68a187985a372a1282c34ace93499b1a6355a05e)), closes [#2489](https://github.com/react-dnd/react-dnd/issues/2489)
- update dependabot if statement (#2490) ([af84889](https://github.com/react-dnd/react-dnd/commit/af8488955dc0a9a3d731c04dc826c913739b3ed5)), closes [#2490](https://github.com/react-dnd/react-dnd/issues/2490)
- update node support spec to 10.x (#1850) ([0b06951](https://github.com/react-dnd/react-dnd/commit/0b0695136bf86593717f9ec31f91b0182603f642)), closes [#1850](https://github.com/react-dnd/react-dnd/issues/1850)

### fix

- correct issue with example generation due to example structure refactoring (#2480) ([efc251b](https://github.com/react-dnd/react-dnd/commit/efc251b2e6ea403db4d8ff7bcb9a8b37b4e716d4)), closes [#2480](https://github.com/react-dnd/react-dnd/issues/2480)
- do not cancel touch events if they are non-cancelable (#2190) ([1b4019e](https://github.com/react-dnd/react-dnd/commit/1b4019e612f5f20aadc7113482dfa764c3124f4a)), closes [#2190](https://github.com/react-dnd/react-dnd/issues/2190)
- remove circular dependencies (#2491) ([52eaace](https://github.com/react-dnd/react-dnd/commit/52eaacebbc523815f5fd2f977b9a26432552c1a2)), closes [#2491](https://github.com/react-dnd/react-dnd/issues/2491)
- update wrapInTestContext to expose `getManager()` method (#1570) ([4ad004c](https://github.com/react-dnd/react-dnd/commit/4ad004c1a223c0bf3b31a0c1e0a7e5797d8b1291)), closes [#1570](https://github.com/react-dnd/react-dnd/issues/1570)

## [10.0.2](https://github.com/react-dnd/react-dnd/compare/v10.0.1...v10.0.2) (2019-12-07)

### build

- use updated react-dnd/asap (#1685) ([ada6555](https://github.com/react-dnd/react-dnd/commit/ada65550b758a5de44b810a7b68753e7eaee24ac)), closes [#1685](https://github.com/react-dnd/react-dnd/issues/1685)

## [10.0.1](https://github.com/react-dnd/react-dnd/compare/v10.0.0...v10.0.1) (2019-12-07)

### docs

- remove old links to TouchBackend ([6ac18e1](https://github.com/react-dnd/react-dnd/commit/6ac18e14dd1326c8f7a241ad0b376f49e08d8ce2)), closes [#1661](https://github.com/react-dnd/react-dnd/issues/1661)

# [10.0.0](https://github.com/react-dnd/react-dnd/compare/v9.5.1...v10.0.0) (2019-12-07)

### chore

- update changelog ([7edc76e](https://github.com/react-dnd/react-dnd/commit/7edc76e2667f5648851fb1c510a83cd3cf4edc39))

### fix

- patch TouchBackend to solve e.targetTouches bug in iOS 13 (#1631) ([f6286ca](https://github.com/react-dnd/react-dnd/commit/f6286ca3a91e23e89d1e1a3150fa4b3a93ca92e2)), closes [#1631](https://github.com/react-dnd/react-dnd/issues/1631)

## [9.5.1](https://github.com/react-dnd/react-dnd/compare/v9.5.0...v9.5.1) (2019-11-26)

### build

- add test to release script ([c82797d](https://github.com/react-dnd/react-dnd/commit/c82797d73a3060a5d2362d01a115c5ddbc68d333))
- update bash scripts to emit errors (#1630) ([65f343f](https://github.com/react-dnd/react-dnd/commit/65f343f3c7012089e066f651fe706daa2d5f37eb)), closes [#1630](https://github.com/react-dnd/react-dnd/issues/1630)

### chore

- tsconfig updates' ([dee71e0](https://github.com/react-dnd/react-dnd/commit/dee71e0b0e1fbbe6ccdafa5e68ae6c02e860e11f))

# [9.5.0](https://github.com/react-dnd/react-dnd/compare/v9.4.0...v9.5.0) (2019-11-25)

### build

- add codecov step to ci (#1619) ([9e3bdca](https://github.com/react-dnd/react-dnd/commit/9e3bdca766eea7017df9ea65953a725c1120e4c5)), closes [#1619](https://github.com/react-dnd/react-dnd/issues/1619)
- parallelize some build tasks (#1606) ([9edc60d](https://github.com/react-dnd/react-dnd/commit/9edc60d7c94df7b52bac5c258bd46a32c6f5aef6)), closes [#1606](https://github.com/react-dnd/react-dnd/issues/1606)
- remove release_docs script, add release_canary script ([fba55c2](https://github.com/react-dnd/react-dnd/commit/fba55c286d3a9bac7abdb0547246f32a7358df13))

### chore

- remove gh-pages dependency ([ae3f2c0](https://github.com/react-dnd/react-dnd/commit/ae3f2c00d3dca494922701fb249a0ca573772c51))
- run prettier on source files ([c331998](https://github.com/react-dnd/react-dnd/commit/c331998305c0e0f798b406f6aded7635ee9865e0))
- update changelog ([080df3f](https://github.com/react-dnd/react-dnd/commit/080df3f3e3b3971b8fef548d13d054e5860f791f))

### docs

- add alex for tonal linting (#1611) ([d45f55f](https://github.com/react-dnd/react-dnd/commit/d45f55f9ead7e606045a07b1258aa9a692a6e76e)), closes [#1611](https://github.com/react-dnd/react-dnd/issues/1611)
- add build_site script to docsite ([a047bf7](https://github.com/react-dnd/react-dnd/commit/a047bf7503290fbe712300f70243d0b65f85be15))
- add github action to merge dependabot PRs (#1617) ([2cb2bc9](https://github.com/react-dnd/react-dnd/commit/2cb2bc98a84a90144c7e4205472b660806f42729)), closes [#1617](https://github.com/react-dnd/react-dnd/issues/1617)
- add spelling verification to the linting process (#1546) ([704245d](https://github.com/react-dnd/react-dnd/commit/704245d47892f9d465b1b4465203f5c8464eb5a7)), closes [#1546](https://github.com/react-dnd/react-dnd/issues/1546)

### feat

- declared packages side effects free (#1577) ([0ad2e58](https://github.com/react-dnd/react-dnd/commit/0ad2e58364e2fa461448c6ce38cb8f73fdb2ceb9)), closes [#1577](https://github.com/react-dnd/react-dnd/issues/1577)

### fix

- filemetadata available on dragstart (#1610) ([1b5c2a3](https://github.com/react-dnd/react-dnd/commit/1b5c2a324ea85f48721738e31556babc4aa80ec0)), closes [#1610](https://github.com/react-dnd/react-dnd/issues/1610)

# [9.4.0](https://github.com/react-dnd/react-dnd/compare/v9.3.9...v9.4.0) (2019-09-20)

### docs

- add a section on using react-app-rewired to override jest configuration ([a2922fe](https://github.com/react-dnd/react-dnd/commit/a2922fe4dbc1a1afb95d03b209c21732f67e32fe))

### fix

- correct linting issues in scripts ([1dbe882](https://github.com/react-dnd/react-dnd/commit/1dbe882702b7d014624694273c5b397548881275))
- typo (#1531) ([ae7a05b](https://github.com/react-dnd/react-dnd/commit/ae7a05b4216d10b95e7bfab47829332b867f0d23)), closes [#1531](https://github.com/react-dnd/react-dnd/issues/1531)

### refactor

- remove duplicate code in example (#1525) ([d154684](https://github.com/react-dnd/react-dnd/commit/d154684e64ace4430ea5e7abd586b5cb82b2c19d)), closes [#1525](https://github.com/react-dnd/react-dnd/issues/1525)

## [9.3.9](https://github.com/react-dnd/react-dnd/compare/v9.3.8...v9.3.9) (2019-08-06)

### build

- add build sentinels to cjs packgaes ([8f5e933](https://github.com/react-dnd/react-dnd/commit/8f5e9337c6e29f5ad387cacd803e2ca69457a12b))
- remove prepublishonly script. Move release process to release script ([7efcc49](https://github.com/react-dnd/react-dnd/commit/7efcc49c4a9b4dfc843229318fd1c5226edf4dba))

## [9.3.8](https://github.com/react-dnd/react-dnd/compare/v9.3.7...v9.3.8) (2019-08-06)

### build

- add manual go/no-go script to prepublish ([a3bbee1](https://github.com/react-dnd/react-dnd/commit/a3bbee10d86ef713079b770bfdd7cc5ccd30e3d8))
- don't use npm-run-all in prepublish script ([4fae3ca](https://github.com/react-dnd/react-dnd/commit/4fae3ca26677dad011537f4a7b7cb892bbf426f9))

## [9.3.7](https://github.com/react-dnd/react-dnd/compare/v9.3.6...v9.3.7) (2019-08-06)

### build

- add publication sentinel to cjs ([7fda488](https://github.com/react-dnd/react-dnd/commit/7fda488e2dfe82403a6397faea980959c46186ca))
- re-add publish sentinels so that lerna will pick up the changes ([e856b1e](https://github.com/react-dnd/react-dnd/commit/e856b1e45daaab09c6ea5dce20f65b804dfbd806))
- re-add publish sentinels so that lerna will pick up the changes ([c4e128a](https://github.com/react-dnd/react-dnd/commit/c4e128acdd34f02236b376344303f92e148b0713))
- remove publish sentinel ([d3e37c7](https://github.com/react-dnd/react-dnd/commit/d3e37c77f67f8e68bda75979695f80af382f75ca))
- update prepublish script ([352a412](https://github.com/react-dnd/react-dnd/commit/352a4121852928356c5ba6d956c9f8cfe3693094))

## [9.3.6](https://github.com/react-dnd/react-dnd/compare/v9.3.5...v9.3.6) (2019-08-06)

### build

- add release scripts ([17b2ba7](https://github.com/react-dnd/react-dnd/commit/17b2ba79e6d8caf886eee10d07cdb5c3bd9bf388))
- use correct lerna command in release script ([de5355b](https://github.com/react-dnd/react-dnd/commit/de5355ba6b40ef6e415aa931b2261105660ee66c))

### fix

- update cjs_module creation to include typings field ([8ebdc2c](https://github.com/react-dnd/react-dnd/commit/8ebdc2cc86f5cb6225e2de103c5bb237d8e8c19e))

## [9.3.5](https://github.com/react-dnd/react-dnd/compare/v9.3.4...v9.3.5) (2019-08-06)

### docs

- remove gzip size badges ([1868fcd](https://github.com/react-dnd/react-dnd/commit/1868fcde6f8fb3c2d1b9b88fe6c75565afcc22c0))

### fix

- actually correct the cjs replacements ([0ccf7da](https://github.com/react-dnd/react-dnd/commit/0ccf7dabf33ce4b389553aff8565533bd04d5ec6))
- add a sentinel change to the cjs package.json files to force a publish of them ([287d23d](https://github.com/react-dnd/react-dnd/commit/287d23d96102e76b438ad9356713da6c92f8cd60))
- correct execute_cjs_replacements script to execute replacement scripts in .js files as well (#1502) ([dd17b6e](https://github.com/react-dnd/react-dnd/commit/dd17b6e6987e477c81dfb7b031ea1d8da3fe3153)), closes [#1502](https://github.com/react-dnd/react-dnd/issues/1502)

## [9.3.4](https://github.com/react-dnd/react-dnd/compare/v9.3.3...v9.3.4) (2019-08-05)

### build

- add lint rule to prevent for..of loop usage in older browsers (#1498) ([87f032f](https://github.com/react-dnd/react-dnd/commit/87f032f99a937423ac7c32a3e6c6b095b471a0d9)), closes [#1498](https://github.com/react-dnd/react-dnd/issues/1498)
- cjs package.json updates ([ff8ea26](https://github.com/react-dnd/react-dnd/commit/ff8ea267c4d32495f0edcd83b4b84362cf736321))

### docs

- correct more dustbin examples ([b6cbabe](https://github.com/react-dnd/react-dnd/commit/b6cbabe69148d62ee56d5d6801429bf08d4b117c))

### fix

- correct hooks-based single-target example (#1499) ([6acca1c](https://github.com/react-dnd/react-dnd/commit/6acca1c4968853e9910758399ac22b77e0e54415)), closes [#1499](https://github.com/react-dnd/react-dnd/issues/1499)
- suppress the useLayoutEffect warning on server side (#1497) ([1953c85](https://github.com/react-dnd/react-dnd/commit/1953c85e15fe6285f8d83cc8e2558aa44c739892)), closes [#1497](https://github.com/react-dnd/react-dnd/issues/1497)

## [9.3.3](https://github.com/react-dnd/react-dnd/compare/v9.3.2...v9.3.3) (2019-07-12)

### build

- add license files ([3aa6aee](https://github.com/react-dnd/react-dnd/commit/3aa6aeebd69da950a8a9aee5b7a47ac5be6c82e0))

### test

- use CI=true when testing packages, prune prepublish tasks ([f52bd8e](https://github.com/react-dnd/react-dnd/commit/f52bd8eef19c35220f750cc45f1937ed1519978b))

## [9.3.2](https://github.com/react-dnd/react-dnd/compare/v9.3.1...v9.3.2) (2019-07-11)

## [9.3.1](https://github.com/react-dnd/react-dnd/compare/v9.2.1...v9.3.1) (2019-07-11)

### fix

- rename interafce DndContext => DndContextType to correct some babel transpile issues (#1459) ([465344e](https://github.com/react-dnd/react-dnd/commit/465344e0d7bf64de9d5639ccbcce8eb722fbb1aa)), closes [#1459](https://github.com/react-dnd/react-dnd/issues/1459)

## [9.2.1](https://github.com/react-dnd/react-dnd/compare/v9.2.0...v9.2.1) (2019-07-11)

### build

- parallelize the build_package task (#1452) ([802f96e](https://github.com/react-dnd/react-dnd/commit/802f96eb4154f708068e20658c1ab44379ea99a1)), closes [#1452](https://github.com/react-dnd/react-dnd/issues/1452)

### fix

- define the XYCoord interface in react-dnd (#1454) ([d02a17c](https://github.com/react-dnd/react-dnd/commit/d02a17ce0d6bb088f780e9fe3d3edd95a41ba926)), closes [#1454](https://github.com/react-dnd/react-dnd/issues/1454)

### test

- use cjs aliases for jest ([4046569](https://github.com/react-dnd/react-dnd/commit/4046569023e982615cb44e0d0058914581c52825))

# [9.2.0](https://github.com/react-dnd/react-dnd/compare/v9.1.0...v9.2.0) (2019-07-10)

### build

- cjs package update (#1449) ([3e3e0ff](https://github.com/react-dnd/react-dnd/commit/3e3e0ffcd13059a4727433454d39c01660dc491f)), closes [#1449](https://github.com/react-dnd/react-dnd/issues/1449)

# [9.1.0](https://github.com/react-dnd/react-dnd/compare/v9.0.2...v9.1.0) (2019-07-10)

### build

- cjs package update ([529a4d9](https://github.com/react-dnd/react-dnd/commit/529a4d9f87dc42271a935d9ad4fe05223b663fda))

### docs

- use -H flag on gatsby develop for us inside WSL ([9d84a4c](https://github.com/react-dnd/react-dnd/commit/9d84a4c89983af9fafc31569143b0b8ff14cb018))

## [9.0.2](https://github.com/react-dnd/react-dnd/compare/v9.0.1...v9.0.2) (2019-07-06)

### build

- update stalebot conf ([cef21a6](https://github.com/react-dnd/react-dnd/commit/cef21a63a039594928c46e5ea7aa92ad020fc78a))

### docs

- add codesandbox link to github issue template ([7ab58db](https://github.com/react-dnd/react-dnd/commit/7ab58db013c27111ddad317b68de80ee4e9ef1c4))

### fix

- get touchBackend working with default options (#1444) ([4aa600f](https://github.com/react-dnd/react-dnd/commit/4aa600f1e610e91f5a9fe65ba7ff46c4615a67aa)), closes [#1444](https://github.com/react-dnd/react-dnd/issues/1444)

## [9.0.1](https://github.com/react-dnd/react-dnd/compare/v9.0.0...v9.0.1) (2019-07-04)

### build

- rebuild cjs package.json files ([763eca8](https://github.com/react-dnd/react-dnd/commit/763eca808c48590a38fba0f439856ae6f1080d5c))

### docs

- expand the touchbackend section, add docs on the `options` flag for DndProvider ([cbc58cf](https://github.com/react-dnd/react-dnd/commit/cbc58cf8371e46323cdab206a97a368cadd6065f))
- slight wording change about queryargs in examples ([3ddac3d](https://github.com/react-dnd/react-dnd/commit/3ddac3d728e3301c8515ea1177ee711be505caff))

### fix

- #1428 - remove code that detached dragpreviews when dragsources where disconnected (#1441) ([e741f3a](https://github.com/react-dnd/react-dnd/commit/e741f3a2765b5c02fd9b7e43d45f0f06805deb54)), closes [#1428](https://github.com/react-dnd/react-dnd/issues/1428) [#1441](https://github.com/react-dnd/react-dnd/issues/1441)

# [9.0.0](https://github.com/react-dnd/react-dnd/compare/v8.0.3...v9.0.0) (2019-07-03)

### docs

- add the missing drop ref in tutorial (#1415) ([d25a66f](https://github.com/react-dnd/react-dnd/commit/d25a66f74888591123a78f7c31974112c2b59b57)), closes [#1415](https://github.com/react-dnd/react-dnd/issues/1415)
- Fix end callback arguments of useDrag hook (#1432) ([ce58e73](https://github.com/react-dnd/react-dnd/commit/ce58e73e00a69f5d7e6dff1336e35c0c1d3f4648)), closes [#1432](https://github.com/react-dnd/react-dnd/issues/1432)

### Documentation

- Add Touch Backend Flag (#1438) ([36ae075](https://github.com/react-dnd/react-dnd/commit/36ae07538ee1d11fa710bf21a8a3eecb730e40d5)), closes [#1438](https://github.com/react-dnd/react-dnd/issues/1438)

### fix

- don't handle dragstart event if default is prevented (#1426) ([3a70c80](https://github.com/react-dnd/react-dnd/commit/3a70c801c7f17da1b43d001084ed339fec50ab37)), closes [#1426](https://github.com/react-dnd/react-dnd/issues/1426)
- stale state in useMonitorOutput (#1430) ([384580c](https://github.com/react-dnd/react-dnd/commit/384580c507c9344319d9a9af1c57f5e30ad7e985)), closes [#1430](https://github.com/react-dnd/react-dnd/issues/1430)

## [8.0.3](https://github.com/react-dnd/react-dnd/compare/v8.0.2...v8.0.3) (2019-06-21)

### build

- move CJS package creation scripts to top-level scripts/ folder ([5e3c52c](https://github.com/react-dnd/react-dnd/commit/5e3c52cec5910080ecd880b13c743c1dbb8aac7e))

### fix

- correct dynamic tsconfig files ([c5cc337](https://github.com/react-dnd/react-dnd/commit/c5cc337fc248e713a0c653a4918e74ebc29a6d70))
- update DndProvider to use a singleton instance of the DndContext per BackendContext (#1423) ([5628208](https://github.com/react-dnd/react-dnd/commit/562820816c5d6be1c94b27d77f29dfb91bdc2b79)), closes [#1423](https://github.com/react-dnd/react-dnd/issues/1423)

## [8.0.2](https://github.com/react-dnd/react-dnd/compare/v8.0.1...v8.0.2) (2019-06-18)

### build

- add start_docs script ([5e02b54](https://github.com/react-dnd/react-dnd/commit/5e02b54d057adcf2ed485d51738ec0d86c031d48))
- move dynamic module generation to a preinstall script (#1403) ([283f1b4](https://github.com/react-dnd/react-dnd/commit/283f1b4eb97c4948dde2d5e32ca45b91b1767ab8)), closes [#1403](https://github.com/react-dnd/react-dnd/issues/1403)
- version bump ([54d0bf6](https://github.com/react-dnd/react-dnd/commit/54d0bf68d4f7dae39021f2c70719d4a9541d9fff))

### docs

- add a comment in the docsroot about esm vs cjs installation ([50f82a4](https://github.com/react-dnd/react-dnd/commit/50f82a49077acb2c19768d76c1e64f4bfda58087))

### fix

- rename the discount_lodash modules in case of special plugins looking for 'lodash' in the module names (#1410) ([ddfb020](https://github.com/react-dnd/react-dnd/commit/ddfb0204676a39c8a57dc56a7263cd8f23e265c7)), closes [#1410](https://github.com/react-dnd/react-dnd/issues/1410)

## [8.0.1](https://github.com/react-dnd/react-dnd/compare/v8.0.0...v8.0.1) (2019-06-18)

### build

- update create_cjs_modules ([46157a5](https://github.com/react-dnd/react-dnd/commit/46157a5cc8a4c37c4677494f73c99e51d6d08c51))

### chore

- add deprecation warning to DragDropContext (#1398) ([ab41381](https://github.com/react-dnd/react-dnd/commit/ab41381d407ad43a5725a189bd37d3f305cd77c0)), closes [#1398](https://github.com/react-dnd/react-dnd/issues/1398)
- upgrade lerna ([13d2d6a](https://github.com/react-dnd/react-dnd/commit/13d2d6a38beec2829bc1758ecdab6ba7f93a97f7))

### docs

- clean up examples-root ([2dba35a](https://github.com/react-dnd/react-dnd/commit/2dba35a21a78974c21c9fe02ffc019733147850f))
- clean up root page ([5574568](https://github.com/react-dnd/react-dnd/commit/55745683d768b31ca399b085385a78d75f9e70cb))
- udate DndContext documentation ([1da4e7f](https://github.com/react-dnd/react-dnd/commit/1da4e7f6d8daaadc5592c1ff6a503e06089ae2c4))
- use pinned react-dnd versions in examples ([23c4d0e](https://github.com/react-dnd/react-dnd/commit/23c4d0e0b710bf545e9e05bcd9b7b603acb5638d))

# [8.0.0](https://github.com/react-dnd/react-dnd/compare/v7.6.2...v8.0.0) (2019-06-14)

### build

- configure umd-loader to use babel/preset-env on all js modules ([d27b77b](https://github.com/react-dnd/react-dnd/commit/d27b77b8148b51903bf139f631af6eab088ade70))

### docs

- correct drop-target markdown attribute ([8a958b5](https://github.com/react-dnd/react-dnd/commit/8a958b50423b31f55d0d619808aaab4dfe10572d))

## [7.6.2](https://github.com/react-dnd/react-dnd/compare/v7.6.1...v7.6.2) (2019-06-14)

### build

- add dnd-core cjs alias to html5 backend ([5986485](https://github.com/react-dnd/react-dnd/commit/5986485eb84c3020dcd2285894f5fc91458938ff))

## [7.6.1](https://github.com/react-dnd/react-dnd/compare/v7.6.0...v7.6.1) (2019-06-14)

### docs

- fix knight example (#1394) ([fe6f8cc](https://github.com/react-dnd/react-dnd/commit/fe6f8cc948e491b675e2baba880f9ebaf81155c1)), closes [#1394](https://github.com/react-dnd/react-dnd/issues/1394)

# [7.6.0](https://github.com/react-dnd/react-dnd/compare/v7.5.0...v7.6.0) (2019-06-07)

### chore

- replace tslint with eslint (#1380) ([fc44aee](https://github.com/react-dnd/react-dnd/commit/fc44aee46c7d3d7fcc7cd56fd60b83c7c2b61228)), closes [#1380](https://github.com/react-dnd/react-dnd/issues/1380)

### fix

- add memoization to hooks example to improve performance ([497afda](https://github.com/react-dnd/react-dnd/commit/497afdaaee5d17c309c1333e913e187857627df7))
- documentation fixes ([6630373](https://github.com/react-dnd/react-dnd/commit/6630373e396cae9ac79ec680df4c08701c351b4e))
- improve performance in the sortable stress test example ([a1584d9](https://github.com/react-dnd/react-dnd/commit/a1584d9e479b3d0374ee7f0a9c4b1cecb425c2fa))

# [7.5.0](https://github.com/react-dnd/react-dnd/compare/v7.4.5...v7.5.0) (2019-06-07)

### build

- add "module" field to package.json (#1319) ([ead0bca](https://github.com/react-dnd/react-dnd/commit/ead0bca30dc8dfebf65e3bb9c1ed02d2352beb2f)), closes [#1319](https://github.com/react-dnd/react-dnd/issues/1319)

### chore

- promote host-non-react-statics to dependency (#1338) ([696faab](https://github.com/react-dnd/react-dnd/commit/696faaba526ebf86fa3e05ccef4faaa776b47898)), closes [#1338](https://github.com/react-dnd/react-dnd/issues/1338) [#1334](https://github.com/react-dnd/react-dnd/issues/1334)
- remove .editorconfig file (#1358) ([82ac197](https://github.com/react-dnd/react-dnd/commit/82ac1973bf31560909e3330af9713fd82c9c4e26)), closes [#1358](https://github.com/react-dnd/react-dnd/issues/1358)
- update vscode tslint recommended package (#1335) ([9637955](https://github.com/react-dnd/react-dnd/commit/9637955692e054a24c7ec14d5ce2b1ddfe2f3d44)), closes [#1335](https://github.com/react-dnd/react-dnd/issues/1335)

### feat

- let DragDropContextProvider reuse a manager (#1362) ([884c6ff](https://github.com/react-dnd/react-dnd/commit/884c6ff90f04976a32898f0a11af4db9df2ff899)), closes [#1362](https://github.com/react-dnd/react-dnd/issues/1362)

### fix

- always unsubscribe backend when connector reconnects (#1355) ([aeeb7c4](https://github.com/react-dnd/react-dnd/commit/aeeb7c4ee933bf936f364c20d6d1c7215a2cb8de)), closes [#1355](https://github.com/react-dnd/react-dnd/issues/1355)
- correct build issues, cancel-on-drop-outside example (#1373) ([31ac4c5](https://github.com/react-dnd/react-dnd/commit/31ac4c52e105ac7ed0a771655bb4cb320323e3d2)), closes [#1373](https://github.com/react-dnd/react-dnd/issues/1373)
- correct drag source reconnection (#1375) ([32a69c6](https://github.com/react-dnd/react-dnd/commit/32a69c66d7800af5bfa29a8995df92781c021f48)), closes [#1375](https://github.com/react-dnd/react-dnd/issues/1375)
- correct useDrag, useDrop specRef instance ([617c225](https://github.com/react-dnd/react-dnd/commit/617c2255e2cb0dd573cc95019e32a5443e241cd8))
- declare module on dnd-core (#1366) ([8b3e132](https://github.com/react-dnd/react-dnd/commit/8b3e132cfbb875511127c80a79a4f6ec1305975c)), closes [#1366](https://github.com/react-dnd/react-dnd/issues/1366)
- fix draggable box issue in hooks ([bc9b81f](https://github.com/react-dnd/react-dnd/commit/bc9b81f9967af35a21ea98cb3226c63beef200af))
- prevent crash in determineDropResult (react-dnd#1281) (#1367) ([5c8af9a](https://github.com/react-dnd/react-dnd/commit/5c8af9aa7c9d664648f4cb19476ee7ca3b85904f)), closes [react-dnd#1281](https://github.com/react-dnd/issues/1281) [#1367](https://github.com/react-dnd/react-dnd/issues/1367) [#31](https://github.com/react-dnd/react-dnd/issues/31) [#1281](https://github.com/react-dnd/react-dnd/issues/1281)
- update the isRef check to only check for the existence of a 'current' property (#1359) ([80e44fa](https://github.com/react-dnd/react-dnd/commit/80e44fa4ba602a79b5613d3f1491eae976dd1f7a)), closes [#1359](https://github.com/react-dnd/react-dnd/issues/1359)

## [7.4.5](https://github.com/react-dnd/react-dnd/compare/v7.4.4...v7.4.5) (2019-04-03)

### chore

- rebuild yarn.lock ([4d39ad2](https://github.com/react-dnd/react-dnd/commit/4d39ad2a3ffb9ec39390a6fd7b60be802dbc915c))
- remove lodash from react-dnd (#1317) ([dc636b9](https://github.com/react-dnd/react-dnd/commit/dc636b9e0937272d0b125f595c4d22ffaf3e00ec)), closes [#1317](https://github.com/react-dnd/react-dnd/issues/1317)

## [7.4.4](https://github.com/react-dnd/react-dnd/compare/v7.4.3...v7.4.4) (2019-04-02)

### build

- remove nohoist settings (#1296) ([a9f340b](https://github.com/react-dnd/react-dnd/commit/a9f340bfb1d72824c5b277c7b546934dc91e9119)), closes [#1296](https://github.com/react-dnd/react-dnd/issues/1296)

### docs

- add missing deps to examples for codepen ([64672a5](https://github.com/react-dnd/react-dnd/commit/64672a5a07c6a92b1ef18f104da58de5b754309e))
- add some more headings to the section on adding drag-and-drop interaction ([1b83846](https://github.com/react-dnd/react-dnd/commit/1b838469356bc7a0af2a711a9f6a1d9c310a46c9))
- fix gutters, add toc to example (#1304) ([6ed66bf](https://github.com/react-dnd/react-dnd/commit/6ed66bf12a82877a3f37cb1286d64e9abab4fc53)), closes [#1304](https://github.com/react-dnd/react-dnd/issues/1304)
- fromat ts examples ([f94a642](https://github.com/react-dnd/react-dnd/commit/f94a642580489e93dbdc6923fea30aae78f567ba))
- move the chessboard example so that we can model each step of the tutorial as different example envs ([c028840](https://github.com/react-dnd/react-dnd/commit/c0288407e952ec23338cfe1d67c58472bd649058))
- remove example cross-referencing ([ec096a5](https://github.com/react-dnd/react-dnd/commit/ec096a5a8ab9769db1056fb2f657b56f1ef8fc37))
- remove gatsby-plugin-styled-components from config ([429caf5](https://github.com/react-dnd/react-dnd/commit/429caf54dd100f785e29e65efc4eb40b97f08fc9))
- remove outdated comment ([d2133ea](https://github.com/react-dnd/react-dnd/commit/d2133ea8effcc3035d60db56616bce696a9191d3))
- revert styled-components removal, but don't use typings ([c85d9d7](https://github.com/react-dnd/react-dnd/commit/c85d9d7f0fed1c309d18a2b6513422e65bef459e))
- spelling fix ([95fc213](https://github.com/react-dnd/react-dnd/commit/95fc213a7a54ddece763b25ded4865fcb73a9910))
- update clean target ([ba4ec05](https://github.com/react-dnd/react-dnd/commit/ba4ec05e9fe97b18b1fcec43f522a69384b69252))
- use codesandbox for typescript examples ([6356a2f](https://github.com/react-dnd/react-dnd/commit/6356a2f5e6169b8f5d0734f2a7af3cd9e30603db))
- use codesandbox links for javascript example source ([c58d331](https://github.com/react-dnd/react-dnd/commit/c58d3313db7ac6351fca8faab198d8d74c6dd02c))
- use embedded codesandbox examples ([4af62bf](https://github.com/react-dnd/react-dnd/commit/4af62bf652ab3c0efcb950bfecbf1292d0d5b90e))
- wording streamline ([107b009](https://github.com/react-dnd/react-dnd/commit/107b009747e98e2febadf251f1f25fc8643f9edd))
- write cra apps for ts examples ([3dc7539](https://github.com/react-dnd/react-dnd/commit/3dc75393a6090a99dca39a4eb42c90ff97533f31))

### fix

- add endsWith polyfill (#1312) ([69dbcce](https://github.com/react-dnd/react-dnd/commit/69dbccea7ae27dfa1866d27a657a4deb709ae1d9)), closes [#1312](https://github.com/react-dnd/react-dnd/issues/1312)
- apply effect fix to hooks version of dragpreview ([fdf3cf3](https://github.com/react-dnd/react-dnd/commit/fdf3cf3e6668fc21030b43e50a686d7946fa3168))
- corret the dragpreview example by adding an effect dependency ([a608c5e](https://github.com/react-dnd/react-dnd/commit/a608c5eb113317fdcbb2308a14814a01cd4dd32b))
- documentation ([9752600](https://github.com/react-dnd/react-dnd/commit/9752600e1f2ba2506a8b4eac4a0265ba8d21a7c9))

## [7.4.3](https://github.com/react-dnd/react-dnd/compare/v7.4.2...v7.4.3) (2019-03-26)

### docs

- remove example highlighting FCs, since they are now normative ([74296f6](https://github.com/react-dnd/react-dnd/commit/74296f6c91e2162729d11e7130e0d580a9940cda))

### fix

- add typings to the card imperative handle ([8d601b8](https://github.com/react-dnd/react-dnd/commit/8d601b82da74fcd8d8c1a7fc1e0ef664b6cf3f83))
- tiny cleanup ([9992e3b](https://github.com/react-dnd/react-dnd/commit/9992e3b7d29c2a2150db9f016d175c06eaabe976))
- unwrap the decorator ref when using forwarded refs ([6440c54](https://github.com/react-dnd/react-dnd/commit/6440c548a72f4076d4c9de4b9e91d14fdf99caf4))

## [7.4.2](https://github.com/react-dnd/react-dnd/compare/v7.4.1...v7.4.2) (2019-03-26)

### docs

- remove useDragPreview, eliminated argument ([eece551](https://github.com/react-dnd/react-dnd/commit/eece551e078a5329c6727a3012f96b9cf08ad153))

### refactor

- remove recompose dependency ([978384e](https://github.com/react-dnd/react-dnd/commit/978384e8f25ffa72245a6ec55cd13938eb7bdce8))

## [7.4.1](https://github.com/react-dnd/react-dnd/compare/v7.4.0...v7.4.1) (2019-03-26)

### fix

- ssr fixes ([d781184](https://github.com/react-dnd/react-dnd/commit/d7811843c212eea9ac78cc806bcff6da29200cd0))

# [7.4.0](https://github.com/react-dnd/react-dnd/compare/v7.3.2...v7.4.0) (2019-03-26)

### build

- fixed the order as lerna was not building in proper order (#1289) ([6876ef9](https://github.com/react-dnd/react-dnd/commit/6876ef9cf9ea54b1ad9f5d1c9d43aba9074f6246)), closes [#1289](https://github.com/react-dnd/react-dnd/issues/1289)

### docs

- document the props arg to the collector fns ([9840c38](https://github.com/react-dnd/react-dnd/commit/9840c3812a01935db9ebaa55df99de682c7634db))
- fixed markdown in droptarget top level api (#1288) ([874f33a](https://github.com/react-dnd/react-dnd/commit/874f33a17d7d73fac381725c005792d0c54d4ed7)), closes [#1288](https://github.com/react-dnd/react-dnd/issues/1288)
- reference the react-dnd-test-utils package in the testing doc ([ffd92e5](https://github.com/react-dnd/react-dnd/commit/ffd92e58dabd847fd318d48591860aedd5c416f4))

### feat

- add the target component props to the collector funtion signature ([2a7a237](https://github.com/react-dnd/react-dnd/commit/2a7a23703c75371c79a02801c1867f7df8c75767))

### fix

- remove cyclic dependency ([dcbda3c](https://github.com/react-dnd/react-dnd/commit/dcbda3cf29052f598bfd68a1dd2d8e0dfdde6e36))
- remove the useEffect invocation from DragDropContextProvider (#1277) ([cff33ab](https://github.com/react-dnd/react-dnd/commit/cff33ab0650bb9885b3e2a8629a0df32c702a12b)), closes [#1277](https://github.com/react-dnd/react-dnd/issues/1277)
- throw error when a DragSource or DropTarget is rendered outside DragDropContext (#1132) (#1286) ([7fb94a5](https://github.com/react-dnd/react-dnd/commit/7fb94a57d05f4e9af85f9db726500f300073870d)), closes [#1132](https://github.com/react-dnd/react-dnd/issues/1132) [#1286](https://github.com/react-dnd/react-dnd/issues/1286)

### revert

- use recompose for the isClassComponent check ([e6e7cb5](https://github.com/react-dnd/react-dnd/commit/e6e7cb550e9485b9e466d79cc5dcb9f47619e766))

### test

- add test-utils package, add test for connector functions ([5682439](https://github.com/react-dnd/react-dnd/commit/56824398dd06ca834980180c6c1825de5c9723b3))
- added unit tests for react-dnd-html5-backend (#1283) ([27e4a06](https://github.com/react-dnd/react-dnd/commit/27e4a06dd0922e625362183a59bba49b59778d62)), closes [#1283](https://github.com/react-dnd/react-dnd/issues/1283)
- fix tests ([34b87b1](https://github.com/react-dnd/react-dnd/commit/34b87b18708b2dc49974a5dbfbfc3ec8e09c66f2))
- work on tests ([576d148](https://github.com/react-dnd/react-dnd/commit/576d148fc8e43094e623bd2e3c2ee9b131a61ca8))

## [7.3.2](https://github.com/react-dnd/react-dnd/compare/v7.3.1...v7.3.2) (2019-03-13)

### docs

- correct some issues with the hooks docs ([155555c](https://github.com/react-dnd/react-dnd/commit/155555c462cc6a5c9dafa244ba7d42beaa536f0e))
- improve useDrag/useDrop documentation ([0e3a406](https://github.com/react-dnd/react-dnd/commit/0e3a406642a3dd46cd903b6d9be4daf2cf2da687))
- improve usedraglayer, usedragpreview docs ([dc8927e](https://github.com/react-dnd/react-dnd/commit/dc8927e4aa3dec39772417a91b6d6b306dcb676a))

## [7.3.1](https://github.com/react-dnd/react-dnd/compare/v7.3.0...v7.3.1) (2019-03-10)

### docs

- add link to examples-hooks package ([78cef8f](https://github.com/react-dnd/react-dnd/commit/78cef8f87cdc28afe4c03accfa58deac51dba8a4))
- improve examples root page ([2eaafb0](https://github.com/react-dnd/react-dnd/commit/2eaafb01272ade05451350c2d2dc411779a1c061))

# [7.3.0](https://github.com/react-dnd/react-dnd/compare/v7.2.1...v7.3.0) (2019-03-08)

### fix

- update the hooks to pass the right monitor impl to specs (#1259) ([b146a1a](https://github.com/react-dnd/react-dnd/commit/b146a1a32bc9fd4f6ca47b65ab35ac8d1790a8a6)), closes [#1259](https://github.com/react-dnd/react-dnd/issues/1259)

## [7.2.1](https://github.com/react-dnd/react-dnd/compare/v7.2.0...v7.2.1) (2019-03-08)

### docs

- add a link to the example index in the docs sidebar (#1253) ([646a26c](https://github.com/react-dnd/react-dnd/commit/646a26c02bb205ed09a14fc3feb769a070092cac)), closes [#1253](https://github.com/react-dnd/react-dnd/issues/1253)
- correct spelling issue ([aa4605c](https://github.com/react-dnd/react-dnd/commit/aa4605c856effe2edf4b5f827c4590168eb65b76))

# [7.2.0](https://github.com/react-dnd/react-dnd/compare/v7.1.0...v7.2.0) (2019-03-07)

### docs

- add note about hook APIs being experimental ([7dd475c](https://github.com/react-dnd/react-dnd/commit/7dd475cb7ef3c83c79fa33cd8b78f8f9bd831296))

### fix

- update testbackend to use identifiers ([5a4005b](https://github.com/react-dnd/react-dnd/commit/5a4005b5db592e07aad6dc57eb417d019fdd6d6a))
- use ES5 for CJS builds (#1250) ([983f9da](https://github.com/react-dnd/react-dnd/commit/983f9dac7c90954f95c8ca5994412422f4da5cac)), closes [#1250](https://github.com/react-dnd/react-dnd/issues/1250)

### refactor

- use identifiers types in react-dnd utils ([ed2fc9d](https://github.com/react-dnd/react-dnd/commit/ed2fc9d375c85cf20d3ef83b4aec224f26a56e42))

# [7.1.0](https://github.com/react-dnd/react-dnd/compare/v7.0.2...v7.1.0) (2019-03-06)

### fix

- doc url (#1214) ([b1cd7d1](https://github.com/react-dnd/react-dnd/commit/b1cd7d1bc41bddfa85c8db637071aaa1b17e7c0f)), closes [#1214](https://github.com/react-dnd/react-dnd/issues/1214)
- fix #1146 ensure children mount first (#1220) ([0feb250](https://github.com/react-dnd/react-dnd/commit/0feb250b7ee90483e31f3bc159ebf946980d53a7)), closes [#1146](https://github.com/react-dnd/react-dnd/issues/1146) [#1220](https://github.com/react-dnd/react-dnd/issues/1220)
- resolve issue with native dnd (#1240) ([f25f61e](https://github.com/react-dnd/react-dnd/commit/f25f61e6b4c4bee5f4192d4f8cee02ffe26702bb)), closes [#1240](https://github.com/react-dnd/react-dnd/issues/1240)

## [7.0.2](https://github.com/react-dnd/react-dnd/compare/v7.0.1...v7.0.2) (2018-12-03)

### docs

- fixed documentation to make it more clear ([e8fef74](https://github.com/react-dnd/react-dnd/commit/e8fef74b5ac6b5af8a76590107e9f88947172421))
- fixed typos ([36adaf0](https://github.com/react-dnd/react-dnd/commit/36adaf00fa667dcb6e5d3ff14143e0f321591a2f))
- updated documentation for touch backend ([c6467b0](https://github.com/react-dnd/react-dnd/commit/c6467b00d7f7456a4f205715837946704a07713b))

### fix

- added MIT license to inner packages (#1197) ([e925162](https://github.com/react-dnd/react-dnd/commit/e9251623b94e412076e39d0632d85f128b484bb1)), closes [#1197](https://github.com/react-dnd/react-dnd/issues/1197)
- BSD -> MIT for react-dnd-parent package (#1198) ([785a371](https://github.com/react-dnd/react-dnd/commit/785a3716795dae2be2d610520b63cfece8f31e46)), closes [#1198](https://github.com/react-dnd/react-dnd/issues/1198)

## [7.0.1](https://github.com/react-dnd/react-dnd/compare/v7.0.0...v7.0.1) (2018-11-30)

### fix

- use typeof check for window existence to correct SSR (#1193) ([ba37b02](https://github.com/react-dnd/react-dnd/commit/ba37b02f667a8e1e42b3a322b6eada849d51f36a)), closes [#1193](https://github.com/react-dnd/react-dnd/issues/1193)

# [7.0.0](https://github.com/react-dnd/react-dnd/compare/v6.0.0...v7.0.0) (2018-11-27)

### build

- upgrade npm-run-all for security (#1186) ([c025cd7](https://github.com/react-dnd/react-dnd/commit/c025cd7e1d5505492c6a59ea5a41a3b541655b9e)), closes [#1186](https://github.com/react-dnd/react-dnd/issues/1186)

### chore

- add stalebot config ([6f451ee](https://github.com/react-dnd/react-dnd/commit/6f451ee49e3d9e97459f627880ea21cbbfedd25a))

### ci

- upgrade har-vlidator to fix CI corrupt (#1184) ([478f5b5](https://github.com/react-dnd/react-dnd/commit/478f5b504f7272d4480775a207feb6b64ceade06)), closes [#1184](https://github.com/react-dnd/react-dnd/issues/1184)

### docs

- fix examples page URL (#1181) (#1183) ([6430c45](https://github.com/react-dnd/react-dnd/commit/6430c4591a0c7ae492f00d7e439f447e9e6e3fb4)), closes [#1181](https://github.com/react-dnd/react-dnd/issues/1181) [#1183](https://github.com/react-dnd/react-dnd/issues/1183) [#1181](https://github.com/react-dnd/react-dnd/issues/1181)
- fix link in root page (#1189) ([ffda6c7](https://github.com/react-dnd/react-dnd/commit/ffda6c7cc3f284cac42af452867911febae7d2a8)), closes [#1189](https://github.com/react-dnd/react-dnd/issues/1189)

### fix

- clientOffset and initialClientOffset are null in canDrag #1175 (#1176) ([8718ae5](https://github.com/react-dnd/react-dnd/commit/8718ae5adabe51f160187749953a1cee5ffe3b6b)), closes [#1175](https://github.com/react-dnd/react-dnd/issues/1175) [#1176](https://github.com/react-dnd/react-dnd/issues/1176)
- make DecoratedComponent as static property (#1177) (#1185) ([95d90b3](https://github.com/react-dnd/react-dnd/commit/95d90b3079ac64ff6676dd512224c20413aac253)), closes [#1177](https://github.com/react-dnd/react-dnd/issues/1177) [#1185](https://github.com/react-dnd/react-dnd/issues/1185)
- remove initClientOffset action - merge it into initCoords (#1191) ([6b58b8b](https://github.com/react-dnd/react-dnd/commit/6b58b8b2b242259b1655e215ba90f3a6040abb06)), closes [#1191](https://github.com/react-dnd/react-dnd/issues/1191)

# [6.0.0](https://github.com/react-dnd/react-dnd/compare/v5.0.1...v6.0.0) (2018-11-09)

### docs

- check for pathprefix when selecting sidebar content ([48a1bf2](https://github.com/react-dnd/react-dnd/commit/48a1bf21addb7b726f8da0b22c7ffc515c811f99))
- correct underline in draglayer markdown ([28cb1f9](https://github.com/react-dnd/react-dnd/commit/28cb1f9f198c7999d061f60cf4c959b8e01dff97))
- fix another link address ([848ab8d](https://github.com/react-dnd/react-dnd/commit/848ab8d941d67bf8ca841d847bfeb0d23e0c4141))
- link fixes ([59086d4](https://github.com/react-dnd/react-dnd/commit/59086d4e0b3add16461771ce5f3ac940251a0032))
- update gatsby, remove static queries ([32a7a57](https://github.com/react-dnd/react-dnd/commit/32a7a57487f2a63bb567b536ab95ec511dfaa0e7))
- update react-helmet config to include favicon ([3e0f0af](https://github.com/react-dnd/react-dnd/commit/3e0f0af79c7ae8ddf730434e04b02bb3ed4249dd))
- update sidebar link coloring, selection bolding ([4449a26](https://github.com/react-dnd/react-dnd/commit/4449a2650997ccaf38a7609defbf96e140e1816f))
- update site meta ([13a2499](https://github.com/react-dnd/react-dnd/commit/13a24995a96dd4aa632ec3d6fd16081fc0c11e6f))
- updates for static site building ([2504a37](https://github.com/react-dnd/react-dnd/commit/2504a377e8df46548b01e48503a85e6b0d9b8785))

### fix

- revert #1120 due to breaking change with File example ([d13e9c1](https://github.com/react-dnd/react-dnd/commit/d13e9c1f203ba6b6feb6bf4b966c423e5ccaa0f6)), closes [#1120](https://github.com/react-dnd/react-dnd/issues/1120)

### refactor

- replace .bind calls with class binds ([a403c42](https://github.com/react-dnd/react-dnd/commit/a403c42f8ed1e02c97633dc5116789fbfb9f49a3))

### WIP

- Split Documentation examples between Markdown and Code (#1158) ([00b6a66](https://github.com/react-dnd/react-dnd/commit/00b6a66e09c377e50c8890174dedb80963a39147)), closes [#1158](https://github.com/react-dnd/react-dnd/issues/1158)

## [5.0.1](https://github.com/react-dnd/react-dnd/compare/v5.0.0...v5.0.1) (2018-06-19)

# [5.0.0](https://github.com/react-dnd/react-dnd/compare/v4.0.6...v5.0.0) (2018-06-19)

## [4.0.6](https://github.com/react-dnd/react-dnd/compare/v4.0.5...v4.0.6) (2018-06-18)

## [4.0.5](https://github.com/react-dnd/react-dnd/compare/v4.0.4...v4.0.5) (2018-06-13)

## [4.0.4](https://github.com/react-dnd/react-dnd/compare/v4.0.2...v4.0.4) (2018-06-06)

## [4.0.2](https://github.com/react-dnd/react-dnd/compare/v4.0.1...v4.0.2) (2018-06-02)

## [4.0.1](https://github.com/react-dnd/react-dnd/compare/v4.0.0...v4.0.1) (2018-06-01)

# [4.0.0](https://github.com/react-dnd/react-dnd/compare/v3.0.2...v4.0.0) (2018-06-01)

## [3.0.2](https://github.com/react-dnd/react-dnd/compare/v3.0.1...v3.0.2) (2018-05-29)

## [3.0.1](https://github.com/react-dnd/react-dnd/compare/v3.0.0...v3.0.1) (2018-05-29)

# [3.0.0](https://github.com/react-dnd/react-dnd/compare/v2.6.0...v3.0.0) (2018-05-02)

# [2.6.0](https://github.com/react-dnd/react-dnd/compare/v2.5.4...v2.6.0) (2018-03-21)

## [2.5.4](https://github.com/react-dnd/react-dnd/compare/v2.5.3...v2.5.4) (2017-10-07)

## [2.5.3](https://github.com/react-dnd/react-dnd/compare/v2.5.2...v2.5.3) (2017-09-27)

## [2.5.2](https://github.com/react-dnd/react-dnd/compare/v2.5.0...v2.5.2) (2017-09-27)

# [2.4.0](https://github.com/react-dnd/react-dnd/compare/v2.1.4...v2.4.0) (2017-05-09)

### fix

- delete duplicate content (#711) ([64ccf46](https://github.com/react-dnd/react-dnd/commit/64ccf465757230c3fab15c9e940769ffdf80794b)), closes [#711](https://github.com/react-dnd/react-dnd/issues/711)

## [2.1.4](https://github.com/react-dnd/react-dnd/compare/v2.1.3...v2.1.4) (2016-04-02)

## [2.1.3](https://github.com/react-dnd/react-dnd/compare/v2.1.2...v2.1.3) (2016-03-13)

## [2.1.2](https://github.com/react-dnd/react-dnd/compare/v2.1.1...v2.1.2) (2016-02-19)

## [2.1.1](https://github.com/react-dnd/react-dnd/compare/v2.1.0...v2.1.1) (2016-02-17)

# [2.1.0](https://github.com/react-dnd/react-dnd/compare/v1.1.8...v2.1.0) (2016-02-14)

## [1.1.8](https://github.com/react-dnd/react-dnd/compare/v1.1.7...v1.1.8) (2015-09-17)

## [1.1.7](https://github.com/react-dnd/react-dnd/compare/v1.1.6...v1.1.7) (2015-09-15)

## [1.1.6](https://github.com/react-dnd/react-dnd/compare/v1.1.5...v1.1.6) (2015-09-15)

## [1.1.5](https://github.com/react-dnd/react-dnd/compare/v1.1.4...v1.1.5) (2015-08-22)

## [1.1.4](https://github.com/react-dnd/react-dnd/compare/v1.1.3...v1.1.4) (2015-07-13)

## [1.1.3](https://github.com/react-dnd/react-dnd/compare/v1.1.2...v1.1.3) (2015-06-13)

## [1.1.2](https://github.com/react-dnd/react-dnd/compare/v1.1.1...v1.1.2) (2015-06-04)

## [1.1.1](https://github.com/react-dnd/react-dnd/compare/v1.1.0...v1.1.1) (2015-05-27)

# [1.1.0](https://github.com/react-dnd/react-dnd/compare/v1.0.0...v1.1.0) (2015-05-26)

# [1.0.0](https://github.com/react-dnd/react-dnd/compare/v1.0.0-rc...v1.0.0) (2015-05-19)

# [1.0.0-alpha.1](https://github.com/react-dnd/react-dnd/compare/v1.0.0-alpha...v1.0.0-alpha.1) (2015-04-30)

## [0.9.8](https://github.com/react-dnd/react-dnd/compare/v0.9.7...v0.9.8) (2015-03-16)

## [0.9.7](https://github.com/react-dnd/react-dnd/compare/v0.9.6...v0.9.7) (2015-03-15)

# [1.0.0-rc](https://github.com/react-dnd/react-dnd/compare/v1.0.0-beta.0...v1.0.0-rc) (2015-05-11)

# [1.0.0-beta.0](https://github.com/react-dnd/react-dnd/compare/v1.0.0-alpha.2...v1.0.0-beta.0) (2015-05-08)

# [1.0.0-alpha.2](https://github.com/react-dnd/react-dnd/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2015-05-04)

# [1.0.0-alpha](https://github.com/react-dnd/react-dnd/compare/v0.9.8...v1.0.0-alpha) (2015-04-20)

# [1.0.0-alpha.1](https://github.com/react-dnd/react-dnd/compare/v1.0.0-alpha...v1.0.0-alpha.1) (2015-04-30)

## [0.9.8](https://github.com/react-dnd/react-dnd/compare/v0.9.7...v0.9.8) (2015-03-16)

## [0.9.7](https://github.com/react-dnd/react-dnd/compare/v0.9.6...v0.9.7) (2015-03-15)

# [1.0.0-alpha](https://github.com/react-dnd/react-dnd/compare/v0.9.8...v1.0.0-alpha) (2015-04-20)

## [0.9.8](https://github.com/react-dnd/react-dnd/compare/v0.9.7...v0.9.8) (2015-03-16)

## [0.9.7](https://github.com/react-dnd/react-dnd/compare/v0.9.6...v0.9.7) (2015-03-15)

## [0.9.6](https://github.com/react-dnd/react-dnd/compare/v0.9.5...v0.9.6) (2015-03-11)

## [0.9.5](https://github.com/react-dnd/react-dnd/compare/v0.9.4...v0.9.5) (2015-03-11)

## [0.9.4](https://github.com/react-dnd/react-dnd/compare/v0.9.3...v0.9.4) (2015-03-10)

## [0.9.3](https://github.com/react-dnd/react-dnd/compare/v0.9.2...v0.9.3) (2015-03-02)

## [0.9.2](https://github.com/react-dnd/react-dnd/compare/v0.9.1...v0.9.2) (2015-03-01)

## [0.9.1](https://github.com/react-dnd/react-dnd/compare/v0.9.0...v0.9.1) (2015-02-27)

# [0.9.0](https://github.com/react-dnd/react-dnd/compare/v0.8.2...v0.9.0) (2015-02-26)

## [0.8.2](https://github.com/react-dnd/react-dnd/compare/v0.8.1...v0.8.2) (2015-02-25)

## [0.8.1](https://github.com/react-dnd/react-dnd/compare/v0.8.0...v0.8.1) (2015-02-18)

# [0.8.0](https://github.com/react-dnd/react-dnd/compare/v0.7.0...v0.8.0) (2015-02-17)

# [0.7.0](https://github.com/react-dnd/react-dnd/compare/v0.6.4...v0.7.0) (2015-02-11)

### fixes

- #38 ([2404d35](https://github.com/react-dnd/react-dnd/commit/2404d35c77a8cb0ac92294182030a79302110692)), closes [#38](https://github.com/react-dnd/react-dnd/issues/38)

## [0.6.4](https://github.com/react-dnd/react-dnd/compare/v0.6.3...v0.6.4) (2015-02-10)

## [0.6.3](https://github.com/react-dnd/react-dnd/compare/v0.6.2...v0.6.3) (2015-01-27)

## [0.6.2](https://github.com/react-dnd/react-dnd/compare/v0.6.1...v0.6.2) (2014-12-08)

## [0.6.1](https://github.com/react-dnd/react-dnd/compare/v0.6.0...v0.6.1) (2014-11-20)

# [0.6.0](https://github.com/react-dnd/react-dnd/compare/v0.5.1...v0.6.0) (2014-11-11)

## [0.5.1](https://github.com/react-dnd/react-dnd/compare/v0.5.0...v0.5.1) (2014-11-11)

# [0.5.0](https://github.com/react-dnd/react-dnd/compare/v0.4.2...v0.5.0) (2014-11-04)

## [0.4.2](https://github.com/react-dnd/react-dnd/compare/v0.4.1...v0.4.2) (2014-11-04)

## [0.4.1](https://github.com/react-dnd/react-dnd/compare/v0.4.0...v0.4.1) (2014-11-03)

# [0.4.0](https://github.com/react-dnd/react-dnd/compare/v0.3.2...v0.4.0) (2014-10-31)

## [0.3.2](https://github.com/react-dnd/react-dnd/compare/v0.3.1...v0.3.2) (2014-10-30)

## [0.3.1](https://github.com/react-dnd/react-dnd/compare/v0.3.0...v0.3.1) (2014-10-28)

# [0.3.0](https://github.com/react-dnd/react-dnd/compare/v0.2.1...v0.3.0) (2014-10-27)

## [0.2.1](https://github.com/react-dnd/react-dnd/compare/v0.2.0...v0.2.1) (2014-10-27)

# [0.2.0](https://github.com/react-dnd/react-dnd/compare/v0.1.8...v0.2.0) (2014-10-24)

## [0.1.8](https://github.com/react-dnd/react-dnd/compare/v0.1.7...v0.1.8) (2014-10-22)

## [0.1.7](https://github.com/react-dnd/react-dnd/compare/v0.1.6...v0.1.7) (2014-10-21)

## [0.1.6](https://github.com/react-dnd/react-dnd/compare/v0.1.5...v0.1.6) (2014-10-20)

## [0.1.5](https://github.com/react-dnd/react-dnd/compare/v0.1.4...v0.1.5) (2014-10-20)

## [0.1.4](https://github.com/react-dnd/react-dnd/compare/v0.1.3...v0.1.4) (2014-10-20)

## [0.1.3](https://github.com/react-dnd/react-dnd/compare/v0.1.2...v0.1.3) (2014-10-20)

## [0.1.2](https://github.com/react-dnd/react-dnd/compare/v0.1.1...v0.1.2) (2014-10-20)

## [0.1.1](https://github.com/react-dnd/react-dnd/compare/v0.1.0...v0.1.1) (2014-10-19)

# 0.1.0 (2014-10-19)
