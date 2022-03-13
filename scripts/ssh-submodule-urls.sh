set -e

if [ ! -n "$BASH" ] ; then echo "this script requires bash: $0" ; exit 1 ; fi
scriptDir="$(cd "${BASH_SOURCE%/*}/" >/dev/null 2>&1 && pwd)"

.  "${scriptDir}"/is-forked.sh
.  "${scriptDir}"/is-owned.sh

for s in $(ls submodules) ; do
    if isForked "${s}" || isOwned "${s}" ; then
        (echo "${s}" ; cd "submodules/${s}" && git remote set-url origin "git@github.com:fictitious/${s}.git")
    fi
done
