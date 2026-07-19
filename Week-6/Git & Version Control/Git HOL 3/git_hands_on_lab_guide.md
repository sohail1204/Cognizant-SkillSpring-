# Git Hands-On Lab: Complete Branching, Merging & GitLab Workflow Guide

Welcome to the comprehensive hands-on guide for Git branching, merging, and GitLab collaborative workflows. This document covers the exact command executions, detailed structural explanations, ASCII concepts diagrams, GitLab integration steps, and an exhaustive Q&A section.

---

## Module 1 – Understand the Task

This lab is designed to be executed using **Git Bash** (or terminal environments that support standard Unix shells). In version control, each step is critical; skipping a configuration or command can result in corrupt merge states, detached HEAD states, or lost progress.

### Command Execution Template
For every command used in this lab, we analyze the following five dimensions:
1. **What it does**: The low-level action Git performs on the object database or references.
2. **Why it is used**: The practical workflow purpose for running the command.
3. **Expected Output**: The typical console output resulting from a successful run.
4. **Common Mistakes**: Frequent errors made by beginners (e.g., syntax issues, incorrect paths).
5. **How to Verify Success**: The command or visual cue to confirm the operation succeeded.

---

## Module 2 – Branching

### 1. Conceptual Background

#### What is a branch?
In Git, a branch is not a physical copy of files. Instead, it is a lightweight, mutable pointer that references a specific commit in the repository's history graph. As you make new commits, the branch pointer automatically moves forward to point to the newest commit.

#### Why is branching used?
Branching enables parallel development by isolating changes. Multiple developers can work on separate features, bug fixes, or experiments simultaneously in the same repository without affecting the stable line of development (often named `master` or `main`) or interfering with each other's code.

#### Difference between master/main and feature branch
* **`master`/`main`**: The primary, stable branch in a repository. It represents the production-ready code. Commits should only enter this branch via verified, reviewed merges.
* **Feature Branch (e.g., `GitNewBranch`)**: A temporary branch created off the stable branch to build a specific feature or fix a bug. It isolates changes and is deleted once merged.

---

### 2. Branch Management Commands

#### Command to Create the Branch
Before creating a branch, the repository must be initialized and have at least one commit. Let's initialize the repository and create the branch:

```bash
git branch GitNewBranch
```
* **What it does**: Creates a new branch reference named `GitNewBranch` pointing to the exact same commit that `HEAD` is currently pointing to.
* **Why it is used**: To start a new isolated line of development.
* **Expected Output**: No output (silent success).
* **Common Mistakes**: Typo in the branch name, or running the command in a directory that is not a Git repository.
* **How to Verify**: List the branches using `git branch`.

#### List Local Branches
```bash
git branch
```
* **What it does**: Lists all branch references stored in `.git/refs/heads/`.
* **Why it is used**: To see which branches exist locally and identify the currently checked-out branch.
* **Expected Output**:
  ```text
    GitNewBranch
  * master
  ```
* **Common Mistakes**: Forgetting that this only shows local branches, not remote ones.
* **How to Verify**: Confirm the list contains `GitNewBranch` and `master`.

#### List Remote Branches
```bash
git branch -r
```
* **What it does**: Lists all remote-tracking branches stored in `.git/refs/remotes/`.
* **Why it is used**: To see what branches exist on the remote repository (e.g., GitHub/GitLab).
* **Expected Output**: Empty output if no remote is configured, or:
  ```text
    origin/master
    origin/feature-auth
  ```
* **Common Mistakes**: Running this command without running `git fetch` first (which updates remote references).
* **How to Verify**: Verify that the output lists remote branches prepended with the remote name (usually `origin/`).

#### List Both Local and Remote Branches
```bash
git branch -a
```
* **What it does**: Lists all local and remote-tracking branches.
* **Why it is used**: For a complete view of all branches available in the repository.
* **Expected Output**:
  ```text
    GitNewBranch
  * master
    remotes/origin/master
  ```
* **Common Mistakes**: Expecting this to show branches on the remote server that you have not fetched yet.
* **How to Verify**: Confirm both local branches (white/green text) and remote branches (usually red text) are printed.

#### Meaning of the `*` Symbol
The asterisk (`*`) symbol beside a branch name (along with color-coding in most terminals) indicates the **currently active branch** (where `HEAD` is pointing). Any new commits made will be added to this branch.

---

### 3. Switching and Working on the New Branch

#### Switch to the New Branch
```bash
git switch GitNewBranch
```
* **What it does**: Updates the files in the working directory to match the commit pointed to by `GitNewBranch`, and updates `HEAD` to point to `GitNewBranch`.
* **Why it is used**: To begin working on the isolated environment.
* **Expected Output**:
  ```text
  Switched to branch 'GitNewBranch'
  ```
* **Common Mistakes**: Using a branch name that does not exist, or having unstaged changes that conflict with the destination branch.
* **How to Verify**: Run `git branch` and verify the `*` is next to `GitNewBranch`.

#### Create and Write Sample Files (using Git Bash compatible commands)
Let's create three sample files with meaningful content:

