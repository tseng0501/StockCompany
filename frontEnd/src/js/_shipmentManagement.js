import Page from './page.js';
import { DrawTextBox, DxTextBoxOptions } from './tool/dx/dxTextBox.js'
import { DrawButton, DxButtonOptions } from './tool/dx/dxButton.js';
import { DrawDataGrid, DxDataGridOptions } from './tool/dx/dxDataGrid.js';
import Ajax from './tool/ajax.js';
import randomNumber from './tool/randomNumber.js';
import { ListItem, StockListColumns, InputListItem } from './json/shipmentManagement_data.js';
import CompanyListColumns from './json/customerList_data.js'
import StockList from './json/stockList.js';
import notify from 'devextreme/ui/notify';
import DropDownBox from "devextreme/ui/drop_down_box";

Page.shipmentManagement = {};
Page.shipmentManagement.draw = function (mode, config) {
    Page.shipmentManagement.drawListHtml(mode)
    Page.shipmentManagement.drawHtml(mode)
    Page.shipmentManagement.setDate()
    Page.shipmentManagement.setClickButton()
    Page.shipmentManagement._getItemAjax(mode)
}
Page.shipmentManagement.drawListHtml = function (mode) {
    let maininputhtml = '';
    for (let i = 0; i < ListItem.length; i++) {
        const element = ListItem[i];
        maininputhtml += `
        <div class="dx-field">
            <div class="dx-field-label">${element.value}</div>
            <div class="dx-field-value">
                <div id="${element.name}"></div>
            </div>
        </div>
        `
    }
    this.maininputhtml = `${maininputhtml}`
}
Page.shipmentManagement.drawHtml = function (mode) {
    const html = `
        <div id="${mode}">
            ${this.maininputhtml}
        </div>
        <div class="button-group">
            <div id="onClick" class="displaybtn"></div>
        </div>
        `;
    Page.$panel.html(html);

}
Page.shipmentManagement.setDate = function () {
    var now = new Date();
    $("#shippingDate").dxDateBox({
        type: "date",
        value: now,
        displayFormat: "yyyy/MM/dd"
    });
}

Page.shipmentManagement._getItemAjax = function (mode) {
    Ajax({
        customizedUrl: '/getData/shipmentManagement',
        data: { mode: mode },
        success: function (r) {
            Page.shipmentManagement.setCompanyNameColumns()
            Page.shipmentManagement.setCompanyNameBox(r.company)
            Page.shipmentManagement.setStockListColumns()
            Page.shipmentManagement.setStockListBox(r.stock)
            Page.shipmentManagement.setTextBox()
        }
    })
}

Page.shipmentManagement.setCompanyNameColumns = function () {
    this._CompanyNamecolumns = []
    for (let i = 0; i < CompanyListColumns.length; i++) {
        const element = CompanyListColumns[i];
        this._CompanyNamecolumns.push({
            dataField: element.id,
            caption: element.name,
            alignment: 'center',
        });
    }
}

