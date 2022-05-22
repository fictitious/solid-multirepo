set -e

if [ ! -n "$BASH" ] ; then echo "this script requires bash: $0" ; exit 1 ; fi
scriptDir="$(cd "${BASH_SOURCE%/*}/" >/dev/null 2>&1 && pwd)"

. "${scriptDir}"/is-forked.sh
. "${scriptDir}"/is-owned.sh

for s in $(ls submodules) ; do
    case ${s} in
    vite-plugin-solid)
        b=master
        ;;
    *)
        b=main
        ;;
    esac
    if isForked "${s}" ; then
        # forked - should be on separate branch, no need to --update-head-ok
        (cd "submodules/${s}" && echo "${s}" && git fetch origin ${b}:${b})
    elif ! isOwned "${s}" ; then
        # not forked - should have no changes
        (cd "submodules/${s}" && git diff-index --quiet HEAD -- || { echo "there are uncommitted changes in ${s}. exiting." >&2; exit 1; }) || exit 1
        (cd "submodules/${s}" && echo "${s}" && git fetch --update-head-ok origin ${b}:${b} && git reset --hard HEAD)
    fi
done
