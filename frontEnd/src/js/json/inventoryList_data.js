const DropDownListItem =[
    {
        "id": 1,
        "value": "品名",
        "name":"name"
    }, {
        "id": 2,
        "value": "顏色",
        "name":"color"
    }, {
        "id": 3,
        "value": "庫存/已出貨",
        "name":"stock"
    }
]
const InputListItem =[
    {
        "id": 3,
        "value": "序號",
        "name":"number",
        "type": "text",
        "content": "",
        "placeholder":"請輸入"
    }
]
const Columns = [
    {
        "id": "WeightID",
        "name": "No",
        "allowEditing":false
    }, {
        "id": "ProductName",
        "name": "品名",
        "allowEditing":false
    }, {
        "id": "ColorName",
        "name": "顏色",
        "allowEditing":false
    }, {
        "id": "BatchName",
        "name": "採購單號",
        "allowEditing":false
    }, {
        "id": "SerialID",
        "name": "序號",
        "allowEditing":false
    }, {
        "id": "Count",
        "name": "支數",
        "allowEditing":false
    }, {
        "id": "NetWeight",
        "name": "淨重",
        "allowEditing":false
    }, {
        "id": "ShipStatus",
        "name": "庫存/已出貨",
        "lookup":true
    }
]
export {DropDownListItem,InputListItem,Columns}