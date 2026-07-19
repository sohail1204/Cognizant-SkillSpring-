# Git Hands-On Lab Guide (Git-T03-HOL_002)
## Clean Up and Push Back to Remote Git

> [!NOTE]
> This guide is designed for beginners. It provides a complete, step-by-step walkthrough of Git Remote Push, Pull, Branch Management, and Verification, along with deep conceptual explanations, troubleshooting advice, and preparation questions.

---

## Module 1: Hands-On Lab Overview
This hands-on lab covers the workflow of cleaning, tracking, pulling, and pushing changes between a local Git repository and a remote repository.
- **Hands-On ID**: `Git-T03-HOL_002`
- **Estimated Time**: 10 minutes
- **Shell Environment**: Git Bash (macOS/Unix terminal commands are equivalent)

---

## Module 2: Verify Master Branch
### Step 1: Verify whether the `master` branch is in a clean state.
To verify the state of your working directory and staging area, use the `git status` command.

#### Command
```bash
git status
```

#### Why It Is Required
Before fetching or sending changes from/to a remote repository, you must verify the state of your working directory. If you have untracked or uncommitted changes, executing a pull could lead to merge conflicts, and pushing would not include your local uncommitted modifications.

#### What is a "Clean Working Tree"?
A clean working tree means that the files in your project directory match the snapshot of the latest commit in your current branch. There are no files that have been modified but not committed, and no new files that are untracked by Git.

#### Why Must the Repository Be Clean Before Pulling or Pushing?
1. **Preventing Conflicts**: Pulling merges remote changes into your local branch. If you have unsaved local changes in the same files, Git may fail to merge or overwrite them, causing a halt.
2. **Predictable Commits**: A clean state ensures that your local commits are distinct, well-documented, and you do not accidentally push half-finished or unintended modifications.

#### Expected Console Output
```text
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

#### Line-by-Line Explanation of the Output
1. `On branch master`: Indicates you are currently on the branch named `master`.
2. `Your branch is up to date with 'origin/master'.`: Confirms that your local `master` branch commit history matches the remote tracking branch `origin/master`.
3. `nothing to commit, working tree clean`: States that there are no modified tracked files or untracked files in the working directory. Everything is saved and clean.

#### Verification
The command is successful when it prints `nothing to commit, working tree clean`.

#### Common Mistakes & Troubleshooting
- **Mistake**: Making modifications but forgetting to commit them.
  - *Symptom*: Output shows list of `Changes not staged for commit` or `Untracked files`.
  - *Fix*: Either commit the changes (`git commit -am "message"`) or temporarily stash them (`git stash`) before continuing.

---

## Module 3: List All Available Branches
### Step 2: Display all available branches.
To inspect the branches available locally and on the remote repository, use the following commands.

#### Commands
```bash
# List local branches
git branch

# List remote-tracking branches
git branch -r

# List both local and remote-tracking branches
git branch -a
```

#### Explanation of Branch Types
- **Local Branches**: Branches that exist only on your local machine. You can edit, commit, and delete them freely without affecting others.
- **Remote Branches**: Branches that exist on the remote server (e.g., GitHub). They represent the shared codebase.
- **Tracking Branches**: Local branches that are linked to a remote counterpart (e.g., local `master` tracking `origin/master`). They allow Git to know if your local branch is ahead, behind, or up-to-date with the remote.
- **Current Branch Indicator (`*`)**: In the command output, the branch prefixed with an asterisk `*` and highlighted in green (in Git Bash) indicates your active branch (the one currently checked out).

#### Expected Console Output
```text
$ git branch
  GitWork
* master

$ git branch -r
  origin/GitWork
  origin/master

$ git branch -a
  GitWork
* master
  remotes/origin/GitWork
  remotes/origin/master
