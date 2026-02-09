const main = require("./builder.main.cjs");

module.exports = {
    ...main,

    win: {
        target: [{ target: "zip", arch: ["x64"] }],
    },

    mac: {
        target: [{ target: "zip", arch: ["x64", "arm64"] }],
    },

    linux: {
        target: [{ target: "zip", arch: ["x64"] }],
    },
};