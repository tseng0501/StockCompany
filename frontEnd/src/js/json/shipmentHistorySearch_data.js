const InputListItem = [
    {
        "id": 1,
        "value": "出貨單號",
        "name": "shipmentNumber",
        "type": "text",
        "content": "",
        "placeholder": "請輸入"
    }, {
        "id": 2,
        "value": "產品序號",
        "name": "productSerial",
        "type": "text",
        "content": "",
        "placeholder": "請輸入"
    }, {
        "id": 3,
        "value": "品名",
        "name": "number",
        "type": "text",
        "content": "",
        "placeholder": "請輸入"
    }, {
        "id": 4,
        "value": "顏色",
        "name": "color",
        "type": "text",
        "content": "",
        "placeholder": "請輸入"
    }, {
        "id": 5,
        "value": "客戶名稱",
        "name": "clientName",
        "type": "text",
        "content": "",
        "placeholder": "請輸入"
    }
]
const Columns = [
    {
        "id": "ShipID",
        "name": "No",
    }, {
        "id": "ShipNumber",
        "name": "出貨單號",
    }, {
        "id": "SerialID",
        "name": "產品序號",
    }, {
        "id": "ProductName",
        "name": "品名",
    }, {
        "id": "ColorName",
        "name": "顏色",
    }, {
        "id": "Company",
        "name": "客戶名稱",
    }, {
        "id": "ShipDate",
        "name": "出貨日期",
        "dataType": "date"
    }
]
const ShipHistoryDateRange = {
    "titleStart": "出貨日期",
    "titleEnd": "~"
}
export { InputListItem, Columns ,ShipHistoryDateRange}