```

#### How to Identify the Active Branch
The active branch has the `*` symbol in front of its name (in this case, `master`).

#### Common Mistakes & Troubleshooting
- **Mistake**: Expecting new remote branches to appear without updating the remote references.
  - *Symptom*: A branch exists on GitHub but is not listed in `git branch -a`.
  - *Fix*: Run `git fetch --all` to retrieve metadata of new branches from the remote, then run `git branch -a` again.

---

## Module 4: Pull Latest Changes from Remote Repository
### Step 3: Pull the remote Git repository to the master branch.
To bring your local repository up-to-date with changes made on the remote repository, execute the pull command.

#### Command
```bash
git pull origin master
```

#### Explanation of Git Pull
`git pull` is a combination of two operations: `git fetch` followed by `git merge`. It downloads commits from the remote tracking branch and merges them into your current local branch.

#### Difference between Git Fetch and Git Pull
- `git fetch`: Only downloads the database history and new commits from the remote repository. It **does not** change your working files or modify your local branches. It only updates the remote-tracking branches (e.g., `origin/master`).
- `git pull`: Downloads the remote changes and **immediately merges** them into your active local branch, updating your working files.

#### Key Git Merge Concepts
- **Fetch**: Downloading new commits from the remote.
- **Merge**: Combining two separate histories or branches into one.
- **Fast-Forward Merge**: If your local branch has no new commits since the time you last fetched, Git simply moves your branch pointer forward to the latest remote commit. No new merge commit is created.
- **Merge Commit**: If both the remote branch and your local branch have new, divergent commits, Git will combine them and create a special commit called a "merge commit" to tie the histories together.

#### Expected Console Output (Fast-Forward Merge)
```text
From /Users/bharathbodduvenkata/Git HOL 5/remote
 * branch            master     -> FETCH_HEAD
   4cc1140..54641dc  master     -> origin/master
Updating 4cc1140..54641dc
Fast-forward
 README.md | 1 +
 1 file changed, 1 insertion(+)
```

#### Possible Merge Conflicts & Resolution
A merge conflict occurs when the same line of the same file is modified differently in the remote repository and the local repository.
- **How to resolve**:
  1. Open the conflicted file in an editor.
  2. Locate the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
  3. Edit the file to keep the desired code and delete the markers.
  4. Save the file.
  5. Stage the resolved file: `git add <filename>`
  6. Commit the merge: `git commit -m "Resolve merge conflict"`

#### Verification
To verify your local repository is up-to-date, run `git status`. It should output `Your branch is up to date with 'origin/master'.`.

---

## Module 5: Push Local Changes to Remote Repository
### Step 4: Push the changes, which are pending from "Git-T03-HOL_002" to the remote repository.
To publish your local commits to the remote repository, run the push command.

#### Command
```bash
git push origin master
```

#### Explanation of Git Push
`git push` uploads your local commits to the specified branch on the remote repository.

#### Why Authentication is Required
Authentication (using SSH keys or Personal Access Tokens) is required to ensure that only authorized users can modify the shared remote repository. It protects the integrity and security of the codebase.

#### Local vs. Remote Repository
- **Local Repository**: Stored entirely on your computer. All commits, branches, and logs are local and private until pushed.
- **Remote Repository**: Hosted on a remote server (e.g., GitHub/GitLab). It acts as the central source of truth for the development team.

#### Expected Console Output
```text
[master b8f8ac5] Add local changes section in README
 1 file changed, 1 insertion(+)
To /Users/bharathbodduvenkata/Git HOL 5/remote.git
   54641dc..b8f8ac5  master -> master
```

#### Common Push Errors & Resolutions
1. **Authentication Failed**:
   - *Cause*: Invalid username, password, or Personal Access Token (PAT).
   - *Solution*: Re-enter credentials, set up credential manager, or verify SSH keys.
2. **Permission Denied**:
   - *Cause*: The authenticated user does not have write access to the repository.
   - *Solution*: Ask the repository owner to grant write permissions.
3. **Non-fast-forward Updates / Rejected Push**:
   - *Cause*: The remote branch has commits that you do not have locally.
   - *Solution*: Pull the remote changes first (`git pull origin master`), resolve any conflicts, and then push again.

---

## Module 6: Verify Changes on GitHub
### Step 5: Observe if the changes are reflected in the remote repository.
To ensure that your push was successful and the remote repository is updated, verify using Git commands or the web interface.

#### Web Verification (GitHub/GitLab)
1. Navigate to your repository URL on GitHub/GitLab.
2. Check the **commits** list on the `master` branch.
3. Verify that your latest commit message (e.g., `Add local changes section in README`) is listed at the top.
4. Verify that the files changed locally (e.g., `README.md`) display the updated contents.

#### Command Line Verification
Use the following commands to verify from your terminal.

#### Commands
```bash
# Check commit history and compare local pointers
git log --oneline

