export default function compare(a, b, invert = false) {
    if (typeof a == 'string') a = a.toLowerCase();
    if (typeof b == 'string') b = b.toLowerCase();

    if (a === b) return 0;
    else if (a == null) return -1;
    else if (b == null) return 1;
    else if (a > b) return invert ? -1 : 1;
    else return invert ? 1 : -1;
}