# Deploying Static Websites

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

* Now you can use the name of your repo as a url in the browser and it should be hosted there for you!

### Additional resources:
* https://pages.github.com/


# Firebase Static Deployment
* First of all you'll need to get the command line tools:
```
$ npm install -g firebase-tools
```

* If you have them already run this command:
```
$ npm update -g firebase-tools
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
