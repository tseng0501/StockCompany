'use strict';
/** DevExtreme TextBox 設定格式 */

class DxTextBoxOptions {
    /**
    * @param {Object}  options                  設定
    * @param {String}  options.value            TextBox 資料來源
    * @param {String}  options.placeholder      預設文字提醒
    * @param {boolean}  options.showClearButton 是否允許有刪除按鈕
    * @param {Function}  options.onValueChanged UI 組件的值更改後執行的函數
    **/

    constructor(options = {}) {
        this.value = (options.value || '');
        this.placeholder = (options.placeholder || ''),
        this.showClearButton = (options.showClearButton || true),
        this.onValueChanged = (options.onValueChanged || null);
    }
}

/** 繪製 DevExtreme TextBox
 * @param {jQuery}              $panel  被繪製的jQuery元件
 * @param {DxTextBoxOptions}  options DevExtreme TextBox 設定資訊
 * @returns 如果錯誤回傳false
 */

 function DrawTextBox($panel, options) {
    if ($panel === null) {
        console.log('缺少 $panel.');
        return false;
    }
    $panel.dxTextBox({
        value: options.value,
        placeholder:options.placeholder,
        showClearButton:options.searchEnabled,
        onValueChanged :options.onValueChanged,
    })
    return $panel;
}

export { DrawTextBox, DxTextBoxOptions }