const meta = require("./app.meta");

module.exports = {
    appId: meta.appId,
    productName: meta.productName,
    copyright: meta.copyright,

    directories: {
        output: "release",
    },

    files: [
        "dist/**/*",
        "build/x64/Release/**/*",
    ],

    asarUnpack: ["native/**/*"],

    compression: "maximum",
    artifactName: "${productName}-${version}-${os}-${arch}.${ext}",
};