# Check remote URL configuration
git remote -v
```

#### Expected Console Output
```text
$ git log --oneline
b8f8ac5 Add local changes section in README
54641dc Update README.md remotely
4cc1140 Initial commit with README and gitignore

$ git remote -v
origin	/Users/bharathbodduvenkata/Git HOL 5/remote.git (fetch)
origin	/Users/bharathbodduvenkata/Git HOL 5/remote.git (push)
```

#### Explanation of Verification Pointers
- `b8f8ac5`: The latest commit hash.
- `HEAD -> master`: Shows your local checked-out branch pointer (`master`) points to this commit.
- `origin/master`: Shows the remote-tracking pointer also points to this commit, confirming the local and remote repositories are perfectly synchronized.

---

## Module 7: Repository Verification
Perform a final verification to check repository health and synchronization.

#### Commands
```bash
git status
git log --oneline --graph --decorate
git remote -v
```

#### Expected Console Output
```text
$ git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean

$ git log --oneline --graph --decorate
* b8f8ac5 (HEAD -> master, origin/master) Add local changes section in README
* 54641dc Update README.md remotely
* 4cc1140 (origin/GitWork, GitWork) Initial commit with README and gitignore

$ git remote -v
origin	/Users/bharathbodduvenkata/Git HOL 5/remote.git (fetch)
origin	/Users/bharathbodduvenkata/Git HOL 5/remote.git (push)
```

#### Health Status Check
- **Working Tree**: Clean (no uncommitted or untracked changes).
- **Sync Status**: Local matches remote (`HEAD -> master` and `origin/master` are on the same commit: `b8f8ac5`).
- **Push Status**: Success.

---

## Module 8: Git Concepts Explained

### 1. Git Repository
A directory (usually the project root) that contains a `.git` folder. This folder stores the entire version control database, commit history, metadata, and configuration settings for the project.

### 2. Local Repository
The repository stored on your physical machine. You work, stage, and commit changes inside it locally without needing an internet connection.

### 3. Remote Repository
A copy of your repository hosted on a network server (such as GitHub, GitLab, Bitbucket, or a local bare repository). It enables collaboration among multiple developers.

### 4. Origin
The default alias (shortname) Git assigns to the remote repository URL from which the project was cloned or which was manually added as the primary remote server.

### 5. Git Pull
A command (`git pull`) that fetches changes from a remote repository and merges them into the current active local branch in one step.

### 6. Git Fetch
A command (`git fetch`) that retrieves commit history, branches, and tags from the remote repository to your local computer, updating remote-tracking branches without altering your working directory.

### 7. Git Push
A command (`git push`) that uploads your local commits to a specified branch of the remote repository, making your changes visible to others.

### 8. Git Status
A command (`git status`) that shows the state of the working directory and the staging area, displaying tracked, untracked, modified, and staged files.

### 9. Git Branch
An independent line of development. Branches act as pointers to specific commits, allowing developers to work on features or fixes in isolation.

### 10. Git Log
A command (`git log`) that displays the chronological list of commits in the repository, showing commit hashes, authors, dates, and commit messages.

### 11. Git Remote
A command (`git remote`) used to manage connections to remote repositories. Running it with `-v` shows the read/write URLs of configured remotes.

### 12. Tracking Branch
A local branch that is linked to a remote branch. It enables Git to provide feedback on whether your local commits are ahead or behind the remote.

### 13. Fast Forward Merge
A merge that occurs when there is no divergence in the commit history. Git simply moves the local branch pointer forward to point to the commit at the head of the branch being merged.

### 14. Merge Commit
A commit generated automatically by Git when merging two branches with divergent histories. It has two parent commits and represents the unified state of both branches.

### 15. Upstream Branch
The remote branch that a local branch is configured to track. For example, `origin/master` is the upstream branch for the local `master` branch.

---

## Module 9: Troubleshooting Guide

### 1. Authentication Errors
- **Cause**: Invalid password, outdated Personal Access Token, or incorrect SSH keys.
- **Error Message**: `fatal: Authentication failed for 'https://github.com/...'`
- **Solution**:
  - Update your Git Credentials Manager.
  - Generate a new Personal Access Token (PAT) on GitHub (Settings > Developer Settings > Personal Access Tokens) and use it as your password.
  - Verify your SSH connection using `ssh -T git@github.com`.

### 2. Push Rejected Errors (Non-Fast-Forward)
- **Cause**: The remote repository contains commits that you don't have locally.
- **Error Message**: `error: failed to push some refs to '...' hint: Updates were rejected because the remote contains work that you do not have locally.`
- **Solution**:
  - Run `git pull origin <branch-name>` to retrieve and merge remote changes.
  - Resolve any conflicts, commit, and then push again.

### 3. Merge Conflicts
- **Cause**: Divergent changes made to the same lines of a file in local and remote.
- **Error Message**: `CONFLICT (content): Merge conflict in <filename> Automatic merge failed; fix conflicts and then commit the result.`
- **Solution**:
  - Open the file and manually edit the contents between `<<<<<<< HEAD` and `>>>>>>>` markers.
  - Run `git add <filename>` to stage.
  - Run `git commit -m "Resolve merge conflict"` to complete the merge.

### 4. Repository Not Clean
- **Cause**: Unstaged or uncommitted files in the working directory when trying to pull or switch branches.
- **Error Message**: `error: Your local changes to the following files would be overwritten by checkout/merge:`
- **Solution**:
  - Commit your changes: `git add . && git commit -m "save work"`
  - Or stash them: `git stash`, perform the pull/checkout, then restore with `git stash pop`.

### 5. Remote Not Found
- **Cause**: The remote shortname or URL is incorrect.
- **Error Message**: `fatal: 'origin' does not appear to be a git repository`
- **Solution**:
  - Check remotes: `git remote -v`
  - Add remote: `git remote add origin <URL>`
  - Update remote URL: `git remote set-url origin <URL>`

### 6. Detached HEAD State
- **Cause**: Checking out a specific commit hash rather than a branch name.
- **Error Message**: `Note: switching to 'commit-hash'. You are in 'detached HEAD' state.`
- **Solution**:
  - Switch back to a branch: `git switch master` (or `git checkout master`).
  - Create a new branch from this state if you want to keep changes: `git checkout -b new-feature-branch`.

### 7. Branch Mismatch (master/main)
- **Cause**: The remote repository default branch is named `main`, but your local branch is named `master` (or vice-versa).
- **Error Message**: `error: src refspec master does not match any`
- **Solution**:
  - Check your local branch name: `git branch`
  - Rename local branch to match remote: `git branch -m master main`
  - Push matching branch: `git push -u origin main`

### 8. Network Issues
- **Cause**: Loss of internet connectivity or firewall blocking Git ports.
- **Error Message**: `fatal: unable to access 'https://github.com/...': Could not resolve host:`
- **Solution**:
  - Verify your internet connection.
  - Check if you are behind a corporate proxy and configure Git:
    `git config --global http.proxy http://proxyuser:proxypwd@proxy.server.com:8080`

