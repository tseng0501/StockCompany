import Page from './page.js';
import { DrawDataGrid, DxDataGridOptions } from './tool/dx/dxDataGrid.js';
import SendRequest from './tool/dx/sendRequest.js';
import { Authority, StateId, Columns } from './json/accountManagement_data.js';
import CustomStore from "devextreme/data/custom_store"

Page.accountManagement = {};
Page.accountManagement.draw = function (mode, config) {

    Page.accountManagement.drawHtml(mode)
    Page.accountManagement.setColumns()
    Page.accountManagement.drawDataGrid(config)
}
Page.accountManagement.drawHtml = function (mode) {
    const html = `
        <div id="${mode}">
            <div id="gridContainer"></div>
        </div>`;
    Page.$panel.html(html);
}

Page.accountManagement.setColumns = function () {

    this._columns = []
    for (let i = 0; i < Columns.length; i++) {
        const element = Columns[i];
        if (element.allowEditing == false) {
            this._columns.push({
                dataField: element.id,
                caption: element.name,
                alignment: 'center',
                allowEditing: element.allowEditing
            });
        } else if (element.id == "Authority") {
            this._columns.push({
                dataField: element.id,
                caption: element.name,
                alignment: 'center',
                lookup: {
                    dataSource: Authority,
                    displayExpr: "value",
                    valueExpr: "id"
                }
            });
        } else if (element.id == "Enable") {
            this._columns.push({
                dataField: element.id,
                caption: element.name,
                alignment: 'center',
                lookup: {
                    dataSource: StateId,
                    displayExpr: "value",
                    valueExpr: "id"
                }
            });
        }
        else {
            this._columns.push({
                dataField: element.id,
                caption: element.name,
                alignment: 'center',
            });
        }
    }
}
Page.accountManagement.drawDataGrid = function (config) {
    const options = {
        dataSource: new CustomStore({
            key: "ID",
            load: function () {
                return SendRequest(config.server + "/getData/accountManagement");
            },
            insert: function (values) {
                return SendRequest(config.server + "/setData/accountManagement", "POST", {
                    data: values,
                    mode: "insertOrder"
                });
            },
            update: function (key, values) {
                return SendRequest(config.server + "/setData/accountManagement", "POST", {
                    key: key,
                    data: values,
                    mode: "updateOrder"
                });
            },
            remove: function (key) {
                return SendRequest(config.server + "/setData/accountManagement", "POST", {
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
    DrawDataGrid($('#gridContainer'), new DxDataGridOptions(options))
}