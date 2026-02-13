import { Configuration } from 'electron-builder';
import appMeta from './app.meta';

const mainConfig: Configuration = {
    appId: appMeta.appId,
    productName: appMeta.productName,
    copyright: appMeta.copyright,

    directories: {
        output: 'release',
    },

    files: [
        'dist/**/*',
        '!dist/config.cjs',
        'build/x64/Release/*.node',
    ],

    asarUnpack: ['src-cpp/**/*'],

    compression: 'maximum',
    artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
};

const localConfig: Configuration = {
    ...mainConfig,

    win: {
        publisherName: appMeta.company,
        verifyUpdateCodeSignature: false,
        target: [
            { target: 'nsis', arch: ['x64'] },
            { target: 'portable', arch: ['x64'] },
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
        target: [{ target: 'dmg', arch: ['x64', 'arm64'] }],
        category: 'public.app-category.developer-tools',
    },

    linux: {
        target: [{ target: 'AppImage', arch: ['x64'] }],
        category: 'Development',
    },
};

const ciConfig: Configuration = {
    ...mainConfig,

    win: {
        target: [{ target: 'zip', arch: ['x64'] }],
    },

    mac: {
        target: [{ target: 'zip', arch: ['x64', 'arm64'] }],
    },

    linux: {
        target: [{ target: 'zip', arch: ['x64'] }],
    },
};

const script = process.env.npm_lifecycle_event || '';

let selectedConfig = mainConfig;
if (script.includes(':ci')) {
    selectedConfig = ciConfig;
} else if (script.includes(':portable') || script.includes(':installer')) {
    selectedConfig = localConfig;
}

export default selectedConfig;