```bash
echo "This is the first sample file created in the new branch GitNewBranch." > file1.txt
echo "This is the second sample file, demonstrating branch isolation in Git." > file2.txt
echo -e "Lab Notes:\n- Created branch GitNewBranch\n- Working on Module 2 tasks" > notes.txt
```
* **What it does**: Writes the specified string content into `file1.txt`, `file2.txt`, and `notes.txt` respectively.
* **Why it is used**: To create mock files to simulate feature development.
* **Expected Output**: No output (silent success).
* **Common Mistakes**: Typo in redirector `>` (which overwrites) vs `>>` (which appends), or path errors.
* **How to Verify**: Verify file contents using `cat`:
  ```bash
  cat file1.txt
  cat file2.txt
  cat notes.txt
  ```

#### Stage the Files
Before committing, files must be placed in the staging area (index):
```bash
git add file1.txt file2.txt notes.txt
```
* **What it does**: Copies the content of the three files to the Git index/staging area, marking them as ready to be committed.
* **Why it is used**: To select which changes will be included in the next commit.
* **Expected Output**: No output.
* **Common Mistakes**: Forgetting to add new files, or staging files that should be ignored.
* **How to Verify**: Check the status with `git status`.

#### Commit the Files
```bash
git commit -m "Add sample files file1.txt, file2.txt, and notes.txt with content"
```
* **What it does**: Records the staged snapshot of changes as a new commit object in the Git history database, with a message.
* **Why it is used**: To save a permanent checkpoint of the changes.
* **Expected Output**:
  ```text
  [GitNewBranch 6174f2d] Add sample files file1.txt, file2.txt, and notes.txt with content
   3 files changed, 5 insertions(+)
   create mode 100644 file1.txt
   create mode 100644 file2.txt
   create mode 100644 notes.txt
  ```
* **Common Mistakes**: Omitting the `-m` flag (which opens the default text editor), or committing with an empty message.
* **How to Verify**: Run `git log -n 1` to view the commit.

---

### 4. Git Status and Staging Concept

#### What does staging mean?
The **Staging Area** (also called the index) is a middle-ground file cache between your Working Directory and the local Git Repository. Staging allows you to build a clean, logical commit from your modified files. You can selectively choose to stage specific lines or files while leaving other modifications unstaged, ensuring every commit is self-contained.

#### What does commit mean?
A **Commit** is a permanent snapshot of staged changes saved to your local Git database. Each commit has a unique SHA-1 hash identifier, author info, timestamp, and a reference to its parent commit(s). It builds the immutable historical timeline of your project.

#### Git Status Analysis
Running `git status` reveals the state of the working directory and staging area:
```bash
git status
```

**Expected Output (Staged, before committing)**:
```text
On branch GitNewBranch
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   file1.txt
	new file:   file2.txt
	new file:   notes.txt
```

**Expected Output (After committing)**:
```text
On branch GitNewBranch
nothing to commit, working tree clean
```

#### Explanation of Every Section of `git status`
1. **`On branch <branch-name>`**: Indicates the branch currently checked out (`GitNewBranch`).
2. **`Changes to be committed:`**: Lists files that are staged in the index. These changes will be included in the next commit.
3. **`Changes not staged for commit:`**: Lists tracked files that have been modified in the working directory but not yet added to the index.
4. **`Untracked files:`**: Lists files in the working directory that Git is not currently tracking (not added to index).
5. **`nothing to commit, working tree clean`**: Indicates that there are no modifications in tracked files and no untracked files in the working directory.

---

## Module 3 – Merging

### 1. Preparing for Merge

#### Switch Back to Master
```bash
git switch master
```
* **What it does**: Updates the working directory files to match the latest commit on `master` (removing the new files since they only exist in `GitNewBranch`) and moves `HEAD` to point to `master`.
* **Why it is used**: Because merges are **pull-based**; you must be on the target branch (the branch you want to merge *into*) before running the merge command.
* **Expected Output**:
  ```text
  Switched to branch 'master'
  ```

#### Verify Current Branch
```bash
git branch
```
* **Expected Output**:
  ```text
    GitNewBranch
  * master
  ```
Confirm that `master` has the `*` symbol.

#### Why we switch to master before merging
Git merge is an operation that merges changes *from* a target branch *into* the current branch. Therefore, to merge `GitNewBranch` into `master`, you must first checkout/switch to `master` so that the merge target receives the updates.

---

### 2. Comparing Changes

#### Compare Branches on Command Line
```bash
git diff master GitNewBranch
```
* **What it does**: Compares the tip of `master` with the tip of `GitNewBranch` and outputs the differences line-by-line in unified diff format.
* **Why it is used**: To review exactly what changes will be merged before performing the merge.
* **Expected Output**:
  ```diff
  diff --git a/file1.txt b/file1.txt
  new file mode 100644
  index 0000000..fdf4a2d
  --- /dev/null
  +++ b/file1.txt
  @@ -0,0 +1 @@
  +This is the first sample file created in the new branch GitNewBranch.
  diff --git a/file2.txt b/file2.txt
  ...
  ```
* **Common Mistakes**: Reversing the order (`git diff GitNewBranch master`), which shows files being deleted instead of added.

