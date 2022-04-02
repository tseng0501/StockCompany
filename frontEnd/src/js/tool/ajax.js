import LocalStorage from "./localStorage.js";
import IsFunction from "./isFunction.js"
/** Ajax
 * @param {Object}  options 
 * @param {String}  options.url     請求位置
 * @param {*}       options.data    請求時夾帶的資料
 * @param {Function} options.error      Http請求錯誤時執行
 * @param {Function} options.success    請求成功時執行
 * @param {Function} options.warning    未成功請求時執行
 * @param {Function} options.complete   完成後執行
 * @param {String} options.customizedUrl   加了/dashboard的url
 * @param {String} options.ajaxType      type
 */
 function Ajax(options, debug) {
    const ls = new LocalStorage('config');
    const config = ls.get();

    const lsUser = new LocalStorage('user');
    const user = lsUser.get();
    if (debug) {
        console.log('ajax.start', config.server + '/dashboard' + options.url);
        console.log('ajax.data', options.data);
        console.time('ajax.done!');
    }
    options.data = (options.data || {});
    options.token = (user.token || "");

    const customizedUrl = (options.url === undefined ? config.server + options.customizedUrl : options.url);

    if (options.ajaxType) {
        const methodType = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

        if (methodType.includes(options.ajaxType) == false) {
            console.log("error")
        }
    }
    return $.ajax({
        url: customizedUrl,
        type: options.ajaxType || 'POST',
        data: JSON.stringify(options.data),
        dataType: 'json',
        // contentType: 'application/json; charset=UTF-8',
        // headers: {
        //     'Authorization': (options.token) //存放token在header裡
        // },
        error: function (r) {
            console.log()
            if (debug) {
                console.timeEnd('ajax.done!');
            }
            IsFunction(options.error, true, r);

            if (debug) {
                console.log('Http error:', r);
            }
        },
        success: function (r) {
            if (r.message === "token逾期!") {
                notify("token逾期", "error", 2000);

                Page.user.logOut();
            }

            if (typeof r === 'string') {
                notify("接收的資料格式不為 json！", "warning", 2000);

                return false;
            }

            if (debug) {
                console.timeEnd('ajax.done!');
                console.log('ajax.r', typeof r, r);
            }

            if (r.status) {
                IsFunction(options.success, true, r.data);
            }
            else if (IsFunction(options.warning)) {
                IsFunction(options.warning, true, r.message);
            }
            else {
                console.warn('ajax.warning:', r.message);
            }
        },
        complete: function (r) {
            IsFunction(options.complete, true, r);
        },
    });
}
//#endregion Ajax

export default Ajax