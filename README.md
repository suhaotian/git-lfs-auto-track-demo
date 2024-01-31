# Clone

Ignore LFS clone:

```sh
# GIT_LFS_SKIP_SMUDGE=1 git clone repo_url
git config --global filter.lfs.smudge "git-lfs smudge --skip -- %f"
git config --global filter.lfs.process "git-lfs filter-process --skip"
```
