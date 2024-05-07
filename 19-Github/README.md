# Git_Basics
A tutorial to use git &amp; github

## Init

Init command is used to initialize a repo. After this command is executed .git file is generated.

**Commands**

```bash
mkdir Git_Testing
git init
git add .
git status
git config --global user.name ""//Enter your Github username here
git config --global user.email ""//Enter your Github email ID
git commit -m "First Commit"
git log
```
**Connecting with Github**

- Create a repo in github by clicking the + symbol in right side. 

- Select a title and add a git ignore file and click create repo

- Go to the Account settings and in the bottom move to the developer settings

- In the developer settings there will be an option for Personal Access Token select that.

- There select the tokens (classic) option and click generate new token (classic) option.

- Now enter a title and select all the options to give this token permissions.

- A new token will be generated copy that and save somewhere safe

```bash
git remote add origin url //Pass the url of the repo here
```

```bash
git branch -m main

git pull --rebase origin main

git push -u origin main
```
It will prompt for username and password. **In the password section pass the token which you copied**


## Clone

If you want to work with an already existing repository then we will use this method

```bash
git clone url //Replace the url with the url of repo

cd name of the folder
```
Make some changes

```bash
git add .
```

```bash
git commit -m "First Commit"

git push -u origin main
```
Enter the the username and password(password refer to Personal Access Token)

## Private repo

In this repo only authorized members can only access this repository

In order to work with a private repo we need ssh key or Personal Access Token. 

Let's see how to use ssh key.

```bash
ssh-keygen -t ed25519 -C "recognizable tag" //Replace the recognizable tag with whatever you like
```
Here it will prompt for path location and password. The default folder and empty password will be setup if you just press enter.

```bash
eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_ed25519

cat ~/.ssh/id_ed25519.pub
```

**Copy from ssh to the last don’t include the tag.** 

Now go to the settings and select ssh and gpg keys and paste this key.

Now if you clone using **ssh**. It will automatically be cloned to your local sytem.

## Using Git in VSCODE

Go to the terminal and confiure the username and usermail ID of Github

```bash
git conig user.name "" //Username of Github
```

```bash
git conig user.email "" //Email used in Github
```


## Clone with VSCODE

In order to clone a repository in VS code go to the command palette.**(Ctrl+shift+P)** and type git clone. Then just type the url which you want to clone.

## Initialize with VSCODE

**To initialize a new repo go the folder and select the source control system logo in the side bar. Now select the intialize repository button. This button is equivalent to git init.**

## Publish to Github

**This repo automatically creates a new repo and publishes the code in Github. This repo can be either be private or public.**

## Branching

To create a new branch, run this command

```bash
git checkout -b test // test is the Name of the branch
```

Add some content

```bash
git add .
```

```bash
git commit -m "first branch commit"

git push -u origin test

```

```bash
git checkout main

get merge test

git push -u origin main
```

## Branching in VS Code

**The branch indicator in the Status bar shows the current branch and lets you switch to new and existing branches.**

## Pull

```bash
git pull
```

## Pull request

- Fork the repository

- Clone the repo to your local system.

- Go inside the repo and create a new branch

```bash
git checkout -b new-feature
```

- Make some changes

```bash
git add .

git commit -m "Add new feature"

git push origin new-feature
```

Now go to the github repo there you can see that there is an option called Compare & pull request request.

Enter a title for the pull request and mention the changes being made.


## Merge Conflict

Merge Conflict happens whenever two branches have the same changes in the same file.

**Eg**

In the main branch ther is a file called abc.txt with this content - hiiiiiiiii

Committed using VS CODE

Changed the branch to conflict and edited this content to - helloooooo

And comitted to conflict branch

Now when we merge this merge conflict occurs. 

## Resources

- https://www.freecodecamp.org/news/what-is-git-learn-git-version-control/

- https://git-scm.com/docs

- https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners

- https://code.visualstudio.com/docs/sourcecontrol/intro-to-git#_open-a-github-repository-in-a-codespace

- https://www.freecodecamp.org/news/git-and-github-for-beginners/

- https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts

- https://www.freecodecamp.org/news/resolve-merge-conflicts-in-git-a-practical-guide/

- https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls

