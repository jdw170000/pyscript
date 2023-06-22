import { fetchPaths, stdio } from "./_utils.js";
import {
    run,
    runAsync,
    setGlobal,
    deleteGlobal,
    writeFile,
} from "./_python.js";

const type = "micropython";

// REQUIRES INTEGRATION TEST
/* c8 ignore start */
export default {
    type,
    module: (version = "1.20.0-253") =>
        `https://cdn.jsdelivr.net/npm/@micropython/micropython-webassembly-pyscript@${version}/micropython.mjs`,
    async engine({ loadMicroPython }, config, url) {
        const { stderr, stdout, get } = stdio();
        url = url.replace(/\.m?js$/, ".wasm");
        const runtime = await get(loadMicroPython({ stderr, stdout, url }));
        if (config.fetch) await fetchPaths(this, runtime, config.fetch);
        return runtime;
    },
    setGlobal,
    deleteGlobal,
    run,
    runAsync,
    writeFile,
};
/* c8 ignore stop */