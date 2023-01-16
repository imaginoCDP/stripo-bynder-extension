import stripoDefaultExtension from './stripoDefaultExtension';
import {createBynderBlockExtension} from './createBynderBlockExtension';

const extension = {
    create(stripoConfig, stripoApi, extensionBasePath) {
        return Object.assign({
            stripoConfig: stripoConfig,
            stripoApi: stripoApi,
            extensionBasePath: extensionBasePath,
            ...stripoDefaultExtension,
            ...createBynderBlockExtension(stripoConfig, stripoApi, extensionBasePath)
        });
    }
};

self['BynderBlockExtension'] = extension;