#### Difference between `git diff` and `git diff branch1 branch2`
* **`git diff`**: Without arguments, this compares your **Working Directory** with your **Staging Area** (index). It shows unstaged changes.
* **`git diff branch1 branch2`**: Compares the commits pointed to by `branch1` and `branch2`.

#### Output Explanation
* **`diff --git a/file1.txt b/file1.txt`**: Compares version A (master) to version B (GitNewBranch) of `file1.txt`.
* **`new file mode 100644`**: Indicates a new file was created with standard non-executable permissions.
* **`--- /dev/null`**: Shows that the file did not exist in version A.
* **`+++ b/file1.txt`**: Shows where the file content is added in version B.
* **`@@ -0,0 +1 @@`**: Range information (start line and line count).
* **`+This is the first sample file...`**: The lines prefixed with `+` are additions. Deletions are prefixed with `-`.

---

### 3. Visual Comparisons using P4Merge

#### P4Merge Setup
P4Merge is a free visual diff and merge tool. To configure it as Git's default diff and merge tool, add the following to your global config:

```bash
git config --global diff.tool p4merge
git config --global difftool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
git config --global merge.tool p4merge
git config --global mergetool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
```
*(Adjust the path according to your actual installation directory, e.g., `/Applications/p4merge.app/...` on macOS).*

#### Running Visual Diff
```bash
git difftool master GitNewBranch
```
* **Expected Visual Output**: P4Merge launches a window showing two panels:
  - **Left Panel (Source)**: Empty or missing files (from `master`).
  - **Right Panel (Target)**: Containing `file1.txt`, `file2.txt`, and `notes.txt` with their highlighted text.

---

### 4. Merging the Branch

#### Run the Merge
```bash
git merge GitNewBranch
```
* **What it does**: Integrates the commit history of `GitNewBranch` into `master`. Since `master` has not diverged, Git performs a **Fast-forward** merge.
* **Why it is used**: To bring the feature commits into the main branch.
* **Expected Output**:
  ```text
  Updating 6144809..6174f2d
  Fast-forward
   file1.txt | 1 +
   file2.txt | 1 +
   notes.txt | 3 +++
   3 files changed, 5 insertions(+)
   create mode 100644 file1.txt
   create mode 100644 file2.txt
   create mode 100644 notes.txt
  ```

#### Merge Types Explained
* **Fast-Forward Merge**: Occurs when the target branch (`master`) has no new commits since the source branch (`GitNewBranch`) was created. Git simply moves the branch pointer of `master` to point to the newest commit of the source branch. No new merge commit is created.
* **Three-Way Merge**: Occurs when the branches have diverged (i.e., new commits were made on `master` AND new commits were made on the feature branch). Git finds the common ancestor of both branches, compares the changes from both paths, and merges them.
* **Merge Commit**: In a three-way merge, Git automatically creates a new commit representing the combined state. This commit has two parent commits.

#### Verification after Merge
Check the directory contents and git log:
```bash
git log --oneline --graph --decorate
```
* **Expected Output**:
  ```text
  * 6174f2d (HEAD -> master, GitNewBranch) Add sample files file1.txt, file2.txt, and notes.txt with content
  * 6144809 Initial commit on master
  ```

#### Explanation of Symbols in Git Log Graph
* **`*`**: Represents a commit on the timeline.
* **`6174f2d`**: The abbreviated SHA-1 hash of the commit.
* **`(HEAD -> master, GitNewBranch)`**: The branch pointers. `HEAD` points to `master`, and both branches are currently at the same commit.
* **`\` or `/`**: In more complex trees, these lines represent branching paths.

---

### 5. Cleaning Up

#### Delete the Branch
Now that `GitNewBranch` is fully merged, it is safe to delete:
```bash
git branch -d GitNewBranch
```
* **What it does**: Deletes the pointer reference for `GitNewBranch` from `.git/refs/heads/`.
* **Why it is used**: To keep the branch namespace clean.
* **Expected Output**:
  ```text
  Deleted branch GitNewBranch (was 6174f2d).
  ```
* **Common Mistakes**: Trying to delete a branch while currently checked out on it (fails with error).

#### Verify Branch Deletion
```bash
git branch
```
* **Expected Output**:
  ```text
  * master
  ```

#### Git Status after Deletion
```bash
git status
```
* **Expected Output**:
  ```text
  On branch master
  nothing to commit, working tree clean
  ```

#### Why Deleting Merged Branches is Recommended
1. **Reduces Clutter**: Avoids having hundreds of stale branches listed, making navigation easier.
2. **Prevents Confusion**: Ensures developers don't accidentally check out and work on obsolete feature branches.
3. **Optimizes Repository Size**: While branch pointers themselves are lightweight, cleaning up helps keep the repository index organized.

---

## Module 4 – Git Concepts & Architectural Diagrams

### 1. Concepts Explained with ASCII Diagrams

#### Working Directory, Staging Area, and Local Repository
The lifecycle of a file in Git moves through three logical spaces:

```text
 +-------------------------------------------------------------------+
 |                                                                   |
 |   Working Directory       Staging Area          Local Repository  |
 |  (Unmodified/Modified)      (Index)              (Commit History) |
 |                                                                   |
 |      [ file.txt ] --------> [ git add ] --------> [ git commit ]  |
 |                                                                   |
 +-------------------------------------------------------------------+
