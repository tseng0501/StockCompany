const Authority = [
    {
        "id": 1,
        "value": 1
    }, {
        "id": 2,
        "value": 2
    }
];

const StateId = [
    {
        "id": 0,
        "value": "啟用"
    }, {
        "id": 1,
        "value": "停用"
    }
]
const Columns = [
    {
        "id": "ID",
        "name": "No",
        "allowEditing": false
    }, {
        "id": "User",
        "name": "帳號",
    }, {
        "id": "Password",
        "name": "密碼",
    }, {
        "id": "Authority",
        "name": "權限",
    }, {
        "id": "Enable",
        "name": "啟用/停用",
    }
]
export { Authority, StateId, Columns }