# Git Hands-On Lab Guide: Branching, Merging & Conflict Resolution
**Hands-on ID:** Git-T03-HOL_001  
**Target Environment:** Git Bash (macOS/Unix-compatible)  
**Target Project:** Spring Boot 3 Git Hands-On Lab  

---

## Module 1 – Understand the Lab

This lab is a practical guide designed to walk a beginner through the advanced aspects of Git local repository management, specifically branching, file modification, comparing changes, resolving merge conflicts (manually and conceptually via P4Merge), ignoring files, and managing branches. 

### Command Execution Template
For every Git command used in this guide, we analyze:
1. **What it does:** The under-the-hood mechanism Git performs on refs, trees, or objects.
2. **Why it is required:** The utility of running this command in a developer's daily workflow.
3. **Expected Output:** The exact text output that Git Bash returns.
4. **How to verify success:** The verification command or indicator showing the action worked.
5. **Common mistakes & troubleshooting:** How to recover if things go wrong.

---

## Module 2 – Repository Verification

### 1. Conceptual Background

#### What is a clean working tree?
A working tree is "clean" when there are no modifications in the tracked files of the working directory, and there are no staged changes waiting to be committed. Any files that exist in your working folder are either tracked and match the current commit (`HEAD`), or they are explicitly ignored.

#### Why is a clean working tree important before branching?
Before creating or switching branches, it is crucial to have a clean working tree. If you have uncommitted changes in your working tree:
* Git might block you from switching branches if the changes conflict with files in the target branch.
* If Git does allow the switch, your uncommitted changes will be carried over to the new branch, potentially mixing up experimental code with stable work and leading to tracking confusion.
* Keeping it clean ensures a clear, predictable separation of tasks.

### 2. Execution

#### Command: Check Status
```bash
git status
```
* **What it does:** Compares the working tree with the index file (staging area) and the current `HEAD` commit, then lists differences.
* **Why it is required:** To verify the current state of files in the working directory before performing operations like branching.
* **Expected Output (Initial clean state of initialized repo):**
  ```text
  On branch master
  nothing to commit, working tree clean
  ```
  *(Note: If run immediately after initialization, it will output:)*
  ```text
  On branch master

  No commits yet

  nothing to commit (create/copy files and use "git add" to track)
  ```
* **How to Verify:** The console must explicitly print `nothing to commit, working tree clean`.
* **Common Mistakes & Troubleshooting:** 
  * Running this in a directory that is not a Git repository.
    * *Error:* `fatal: not a git repository (or any of the parent directories): .git`
    * *Fix:* Run `git init` to initialize the directory.
  * Having untracked files.
    * *Error:* Lists files under `Untracked files:`.
    * *Fix:* Stage them with `git add <file>` and commit with `git commit`, or add them to `.gitignore`, or delete them.

---

## Module 3 – Create GitWork Branch

### 1. Conceptual Background

#### What is branching?
Branching is the process of creating a new pointer that diverges from the main line of development. In Git, a branch is simply a lightweight, movable pointer to a specific commit. It doesn't duplicate files; it just points to a node in the commit graph.

#### Why feature branches are used?
Feature branches (like `GitWork`) are used to develop features, bug fixes, or experiments in isolation. This keeps the main production branch (`master` or `main`) stable and deployable at all times. Once the work on the feature branch is completed and tested, it is merged back into the main branch.

### 2. Execution

#### Command: Create Branch
```bash
git branch GitWork
```
* **What it does:** Creates a new branch reference named `GitWork` pointing to the commit currently pointed to by `master` (and `HEAD`).
* **Why it is required:** To isolate our upcoming XML modifications from the stable `master` branch.
* **Expected Output:** Silent success (no terminal output).
* **How to Verify:** Run `git branch` to list local branches.
* **Common Mistakes & Troubleshooting:** 
  * *Error:* `fatal: not a valid object name: 'master'`
  * *Cause:* Trying to create a branch in a repository with no commits. Git cannot create a branch pointing to nothing.
  * *Fix:* Add at least one file, stage it, and commit it to establish the initial commit on `master` first.

#### Command: Switch to Branch
```bash
git switch GitWork
```
*(Alternatively: `git checkout GitWork`)*
* **What it does:** Updates the `HEAD` pointer to point to `refs/heads/GitWork` and updates the files in the working directory to match the commit at the tip of `GitWork`.
* **Why it is required:** To make `GitWork` the active branch so that future commits are recorded on it.
* **Expected Output:**
  ```text
  Switched to branch 'GitWork'
  ```
* **How to Verify:** Run `git branch` and verify the asterisk (`*`) is next to `GitWork`.

#### Command: List Branches
To check all local, remote, and combined branch structures:

