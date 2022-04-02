import Page from "./page.js";
import LocalStorage from "./tool/localStorage.js";
import Ajax from "./tool/ajax.js"
import notify from 'devextreme/ui/notify';

Page.user = {};
Page.user.setting = function() {
    Page.user.drawSettingBox();
    Page.user.setOnClick();
}
Page.user.drawSettingBox = function() { //使用者圖示 下拉登出HTML
    const html = `
        <li class="nav-item">
            <div id="Logout" class=" btn-lg">登出</div>
        </li>
    `;
    this.$navbarNavMeun = $('.user_meun');
    this.$navbarNavMeun.html(html);
}
Page.user.setOnClick = function() { //使用者圖示的功能及登出按鍵功能
        const t = this;

        $('body').on('click', function() {

            const status = t.$navbarNavMeun.hasClass('d-none');
            if (status) return;

            t.$navbarNavMeun.addClass('d-none');

        });

        $('.user').on('click', function(e) {
            e.stopPropagation();
            const status = t.$navbarNavMeun.addClass('d-none');

            const mode = (status) ? 'removeClass' : 'addClass';

            t.$navbarNavMeun[mode]('d-none');
        });

        $('#Logout').on('click', function() {

            Page.user.logOut();
        });
    }
    /**
     * drawAccountPasswordModal 登入畫面HTML
     * @param {string} title 標籤
     * @param {boolean} displayNavToolBar 是否開啟導覽列
     * 
     */
Page.user.drawAccountPasswordModal = function(title, displayNavToolBar) {
    const html = `
    <div class="signin__box">
        <div class="form-signin signin__insideBox">
            <h2 class="form-signin-heading signin__heading">${title}</h2>

            <input type="email" id="inputEmail" class="form-control" 
            placeholder="請輸入帳號"  name="account" required autofocus>

            <input type="password" id="inputPassword" class="form-control" 
            placeholder="請輸入密碼" name="passwd" required>

            <button class="btn btn-lg  btn-block login_btn"
            id="check" type="submit">登入</button>
        </div>
    </div> 
    `;

    Page.$panel.html(html);
    this.$inputEmail = $('#inputEmail');
    this.$inputPassword = $('#inputPassword');

    if (!displayNavToolBar) {
        $('#NavToolbar').addClass('d-none');
        $('.navbar-toggler').addClass('d-none');
    }
}

Page.user.drawLogin = function() {
    Page.user.drawAccountPasswordModal("登入", false)
    Page.user.setLoginHandler()
}

Page.user.setLoginHandler = function() {
    $('input').keydown(function(e) {
        const code = (e.keyCode ? e.keyCode : e.which);

        if (code !== 13) return;

        const inputType =
            $(':input:visible:enabled:eq(' + ($(':input:visible:enabled')
                .index(this) + 1) + ')').focus();

        if (inputType[0].type === 'submit') {

            Page.user.ajaxLogin();
        }
        e.preventDefault();

    });

    $("#check").on('click', function(e) {

        Page.user.ajaxLogin();
    });
}

Page.user.logOut = function() {

        const ls = new LocalStorage('user');
        ls.set(JSON.stringify({
            token: "",
        }));

        Page.clear();
        $('#Logout').addClass('d-none');
        Page.user.drawLogin()
    }
    /**
     * @param {string} mode "view" 一般登入 "manager" 管理員登入
     * @returns 
     */
Page.user.ajaxLogin = function() {
    const account = this.$inputEmail.val();
    const password = this.$inputPassword.val();

    if (account === "" && password === "") {
        notify("請輸入帳號密碼!", "error", 2000);
        return false;
    }

    const data = {
        data: {
            User: account,
            Password: password,
        }
    }
    Ajax({
        customizedUrl: '/login',
        data: data,
        success: function(r) {
            Page.user.login(r);
        },
        error: function() {
            notify("與伺服器連線失敗!", "error", 2000);
        }
    });
}
Page.user.login = async function(r) {
    let mode = r.mode

    if (mode === false) {
        this.$inputEmail.val(''); //清空輸入框
        this.$inputPassword.val('');
        notify("帳號或密碼錯誤!", "error", 2000);

        return;
    }
    let ls = new LocalStorage('user');
    if (mode === 'view') { //一般登入成功Token

        ls.set(JSON.stringify({
            token: r.token,
        }));
        var config = await Page.user.getUserConfig()
        Page.user.loginEvent(config, mode)

    } else if (mode === "manager") { //管理員登入權限成功
        ls.set(JSON.stringify({
            token: r.token,
        }));
        var config = await Page.user.getConfig()
        Page.user.loginEvent(config, mode)

    }
}
Page.user.loginEvent = function(config, mode) {
    Page.user.view(config, mode)
    notify("登入成功!", "success", 2000);
}
Page.user.view = function(r, mode) {
        $('#NavToolbar').removeClass('d-none');
        $('.navbar-toggler').removeClass('d-none');

        Page.user.setting();
        Page.pageDrawer.draw(r, mode);
    }
    //回傳使用者導覽列的資料
Page.user.getUserConfig = async function() {
        return await $.ajax({
            async: false,
            url: '../config/config_UserNavbar.json',
            success: function(data) {
                return data;
            },
            error: function(data) {
                console.log("連線失敗，缺少config_Navbar.json檔案")
            }
        });
    }
    //回傳管理者導覽列的資料
Page.user.getConfig = async function() {
        return await $.ajax({
            async: false,
            url: '../config/config_Navbar.json',
            success: function(data) {
                return data;
            },
            error: function(data) {
                console.log("連線失敗，缺少config_Navbar.json檔案")
            }
        });
    }
    //免登入
Page.user.getConfigAndDraw = async function() {
        const config = await Page.user.getConfig()
        Page.user.view(config)
    }
    //刷新不會登出
Page.user.ifToken = function() {
    const lsUser = new LocalStorage('user');
    const user = lsUser.get();
    if (user.token) {
        Page.user.getConfigAndDraw();
    } else {
        Page.user.drawLogin()
    }
}