'use strict';
/** DevExtreme SelectBox 設定格式 */

class DxSelectBoxOptions {
    /**
    * @param {Object}  options                  設定
    * @param {Array.<{}>}  options.dataSource       SelectBox 資料來源
    * @param {String}  options.searchEnabled   是否允許搜索
    * @param {String}  options.placeholder      預設文字提醒
    * @param {Function}  options.onValueChanged   UI 組件的值更改後執行的函數
    **/

    constructor(options = {}) {
        this.dataSource = (options.dataSource || []);
        this.placeholder = (options.placeholder || '請選擇...'),
        this.searchEnabled = (options.searchEnabled || true),

            this.onValueChanged = (options.onValueChanged || null);

    }
}

/** 繪製 DevExtreme SelectBox
 * @param {jQuery}              $panel  被繪製的jQuery元件
 * @param {DxSelectBoxOptions}  options DevExtreme SelectBox 設定資訊
 * @returns 如果錯誤回傳false
 */

function DrawSelectBox($panel, options) {
    if ($panel === null) {
        console.log('缺少 $panel.');
        return false;
    }
    $panel.dxSelectBox({
        dataSource: (typeof options.dataSource === 'function' ? options.dataSource() : options.dataSource),
        placeholder:options.placeholder,
        onValueChanged :options.onValueChanged,
        searchEnabled:options.searchEnabled
    })
    return $panel;
}

export { DrawSelectBox, DxSelectBoxOptions }