##### Local Branches
```bash
git branch
```
* **Expected Output:**
  ```text
  * GitWork
    master
  ```
  *(The `*` symbol indicates the currently active branch. In Git Bash, it is typically highlighted in green.)*

##### Remote Branches
```bash
git branch -r
```
* **What it does:** Lists all remote-tracking branches (prefixed with remote names like `origin/`).
* **Expected Output:** Empty (no output) because we have not configured any remote repository.

##### All Branches
```bash
git branch -a
```
* **What it does:** Lists all local and remote branches.
* **Expected Output:**
  ```text
  * GitWork
    master
  ```

---

## Module 4 – Create hello.xml in GitWork

### 1. Conceptual Background

#### XML Content
We create `hello.xml` containing the following structure:
```xml
<message>Hello from GitWork Branch</message>
```
* **Explanation:** A basic XML element named `<message>` enclosing a text string that states the branch of origin.

#### Untracked Files vs. Staging Area vs. Commits
* **Untracked State:** A file is untracked if it exists in the working directory but is not tracked by Git's index (staging area). Git has no record of it and will ignore it during commits.
* **Staging Area (Index):** A preparation zone. You tell Git which files/changes should be included in the next commit by adding them here.
* **Commit:** A snapshot of the staged files at a specific point in time, permanently saved in Git's object database with a unique SHA-1 hash.

### 2. Execution

#### Command: Create File
```bash
echo "<message>Hello from GitWork Branch</message>" > hello.xml
```
* **What it does:** Creates `hello.xml` in the working directory and writes the XML string to it.
* **Why it is required:** To introduce new content on our feature branch.
* **How to Verify:** Run `cat hello.xml`.

#### Command: Observe Status
```bash
git status
```
* **Expected Output:**
  ```text
  On branch GitWork
  Untracked files:
    (use "git add <file>..." to include in what will be committed)
  	hello.xml

  nothing added to commit but untracked files present (use "git add" to track)
  ```
* **Explanation:** `hello.xml` is untracked because it is newly created and has not yet been added to the staging area.

#### Command: Stage File
```bash
git add hello.xml
```
* **What it does:** Adds `hello.xml` to the staging area (index), preparing it to be committed.
* **Why it is required:** Git requires files to be explicitly staged before committing.
* **Expected Output:** Silent success.
* **How to Verify:** Run `git status`. The file should be listed under `Changes to be committed:` in green text.

#### Command: Commit File
```bash
git commit -m "Add hello.xml on GitWork branch"
```
* **What it does:** Creates a commit containing the staged `hello.xml` file.
* **Why it is required:** To save the snapshot of the branch.
* **Expected Output:**
  ```text
  [GitWork d55b72f] Add hello.xml on GitWork branch
   1 file changed, 1 insertion(+)
   create mode 100644 hello.xml
  ```
* **How to Verify:** Run `git status` to verify the working tree is clean.

---

## Module 5 – Modify hello.xml

### 1. Conceptual Background
To simulate ongoing feature development, we add nodes to `hello.xml`:
```xml
<root>
    <message>Hello from GitWork Branch</message>
    <author>Bharath</author>
    <timestamp>2026-07-04</timestamp>
</root>
```
* **Explanation:** We wrapped the message inside a `<root>` tag and added `<author>` and `<timestamp>` elements.

#### Modified State
A file is in the "modified" state when a tracked file has been changed in the working directory but not yet staged or committed.

### 2. Execution

#### Command: Modify File and Check Status
Overwrite `hello.xml` with the new structure and check status:
```bash
git status
```
* **Expected Output:**
  ```text
  On branch GitWork
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
  	modified:   hello.xml

  no changes added to commit (use "git add" and/or "git commit -a")
  ```

#### Command: Stage and Commit Changes
```bash
git add hello.xml
git commit -m "Add author and timestamp to hello.xml"
```
* **Expected Output:**
  ```text
  [GitWork ec2ed2f] Add author and timestamp to hello.xml
   1 file changed, 5 insertions(+), 1 deletion(-)
  ```

#### Command: View Log
```bash
git log
```
* **What it does:** Displays the commit history list for the current active branch.
* **Expected Output:**
  ```text
  commit ec2ed2ff59fb15a8d9e43270b1e8c7c5b34eccbd
  Author: Bharath Boddu Venkata <bharath.bodduvenkata@example.com>
  Date:   Sat Jul 4 16:40:13 2026 +0530

      Add author and timestamp to hello.xml

  commit d55b72f409664d1b9ef7ce228962b62c535ac327
  Author: Bharath Boddu Venkata <bharath.bodduvenkata@example.com>
  Date:   Sat Jul 4 16:40:04 2026 +0530

      Add hello.xml on GitWork branch

  commit 895550d94917ddfe82aed297ca87be41375c7a7e
  Author: Bharath Boddu Venkata <bharath.bodduvenkata@example.com>
  Date:   Sat Jul 4 16:39:52 2026 +0530

      Initial commit
  ```
