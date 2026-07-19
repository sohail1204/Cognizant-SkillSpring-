# Git Hands-on Lab 1 Workspace

This workspace contains the completed execution of **Git Hands-on Lab 1** (incorporating Modules 1 through 17).

## Folder Structure

*   [GitDemo/](file:///Users/bharathbodduvenkata/Git%20&%20Version%20Control/Git%20HOL%201/GitDemo): The active Git repository initialized and worked on during the lab.
    *   Contains the tracked [welcome.txt](file:///Users/bharathbodduvenkata/Git%20&%20Version%20Control/Git%20HOL%201/GitDemo/welcome.txt) file.
    *   Linked to a local bare repository (`GitDemo_remote.git`) as `origin` to simulate a GitLab remote.
*   [GitDemo_remote.git/](file:///Users/bharathbodduvenkata/Git%20&%20Version%20Control/Git%20HOL%201/GitDemo_remote.git): The simulated remote GitLab repository.
*   [git_hands_on_lab_guide.md](file:///Users/bharathbodduvenkata/.gemini/antigravity-ide/brain/f9d146ea-e26d-497a-9214-aae86997c3cb/git_hands_on_lab_guide.md): The comprehensive step-by-step guide detailing all 17 modules, internal mechanisms, expected outputs, troubleshooting steps, and 30+ Viva questions.

## Running Verification Locally

You can navigate to the `GitDemo` folder and run standard Git commands to inspect the repository state:

```bash
cd GitDemo
git status
git log
git remote -v
```

All commands will execute cleanly without error.
