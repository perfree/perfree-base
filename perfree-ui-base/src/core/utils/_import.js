
export default async (moduleInfo, moduleName) => {
    if (import.meta.env.DEV) {
        const _import = await import("./_import-dev.js");
        let perfree = await _import.default(moduleInfo, moduleName);
        return perfree.default();
    } else {
        const _import = await import("./_import-prod.js");
        let perfree = await _import.default(moduleInfo, moduleName);
        return perfree.default();
    }
};
