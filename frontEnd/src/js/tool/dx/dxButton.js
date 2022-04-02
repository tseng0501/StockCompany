'use strict';
/** DevExtreme Button 設定格式 */

class DxButtonOptions {
    /**
    * @param {Object}   options                  設定
    * @param {String}   options.stylingMode      Button 按鈕的樣式
    * @param {String}   options.type             按鈕類型
    * @param {String}   options.icon             icon
    * @param {String}   options.text             icon
    * @param {Function} options.onClick        按鈕觸發事件
    * 
    * 
    **/

    constructor(options = {}) {
        this.stylingMode = (options.stylingMode || 'contained'),
        this.type = (options.type || 'normal'),
        this.icon = (options.icon || 'search'),
        this.text = (options.text || ''),
        this.onClick = (options.onClick || null);

    }
}

/** 繪製 DevExtreme Button
 * @param {jQuery}           $panel  被繪製的jQuery元件
 * @param {DxButtonOptions}  options DevExtreme Button 設定資訊
 * @returns 如果錯誤回傳false
 */

function DrawButton($panel, options) {
    if ($panel === null) {
        console.log('缺少 $panel.');
        return false;
    }
    $panel.dxButton({
        stylingMode: options.stylingMode,
        type: options.type,
        icon :options.icon,
        onClick:options.onClick,
        text:options.text,
    })
    return $panel;

}

export { DrawButton, DxButtonOptions }
