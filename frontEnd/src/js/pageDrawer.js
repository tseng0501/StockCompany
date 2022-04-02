import Page from "./page.js";
import LocalStorage from '../js/tool/localStorage.js';
import Menu from "devextreme/ui/menu";
Page.pageDrawer = {};
Page.pageDrawer.oldId = null
Page.pageDrawer.draw = function (r,user) {
    let data = r
    let config = new LocalStorage('config');
    config = config.get();
    data = data.map((x) => {
        const newItem = {};

        if (x.enable == true) {
            newItem.id = x.id;
            newItem.text = x.text;
            newItem.mode = x.mode;
            newItem.icon = x.icon;
            newItem.items = x.items;
            newItem.url = x.url;

            newItem.items?.map((historyItem) => {
                const newhistoryItem = {}

                if (historyItem.enable == true) {
                    newhistoryItem.id = historyItem.id
                    newhistoryItem.text = historyItem.text
                    newhistoryItem.mode = historyItem.mode
                    newhistoryItem.icon = historyItem.icon
                    newhistoryItem.url = historyItem.url;
                }
                return newhistoryItem
            })
        }
        return newItem
    })
    var newData = data.filter(value => Object.keys(value).length !== 0).map((group) => {

        return { ...group, items: group.items?.filter(value => value.enable) }
    })

    $("#Menu").dxMenu({
        dataSource: newData,
        onItemClick: function (data) {
            Page.pageDrawer.resetMainContentHtml();
            Page.pageDrawer.currentPage(data)
            const mode = data.itemData.mode;
            
            switch (mode) {
                case 'AccountManagement':
                    Page.accountManagement.draw(mode,config);
                    break;
                case 'CustomerList':
                    Page.customerList.draw(mode,config);
                    break;
                case 'InventoryList':
                    Page.inventoryList.draw(mode,config)
                    break;
                case 'ShipmentManagement':
                    Page.shipmentManagement.draw(mode,config)
                    break;
                case 'ShipmentHistorySearch':
                    Page.shipmentHistorySearch.draw(mode,config)
                    break;
                default:
            }
            Page.pageDrawer.oldId = data.itemData.mode
        }
    }).dxMenu("instance");
    let firstMode = newData[0].mode;
    if(user =="view"){
        Page.customerList.draw("CustomerList",config)

    }else{
        Page.accountManagement.draw(firstMode,config)
    }
}
Page.pageDrawer.currentPage = function (data) {
    //當前頁面
    data.element.find('.dx-menu-item').css('background-color', 'transparent');  
    data.itemElement.closest('.dx-menu-item').css('background-color', 'cornsilk');  
    data.itemElement.closest('.dx-menu-item').css('border-radius', '.5rem'); 
}
Page.pageDrawer.resetMainContentHtml = function () {
    Page.clear();
}
