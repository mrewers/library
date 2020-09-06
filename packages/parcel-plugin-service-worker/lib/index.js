var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "path", "workbox-build", "./write-script-tag"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const path = __importStar(require("path"));
    const workBox = __importStar(require("workbox-build"));
    const write_script_tag_1 = __importDefault(require("./write-script-tag"));
    const errorHandler = (err) => {
        if (err) {
            console.error(`Error: ${err}`);
        }
    };
    module.exports = (bundler) => {
        const outDir = bundler.options.outDir;
        bundler.on('bundled', () => {
            const index = path.resolve(outDir, 'index.html');
            workBox
                .generateSW({
                cleanupOutdatedCaches: true,
                globDirectory: 'dist',
                globPatterns: ['**/*.{js,css,html,ico,jpg,jpeg,png,svg,webmanifest}'],
                swDest: 'dist/sw.js',
            })
                .catch(err => errorHandler(err))
                .then(() => write_script_tag_1.default(index))
                .catch(err => errorHandler(err));
        });
    };
});
//# sourceMappingURL=index.js.map