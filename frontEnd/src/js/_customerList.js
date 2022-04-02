import Page from './page.js';
import SendRequest from './tool/dx/sendRequest.js';
import { DrawDataGrid, DxDataGridOptions } from './tool/dx/dxDataGrid.js';
import CompanyListColumns from './json/customerList_data.js'
import CustomStore from "devextreme/data/custom_store"

Page.customerList = {};
Page.customerList.draw = function (mode, config) {

    Page.customerList.drawHtml(mode)
    Page.customerList.setColumns()
    Page.customerList.drawDataGrid(config)
}

Page.customerList.drawHtml = function (mode) {

    const html = `
        <div id="${mode}">
            <div id="gridContainer"></div>
        </div>`;
    Page.$panel.html(html);
}
Page.customerList.setColumns = function () {
    this._columns = []
    for (let i = 0; i < CompanyListColumns.length; i++) {
        const element = CompanyListColumns[i];
        if (element.allowEditing == false) {

            this._columns.push({
                dataField: element.id,
                caption: element.name,
                alignment: 'center',
                allowEditing: false
            });
        } else {
            this._columns.push({
                dataField: element.id,
                caption: element.name,
                alignment: 'center',
            });
        }
    }
}
Page.customerList.drawDataGrid = function (config) {
    this.$gridContainer = $('#gridContainer')
    const options = {
        dataSource: new CustomStore({
            key: "CustomerID",
            load: function () {
                return SendRequest(config.server + "/getData/customerList");
            },
            insert: function (values) {
                return SendRequest(config.server + "/setData/customerList", "POST", {
                    data: values,
                    mode: "insertOrder"
                });
            },
            update: function (key, values) {
                return SendRequest(config.server + "/setData/customerList", "POST", {
                    key: key,
                    data: values,
                    mode: "updateOrder"
                });
            },
            remove: function (key) {
                return SendRequest(config.server + "/setData/customerList", "POST", {
                    key: key,
                    mode: "deleteOrder"
                });
            }
        }),
        searchPanel: {
            visible: true,
        },
        columns: this._columns
    }
    this.$datagrid = DrawDataGrid(this.$gridContainer, new DxDataGridOptions(options))
    this.$dxDataGrid = this.$datagrid.dxDataGrid('instance');
}
