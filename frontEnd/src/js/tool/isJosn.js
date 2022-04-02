/** 檢查是否為 JSON 物件
 * https://stackoverflow.com/a/9804835
 * @param {*} item 
 */
 function IsJSON(item) {
    item = (typeof item !== "string" ? JSON.stringify(item) : item);

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    return (typeof item === "object" && item !== null ? true : false);
}

export default IsJSON