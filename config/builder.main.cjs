const appMeta = require("./app.meta.cjs");

module.exports = {
    appId: appMeta.appId,
    productName: appMeta.productName,
    copyright: appMeta.copyright,

    directories: {
        output: "release",
    },

    files: [
        "dist/**/*",
        "build/x64/Release/**/*",
    ],

    asarUnpack: ["src-cpp/**/*"],

    compression: "maximum",
    artifactName: "${productName}-${version}-${os}-${arch}.${ext}",
};