
export default async (moduleInfo, moduleName) => {
    const publicPaths = {
        development: "/",
        production: `/static/admin/modules/${moduleName}/`
    };
    if (import.meta.env.DEV) {
        const _import = await import("./_import-dev.js");
        let perfree = await _import.default(moduleInfo, moduleName);
        return perfree.default();
    } else {
        const _import = await import("./_import-prod.js");
        let perfree = await _import.default(moduleInfo, moduleName);
        return perfree.default();
    }
   /* const _import = await import("./import-" + process.env.NODE_ENV);
    let perfree = await _import.default(type, name);
    return perfree.default();*/
};