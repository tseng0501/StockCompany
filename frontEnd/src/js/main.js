import Page from "./page.js"
import LocalStorage from '../js/tool/localStorage.js';

window.onload = function() {
    $.ajax({
        async: false,
        url: "../config/config.json",
        success: function (config) {
            if (!JSON.stringify(config)) {
                console.log('config.json 格式設定有誤！');
                return false;
            }
            const ls = new LocalStorage('config');
            const ip = config.server ? config.server.ip : 'localhost'
            const port = config.server ? ':' + config.server.port : '';
            const ifRemoveCheckToken = config.ifRemoveCheckToken === undefined ? false : config.ifRemoveCheckToken

            ls.set(JSON.stringify({
                server: 'http://' + ip + port + '/stock',
                ifRemoveCheckToken_ajax: ifRemoveCheckToken,

            }));
            if (config.projectTitle) {
                $('.title-name').text(config.projectTitle);
            } else {
                $('.title-name').text('iNeurons');
            }

        },
        error: function () {
            console.log("連線失敗，缺少config.json檔案")
        }
    });
    async function main() {
        //可直接在config裡控制是否免登入
        let config = new LocalStorage('config');
        config = config.get();
        if (config.ifRemoveCheckToken_ajax) {
            Page.user.getConfigAndDraw();
        } else {
            Page.user.ifToken()
        }
    }
    main()

}