* **Line-by-Line Explanation of a Commit Entry:**
  * `commit ec2ed2ff59fb15a8d9e43270b1e8c7c5b34eccbd`: The 40-character SHA-1 commit hash uniquely identifying this commit.
  * `Author: Bharath Boddu Venkata <bharath.bodduvenkata@example.com>`: The identity of the author who created the commit.
  * `Date: Sat Jul 4 16:40:13 2026 +0530`: The timestamp when the commit was created.
  * `Add author and timestamp to hello.xml`: The commit message explaining the change.

---

## Module 6 – Master Branch Changes

### 1. Conceptual Background
We switch to `master` and create a different `hello.xml` file.
* **Why different content is necessary:** In order to simulate a real-world merge conflict, both branches (`master` and `GitWork`) must modify the same line of the same file (`hello.xml`). When we attempt to merge, Git will realize that both lines are different and will not know which one is correct. It will stop the merge and prompt the user to resolve the conflict.

### 2. Execution

#### Command: Switch to Master
```bash
git switch master
```
* **Expected Output:** `Switched to branch 'master'`
* **Note:** The file `hello.xml` vanishes from the working folder because it does not exist on `master` yet (only `README.md` exists).

#### Command: Create different hello.xml on Master
```bash
echo "<message>Hello from Master Branch</message>" > hello.xml
```

#### Command: Stage and Commit
```bash
git add hello.xml
git commit -m "Add hello.xml on master branch"
```
* **Expected Output:**
  ```text
  [master 6df2c5e] Add hello.xml on master branch
   1 file changed, 1 insertion(+)
   create mode 100644 hello.xml
  ```

#### Command: Verify
```bash
git status
```
* **Expected Output:** `nothing to commit, working tree clean`

---

## Module 7 – View Commit History

### 1. Conceptual Background

To view a structured tree of how our commits diverged, we use:
```bash
git log --oneline --graph --decorate --all
```
* **`--oneline`:** Compresses each commit entry to a single line containing only the short SHA hash and the commit message.
* **`--graph`:** Draws an ASCII text representation of the commit history branch linkages on the left side of the output.
* **`--decorate`:** Displays branch names, tags, and `HEAD` pointers next to their corresponding commits.
* **`--all`:** Displays commits from all local branches, not just the current branch.
* **`HEAD`:** The pointer representing the active branch/commit.
* **Branch Pointers:** Pointers (`master`, `GitWork`) indicating the tip commit of each branch.
* **Commit Hashes:** Unique alphanumeric hashes (like `6df2c5e`) representing commits.

### 2. Execution & Output Analysis

```bash
git log --oneline --graph --decorate --all
```
* **Expected Output:**
  ```text
  * 6df2c5e (HEAD -> master) Add hello.xml on master branch
  | * ec2ed2f (GitWork) Add author and timestamp to hello.xml
  | * d55b72f Add hello.xml on GitWork branch
  |/  
  * 895550d Initial commit
  ```