---

## Module 10: Final Deliverables

### 1. Complete Git Bash Command Sequence
Here is the step-by-step sequence of Git Bash commands executed during this lab:
```bash
# Verify status of working directory
git status

# List available branches
git branch
git branch -r
git branch -a

# Pull latest changes from remote
git pull origin master

# Make a local change and commit it
echo "### Local Changes Added during Git-T03-HOL_002" >> README.md
git add README.md
git commit -m "Add local changes section in README"

# Push local commits to remote repository
git push origin master

# Verify commit log and remote paths
git log --oneline
git remote -v

# Final check of repository status
git status
git log --oneline --graph --decorate
```

---

### 2. Expected Console Output for Every Command

#### A. `git status`
```text
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

#### B. `git branch` / `git branch -r` / `git branch -a`
```text
$ git branch
  GitWork
* master

$ git branch -r
  origin/GitWork
  origin/master

$ git branch -a
  GitWork
* master
  remotes/origin/GitWork
  remotes/origin/master
```

#### C. `git pull origin master`
```text
From /Users/bharathbodduvenkata/Git HOL 5/remote
 * branch            master     -> FETCH_HEAD
   4cc1140..54641dc  master     -> origin/master
Updating 4cc1140..54641dc
Fast-forward
 README.md | 1 +
 1 file changed, 1 insertion(+)
