
isOwned() {
    case $1 in
    solid-devtools)
        return 0
        ;;
    *)
        return 1
        ;;
    esac
}