* **Graph Symbols Explanation:**
  * `*`: Represents a commit node.
  * `|`: Represents a branch line of history.
  * `/`: Represents a branch divergence point (split).
  * `\`: Represents a branch convergence point (merge).
  * `HEAD -> master`: Indicates `HEAD` is active on `master` branch, which is currently at commit `6df2c5e`.
  * `GitWork`: Shows the branch `GitWork` is at commit `ec2ed2f`.

---

## Module 8 – Compare Branches

### 1. Conceptual Background

#### Diff Commands
* **`git diff`:** Shows unstaged changes in the working directory compared to the staging area.
* **`git diff master GitWork`:** Compares the state of `master` branch with `GitWork` branch. It displays what changes are required to transition from `master` to `GitWork`.
* **`git diff GitWork master`:** The opposite of the above. It displays what changes are required to transition from `GitWork` to `master`.

### 2. Execution & Output Analysis

#### Command: Diff Master and GitWork
```bash
git diff master GitWork
```
* **Expected Output:**
  ```text
  diff --git a/hello.xml b/hello.xml
  index e3bbec4..dbab881 100644
  --- a/hello.xml
  +++ b/hello.xml
  @@ -1 +1,5 @@
  -<message>Hello from Master Branch</message>
  +<root>
  +    <message>Hello from GitWork Branch</message>
  +    <author>Bharath</author>
  +    <timestamp>2026-07-04</timestamp>
  +</root>
  ```
* **Line-by-Line Explanation:**
  * `diff --git a/hello.xml b/hello.xml`: Compares file version `a` (from `master`) and version `b` (from `GitWork`).
  * `index e3bbec4..dbab881 100644`: Internal file blob hashes and file mode (permissions).
  * `--- a/hello.xml`: The source file representing changes to be subtracted (red lines starting with `-`).
  * `+++ b/hello.xml`: The target file representing changes to be added (green lines starting with `+`).
  * `@@ -1 +1,5 @@`: Hunk header showing line range modifications.
  * `-<message>Hello from Master Branch</message>`: Deleted line (removed from `master`).
  * `+<root>`: Added line in `GitWork`.
  * `+    <message>Hello from GitWork Branch</message>`: Added line in `GitWork`.
  * `+    <author>Bharath</author>`: Added line in `GitWork`.
  * `+    <timestamp>2026-07-04</timestamp>`: Added line in `GitWork`.
  * `+</root>`: Added line in `GitWork`.

#### Command: Diff GitWork and Master
```bash
git diff GitWork master
```
* **Expected Output:**
  ```text
  diff --git a/hello.xml b/hello.xml
  index dbab881..e3bbec4 100644
  --- a/hello.xml
  +++ b/hello.xml
  @@ -1,5 +1 @@
  -<root>
  -    <message>Hello from GitWork Branch</message>
  -    <author>Bharath</author>
  -    <timestamp>2026-07-04</timestamp>
  -</root>
  +<message>Hello from Master Branch</message>
  ```
* **Explanation:** It shows subtraction of the `GitWork` structure (red `-` lines) and addition of the `master` message (green `+` line).

---

## Module 9 – Compare Using P4Merge

### 1. Conceptual Background

#### What is P4Merge?
P4Merge is a visual 2-way diff and 3-way merge tool provided by Perforce. It allows developers to graphically view side-by-side differences between files, branches, or commits, and provides an intuitive interface to resolve complex merge conflicts.

### 2. Installation and Configuration

#### How to Install (macOS)
1. Download P4Merge from the official Perforce downloads page.
2. Open the downloaded `.dmg` package.
3. Drag `P4Merge.app` into the `/Applications` folder.

#### Configure Git to use P4Merge as a Diff and Merge tool:
Execute the following commands in Git Bash:
```bash
# Configure diff tool
git config --global diff.tool p4merge
git config --global difftool.p4merge.path "/Applications/p4merge.app/Contents/Resources/launchp4merge"

# Configure merge tool
git config --global merge.tool p4merge
git config --global mergetool.p4merge.path "/Applications/p4merge.app/Contents/Resources/launchp4merge"
git config --global mergetool.p4merge.trustExitCode false
```

#### Launching the Graphical Comparison:
```bash
git difftool master GitWork
```
* **What it does:** Launches P4Merge to visually display the diff instead of displaying the standard text diff in the terminal.

### 3. Understanding the P4Merge Interface

* **Left Pane (Local/Source):** Shows the content of the file from the current branch (`master` / `HEAD`).
* **Right Pane (Remote/Target):** Shows the content of the file from the branch being compared (`GitWork`).
* **Middle Pane (Base):** Represents the common ancestor version of the file before both branches diverged.
* **Bottom Pane (Output/Merged result):** The interactive editing area showing what the resolved file will look like.
* **Color Coding:**
  * **Yellow/Orange blocks:** Indicate content differences (modified blocks).
  * **Blue blocks:** Indicate additions (code present in one side but missing in base).
  * **Green blocks:** Represent deletions.
  * **Icons (buttons in UI):** Toggle buttons (labeled `L`, `B`, `R`) allow developers to select either the Local change, Base change, or Remote change to include in the final merged file with a single click.

---

## Module 10 – Merge Conflict

### 1. Conceptual Background

#### Why does a merge conflict occur?
A merge conflict occurs when Git attempts to merge two branches that have conflicting changes in the same location of the same file, and Git cannot automatically determine which version is correct. Because Git is conservative, it will stop and ask the developer to manually select the correct code rather than overwrite changes silently.

### 2. Execution

#### Command: Merge GitWork into Master
We are on `master` branch. Let's merge `GitWork`:
```bash
git merge GitWork
```
* **Expected Output:**
  ```text
  Auto-merging hello.xml
  CONFLICT (add/add): Merge conflict in hello.xml
  Automatic merge failed; fix conflicts and then commit the result.
  ```

#### Conflict Markers Explanation
Open `hello.xml` to see Git's conflict markers:
```xml
<<<<<<< HEAD
<message>Hello from Master Branch</message>
=======
<root>
    <message>Hello from GitWork Branch</message>
    <author>Bharath</author>
    <timestamp>2026-07-04</timestamp>