```

#### D. `git add README.md` and `git commit -m "Add local changes section in README"`
```text
[master b8f8ac5] Add local changes section in README
 1 file changed, 1 insertion(+)
```

#### E. `git push origin master`
```text
To /Users/bharathbodduvenkata/Git HOL 5/remote.git
   54641dc..b8f8ac5  master -> master
```

#### F. `git log --oneline`
```text
b8f8ac5 Add local changes section in README
54641dc Update README.md remotely
4cc1140 Initial commit with README and gitignore
```

#### G. `git remote -v`
```text
origin	/Users/bharathbodduvenkata/Git HOL 5/remote.git (fetch)
origin	/Users/bharathbodduvenkata/Git HOL 5/remote.git (push)
```

---

### 3. Folder/Repository State After Completion
```text
Git HOL 5/
├── .git/                 # Git repository directory (contains metadata, history, config)
├── .gitignore            # Specifying untracked files to ignore (ignores remote.git/)
├── README.md             # Project documentation (with local and remote modifications)
└── remote.git/           # Simulated bare remote repository (ignored via .gitignore)
```

---

### 4. Verification Checklist
- [x] Run `git status` and confirm output says `nothing to commit, working tree clean`.
- [x] Run `git branch` and verify `* master` is the active branch.
- [x] Run `git remote -v` and verify the remote origin URLs are pointing to the correct address.
- [x] Run `git log --oneline` and check that the top commit hash matches the pushed local commit.
- [x] Check the remote repository (GitHub/GitLab UI) to confirm the files and commits are present.

---

### 5. Common Mistakes to Avoid
- **Forgetting to set upstream tracking**: Always use `git push -u origin master` on the first push so that future runs only require `git push` or `git pull`.
- **Working directly on master for large features**: Avoid developing directly on `master`. Instead, use feature branches (`GitWork`) and merge them.
- **Skipping git status before pulling**: Always check your status first to avoid overwriting uncommitted files during a merge.
- **Hardcoding passwords**: Avoid putting passwords in clone URLs. Set up personal access tokens (PATs) or SSH keys.

---

### 6. Git Best Practices
- **Commit often, publish once**: Make frequent, small, logical commits locally. Push to the remote when the feature or task is complete.
- **Write descriptive commit messages**: Write messages in the imperative mood (e.g., "Add local changes section" instead of "Added local changes").
- **Pull before you push**: Always run a `git pull` to fetch remote updates before trying to push your work.
- **Keep `.gitignore` updated**: Add config, log, build, and IDE configuration files to `.gitignore` early in the project.

---

### 7. 20 Viva Questions with Answers

#### Q1: What is Git?
*Answer*: Git is a distributed version control system designed to track changes in source code files over time and coordinate work among multiple developers.

#### Q2: What is the default name of the primary remote in Git?
*Answer*: The default name is `origin`.

#### Q3: What is the difference between `git branch` and `git branch -a`?
*Answer*: `git branch` lists only local branches, whereas `git branch -a` lists both local and remote-tracking branches.

#### Q4: What is the function of the `.gitignore` file?
*Answer*: It tells Git which files or directories to ignore (e.g., logs, build directories, system files) so that they are not tracked or committed.

#### Q5: What does the command `git status` do?
*Answer*: It displays the state of the working directory and staging area, showing which files are modified, untracked, or staged for commit.

#### Q6: Explain what `git pull` does.
*Answer*: It downloads changes from a remote branch and merges them directly into the current active local branch.

#### Q7: What is the difference between `git fetch` and `git pull`?
*Answer*: `git fetch` only downloads remote data and updates remote-tracking pointers without modifying local files. `git pull` fetches the data and immediately merges it into the local branch.

#### Q8: What is a fast-forward merge?
*Answer*: A merge that occurs when there have been no new commits on the target branch since the source branch split off. Git simply moves the pointer forward.

#### Q9: What is a bare repository?
*Answer*: A Git repository created without a working directory (usually initialized with `git init --bare`). It is used exclusively as a shared remote server to push and pull commits.

#### Q10: What does the `-u` flag do in `git push -u origin master`?
*Answer*: It sets the upstream tracking relationship, linking the local `master` branch to the remote `master` branch on `origin`, allowing future shorthand commands like `git push` or `git pull`.

#### Q11: What is a merge commit?
*Answer*: A commit that combines the histories of two divergent branches, having two parent commits.

#### Q12: How do you identify the active branch in terminal?
*Answer*: Run `git branch`. The active branch is prefixed with an asterisk `*` and highlighted.

#### Q13: What does the `--oneline` flag do in `git log`?
*Answer*: It displays each commit on a single line, showing only the abbreviated commit hash and the commit message.

#### Q14: How do you check the URL of your remote repository?
*Answer*: Run the command `git remote -v`.

#### Q15: What is the staging area in Git?
*Answer*: A middle ground (index) where files are prepared before they are committed to the repository history.

#### Q16: How do you add all modified files to the staging area?
*Answer*: By running `git add .` or `git add -A`.

#### Q17: What does `HEAD` represent in Git?
*Answer*: `HEAD` is a pointer referencing the current active branch or commit in your working directory.

#### Q18: What is a commit hash?
*Answer*: A unique SHA-1 checksum (40 characters) generated by Git that identifies a specific commit.

#### Q19: What is the command to rename a branch?
*Answer*: Run `git branch -m <old-name> <new-name>`.

#### Q20: What is a remote-tracking branch?
*Answer*: A local read-only branch that represents the state of a branch on the remote server (e.g., `origin/master`).

---

### 8. 20 Interview Questions with Answers

#### Q1: How does Git store data?
*Answer*: Git stores data as a series of snapshots of the filesystem rather than differences between files. Every time you commit, Git takes a picture of all your files and stores a reference to that snapshot.

#### Q2: What is the difference between Git and GitHub?
*Answer*: Git is the version control command-line tool installed locally on your machine. GitHub is a cloud-based hosting service for Git repositories, offering collaboration tools and a web interface.

#### Q3: What is a merge conflict and how do you resolve it?
*Answer*: A conflict occurs when Git cannot automatically merge changes (e.g., different modifications to the same line in a file). It is resolved by opening the file, selecting the desired code, removing the conflict markers, staging (`git add`), and committing the merge.

#### Q4: What is the difference between `git merge` and `git rebase`?
*Answer*: `git merge` combines branches by creating a new merge commit, preserving the history as it happened. `git rebase` moves the entire branch's commits to the tip of the target branch, rewriting history to create a linear sequence.

#### Q5: How do you revert a commit that has already been pushed to a remote repository?
*Answer*: Run `git revert <commit-hash>`. This creates a new commit that applies the exact opposite changes of the target commit, preserving history. Do not use `git reset` on public/shared branches as it rewrites history.

#### Q6: What is git stash and when would you use it?
*Answer*: `git stash` temporarily saves your uncommitted changes in a clean state, letting you switch branches or pull changes. You can restore them later using `git stash pop` or `git stash apply`.

#### Q7: What is the purpose of `git reflog`?
*Answer*: `git reflog` records every change made to the tips of branches and HEAD (e.g., checkouts, commits, rebases). It is useful to recover lost commits or branches that are no longer referenced.

#### Q8: Explain what a "Detached HEAD" state is.
*Answer*: It is when the `HEAD` pointer points directly to a commit hash instead of a local branch name. Commits made in this state do not update any branch and can easily be lost.

#### Q9: How can you retrieve a file you deleted from your local working directory?
*Answer*: If it was committed, you can restore it using `git checkout HEAD -- <filename>` or `git restore <filename>`.

#### Q10: What is the difference between soft, mixed, and hard resets?
*Answer*:
- `--soft`: Resets HEAD to the commit, but keeps changes staged in the index and working directory.
- `--mixed` (default): Resets HEAD and unstages changes, keeping them in the working directory.
- `--hard`: Resets HEAD, index, and working directory, discarding all changes.

#### Q11: What is the purpose of the `git cherry-pick` command?
*Answer*: It allows you to select a specific commit from one branch and apply it to your current active branch.

#### Q12: How do you set up a Git hook?
*Answer*: Git hooks are scripts located in the `.git/hooks` directory. You can create executable scripts (like `pre-commit` or `pre-push`) in this folder to automate tasks like code formatting or testing before commits.

#### Q13: What does the command `git clean` do?
*Answer*: It removes untracked files from the working directory. Using `-f` forces the deletion, and `-d` includes untracked directories.

#### Q14: How do you check which commits are on a branch but have not yet been pushed to the remote?
*Answer*: Use the command `git log origin/master..master` (replaces branch names as appropriate) to show local commits not present on the remote tracking branch.

#### Q15: What is the three-tree architecture of Git?
*Answer*: Git manages three areas:
1. **Working Directory**: The actual sandbox files on your disk.
2. **Index (Staging Area)**: The file index prepared for the next commit.
3. **HEAD (Commit Repository)**: The database of recorded commits.

#### Q16: How do you configure a global Git alias?
*Answer*: Run `git config --global alias.<name> <command>`. For example, `git config --global alias.co checkout` allows you to run `git co`.

#### Q17: What is the default merge strategy used by Git?
*Answer*: Git defaults to the `recursive` strategy (or `ort` in newer versions) for three-way merges, and `resolve` or `fast-forward` for simpler histories.

#### Q18: What is a Pull Request (PR) or Merge Request (MR)?
*Answer*: A proposal to merge changes from one branch into another (usually on a remote server). It allows team members to review code, run tests, and discuss changes before they are integrated into the main branch.

#### Q19: How do you delete a branch locally and on the remote?
*Answer*:
- Local: `git branch -d <branch-name>`
- Remote: `git push origin --delete <branch-name>`

#### Q20: Explain the significance of the `origin/HEAD` branch.
*Answer*: It is a symbolic reference on the remote tracker indicating the default branch of the remote repository (usually `origin/main` or `origin/master`).

---

### 9. Frequently Used Git Commands Reference Table

| Category | Command | Description |
| :--- | :--- | :--- |
| **Setup** | `git init` | Initializes a new local Git repository. |
| **Setup** | `git clone <url>` | Clones a remote repository to your local machine. |
| **Setup** | `git config --global user.name "<name>"` | Configures global username. |
| **Setup** | `git config --global user.email "<email>"` | Configures global email address. |
| **Basic Operations** | `git status` | Shows current status of files (untracked, modified, staged). |
| **Basic Operations** | `git add <file>` | Stages a file for the next commit. |
| **Basic Operations** | `git commit -m "<msg>"` | Records staged changes to commit history. |
| **Branching** | `git branch` | Lists all local branches. |
| **Branching** | `git branch <name>` | Creates a new branch. |
| **Branching** | `git switch <name>` | Switches to the specified branch. |
| **Branching** | `git checkout -b <name>` | Creates and switches to a new branch. |
| **Branching** | `git merge <name>` | Merges changes from `<name>` into active branch. |
| **Remote Integration** | `git remote -v` | Lists all configured remote connections. |
| **Remote Integration** | `git remote add <name> <url>` | Adds a new remote repository connection. |
| **Remote Integration** | `git fetch <remote>` | Downloads latest remote metadata without merging. |
| **Remote Integration** | `git pull <remote> <branch>` | Fetches and merges remote changes into active branch. |
| **Remote Integration** | `git push <remote> <branch>` | Uploads local commits to remote branch. |
| **Inspection** | `git log --oneline` | Displays commit history in a single line format. |
| **Inspection** | `git log --graph --decorate` | Displays visual ascii commit graph. |
| **Inspection** | `git diff` | Shows unstaged changes in the working directory. |
| **Stash** | `git stash` | Temporarily saves uncommitted changes. |
| **Stash** | `git stash pop` | Restores last stashed state and removes it from stash stack. |