```

* **Working Directory**: The actual folder on your computer's filesystem containing the project files you edit.
* **Staging Area (Index)**: A binary prep file where changes are registered. This represents the blueprint for your next commit.
* **Repository**: The `.git` database directory containing commit history, blobs, trees, and pointers.

---

#### Git Branch & Pointers
A branch is simply a pointer to a commit. Here is how branch pointers and `HEAD` relate:

```text
             HEAD (points to active branch)
              │
              ▼
            master (branch pointer)
              │
              ▼
  [Commit A] ◄── [Commit B] ◄── [Commit C] (latest commit)
```

If we create `GitNewBranch`, we introduce a new pointer referencing Commit C:

```text
            master (branch pointer)
              │
              ▼
  [Commit A] ◄── [Commit B] ◄── [Commit C] ◄── [Commit D] (new commit)
                                                 ▲
                                                 │
                                            GitNewBranch ◄── HEAD
                                           (active branch)
```

---

#### HEAD and Detached HEAD

* **HEAD**: A special reference that points to the currently active branch or commit.
* **Detached HEAD**: Occurs when you checkout a specific commit hash or tag directly, rather than a branch pointer. The `HEAD` pointer points directly to the commit object, not a branch reference.

```text
  Normal HEAD:
  HEAD ──> master ──> [Commit C]

  Detached HEAD:
  HEAD ──────────────> [Commit B] (Checking out a commit hash directly)
```
*Warning*: Commits made in a detached HEAD state are not tracked by any branch and will become orphaned (eligible for garbage collection) once you switch branches.

---

#### Fast-Forward vs. Three-Way Merge

**Fast-Forward Merge**:
```text
  Before Merge:
  master
    │
    ▼
  [Commit A] ◄── [Commit B] (GitNewBranch)

  After Merge:
  [Commit A] ◄── [Commit B] (master, GitNewBranch)
```

**Three-Way (Recursive) Merge**:
If `master` has diverged:
```text
  Before Merge:
  [Commit A] ◄── [Commit B] (master)
       │
       └───────► [Commit C] (GitNewBranch)

  After Merge:
  [Commit A] ◄── [Commit B] ◄── [Merge Commit D] (master)
       │                         ▲
       └───────► [Commit C] ─────┘ (GitNewBranch)
```

---

### 2. Comprehensive Concepts Index

| Concept | Explanation |
| :--- | :--- |
| **Git Branch** | A lightweight pointer referencing a specific commit object in the repository's history graph. |
| **Why Branching is Important** | Allows parallel lines of development, isolating untested changes, experimentations, and hotfixes. |
| **Local Branch** | A branch pointer stored locally on your machine (`.git/refs/heads/`). |
| **Remote Branch** | A read-only reference representing the state of branches on a remote server (`.git/refs/remotes/`). |
| **HEAD** | A pointer pointing to the current branch/commit in the working directory. |
| **Detached HEAD** | State where HEAD points directly to a commit hash instead of a branch pointer. |
| **Fast Forward Merge** | Merge operation that moves the branch pointer forward without creating a merge commit. |
| **Three-way Merge** | Merge operation using a common ancestor and two diverging branches to merge differences. |
| **Merge Commit** | A commit with multiple parents that brings together two or more branches of history. |
| **Git Diff** | Shows differences between commits, branches, or working directory and staging area. |
| **Git Log** | Shows commit history logs containing SHA hashes, authors, messages, and dates. |
| **Git Status** | Displays files in working directory and staging area and compares them to the latest commit. |
| **Git Commit** | Saves the staged files to the repository database as an immutable snapshot. |
| **Git Add** | Adds/stages changes in the working directory to the index (staging area). |
| **Git Checkout** | Switches branches or restores working directory files (older command). |
| **Git Switch** | Switches the current branch (modern, focused command introduced in Git 2.23). |
| **Git Merge** | Combines histories of different branches. |
| **Git Branch Delete** | Removes a branch pointer locally (`git branch -d`) or force deletes it (`git branch -D`). |
| **Remote Repository** | A version of your project hosted on the internet or network (GitLab, GitHub). |
| **Local Repository** | The `.git` directory on your computer containing files and metadata. |
| **Working Directory** | The folder containing the files you are currently modifying. |
| **Staging Area** | The intermediate sandbox index holding changes prepared for the next commit. |

---

## Module 5 – GitLab Branch Request

### 1. Conceptual Framework

#### Why Branch Requests / Merge Requests are Used
In collaborative enterprise environments, pushing changes directly to the production branch (`master` or `main`) is restricted. Instead, developers push their feature branches to GitLab and initiate a **Merge Request (MR)**. This triggers code review, automated testing (CI/CD), and security scans before integration.

#### Difference between Branch Request and Merge Request
* **Branch Request**: In older systems or specific workflows, a developer requests permission to create or push a branch to the central repository.
* **Merge Request (GitLab)**: A formal proposal to merge files from one branch (source branch) into another branch (target branch). GitLab uses the term "Merge Request" (MR) while GitHub calls it a "Pull Request" (PR). They are conceptually identical.

---

### 2. GitLab Merge Request Workflow

The complete end-to-end GitLab workflow follows this lifecycle:

```text
 +--------------------------------------------------------------------------------+
 |                                                                                |
 |  [Create Branch] ──> [Commit Changes] ──> [Push Branch] ──> [Create MR]        |
 |        ▲                                                          │            |
 |        │                                                          ▼            |
 |  [Branch Deleted] ◄── [Merge Branch] ◄── [Approval] ◄── [Review & CI/CD]       |
 |                                                                                |
 +--------------------------------------------------------------------------------+
