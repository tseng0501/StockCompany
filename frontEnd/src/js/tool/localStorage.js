//#region Class ------------------------------------------------------
import IsJSON from "./isJosn.js";
class LocalStorage {
    /**
     * @param {String} param 
     */
    constructor(param) {
        this.sname = param;
        this.run = this.checkBrowserSupport();
    }

    checkBrowserSupport() {
        return typeof (Storage) !== 'undefined' ? true : false;
    }

    /** 將字串儲存到 Local Storage */
    set(value) {
        if (this.run) {
            value = (typeof value !== 'string' ? JSON.stringify(value) : value);
            localStorage.setItem(this.sname, value);

        }
    }

    /** 取得儲存於 Local Storage 的數據 */
    get() {
        if (this.run) {
            const value = localStorage.getItem(this.sname);

            if (value !== null) {
                return (IsJSON(value) ? JSON.parse(value) : value);
            }
            return '';
        }
    }

    /** 從 Local Storage 中移除數據 */
    remove() {
        if (this.run) {
            localStorage.removeItem(this.sname);
        }
    }
}
export default LocalStorage
