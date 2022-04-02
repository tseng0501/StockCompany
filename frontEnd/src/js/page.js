'use strict';
const Page = {};
Page.$panel = $('#Content');

Page.clear = function () {
    Page.$panel.empty().removeClass();
}

export default Page