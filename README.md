# Deploying Static Websites
* Github link: https://github.com/gSchool/staticDeployment
### Fork and clone this repo to your local machine to get started

### When you have successfully deployed this static website to both github pages and to firebase, open up the WRITEHERE.md file and list your 2 urls to the deployed site and answer the question listed.


# Github Pages:
* Make a new repository on github.com with a name ending in .github.io
* Example:

```

Creating a repo on github - Repo name:

mySite.github.io
```

* Now add the remote from that online repo using
```
git remote add origin <ssh>
```

to your local repository and use git add, git commit, git push

* In the terminal, you will have to create a gh-pages branch:
```
$ git checkout -b gh-pages
```
* From within that branch push your code up to github:
```
$ git push origin gh-pages
```

* Go to into the settings of your .github.io online repo and you should see a link in the GitHub Pages section where your site has been published! (at first it will say your site is ready to be published, but after you visit the url it should complete the publishing process)

### Additional resources:
* https://pages.github.com/


# Firebase Static Deployment
### Sign up for an account at firebase.com using the google login option

* Then you'll need to get the command line tools:
```
$ npm install -g firebase-tools
```

* If you have them already run this command:
```
$ npm update -g firebase-tools
```
* Login to firebase from the terminal using this command:
```
$ firebase login
```

* Now in the root of your project directory where you have your index.html file, initialize this directory with firebase like this:
```
$ firebase init
```
* Make the public part of your app the current directory ( making sure that the root of your directory directly contains the index.html file )

* If you make a mistake, open your text edit and edit the "public" property of your firebase.json file to point to the directory containing your index.html file

```
{
  "firebase": "myfirebase",
  "public": "./",
  "ignore": [
    "firebase.json",
    "**/.*",
    "**/node_modules/**"
  ]
}
```

* When you have all of that configuration completed, run this command in the root of your directory to get your code into a deployed state:
```
$ firebase deploy
```

* Now whenever you make changes to your code, you'll need to re-run the firebase deploy command to update your deployed static site

### Additional resources:
* https://www.firebase.com/docs/hosting/guide/deploying.html

# AWS S3 Static Deployment
* If you're curious about it here is a link for that:
 * http://docs.aws.amazon.com/gettingstarted/latest/swh/getting-started-hosting-your-website.html
