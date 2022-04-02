const ListItem = [
    {
        "id": 1,
        "value": "出貨日期",
        "name": "shippingDate",
    },
    {
        "id": 2,
        "value": "公司名稱",
        "name": "companyName",
    }, {
        "id": 3,
        "value": "聯絡人",
        "name": "contactPerson",
    }, {
        "id": 4,
        "value": "聯絡電話",
        "name": "contactNumber",
    }, {
        "id": 5,
        "value": "統一編號",
        "name": "serialNumber",
    }, {
        "id": 6,
        "value": "送達地點",
        "name": "deliveryLocation",
    }, {
        "id": 7,
        "value": "傳真號碼",
        "name": "fax",
    }, {
        "id": 8,
        "value": "出貨單號",
        "name": "shipmentNumber",
    }, {
        "id": 9,
        "value": "採購單號",
        "name": "orderNumber",
    },  {
        "id": 10,
        "value": "庫存清單",
        "name": "stockList",
    }
]

const StockListColumns = [
    {
        "id": "WeightID",
        "name": "No",
    }, {
        "id": "ProductName",
        "name": "品名",
    }, {
        "id": "ColorName",
        "name": "顏色",
    }, {
        "id": "BatchName",
        "name": "採購單號",
    }, {
        "id": "SerialID",
        "name": "序號",
    }, {
        "id": "Count",
        "name": "支數",
    }, {
        "id": "NetWeight",
        "name": "淨重",
    }, {
        "id": "ShipStatus",
        "name": "庫存",
        "lookup":true
    }
]

const InputListItem = [
    {
        "id": 1,
        "value": "聯絡人",
        "name": "contactPerson",
    }, {
        "id": 2,
        "value": "電話",
        "name": "contactNumber",
    }, {
        "id": 3,
        "value": "統一編號",
        "name": "serialNumber",
    }, {
        "id": 4,
        "value": "送達地點",
        "name": "deliveryLocation",
    }, {
        "id": 5,
        "value": "傳真號碼",
        "name": "fax",
    },{
        "id": 6,
        "value": "出貨單號",
        "name": "shipmentNumber",
    }, {
        "id": 7,
        "value": "採購單號",
        "name": "orderNumber",
    }
]
export { ListItem, StockListColumns, InputListItem }