</root>
>>>>>>> GitWork
```
* **`<<<<<<< HEAD`**: Starts the conflicting block from the current branch (`master`).
* **`=======`**: Serves as the divider separating the local branch changes from the incoming branch changes.
* **`>>>>>>> GitWork`**: Ends the conflicting block and identifies the incoming branch (`GitWork`).

#### Why Git stops merging:
Git pauses the merge process and marks the file as "unmerged" in the index. It does this because writing code automatically could break application logic. The developer must inspect the files, decide how to reconcile the changes, and commit the resolution.

---

## Module 11 – Resolve Conflict

### 1. Conceptual Background

#### What is a three-way merge?
A three-way merge uses three versions of a file to calculate the merge:
1. **Base (Common Ancestor):** The commit where both branches diverged.
2. **Local (HEAD):** The modifications made on your active branch.
3. **Remote (Incoming):** The modifications made on the branch you are merging in.
By comparing all three, Git can determine which changes were made on which branch and only flag conflicts where both branches modified the same area.

### 2. Execution

#### Launching P4Merge tool for Conflict Resolution:
```bash
git mergetool
```
* **What it does:** Launches P4Merge in resolution mode, displaying Local, Base, and Remote panes to resolve the conflict.

#### Manual Conflict Resolution (Text Editor)
To resolve manually in a text editor, delete all conflict markers and edit the file to the desired structure. We combine both:
```xml
<root>
    <message>Hello from Master Branch</message>
    <message>Hello from GitWork Branch</message>
    <author>Bharath</author>
    <timestamp>2026-07-04</timestamp>
</root>
```
Save and close the file.

#### Command: Stage Resolved File
```bash
git add hello.xml
```
* **What it does:** Tells Git that the conflict in `hello.xml` has been resolved.
* **Expected Output:** Silent success.

#### Command: Commit Merge
```bash
git commit -m "Resolve merge conflict by combining hello.xml content"
```
* **Expected Output:**
  ```text
  [master 6dd705a] Resolve merge conflict by combining hello.xml content
  ```

#### Command: Verify Success
```bash
git log --oneline --graph --decorate
```
* **Expected Output:** Shows the branch pointers merged into a single history line at the tip.

---

## Module 12 – .gitignore

### 1. Conceptual Background

#### What is `.gitignore`?
A `.gitignore` file is a text file placed in the repository root that specifies patterns of files and directories that Git should ignore. Files matching these patterns will not be flagged as untracked in `git status`, nor will they be added by `git add .` commands.

### 2. Creating and Configuring Rules

Create a `.gitignore` file and add the following rules:
```text
backup/
*.bak
```
#### Explanation of Rules:
* **`backup/`**: Ignores the entire directory named `backup` and all of its contents (recursive).
* **`*.bak`**: Ignores any file in any directory that ends with the `.bak` extension.

### 3. Verification

Let's test these rules:
```bash
mkdir -p backup
touch backup/file1.txt
touch temp.bak
git status
```
* **Expected Output:**
  ```text
  On branch master
  Untracked files:
    (use "git add <file>..." to include in what will be committed)
  	.gitignore

  nothing added to commit but untracked files present (use "git add" to track)
  ```
* **Explanation:** `backup/` and `temp.bak` are ignored. Only the newly created `.gitignore` itself is tracked.

#### Stage and Commit:
```bash
git add .gitignore
git commit -m "Add .gitignore for backup/ and *.bak files"
```

---

## Module 13 – Branch Management

### 1. Execution

#### List Branches:
```bash
git branch -a
```
* **Expected Output:**
  ```text
    GitWork
  * master
  ```

#### Command: Delete Branch Safely
```bash
git branch -d GitWork
```
* **What it does:** Deletes the local branch pointer `GitWork`.
* **Safe Delete (`-d`):** Git checks if the branch has been fully merged into your current active branch (`master`). If not merged, Git will block the deletion to prevent accidental loss of work.
* **Force Delete (`-D`):** Bypasses all checks and deletes the branch regardless of its merge status.
* **Expected Output:**
  ```text
  Deleted branch GitWork (was ec2ed2f).
  ```

#### Command: Verify Deletion
```bash
git branch
```
* **Expected Output:**
  ```text
  * master
  ```

---

## Module 14 – Final Repository Verification

### 1. Execution

#### Command: Final Status Check
```bash
git status
```
* **Expected Output:**
  ```text
  On branch master
  nothing to commit, working tree clean
  ```

#### Command: Final History Graph
```bash
git log --oneline --graph --decorate
```
* **Expected Output:**
  ```text
  * 3089fb6 (HEAD -> master) Add .gitignore for backup/ and *.bak files
  *   6dd705a Resolve merge conflict by combining hello.xml content
  |\  
  | * ec2ed2f Add author and timestamp to hello.xml
  | * d55b72f Add hello.xml on GitWork branch
  * | 6df2c5e Add hello.xml on master branch
  |/  
  * 895550d Initial commit
  ```

### 2. Analysis of final state:
* **HEAD & Current Branch:** `HEAD` points to `master`. We are on `master`.
* **Merge Commit:** Commit `6dd705a` is the merge commit connecting both the `master` track (`6df2c5e`) and the `GitWork` track (`ec2ed2f`).
* **Repository Health:** Clean workspace, all commits tracked, branches clean.

---

## Module 15 – Concepts Explanation

1. **Git Branch:** A lightweight, movable pointer to a specific commit. It is used to isolate a line of development.
2. **Git Merge:** The process of combining commit history from two branches together.
3. **Merge Conflict:** A state where Git cannot automatically resolve differences between two commits being merged because they modify the same lines of a file.
4. **Conflict Resolution:** The developer's manual process of modifying conflict-marked files to select or combine the desired code.
5. **Three-way Merge:** A merging algorithm that uses three snapshots: Local, Remote, and their Common Ancestor (Base) to calculate differences.
6. **Git Diff:** A command that outputs line-by-line differences between commits, branches, or files.
7. **Git Status:** Displays the state of the working directory and the staging area (index).
8. **Git Log:** Shows the commit history chain leading up to the current active commit.
9. **Git Ignore (.gitignore):** A configuration file that lists rules specifying which files Git should ignore and not track.
10. **Working Tree (Working Directory):** The actual directory on your computer's filesystem containing the files you are editing.
11. **Staging Area (Index):** A binary cache file that serves as a preparation buffer holding the changes to be written in the next commit.
12. **Repository:** The `.git` metadata folder containing the database of commit objects, logs, and branch references.
13. **HEAD:** A reference pointer indicating the current active branch or commit.
14. **Branch Pointer:** A reference file stored in `.git/refs/heads/` that names the tip commit of a branch.
15. **Fast Forward Merge:** A merge occurring when the target branch's tip is a direct ancestor of the incoming branch's tip. Git simply moves the branch pointer forward. No merge commit is created.
16. **Non Fast Forward Merge:** A merge occurring when histories have diverged. A new merge commit is created to combine the histories.
17. **P4Merge:** A visual side-by-side diff and 3-way conflict resolution tool.

---

## Module 16 – Final Deliverables

### 1. Folder Structure of the Repository
```text
Git HOL 4/
├── .git/                 # Git metadata repository (hidden)
├── backup/               # Ignored directory
│   └── file1.txt         # Ignored file
├── .gitignore            # Ignored patterns file
├── hello.xml             # Merged and resolved XML file
├── README.md             # Initial project file
└── temp.bak              # Ignored backup file
```

### 2. Complete Git Bash Command Sequence
```bash
# Initialize and setup local credentials
git init
git config user.name "Bharath Boddu Venkata"
git config user.email "bharath.bodduvenkata@example.com"