Page.shipmentManagement.setCompanyNameBox = function (data) {
    var dataGrid;

    $('#companyName').dxDropDownBox({
        dataSource: data,
        valueExpr: "CustomerID",
        placeholder: "請選擇",
        displayExpr: "Company",
        contentTemplate: function (e) {
            //appendTo() 方法在被选元素的结尾（仍然在内部）插入指定内容
            $('<div id="company_grid"></div>').appendTo('#companyName');

            var value = e.component.option("value"),
                options = {
                    dataSource: e.component.getDataSource(),
                    columns: Page.shipmentManagement._CompanyNamecolumns,
                    paging: {
                        enabled: true,
                        pageSize: 10
                    },
                    selection: { mode: "single" },
                    selectedRowKeys: value,
                    editing: {
                        allowAdding: false,
                        allowDeleting: false,
                        allowUpdating: false,
                    },
                    onSelectionChanged: function (selectedItems) {
                        var data = selectedItems.selectedRowsData[0];
                        if (data) {
                            e.component.option("value", data.CustomerID);
                            Page.shipmentManagement.setContactPersonTextBox(data.Name)
                            Page.shipmentManagement.setContactNumberTextBox(data.Phone)
                            Page.shipmentManagement.setSerialNumberTextBox(data.GUINumber)
                            Page.shipmentManagement.setDeliveryLocationTextBox(data.Address)
                            Page.shipmentManagement.setFAXTextBox(data.FAX)
                            Page.shipmentManagement.setShipmentNumberTextBox()
                        }
                    }
                };
            this.$company_datagrid = DrawDataGrid($('#company_grid'), new DxDataGridOptions(options))
            dataGrid = this.$company_datagrid.dxDataGrid("instance");

            e.component.on("valueChanged", function (args) {
                var value = args.value;
                dataGrid.selectRows(value, false);
                e.component.close();
            });
            return this.$company_datagrid;
        }
    });
}
Page.shipmentManagement.setStockListColumns = function () {
    this._StockListcolumns = []
    for (let i = 0; i < StockListColumns.length; i++) {
        const element = StockListColumns[i];
        if (element.lookup) {
            this._StockListcolumns.push({
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
            this._StockListcolumns.push({
                dataField: element.id,
                caption: element.name,
                alignment: 'center',
            });
        }
    }
}
Page.shipmentManagement.setStockListBox = function (data) {
    var dataGrid;

    $("#stockList").dxDropDownBox({
        valueExpr: "WeightID",
        placeholder: "請選擇",
        displayExpr: "ProductName",
        dataSource: data,
        contentTemplate: function (e) {
            $('<div id="stockList_grid"></div>').appendTo('#stockList');

            var value = e.component.option("value"),
                options = {
                    dataSource: e.component.getDataSource(),
                    columns: Page.shipmentManagement._StockListcolumns,
                    paging: {
                        enabled: true,
                        pageSize: 10
                    },
                    selection: { mode: "multiple" },
                    selectedRowKeys: value,
                    editing: {
                        allowAdding: false,
                        allowDeleting: false,
                        allowUpdating: false,
                    },
                    onSelectionChanged: function (selectedItems) {
                        var keys = selectedItems.selectedRowKeys;
                   
                        const datavalue = []
                        const batchDatas = []
                        
                        for (let i = 0; i < keys.length; i++) {
                            let element = keys[i];
                            datavalue.push(element.WeightID)
                            batchDatas.push(element.BatchName)
                        }
                        e.component.option("value", datavalue);
                        Page.shipmentManagement.setBatchName(batchDatas)

                    }
                };
            this.$stockList_datagrid = DrawDataGrid($('#stockList_grid'), new DxDataGridOptions(options))
            dataGrid = this.$stockList_datagrid.dxDataGrid("instance");

            return this.$stockList_datagrid;
        }
    });
}
Page.shipmentManagement.setBatchName = function (data) {
    var datas =data.filter(function(element, index, arr){
        return arr.indexOf(element) === index;
    });

    const options = {
        value: datas
    }
    DrawTextBox($(`#orderNumber`), new DxTextBoxOptions(options))
}
Page.shipmentManagement.setTextBox = function () {
    for (let i = 0; i < InputListItem.length; i++) {
        const element = InputListItem[i];
        const options = {}
        DrawTextBox($(`#${element.name}`), new DxTextBoxOptions(options))
    }
}
Page.shipmentManagement.setContactPersonTextBox = function (data) {
    const options = {
        value: data
    }
    DrawTextBox($(`#contactPerson`), new DxTextBoxOptions(options))
}
Page.shipmentManagement.setContactNumberTextBox = function (data) {
    const options = {
        value: data
    }
    DrawTextBox($(`#contactNumber`), new DxTextBoxOptions(options))
}
Page.shipmentManagement.setDeliveryLocationTextBox = function (data) {
    const options = {
        value: data
    }
    DrawTextBox($(`#deliveryLocation`), new DxTextBoxOptions(options))
}
Page.shipmentManagement.setSerialNumberTextBox = function (data) {
    const options = {
        value: data
    }
    DrawTextBox($(`#serialNumber`), new DxTextBoxOptions(options))
}
Page.shipmentManagement.setFAXTextBox = function (data) {
    const options = {
        value: data
    }
    DrawTextBox($(`#fax`), new DxTextBoxOptions(options))
}
Page.shipmentManagement.setShipmentNumberTextBox = function () {
    const data = randomNumber()
    document.querySelector("#shipmentNumber input").value = data
}
Page.shipmentManagement.setClickButton = function () {
    const options = {
        text: '確認',
        icon: 'check',
        type: 'success',
        onClick: function () {
            let shippingDateValue = document.querySelector("#shippingDate input").value
            let shippingDate = new Date(shippingDateValue).valueOf();//字串轉時間戳(年月日時分毫秒)

            let companyName = document.querySelector("#companyName input").value
            let Name = document.querySelector("#contactPerson input").value
            let Phone = document.querySelector("#contactNumber input").value
            let GUINumber = document.querySelector("#serialNumber input").value
            let Address = document.querySelector("#deliveryLocation input").value
            let ShipNumber = document.querySelector("#shipmentNumber input").value
            let fax = document.querySelector("#fax input").value
            let orderNumber = document.querySelector("#orderNumber input").value
            let stockList = document.querySelector("#stockList  input").value

            let data = {
                data: {
                    ShipDate: shippingDate ? shippingDate : null,
                    CustomerID: companyName ? companyName : null,
                    Name: Name ? Name : null,
                    Phone: Phone ? Phone : null,
                    GUINumber: GUINumber ? GUINumber : null,
                    Address: Address ? Address : null,
                    ShipNumber: ShipNumber ? ShipNumber : null,
                    FAX: fax ? fax : null,
                    PurchaseNumber: orderNumber ? orderNumber : null,
                    WeightID: stockList ? stockList : null,

                },
                mode: 'insertOrder'
            }
            Ajax({
                customizedUrl: '/setData/shipmentManagement',
                data: data,
                success: function (r) {
                    notify("請求成功", "success", 2000);
                },
                warning: function (r) {
                    notify("請求失敗：資料請填寫齊全", "warning", 2000);
                },
                error: function (r) {
                    notify("請求失敗", "error", 2000);
                }
            })
        }
    }
    DrawButton($(`#onClick`), new DxButtonOptions(options))
}
