const appMeta = require("./app.meta.cjs");
const main = require("./builder.main.cjs");

module.exports = {
    ...main,

    win: {
        publisherName: appMeta.company,
        verifyUpdateCodeSignature: false,
        target: [
            { target: "nsis", arch: ["x64"] },
            { target: "portable", arch: ["x64"] },
        ],
    },

    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        shortcutName: appMeta.productName,
    },

    mac: {
        target: [{ target: "dmg", arch: ["x64", "arm64"] }],
        category: "public.app-category.developer-tools",
    },

    linux: {
        target: [{ target: "AppImage", arch: ["x64"] }],
        category: "Development",
    },
};