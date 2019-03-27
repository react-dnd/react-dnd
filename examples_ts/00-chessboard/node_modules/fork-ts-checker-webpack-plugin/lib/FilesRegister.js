"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FilesRegister {
    constructor(dataFactory) {
        this.dataFactory = dataFactory;
        this.files = {};
        this.dataFactory = dataFactory;
    }
    keys() {
        return Object.keys(this.files);
    }
    add(filePath) {
        this.files[filePath] = {
            mtime: undefined,
            data: this.dataFactory(undefined)
        };
    }
    remove(filePath) {
        if (this.has(filePath)) {
            delete this.files[filePath];
        }
    }
    has(filePath) {
        return this.files.hasOwnProperty(filePath);
    }
    get(filePath) {
        if (!this.has(filePath)) {
            throw new Error('File "' + filePath + '" not found in register.');
        }
        return this.files[filePath];
    }
    ensure(filePath) {
        if (!this.has(filePath)) {
            this.add(filePath);
        }
    }
    getData(filePath) {
        return this.get(filePath).data;
    }
    mutateData(filePath, mutator) {
        this.ensure(filePath);
        mutator(this.files[filePath].data);
    }
    getMtime(filePath) {
        return this.get(filePath).mtime;
    }
    setMtime(filePath, mtime) {
        this.ensure(filePath);
        if (this.files[filePath].mtime !== mtime) {
            this.files[filePath].mtime = mtime;
            // file has been changed - we have to reset data
            this.files[filePath].data = this.dataFactory(this.files[filePath].data);
        }
    }
}
exports.FilesRegister = FilesRegister;
//# sourceMappingURL=FilesRegister.js.map