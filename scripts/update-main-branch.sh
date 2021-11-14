for s in $(ls submodules) ; do
    case $s in
    solid-site|vite-plugin-solid)
        b=master
        ;;
    *)
        b=main
        ;;
    esac
    case $s in
    dom-expressions|solid-docs|solid-refresh)
        # not forked - should have no changes
        (cd submodules/${s} && git diff-index --quiet HEAD -- || { echo "there are uncommitted changes in ${s}. exiting." >&2; exit 1; }) || exit 1
        (cd submodules/${s} && echo ${s} && git fetch --update-head-ok origin ${b}:${b} && git reset --hard HEAD)
        ;;
    solid|solid-app-router|solid-site|vite-plugin-solid)
        # forked - should be on separate branch, no need to --update-head-ok
        (cd submodules/${s} && echo ${s} && git fetch origin ${b}:${b})
        ;;
    *)
        echo "unknown submodule ${s} - please fix update-main-branch.sh" >&2
        exit 1
        ;;
    esac
done
