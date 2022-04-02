import Page from './page.js';
import { DrawSelectBox, DxSelectBoxOptions } from './tool/dx/dxSelectBox.js';
import { DrawDataGrid, DxDataGridOptions } from './tool/dx/dxDataGrid.js';
import { DrawButton, DxButtonOptions } from './tool/dx/dxButton.js';
import Ajax from './tool/ajax.js'
import { DropDownListItem, InputListItem, Columns } from './json/inventoryList_data.js';
import StockList from './json/stockList.js';
import notify from 'devextreme/ui/notify';

Page.inventoryList = {};
Page.inventoryList.draw = function (mode, config) {

    Page.inventoryList.drawDropDownListHtml(mode)
    Page.inventoryList.drawInputListHtml(mode)
    Page.inventoryList.drawHtml(mode)

    Page.inventoryList._getItemAjax(mode)
    Page.inventoryList.drawSearchButton(mode)
}
Page.inventoryList.drawDropDownListHtml = function (mode) {
    let maindropdownhtml = '';

    for (let i = 0; i < DropDownListItem.length; i++) {
        const element = DropDownListItem[i];
        maindropdownhtml += `
        <div class="input-group">
            <div class="input-group-textselect">${element.value}</div>
            <div class="dx-field-value">
                <div id="${mode}_${element.name}"></div>
            </div>
        </div>
        `
    }
    this.maindropdownhtml = `${maindropdownhtml}`
}
Page.inventoryList.drawInputListHtml = function (mode) {
    let maininputhtml = '';

    for (let i = 0; i < InputListItem.length; i++) {
        const element = InputListItem[i];
        maininputhtml += `
        <div class="input-group-name" data-id="${element.name}">
                <span class="input-title">${element.value}</span>
                <input type="${element.type}" class="form-control ${mode}_${element.name}" 
                    aria-label="${element.name}" value="${element.content}"
                    placeholder="${element.placeholder}">
        </div>
        `
    }
    this.maininputhtml = `${maininputhtml}`
}
Page.inventoryList.drawHtml = function (mode) {
    const html = `
        <div id="${mode}">
            <div id="${mode}Filter">
                ${this.maindropdownhtml}
                ${this.maininputhtml}
                <div class="inventoryblock">
                    <div id="gridSearch"></div>
                    <div id="gridClearSelection"></div>
                </div>
            </div>
            <div id="${mode}Panel">
                <div id="gridContainer"></div>
            </div>
        </div>`;
    Page.$panel.html(html);
    this.$panel = this.$panel,
        this.$name = $("#InventoryList_name")
    this.$color = $("#InventoryList_color")
    this.$stock = $("#InventoryList_stock")
    this.$gridSearch = $("#gridSearch")
    this.$gridContainer = $("#gridContainer")
}
Page.inventoryList._getItemAjax = function (mode) {
    Ajax({
        customizedUrl: '/getItemData/inventoryList',
        data: { mode: mode },
        success: function (r) {
            Page.inventoryList.drawNameSelectBox(r)
            Page.inventoryList.drawColorSelectBox(r)
            Page.inventoryList.drawStockSelectBox(r)
        },
        error: function () {
            notify("請求失敗", "error", 2000);
        },
    })
}
Page.inventoryList.drawNameSelectBox = function (data) {
    const options = {
        dataSource: data.ProductName.sort(),

    }
    this.$nameSelectBox = DrawSelectBox(this.$name, new DxSelectBoxOptions(options))
}
Page.inventoryList.drawColorSelectBox = function (data) {
    const options = {
        dataSource: data.ColorName.sort(),
    };
    this.$colorSelectBox = DrawSelectBox(this.$color, new DxSelectBoxOptions(options))
}
Page.inventoryList.drawStockSelectBox = function (data) {
    for (let i = 0; i < StockList.length; i++) {
        const element = StockList[i];
        if (data.ShipStatus[i] == element.id) {
            data.ShipStatus[i] = element.value
        }

    }
    const options = {
        dataSource: data.ShipStatus,
    };
    this.$stockSelectBox = DrawSelectBox(this.$stock, new DxSelectBoxOptions(options))
    this.$dxStock = this.$stockSelectBox.dxSelectBox('instance');
}
Page.inventoryList.drawSearchButton = function (mode) {
    const options = {
        text: "搜尋",
        type: 'default',
        onClick: function () {
            let namedata = document.querySelector("#InventoryList_name input").value
            let colordata = document.querySelector("#InventoryList_color input").value
            let stockdata = document.querySelector("#InventoryList_stock input").value
            let numberdata = document.querySelector("#InventoryListFilter .InventoryList_number").value

            let data = {
                data: {
                    ProductName: namedata ? namedata : null,
                    ColorName: colordata ? colordata : null,
                    SerialID: numberdata ? numberdata : null,
                    ShipStatus: stockdata ? stockdata : null,
                },
                mode: mode
            }
            Ajax({
                customizedUrl: '/getData/inventoryList',
                data: data,
                success: function (r) {
                    Page.inventoryList.setColumns()
                    Page.inventoryList.drawDataGrid(r)
                    notify("請求成功", "success", 2000);
                },
                error: function () {
                    notify("請求失敗", "error", 2000);
                }
            })

        }
    };
    this.$dxbutton = DrawButton(this.$gridSearch, new DxButtonOptions(options))
}

Page.inventoryList.setColumns = function () {
    this._columns = []
    for (let i = 0; i < Columns.length; i++) {
        const element = Columns[i];
        if (element.lookup) {
            this._columns.push({
                dataField: element.id,
                caption: element.name,
                alignment: 'center',
                lookup: {
                    dataSource: StockList,
                    valueExpr: "id",
                    displayExpr: "value"
                }
            });
        } else {
            this._columns.push({
                dataField: element.id,
                caption: element.name,
                alignment: 'center',
                allowEditing: false
            });
        }
    }
}
Page.inventoryList.drawDataGrid = function (data) {
    var editRowKey;
    var editRowObj = {};

    const options = {
        dataSource: data,
        onEditingStart: function (e) {
            editRowKey = e.key;
            editRowObj = e.data;
        },
        onInitNewRow: function (e) {
            editRowKey = 0;
        },
        onRowUpdating: function (e) {

            let data = {
                id: e.oldData.WeightID,
                data: e.newData,
                mode: "updateOrder",
            }
            Ajax({
                customizedUrl: '/setData/inventoryList',
                data: data,
                success: function (r) {
                    notify("請求成功", "success", 2000);
                },
                error: function () {
                    notify("請求失敗", "error", 2000);
                },
            })
        },
        onRowRemoving: function (e) {
            let data = {
                id: e.data.WeightID,
                mode: "deleteOrder",
            }
            Ajax({
                customizedUrl: '/setData/inventoryList',
                data: data,
                success: function (r) {
                    notify("請求成功", "success", 2000);
                },
                error: function () {
                    notify("請求失敗", "error", 2000);
                },
            })
        },
        editing: {
            allowAdding: false
        },
        columns: this._columns
    }
    this.$datagrid = DrawDataGrid(this.$gridContainer, new DxDataGridOptions(options))
    this.$dxDataGrid = this.$datagrid.dxDataGrid('instance');
}
