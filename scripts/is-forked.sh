
isForked() {
    case $1 in
    dom-expressions|solid|solid-app-router|solid-site|vite-plugin-solid)
        return 0
        ;;
    *)
        return 1
        ;;
    esac
}