# Initial commit on master
echo "# Git Hands-On Lab 4" > README.md
git add README.md
git commit -m "Initial commit"

# Verify initial status
git status

# Branch creation and checkout
git branch GitWork
git switch GitWork

# Verify branches
git branch
git branch -r
git branch -a

# Work on GitWork branch
echo "<message>Hello from GitWork Branch</message>" > hello.xml
git status
git add hello.xml
git commit -m "Add hello.xml on GitWork branch"

# Modify file on GitWork branch
echo -e "<root>\n    <message>Hello from GitWork Branch</message>\n    <author>Bharath</author>\n    <timestamp>2026-07-04</timestamp>\n</root>" > hello.xml
git status
git add hello.xml
git commit -m "Add author and timestamp to hello.xml"
git log

# Switch to master and modify file
git switch master
echo "<message>Hello from Master Branch</message>" > hello.xml
git add hello.xml
git commit -m "Add hello.xml on master branch"
git status
git log

# Compare branches
git log --oneline --graph --decorate --all
git diff master GitWork
git diff GitWork master

# Merge branches (triggers conflict)
git merge GitWork

# Resolve conflict manually (modify hello.xml file to combine tags)
echo -e "<root>\n    <message>Hello from Master Branch</message>\n    <message>Hello from GitWork Branch</message>\n    <author>Bharath</author>\n    <timestamp>2026-07-04</timestamp>\n</root>" > hello.xml

# Stage and Commit conflict resolution
git add hello.xml
git commit -m "Resolve merge conflict by combining hello.xml content"

# Verify merge logs
git log --oneline --graph --decorate

# Add .gitignore rules
echo -e "backup/\n*.bak" > .gitignore
mkdir -p backup
touch backup/file1.txt
touch temp.bak
git status
git add .gitignore
git commit -m "Add .gitignore for backup/ and *.bak files"

# Branch management (delete GitWork branch)
git branch -d GitWork
git branch

