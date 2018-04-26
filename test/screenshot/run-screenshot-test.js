/*
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const SOURCE_DIR = 'test/screenshot/';

const Runner = require('./lib/runner');
const runner = new Runner({sourceDir: SOURCE_DIR});

runner.uploadAllAssets()
  .then((testCases) => {
    return runner.captureAllPages(testCases)
      .then(() => Promise.resolve(testCases), (err) => Promise.reject(err));
  })
  .then((testCases) => {
    console.log('\n\nDONE!\n\n');

    testCases.forEach((testCase) => {
      console.log(`${testCase.htmlFile.publicUrl}:`);
      testCase.screenshotImageFiles.forEach((screenshotImageFile) => {
        console.log(`  - ${screenshotImageFile.publicUrl}`);
      });
      console.log('');
    });
  });