```

1. **Developer Creates Branch**: The developer switches to `master`, pulls the latest code, and branches off locally (e.g., `git switch -c feature-login`).
2. **Developer Commits Code**: Writes code and creates local commits.
3. **Pushes Branch**: The developer pushes the local branch to the remote repository on GitLab (`git push -u origin feature-login`).
4. **Creates Merge Request**: The developer opens GitLab, clicks **Create Merge Request**, selects the source branch (`feature-login`) and target branch (`master`), fills out the title, description, and assigns reviewers.
5. **Reviewer Reviews**: Other developers look at the diff, comment on lines of code, and suggest changes. Automated pipelines (CI/CD) run tests.
6. **Approves**: Once reviewer comments are addressed and tests pass, the designated approvers click the **Approve** button.
7. **Merge**: The MR is merged into `master`, either manually or automatically after pipelines pass.
8. **Delete Branch**: The source branch is deleted from GitLab to prevent branch bloat.

---

### 3. GitLab UI Mockups and Expected Pages

#### GitLab Merge Request Page
* **Title Input**: A text field at the top of the form (e.g., `Draft: Implement OAuth2 login logic`).
* **Description Box**: A markdown text area where developers describe what changes were made, why, and how to verify.
* **Assignee dropdown**: Selects the author or person responsible for pushing the MR through.
* **Reviewer dropdown**: Selects developers who must inspect the code.
* **Merge Option checkboxes**:
  - `[x] Delete source branch when merge request is accepted`
  - `[x] Squash commits when merge request is accepted`

#### GitLab Merge Review Interface
* **Commits Tab**: Lists all commit hashes and messages in the branch.
* **Pipelines Tab**: Shows the status of CI/CD runners (e.g., green checkmark for passed, red cross for failed).
* **Changes Tab**: Displays a side-by-side or inline color-coded diff showing changes between source and target branches.
* **Approve Button**: A green button at the top-right of the review widget.
* **Merge Button**: A blue button that executes the branch merge (available only after approvals and passing tests).

---

## Module 6 – Merge Request Deep Dive

### 1. Concepts and Benefits

* **Review Process**: Allows developers to read the code changes, check for security risks, verify architecture consistency, and comment directly on specific lines of code.
* **Approval Process**: Organizations can enforce rules requiring at least $N$ approvals from senior developers or code owners before code is merged.
* **Conflict Resolution**: If the target branch has changed in a way that conflicts with the source branch, GitLab displays a **Resolve Conflicts** button, allowing developers to choose which lines to keep using an interactive editor.
* **Code Review**: Promotes knowledge sharing, code quality improvement, and prevents bugs from hitting production.
* **Merge Strategies**:
  - **Merge Commit**: Creates a merge commit, preserving all history.
  - **Squash Merge**: Combines all feature commits into a single commit on the target branch, keeping history clean.
  - **Fast-forward/Rebase**: Reapplies commits on top of the target branch, avoiding merge commits entirely.

---

### 2. Step-by-Step Creation of a GitLab Merge Request

1. **Push Branch**:
   ```bash
   git push -u origin GitNewBranch
   ```
2. **Open GitLab**: Navigate to your project on GitLab. A banner will appear stating: *"You pushed GitNewBranch 1 minute ago. Create Merge Request."* Click the **Create Merge Request** button.
3. **Configure the MR**:
   - **Title**: Provide a clear name (e.g., `Add sample text files for lab validation`).
   - **Description**: Add notes about the changes.
   - **Target Branch**: Ensure target is set to `master` (or `main`).
   - **Assign Reviewers**: Choose your team members.
4. **Approve**: Reviewers review the code and click the **Approve** button.
5. **Merge**: Once approved, click the **Merge** button.
6. **Clean Up**: Check the checkbox to **Delete source branch** during the merge or delete it manually after completion.

---

## Module 7 – Commands Summary

Here is the complete reference table of Git commands:

| Task | Git Command | Purpose | Example Output |
| :--- | :--- | :--- | :--- |
| Initialize Repository | `git init` | Creates an empty Git repository in the current directory | `Initialized empty Git repository in /path/to/.git/` |
| Clone Repository | `git clone <url>` | Downloads a repository and its history locally | `Cloning into 'repo'... Receiving objects: 100%...` |
| Check Status | `git status` | Lists modified, staged, or untracked files | `On branch master \n nothing to commit, working tree clean` |
| Stage File | `git add <file>` | Stages a file to the index, ready to commit | *(No output)* |
| Commit Changes | `git commit -m "<msg>"` | Saves the staged files as a permanent snapshot | `[master a1b2c3d] Commit message \n 1 file changed...` |
| View History Log | `git log` | Displays the commit history list | `commit a1b2c3d... \n Author: Student... \n Date...` |
| View Log Graph | `git log --oneline --graph --decorate` | Visualizes the commit history graph | `* a1b2c3d (HEAD -> master) Commit msg` |
| Compare Changes | `git diff` | Shows differences between working tree and index | `diff --git a/file.txt b/file.txt...` |
| Compare Branches | `git diff b1 b2` | Compares changes between two branches | `diff --git a/file1.txt b/file1.txt...` |
| List Branches | `git branch` | Lists all local branches | `* master` |
| List Remote Branches | `git branch -r` | Lists remote branches tracked locally | `origin/master` |
| List All Branches | `git branch -a` | Lists local and remote branches combined | `* master \n remotes/origin/master` |
| Switch Branch | `git switch <branch>` | Switches the current checkout branch | `Switched to branch 'master'` |
| Checkout Commit/Branch | `git checkout <ref>` | Checks out branch/commit (legacy) | `Note: switching to 'a1b2c3d'... (Detached HEAD)` |
| Merge Branch | `git merge <branch>` | Merges changes from a branch into current | `Updating a1b2c3d..e4f5g6h \n Fast-forward...` |
| Delete Local Branch | `git branch -d <branch>` | Safely deletes a merged local branch | `Deleted branch GitNewBranch (was a1b2c3d).` |
| Force Delete Branch | `git branch -D <branch>` | Force deletes an unmerged local branch | `Deleted branch GitNewBranch (was a1b2c3d).` |
| Push to Remote | `git push -u origin <branch>` | Uploads local commits to a remote server | `To github.com/user/repo.git \n * [new branch]...` |
| Pull from Remote | `git pull` | Fetches remote changes and merges them | `Already up to date.` |
| Fetch from Remote | `git fetch` | Downloads objects and refs from remote | `From github.com/user/repo \n * [new branch]...` |
| View Remotes | `git remote -v` | Lists configured remote repositories | `origin https://gitlab.com/user/repo.git (fetch)` |

