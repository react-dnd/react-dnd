## Testing against a spectrum of browsers

Testing this library against a spectrum of browsers involves several bits of
infrastructure, which are each either very cheap or free for open source
projects.
You will need an Amazon Web Services (AWS) S3 account, for which you can expect
to pay a couple bucks annually.
You will also need a SauceLabs account, which is free for open source projects.

You will need to populate an `credentials.json` module in the project.
Git has been directed to ignore this file to mitigate fears of accidentally
sharing your credentials.
This configuration file is used both for running browser tests during
development and to generate the encrypted configuration for Travis CI
(continuous integration).

```json
{
  "S3_USERNAME": "kriskowal",
  "S3_BUCKET": "kriskowal-asap",
  "S3_REGION": "Oregon",
  "S3_WEBSITE": "http://kriskowal-asap.s3-website-us-west-2.amazonaws.com",
  "S3_ACCESS_KEY_ID": "xxxxxxxxxxxxxxxxxxxx",
  "S3_ACCESS_KEY": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "SAUCE_EMAIL": "kriskowal@example.com",
  "SAUCE_USERNAME": "kriskowal-asap",
  "SAUCE_ACCESS_KEY": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### AWS S3

You will need an account for [S3][].
Note your S3 user name under `S3_USERNAME`in `credentials.json`.
It is not your email address.
It is not mine either.

Sign into the console.
Click your name and follow the menu to “Security Credentials”.
I was unable to figure out how to set up IAM users, but if you do, please come
back and amend this document for posterity.
Continue to your own security credentials.
Expand the “Access Keys” section. Create an access key.
Record the Access Key ID under `S3_ACCESS_KEY_ID` in `credentials.json`, and the
key itself under `S3_ACCESS_KEY`.
These access keys can be revoked if you lose control over them.

Create a bucket.
Note the name of the bucket as `S3_BUCKET` in `credentials.json`.
Open your bucket and select the “Properties” tab.
Note the `S3_REGION`, which depends on which datacenter you chose for your
bucket.
Expand the “Static Website Hosting” section.
Note the “Endpoint address” as `S3_WEBSITE`.
The test suite will upload a built version of this project to S3 using the
`knox` package from npm, and then will use Selenium WebDriver, `wd` in npm, to
load the test page from the S3 website.

[s3]: aws.amazon.com/s3

### Manual browser testing

This package includes scripts that will create a test bundle and publish it to
S3.
The bundle can be viewed in a web browser from anywhere on the web.
I have found this to be one useful way to run tests in browsers on other
physical or virtual machines.

```
npm run test-browser
```

This will open a web browser with the URL where the tests were published.
If you are running on a Mac, or have otherwise arranged for `pbcopy` to be
emulated on your system, use `npm run test-publish` to publish and copy the URL
to your system clipboard.

```
npm run test-publish
pbpaste
```

### Sauce Labs

You will need an account with Sauce Labs.
If the account will be used for continuous integration for an open source
project, apply for an open source account _for your project_.
Choose a user name like `montagejs-jasminum`.
If you are just using Sauce Labs for testing during development or if you are
developing a closed source project, you will need to purchase a plan.
If you have a plan, you can create sub-accounts for individual projects.

Note your Sauce Labs user name in `credentials.json` under `SAUCE_USERNAME`.

Your Sauce Labs access key is visible in the left column of the dashboard.
Make a note of it under `SAUCE_ACCESS_KEY`.
The dashboard will show all of your Selenium WebDriver sessions.
A link in the top left will take you to your “Open Sauce Profile”, a link you
can share to show your project's build status.

### Check your local copy

To test your working copy, use the command `npm run test-saucelabs`.

```
npm run test-saucelabs
npm run test-saucelabs-all # all configurations
npm run test-saucealbs-worker # for a web worker test matrix
npm run test-saucealbs-worker-all
```

This will read the environment variables in `credentials.json` and then run
`scripts/saucelabs.js`, which will in turn orchestrate the creation of a build
script, uploading that script to Amazon S3, and the execution of a Selenium
WebDriver session on Sauce Labs for each of the `sauce.configurations` in
`package.json`, and annotating the test results using the Sauce Labs API.

### Travis Continuous Integration

You will probably not need to deal with this portion personally.
This package is already set up with Travis, and a commit hook is installed on
Github to automatically kick off jobs for any push to the main repository.
However, you will need to do these steps if you intend to run tests from your
own fork.
Take care not to push changes to `.travis.yml` upstream.

We use `.travis.yml` to instruct Travis CI to run the Node.js tests and the
spectrum of browser tests.
The browser tests need the content of your `credentials.json` script, but that
information has to be encrypted and appended to `.travis.yml`.
To do this you will need the `travis` command line tool and Ruby.
Version 2.1.0 of Ruby, installed with [Homebrew][1] was suffiient in my
experience.
Earlier versions of Ruby, particularly an earlier version packed with the
operating system, were not. Gem did not cooperate the first time.
It may require multiple attempts.
If you find that your experience differs substantially, please ammend these
notes for posterity.

[1]: http://brew.sh/

```
gem install travis
```

The enclosed `scripts/encrypt-credentials.js` script uses `travis encrypt` to
append the encrypted environment variables to `.travis.yml`.

```
node scripts/encrypt-credentials.js
```

The script is very small and not very clever (that is, not idempotent), so
before you run it again, you will need to manually remove the previous
environment variables from the end of `.travis.yml`.

Obtain an account for [Travis CI][]. From their web interface, under accounts,
find your repository and enable continuous integration. Travis will install its
commit hook in your repository on your behalf.

[travis ci]: https://travis-ci.org/
