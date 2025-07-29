export function redirectToHashIfNeeded() {
    const path = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;

    const hasHash = hash.startsWith('#/');
    const isRoot = path === '/';

    if (hash.startsWith('#/yee-eda')) {
        const newUrl = '/yee-eda/' + '#' + path + search;
        window.location.replace(newUrl);
        return;
    }
    if (!hasHash && !isRoot && !path.startsWith('/yee-eda')) {
        const newUrl = '/#' + path + search;
        window.location.replace(newUrl);
    }
}