---

## Module 8 – Final Deliverables & Reference Guides

### 1. Repository Folder Structure
After completing the Branching and Merging exercises, your local directory is structured as follows:

```text
/Users/bharathbodduvenkata/Git HOL 3/
├── .git/                      # Contains Git database, configs, hooks, refs
├── README.md                  # Created on master during initial commit
├── file1.txt                  # Merged from GitNewBranch
├── file2.txt                  # Merged from GitNewBranch
├── notes.txt                  # Merged from GitNewBranch
└── git_hands_on_lab_guide.md  # This comprehensive lab guide
```

---

### 2. Complete Git Bash Command Sequence (Start to Finish)
Here is the exact script of commands executed to complete the exercise:

```bash
# 1. Initialize repository
git init

# 2. Configure local details
git config user.name "Student"
git config user.email "student@example.com"

# 3. Create initial commit on master
echo "Welcome to Git Hands-On Lab 3" > README.md
git add README.md
git commit -m "Initial commit on master"

# 4. Create GitNewBranch
git branch GitNewBranch

# 5. List branches to verify
git branch
git branch -r
git branch -a

# 6. Switch to GitNewBranch
git switch GitNewBranch

# 7. Create files and add content
echo "This is the first sample file created in the new branch GitNewBranch." > file1.txt
echo "This is the second sample file, demonstrating branch isolation in Git." > file2.txt
echo -e "Lab Notes:\n- Created branch GitNewBranch\n- Working on Module 2 tasks" > notes.txt

# 8. Check status before staging
git status

# 9. Stage and commit files
git add file1.txt file2.txt notes.txt
git status
git commit -m "Add sample files file1.txt, file2.txt, and notes.txt with content"

# 10. Switch back to master
git switch master

# 11. Compare branches
git diff master GitNewBranch

# 12. Merge changes
git merge GitNewBranch

# 13. Verify history
git log --oneline --graph --decorate

# 14. Delete branch and verify
git branch -d GitNewBranch
git branch
git status
```

---

### 3. Expected Console Output Log
This represents the literal console output generated during execution:

