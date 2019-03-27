"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class FsHelper {
    static existsSync(filePath) {
        try {
            fs.statSync(filePath);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            }
            else {
                throw err;
            }
        }
        return true;
    }
}
exports.FsHelper = FsHelper;
//# sourceMappingURL=FsHelper.js.map