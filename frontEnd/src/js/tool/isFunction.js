/** 檢測是否為Function
 * @param {*}       param   檢查的參數
 * @param {Boolean} run     如果是 Function 就執行，預設 false.
 * @param {*}       data    傳遞給 Function 執行的參數.
 */
 function IsFunction(param, run = false, data) {
    const check = (typeof param === 'function');

    return (check && run ? param(data) : check);
}
export default IsFunction