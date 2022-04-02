import Page from './page.js';
import { DrawButton, DxButtonOptions } from './tool/dx/dxButton.js';
import { DrawDataGrid, DxDataGridOptions } from './tool/dx/dxDataGrid.js';
import dateRange from './tool/dx/dxDateBox.js';
import Ajax from './tool/ajax.js';
import { InputListItem, Columns, ShipHistoryDateRange } from './json/shipmentHistorySearch_data.js';
import notify from 'devextreme/ui/notify';

Page.shipmentHistorySearch = {};
Page.shipmentHistorySearch.draw = function (mode, config) {

    Page.shipmentHistorySearch.drawInputListHtml(mode)
    Page.shipmentHistorySearch.drawHtml(mode)
    Page.shipmentHistorySearch.drawDateRange()
    Page.shipmentHistorySearch.drawSearchButton(mode)
    Page.shipmentHistorySearch.drawClearSelectionButton(mode)
}
Page.shipmentHistorySearch.drawInputListHtml = function (mode) {
    let maininputhtml = '';

    for (let i = 0; i < InputListItem.length; i++) {
        const element = InputListItem[i];
        maininputhtml += `
        <div class="input-group-name" data-id="${element.name}">
                <span class="input-title">${element.value}</span>
                <input type="${element.type}" class="form-control ${element.name}" 
                    aria-label="${element.name}" value="${element.content}"
                    placeholder="${element.placeholder}">
        </div>
        `
    }
    this.maininputhtml = `${maininputhtml}`
}
Page.shipmentHistorySearch.drawHtml = function (mode) {
    const html = `
        <div id="${mode}">
                <div id="${mode}Filter">
                    ${this.maininputhtml}
                    <div class="timeContent"></div>
                    <div class="inventoryblock">
                        <div id="gridSearch" class="displaybtn"></div>
                        <div id="gridClearSelection" class="displaybtn"></div>
                    </div>
                </div>
            <div id="${mode}Panel">
                <div id="gridContainer"></div>
            </div>
        </div>`;
    Page.$panel.html(html);

    this.$gridSearch = $("#gridSearch")
    this.$gridClearSelection = $("#gridClearSelection")
    this.$gridContainer = $("#gridContainer")
    this.$shipmentNumber = document.querySelector("#ShipmentHistorySearchFilter .shipmentNumber")
    this.$productSerial = document.querySelector("#ShipmentHistorySearchFilter .productSerial")
    this.$number = document.querySelector("#ShipmentHistorySearchFilter .number")
    this.$color = document.querySelector("#ShipmentHistorySearchFilter .color")
    this.$clientName = document.querySelector("#ShipmentHistorySearchFilter .clientName")
    this.$timeContent = $(".timeContent")

}
Page.shipmentHistorySearch.drawDateRange = function () {
    this.dateRange = new dateRange();
    this.dateRange.draw(this.$timeContent, ShipHistoryDateRange);
}
Page.shipmentHistorySearch.drawSearchButton = function (mode) {
    const date = this.dateRange
    const options = {
        text: "搜尋",
        type: 'default',
        onClick: function () {
            let shipmentNumber = Page.shipmentHistorySearch.$shipmentNumber.value
            let productSerial = Page.shipmentHistorySearch.$productSerial.value
            let number = Page.shipmentHistorySearch.$number.value
            let color = Page.shipmentHistorySearch.$color.value
            let clientName = Page.shipmentHistorySearch.$clientName.value
            let dateRange = date.get()

            if (!dateRange) {
                $("#gridContainer").addClass('d-none')
                return false;
            }
            let data = {
                data: {
                    ShipNumber: shipmentNumber ? shipmentNumber : null,
                    SerialID: productSerial ? productSerial : null,
                    ProductName: number ? number : null,
                    ColorName: color ? color : null,
                    Company: clientName ? clientName : null,
                    dateRange: dateRange
                },
                mode: mode
            }
            Ajax({
                customizedUrl: '/getData/shipmentHistorySearchList',
                data: data,
                success: function (r) {
                    Page.shipmentHistorySearch.setColumns()
                    Page.shipmentHistorySearch.drawDataGrid(r, mode)
                    $("#gridContainer").removeClass('d-none')

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
Page.shipmentHistorySearch.drawClearSelectionButton = function () {

    const options = {
        stylingMode: "contained",
        type: "normal",
        text: "重置",
        icon: "refresh",
        onClick: function () {
            Page.shipmentHistorySearch.$shipmentNumber.value = null
            Page.shipmentHistorySearch.$productSerial.value = null
            Page.shipmentHistorySearch.$number.value = null
            Page.shipmentHistorySearch.$color.value = null
            Page.shipmentHistorySearch.$clientName.value = null
            Page.shipmentHistorySearch.clear()
        }
    };
    this.$dxbutton = DrawButton(this.$gridClearSelection, new DxButtonOptions(options))
}
Page.shipmentHistorySearch.setColumns = function () {
    this._columns = []
    for (let i = 0; i < Columns.length; i++) {
        const element = Columns[i];
        if (element.dataType) {
            this._columns.push({
                dataField: element.id,
                caption: element.name,
                alignment: 'center',
                dataType: element.dataType,
                format: 'yyyy/MM/dd'
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
Page.shipmentHistorySearch.drawDataGrid = function (data, mode) {
    const options = {
        dataSource: data,
        editing: {
            allowAdding: false,
            allowDeleting: false,
            allowUpdating: false,
        },
        columns: this._columns,
        paging: {
            pageSize: 15
        },
        searchPanel: {
            visible: true,
        },
    }
    this.$datagrid = DrawDataGrid(this.$gridContainer, new DxDataGridOptions(options))
    this.$dxDataGrid = this.$datagrid.dxDataGrid('instance');
}
Page.shipmentHistorySearch.clear = function () {
    if (this.$dxDataGrid) {
        this.$dxDataGrid.refresh()
    }
    $("#gridContainer").addClass('d-none')
}