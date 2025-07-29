export function redirectToHashIfNeeded() {
    const path = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;

    const hasHash = hash.startsWith('#/');
    const isRoot = path === '/';

    if (hash.startsWith('#/Funprod')) {
        const newUrl = '/Funprod/' + '#' + path + search;
        window.location.replace(newUrl);
        return;
    }
    if (!hasHash && !isRoot && !path.startsWith('/Funprod')) {
        const newUrl = '/#' + path + search;
        window.location.replace(newUrl);
    }
}