```text
$ git init
Initialized empty Git repository in /Users/bharathbodduvenkata/Git HOL 3/.git/

$ git config user.name "Student"
$ git config user.email "student@example.com"

$ echo "Welcome to Git Hands-On Lab 3" > README.md
$ git add README.md
$ git commit -m "Initial commit on master"
[master (root-commit) 6144809] Initial commit on master
 1 file changed, 1 insertion(+)
 create mode 100644 README.md

$ git branch GitNewBranch

$ git branch
  GitNewBranch
* master

$ git branch -r
(no output)

$ git branch -a
  GitNewBranch
* master

$ git switch GitNewBranch
Switched to branch 'GitNewBranch'

$ echo "This is the first sample file created in the new branch GitNewBranch." > file1.txt
$ echo "This is the second sample file, demonstrating branch isolation in Git." > file2.txt
$ echo -e "Lab Notes:\n- Created branch GitNewBranch\n- Working on Module 2 tasks" > notes.txt

$ git status
On branch GitNewBranch
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	file1.txt
	file2.txt
	notes.txt

nothing added to commit but untracked files present (use "git add" to track)

$ git add file1.txt file2.txt notes.txt

$ git status
On branch GitNewBranch
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   file1.txt
	new file:   file2.txt
	new file:   notes.txt

$ git commit -m "Add sample files file1.txt, file2.txt, and notes.txt with content"
[GitNewBranch 6174f2d] Add sample files file1.txt, file2.txt, and notes.txt with content
 3 files changed, 5 insertions(+)
 create mode 100644 file1.txt
 create mode 100644 file2.txt
 create mode 100644 notes.txt

$ git switch master
Switched to branch 'master'

$ git diff master GitNewBranch
diff --git a/file1.txt b/file1.txt
new file mode 100644
index 0000000..fdf4a2d
--- /dev/null
+++ b/file1.txt
@@ -0,0 +1 @@
+This is the first sample file created in the new branch GitNewBranch.
diff --git b/file2.txt b/file2.txt
new file mode 100644
index 0000000..1abbe7d
--- /dev/null
+++ b/file2.txt
@@ -0,0 +1 @@
+This is the second sample file, demonstrating branch isolation in Git.
diff --git a/notes.txt b/notes.txt
new file mode 100644
index 0000000..d4c3f0e
--- /dev/null
+++ b/notes.txt
@@ -0,0 +1,3 @@
+Lab Notes:
+- Created branch GitNewBranch
+- Working on Module 2 tasks

$ git merge GitNewBranch
Updating 6144809..6174f2d
Fast-forward
 file1.txt | 1 +
 file2.txt | 1 +
 notes.txt | 3 +++
 3 files changed, 5 insertions(+)
 create mode 100644 file1.txt
 create mode 100644 file2.txt
 create mode 100644 notes.txt

$ git log --oneline --graph --decorate
* 6174f2d (HEAD -> master, GitNewBranch) Add sample files file1.txt, file2.txt, and notes.txt with content
* 6144809 Initial commit on master

$ git branch -d GitNewBranch
Deleted branch GitNewBranch (was 6174f2d).

$ git branch
* master

$ git status
On branch master
nothing to commit, working tree clean
```

---

### 4. Common Errors and Troubleshooting Guide

#### Error 1: `fatal: not a git repository (or any of the parent directories): .git`
* **Cause**: Running Git commands outside an initialized repository.
* **Fix**: Run `git init` to initialize a new repository, or run `cd <directory>` to change to an existing repository directory.

#### Error 2: `fatal: Not a valid object name: 'master'`
* **Cause**: Attempting to create branches or list commit references immediately after `git init` but before making the initial commit.
* **Fix**: Create a file, stage it with `git add`, and commit it with `git commit -m "init"` to establish the master branch tip.

#### Error 3: `error: Your local changes to the following files would be overwritten by checkout...`
* **Cause**: Uncommitted changes in your working directory conflict with files on the branch you are trying to switch to.
* **Fix**: Either stage and commit your changes, stash them using `git stash`, or discard them using `git restore <file>`.

#### Error 4: `error: Cannot delete branch 'GitNewBranch' checked out at '/path'`
* **Cause**: You are currently checked out on the branch you are trying to delete.
* **Fix**: Switch to another branch (e.g., `git switch master`) and then delete the branch using `git branch -d GitNewBranch`.

#### Error 5: `error: The branch 'GitNewBranch' is not fully merged.`
* **Cause**: You are attempting to delete a branch that contains commits not integrated into the current branch (or its upstream tracker) using `git branch -d`.
* **Fix**: If you are sure you want to discard the changes, force delete it using `git branch -D GitNewBranch`.

---

### 5. Viva / Interview Questions (with detailed answers)

#### Q1: What is the primary difference between Git and Centralized Version Control Systems (CVCS) like SVN?
* **Answer**: Git is a Distributed Version Control System (DVCS). Developers clone the entire history of the repository locally, including all branches and history. In contrast, CVCS relies on a single central server that clients check out files from, creating a single point of failure and requiring connection for historical operations.

#### Q2: What is the staging area (index) in Git?
* **Answer**: It is a cache file containing a prepared snapshot of changes in your working directory that you select to commit in the next step. It acts as an intermediate space to organize logical commits.

#### Q3: Why is Git branch creation considered "costless" compared to other VCS?
* **Answer**: In SVN or CVS, creating a branch copies the entire directory structure, which is slow and space-intensive. In Git, a branch is merely a 41-byte text file containing a 40-character SHA-1 commit hash. Creating a branch is instant because Git only writes a single reference file.

#### Q4: What is a Fast-forward merge?
* **Answer**: A merge that occurs when there is a linear path between the target branch tip and the source branch tip. Git simply moves the target branch pointer forward to point to the source branch commit, without generating a new merge commit.

