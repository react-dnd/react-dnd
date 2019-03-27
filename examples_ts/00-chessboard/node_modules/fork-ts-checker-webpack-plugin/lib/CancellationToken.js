"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const FsHelper_1 = require("./FsHelper");
class CancellationToken {
    constructor(typescript, cancellationFileName, isCancelled) {
        this.typescript = typescript;
        this.isCancelled = !!isCancelled;
        this.cancellationFileName =
            cancellationFileName || crypto.randomBytes(64).toString('hex');
        this.lastCancellationCheckTime = 0;
    }
    static createFromJSON(typescript, json) {
        return new CancellationToken(typescript, json.cancellationFileName, json.isCancelled);
    }
    toJSON() {
        return {
            cancellationFileName: this.cancellationFileName,
            isCancelled: this.isCancelled
        };
    }
    getCancellationFilePath() {
        return path.join(os.tmpdir(), this.cancellationFileName);
    }
    isCancellationRequested() {
        if (this.isCancelled) {
            return true;
        }
        const time = Date.now();
        const duration = Math.abs(time - this.lastCancellationCheckTime);
        if (duration > 10) {
            // check no more than once every 10ms
            this.lastCancellationCheckTime = time;
            this.isCancelled = FsHelper_1.FsHelper.existsSync(this.getCancellationFilePath());
        }
        return this.isCancelled;
    }
    throwIfCancellationRequested() {
        if (this.isCancellationRequested()) {
            throw new this.typescript.OperationCanceledException();
        }
    }
    requestCancellation() {
        fs.writeFileSync(this.getCancellationFilePath(), '');
        this.isCancelled = true;
    }
    cleanupCancellation() {
        if (this.isCancelled &&
            FsHelper_1.FsHelper.existsSync(this.getCancellationFilePath())) {
            fs.unlinkSync(this.getCancellationFilePath());
            this.isCancelled = false;
        }
    }
}
exports.CancellationToken = CancellationToken;
//# sourceMappingURL=CancellationToken.js.map