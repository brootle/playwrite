# Playwrite
1. Clone this repository and run `npm install` to install dependencies
2. Tests are located in `tests` folder
3. In oder for this tests to run locally you first need to add `.env` file in the root of the project with correct credentials. If running on somewhere else, you must add enviroment variables
```
API_KEY="my_api_key"
QENCODE_EMAIL = "my_email_address@google.com"
QENCODE_PASSWORD = "my_password"
```
5. To run all test run `npx playwright test` command
6. To run specific test run `npx playwright test test-qencode.spec.ts` or `npx playwright test test-qencode-api.spec.ts`
7. To review report in the broswer run `npx playwright show-report`

Test in `test-qencode.spec.ts` file goes to https://cloud.qencode.com/ clicks `Sign In`, after that checks if url contains `login` to make sure we succesfully got to login page. 
After that script finds login field on the page and fills it with email address, next finds password field and fills it with passpord, next `Sign In`
button is clicked. After that there is a check to see if url contains `dashboard` to make sure user was redirected to Dashboard page after authorization. During the test
the video is recordered, it's available when revieing test results.

The test in `test-qencode-api.spec.ts` file is testing Qencode API. Following steps are tested: get access token, create task, start transcoding and get status.

Additionally, this repository is configured to use Github Actions to run tests everytime some changes are commited. 
See about using Github Actions with Playwrite here https://playwright.dev/docs/ci-intro and how to define enviroment 
variables in workflow file here https://docs.github.com/en/actions/learn-github-actions/variables The file with workflow 
is in `.github/workflows/playwright.yml`

For more details on Playwrite check documentation here https://playwright.dev/docs/intro