#### Q5: What happens during a 3-way merge in Git?
* **Answer**: When two branches have diverged, Git finds their common ancestor (merge base). It compares the changes on both branches relative to the ancestor and creates a new merge commit combining both lines of history.

#### Q6: Explain what HEAD is.
* **Answer**: `HEAD` is a symbolic pointer referencing the currently active branch or commit in your working directory. It determines what checkout files are visible.

#### Q7: How do you recover from a Detached HEAD state?
* **Answer**: If you made commits in a detached HEAD state and want to keep them, create a new branch from your current position immediately using `git switch -c new-branch-name`. If you want to discard changes, switch back to a branch using `git switch master`.

#### Q8: What does the `--oneline` flag do in `git log`?
* **Answer**: It condenses the commit history output by showing only the abbreviated commit hash and the subject line of the commit message.

#### Q9: What is the difference between `git fetch` and `git pull`?
* **Answer**: `git fetch` downloads commits and references from the remote repository to your local machine without merging them into your current branch. `git pull` executes a `git fetch` followed by a `git merge` to integrate remote changes into your local checked-out branch.

#### Q10: What are merge conflicts and how are they resolved?
* **Answer**: Conflict occurs when changes in the same line of the same file are made on two different branches and merged together. Git pauses the merge and marks the files. To resolve, open the file, select the desired lines, remove the git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), stage the resolved files, and commit.

#### Q11: Explain the difference between `git checkout` and `git switch`.
* **Answer**: `git checkout` is a multi-purpose command used to switch branches, restore files, and create branches. To clarify usage, Git 2.23 split these behaviors into `git switch` (specifically for switching and creating branches) and `git restore` (specifically for restoring files).

#### Q12: What does `git remote -v` do?
* **Answer**: It lists the names and URLs of all remote connections configured for your repository (e.g. `origin`), indicating fetch and push URLs.

#### Q13: What does squashing mean during a merge request?
* **Answer**: Squashing merges all commits on a feature branch into a single clean commit on the target branch. This keeps the main branch history clean and simple.

#### Q14: How does Git prevent accidental loss of code when deleting branches?
* **Answer**: The command `git branch -d` checks if the branch has been merged into your current branch. If it contains unmerged commits, Git prevents deletion. To override, you must force delete it using `git branch -D`.

#### Q15: What is the `.git` folder?
* **Answer**: It is the core repository directory containing all metadata, configuration settings, object database files (blobs, trees, commits, tags), and references to branch pointers. Deleting this folder removes all history.

#### Q16: What is a commit graph?
* **Answer**: It is a Directed Acyclic Graph (DAG) representing the commit history. Commits are nodes, and arrows point to their parent commits.

#### Q17: What is the role of a reviewer in GitLab?
* **Answer**: A reviewer inspects proposed code changes in a Merge Request, writes comments, requests modifications if necessary, and ensures code complies with standards before giving approval.

#### Q18: What is a merge request approval rule?
* **Answer**: A rule that defines who must approve a merge request before it can be integrated (e.g., Code Owners, Security Team, or senior members).

#### Q19: Why is `git log --graph` helpful?
* **Answer**: It renders an ASCII visual graph of the branching and merging history directly in your console terminal, showing how branches diverged and merged.

#### Q20: What does `git status` mean when it says "working tree clean"?
* **Answer**: It means there are no uncommitted changes (unstaged or untracked) in your working directory compared to the commit pointed to by `HEAD`.

#### Q21: What is the purpose of `git push -u`?
* **Answer**: The `-u` (or `--set-upstream`) flag associates your local branch with a matching branch on the remote server. Subsequent runs of `git push` or `git pull` on this branch do not require specifying the remote and branch names.

---

### 6. Best Practices & Pitfalls

#### Best Practices
1. **Commit Early and Commit Often**: Small, cohesive commits are easier to understand, review, and revert if bugs are introduced.
2. **Write Meaningful Commit Messages**: Start with a short imperative summary (e.g. "Fix authentication crash"), followed by a blank line and body explanation if needed.
3. **Always Branch off Main/Master**: Never commit directly to `master`. Create a descriptive feature branch (e.g. `feature/user-profile`) for changes.
4. **Pull/Fetch Frequently**: Update your local repository with remote updates frequently to avoid resolving large merge conflicts later.
5. **Delete Branches Post-Merge**: Keep the repository clean by deleting local and remote feature branches once they are successfully merged.

#### Beginner Mistakes to Avoid
1. **Committing Large Binary Files**: Avoid committing build outputs, `.zip` archives, or external library binaries. Use a `.gitignore` file to ignore them.
2. **Working in Detached HEAD Mode**: Do not make commits without a checked-out branch. They are difficult to locate and will be lost during garbage collection.
3. **Using the Force Push Flag (`git push --force`) blindly**: Force pushing overwrites the remote repository history. Never run this on shared branches (`master`/`main`) as it can destroy other developers' work.
4. **Committing Sensitive Information**: Never commit passwords, API keys, or private SSH keys. Use environment variables instead.
5. **Merging branches without reviewing diffs**: Always review changes with `git diff` before executing a merge command.
