import LocalStorage from "../localStorage.js";
import notify from 'devextreme/ui/notify';

function SendRequest(url, method, data) {
    var d = $.Deferred();
    
    $.ajax(url, {
        method: method || "GET",
        data: JSON.stringify(data),
        cache: false,
        xhrFields: { withCredentials: false },
    }).done(function (result,textStatus,xhr) {
        d.resolve(method === "GET" ? result.data : result);

    }).fail(function (xhr,textStatus,errorMessage) {
        d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
        notify("請求失敗 " + xhr.status + errorMessage, textStatus, 2000);
    });

    return d.promise();
}
export default SendRequest