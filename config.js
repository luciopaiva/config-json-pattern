
const Utils = require("./utils");

let configurations = {
    foo: 1,
    bar: {
        fooBar: 2
    },
};

// load config file
let customConfigurations = {};
try {
    customConfigurations = require("./config.json");
} catch (e) {
    console.info("`config.json` not found - loading default configurations");
}

// merge with custom default configs
configurations = Utils.mergeDeep(configurations, customConfigurations);

configurations.dumpToConsole = () => {
    const hr = "-".repeat(80);
    console.info(hr);
    console.info("Configurations:");
    Utils.dumpObject(configurations);
    console.info(hr);
};

module.exports = configurations;
