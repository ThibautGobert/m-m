export default function mediaQueryCheck(query) {
    return !!window.matchMedia(query).matches
}