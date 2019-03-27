"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar = require("chokidar");
const path = require("path");
class FilesWatcher {
    constructor(watchPaths, watchExtensions) {
        this.watchPaths = watchPaths;
        this.watchExtensions = watchExtensions;
        this.watchExtensions = watchExtensions;
        this.watchers = [];
        this.listeners = {};
    }
    isFileSupported(filePath) {
        return this.watchExtensions.indexOf(path.extname(filePath)) !== -1;
    }
    watch() {
        if (this.isWatching()) {
            throw new Error('Cannot watch again - already watching.');
        }
        this.watchers = this.watchPaths.map((watchPath) => {
            return chokidar
                .watch(watchPath, { persistent: true, alwaysStat: true })
                .on('change', (filePath, stats) => {
                if (this.isFileSupported(filePath)) {
                    (this.listeners['change'] || []).forEach(changeListener => {
                        changeListener(filePath, stats);
                    });
                }
            })
                .on('unlink', (filePath) => {
                if (this.isFileSupported(filePath)) {
                    (this.listeners['unlink'] || []).forEach(unlinkListener => {
                        unlinkListener(filePath);
                    });
                }
            });
        });
    }
    isWatchingFile(filePath) {
        return (this.isWatching() &&
            this.isFileSupported(filePath) &&
            this.watchPaths.some(watchPath => filePath.startsWith(watchPath)));
    }
    isWatching() {
        return this.watchers.length > 0;
    }
    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }
    off(event, listener) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(oldListener => oldListener !== listener);
        }
    }
}
exports.FilesWatcher = FilesWatcher;
//# sourceMappingURL=FilesWatcher.js.map