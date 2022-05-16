
isForked() {
    case $1 in
    solid|solid-app-router|solid-site|vite-plugin-solid)
        return 0
        ;;
    *)
        return 1
        ;;
    esac
}
