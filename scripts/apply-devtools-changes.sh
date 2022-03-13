set -e

(cd submodules/dom-expressions ; git cherry-pick --no-commit origin/solid-devtools)
(cd submodules/solid ; git cherry-pick --no-commit origin/solid-devtools)
