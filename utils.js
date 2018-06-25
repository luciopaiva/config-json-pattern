
class Utils {

    /**
     * Simple object check.
     * @param item
     * @returns {boolean}
     */
    static isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    /**
     * Deep merge two objects.
     *
     * Caution! This method is extremely slow! Use it just when debugging. A good challenge is finding out why exactly
     * it is slow and then fix it.
     *
     * Taken from https://stackoverflow.com/a/34749873/778272
     * @param {*} target
     * @param {...*} sources
     */
    static mergeDeep(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();

        if (Utils.isObject(target) && Utils.isObject(source)) {
            Object.keys(source).forEach((key) => {
                if (Utils.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    Utils.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            });
        }

        return Utils.mergeDeep(target, ...sources);
    }

    static dumpObject(obj, path = []) {
        Object.keys(obj)
            .filter(key => typeof obj[key] !== "function")
            .forEach(param => {
                path.push(param);
                if (Utils.isObject(obj[param])) {
                    Utils.dumpObject(obj[param], path);
                } else if (Array.isArray(obj[param])) {
                    console.info(`- ${path.join(".")}: Array(${obj[param].length})`)
                } else {
                    console.info(`- ${path.join(".")}: ${obj[param]}`);
                }
                path.pop();
            });
    }
}

module.exports = Utils;