# Final repository status check
git status
git log --oneline --graph --decorate
```

### 3. Common Mistakes & Troubleshooting
* **Trying to switch branches with uncommitted changes:** 
  * *Error:* `error: Your local changes to the following files would be overwritten by checkout...`
  * *Fix:* Run `git stash` to temporarily save changes, checkout, and run `git stash pop` later, or commit them first.
* **Detached HEAD State:**
  * *Cause:* Checking out a specific commit hash rather than a branch pointer.
  * *Fix:* Switch back to your branch using `git switch master` or `git switch GitWork`.
* **Deleting a branch that is not merged:**
  * *Error:* `error: The branch 'GitWork' is not fully merged...`
  * *Fix:* Merging it first or force deleting using `git branch -D GitWork`.

---

## 4. 20 Viva Questions and Answers

1. **What is Git?**
   * *Answer:* Git is a distributed version control system designed to track changes in source code during software development.
2. **What does `git init` do?**
   * *Answer:* It creates an empty Git repository in the current directory by initializing a hidden `.git` folder.
3. **What is the staging area in Git?**
   * *Answer:* An intermediate storage area (index) where changes are prepared before being committed to history.
4. **How do you add all files in a directory to the staging area?**
   * *Answer:* By executing the command `git add .`.
5. **What is the difference between `git branch` and `git checkout`?**
   * *Answer:* `git branch` is used to create, list, or delete branches, while `git checkout` (or `git switch`) is used to switch between branches.
6. **How do you delete a Git branch safely?**
   * *Answer:* By using the command `git branch -d <branch_name>`.
7. **What is a merge conflict?**
   * *Answer:* An event that occurs when Git tries to merge commits from different branches that contain different changes to the same line in the same file.
8. **What does `git status` display?**
   * *Answer:* It shows modified, staged, unstaged, and untracked files in the current repository state.
9. **Explain the meaning of `HEAD` in Git.**
   * *Answer:* `HEAD` is a pointer referencing the current active commit or branch in your working directory.
10. **What is `.gitignore`?**
    * *Answer:* A text file containing rules and pattern matches of files/directories that Git should ignore and not track.
11. **What is a fast-forward merge?**
    * *Answer:* A merge where the destination branch has no new commits since the source branch split off. Git simply moves the branch pointer forward to match the source branch.
12. **How does a non-fast-forward merge differ?**
    * *Answer:* It creates a new merge commit that links the histories of both branches when their histories have diverged.
13. **What does the `--oneline` option do in `git log`?**
    * *Answer:* It prints each commit entry on a single line showing only the short SHA hash and the commit message.
14. **What is the difference between `git diff` and `git diff master GitWork`?**
    * *Answer:* `git diff` shows unstaged changes in the working tree, while `git diff master GitWork` compares the latest commits of the two branches.
15. **What is P4Merge?**
    * *Answer:* A visual graphical tool used for comparing files (diffing) and resolving merge conflicts (3-way merge).
16. **How do you configure a global diff tool in Git?**
    * *Answer:* By using `git config --global diff.tool <tool_name>`.
17. **What is a 3-way merge?**
    * *Answer:* An algorithm that merges changes by comparing the local file, the remote file, and their common ancestor (base).
18. **Explain the conflict marker `=======`.**
    * *Answer:* It splits the local active changes (above it) from the incoming merged changes (below it).
19. **What does `git branch -a` show?**
    * *Answer:* It lists all local branches and all remote-tracking branches together.
20. **Can you create a branch on an empty Git repository?**
    * *Answer:* No, because there must be at least one commit node for the new branch pointer to reference.

---

## 5. 20 Interview Questions and Answers

1. **How does Git store data?**
   * *Answer:* Git stores data as an object database. Objects are stored as blobs (file content), trees (directories), commits (metadata and tree links), and tags.
2. **What is the difference between `git reset` and `git revert`?**
   * *Answer:* `git reset` rewrites history by moving the branch pointer backward (deleting commits), whereas `git revert` creates a new commit that applies the exact opposite changes of a specified commit, preserving history.
3. **What is the difference between `git fetch` and `git pull`?**
   * *Answer:* `git fetch` downloads remote updates but does not merge them. `git pull` runs both `git fetch` and `git merge` in a single command.
4. **What is git rebasing and how does it differ from merging?**
   * *Answer:* Merging creates a new merge commit, preserving the history timeline. Rebasing moves your branch's base commit to the tip of another branch, rewriting history to create a linear timeline.
5. **How do you resolve a merge conflict?**
   * *Answer:* Open the conflict file, remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), choose the correct lines of code, stage the file with `git add`, and run `git commit` to finalize.
6. **What is the index in Git?**
   * *Answer:* The index is the binary staging area file that caches the directory structure and prepare commits.
7. **What is a detached HEAD state and how do you fix it?**
   * *Answer:* It occurs when you checkout a specific commit hash rather than a branch pointer. You can fix it by checking out an existing branch using `git switch <branch>`.
8. **What is the purpose of `git stash`?**
   * *Answer:* It saves your modified, tracked files on a temporary stack so you can switch branches with a clean working tree without committing half-done code.
9. **Explain the difference between safe delete (`-d`) and force delete (`-D`) of a branch.**
   * *Answer:* Safe delete (`-d`) blocks deletion if the branch contains commits that haven't been merged into the active branch. Force delete (`-D`) deletes it unconditionally.
10. **How do you configure Git to ignore files that have already been tracked?**
    * *Answer:* You must add the file to `.gitignore` and untrack it from the staging area using `git rm --cached <file_path>`, then commit.
11. **Explain the concept of three-way merge.**
    * *Answer:* It compares three snapshots: the local branch tip (Mine/Local), the branch to be merged (Theirs/Remote), and their common ancestor (Base). It automatically merges changes where only one side modified the base, and flags conflicts only where both modified the same area.
12. **What is the difference between `git diff HEAD` and `git diff`?**
    * *Answer:* `git diff` compares the working directory with the staging area. `git diff HEAD` compares the working directory with the last commit.
13. **How does Git calculate commit SHA-1 hashes?**
    * *Answer:* Git hashes the commit metadata (author, committer, date, parent commit hash) and the tree structure hash using SHA-1.
14. **What is the reflog in Git?**
    * *Answer:* `git reflog` is a log of where your HEAD and branch references have pointed in the local repository over time, allowing you to recover deleted branches or commits.
15. **How would you verify if a file is being ignored by your `.gitignore` configuration?**
    * *Answer:* Run `git check-ignore -v <file_name>`. This will print the exact rule and line number in `.gitignore` that matches the file.
16. **What is the difference between `git merge --abort` and resolving conflicts?**
    * *Answer:* `git merge --abort` stops the merge process completely and resets the working directory and index back to the pre-merge commit. Resolving conflicts involves staging the changes and completing the merge with a commit.
17. **What is a bare repository in Git?**
    * *Answer:* A repository created without a working directory (using `git init --bare`). It only contains the `.git` folder contents and is typically used on central servers (like GitLab/GitHub) for pushing and pulling.
18. **Explain the role of merge tool drivers in Git.**
    * *Answer:* They are external programs (like P4Merge, KDiff3, Meld) configured in Git to handle side-by-side graphical differences and merging of files when a conflict is encountered.
19. **How do you search commit history for a specific text pattern?**
    * *Answer:* Using `git log -S "search_pattern"` or `git log --grep="commit_message_pattern"`.
20. **Can you edit a commit message after committing?**
    * *Answer:* Yes, if it is the latest commit, you can use `git commit --amend -m "new message"`. (Avoid amending commits that have already been pushed to a shared remote).

---

## 6. Git Best Practices

* **Commit Early, Commit Often:** Break your development tasks into small logical chunks and commit them frequently. This makes it easier to isolate bugs.
* **Write Meaningful Commit Messages:** Write commit messages in the imperative mood (e.g., "Add feature X" instead of "Added feature X").
* **Use Feature Branches:** Never develop directly on `master` or `main`. Always create a descriptive branch like `feature/login` or `bugfix/issue-9`.
* **Keep Branches Up to Date:** Frequently merge or rebase the main branch into your feature branch to stay aligned with other developers' changes and resolve conflicts early.
* **Keep Your Staging Area Clean:** Only stage changes that belong to the current commit's scope.
* **Never Rewrite Shared History:** Avoid using `git push --force` or amending/rebasing commits that have already been pushed to a remote repository used by others.

---

## 7. Frequently Used Git Commands Reference Table

| Command | Action / Description |
| :--- | :--- |
| `git init` | Initializes a new local Git repository. |
| `git status` | Shows status of files (modified, staged, untracked). |
| `git add <file>` | Stages a file for the next commit. |
| `git commit -m "<msg>"` | Commits staged changes with a message. |
| `git log --oneline --graph` | Displays commit history in a single-line graph. |
| `git branch` | Lists local branches in the repository. |
| `git branch <name>` | Creates a new branch at the current commit. |
| `git switch <name>` | Switches the working tree to the specified branch. |
| `git diff` | Shows differences between working directory and staging area. |
| `git diff <b1> <b2>` | Compares differences between branch `<b1>` and `<b2>`. |
| `git merge <name>` | Merges branch `<name>` into the active branch. |
| `git branch -d <name>` | Deletes the specified branch safely (must be merged). |
| `git branch -D <name>` | Deletes the specified branch forcefully. |
| `git stash` | Temporarily saves uncommitted changes. |
| `git stash pop` | Restores the latest stashed changes. |
| `git check-ignore -v <f>` | Verifies why file `<f>` is ignored by `.gitignore`. |
