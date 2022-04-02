'use strict';
import DataGrid from "devextreme/ui/data_grid"
/** DevExtreme DataGrid 設定格式 */
class DxDataGridOptions {
    /**
     * @param {Object}  options                                 設定
     * @param {Array.<{}>} options.columns                      Table 欄位資訊定義
     * @param {Array.<{}>} options.dataSource                   Table 資料來源
     * @param {Object}  options.editing                         Table 編輯設定
     * @param {Boolean} options.editing.allowAdding             Table 新增Row
     * @param {Boolean} options.editing.allowDeleting           Table 刪除Row
     * @param {Boolean} options.editing.allowUpdating           Table 編輯Row
     * @param {String}  options.editing.mode                    Table 編輯模式 'Batch' | 'Popup'
     * @param {Object}  options.editing.form                    Form 顯示設定
     * @param {Array.<{}>} options.editing.form.items           Form 編輯介面設定
     * @param {Boolean} options.editing.form.showColonAfterLabel  Form 中的 Label 是否顯示冒號
     * @param {Object}  options.editing.popup                   Popup 設定
     * @param {Boolean} options.editing.popup.fullScreen        Popup 全螢幕顯示
     * @param {String}  options.editing.popup.title             Popup 標題
     * @param {String}  options.editing.popup.height            Popup 高度
     * @param {String}  options.editing.popup.widget            Popup 寬度
     * @param {String}  options.editing.popup.minHeight         Popup 最小高度
     * @param {String}  options.editing.popup.minWidth          Popup 最小寬度
     * @param {String}  options.editing.popup.maxHeight         Popup 最大高度
     * @param {String}  options.editing.popup.maxWidth          Popup 最大寬度
     * @param {String}  options.editing.startEditAction         雙擊編輯（Batch模式）
     * @param {Boolean} options.editing.useIcons                圖示
     * @param {String}  options.height                          Table 高度
     * @param {String}  options.noDataText                      無資料時顯示的文字
     * @param {String}  options.tableTitle                      Table 標題
     * @param {Object}  options.toolbar                         工具列設定
     * @param {Boolean} options.toolbar.browsePath              瀏覽路徑顯示
     * @param {String}  options.toolbar.browsePathText          瀏覽路徑內容
     * @param {Boolean} options.toolbar.tableTitle              表格標題顯示
     * @param {String}  options.toolbar.tableTitleText          表格標題內容
     * @param {Boolean} options.toolbar.uploadButton            上傳CSV按鈕
     * @param {String}  options.toolbar.uploadButtonLocation    上傳CSV按鈕顯示位置 'before' | 'center' | 'after'
     * @param {String[]}options.toolbar.uploadCheckTableHead    確認上傳CSV的表頭
     * @param {Boolean} options.toolbar.exportButton            匯出CSV按鈕
     * @param {Function}options.onCellDblClick                  雙擊欄位時觸發事件
     * @param {Function}options.onEditorPreparing               編輯時觸發事件
     * @param {Function}options.onInitNewRow                    新增Row時初始化
     * @param {Function}options.onRowDblClick                   雙擊Row執行
     * @param {Function}options.onSave                          儲存變更
     * @param {Object}  options.paging                          分頁頁籤設定
     * @param {Number}  options.paging.pageSize                 每頁顯示筆數 0:不分頁
     * @param {Boolean} options.paging.showInfo                 顯示頁籤資訊
     * @param {String}  options.paging.infoText                 設定頁籤資訊顯示方式
     * @param {Object}  options.pager                           分頁筆數調整功能設定
     * @param {Boolean} options.pager.showPageSizeSelector      是否顯示分頁筆數調整
     * @param {Number[]}options.pager.allowedPageSizes          調整顯示筆數的清單
     * @param {Object}  options.searchPanel                     搜尋內容
     * @param {Boolean} options.searchPanel.visible             是否要搜尋
     * @param {String} options.searchPanel.placeholder          是否要搜尋
     * @param {Number} options.searchPanel.width                搜尋框長度
     * @param {Function} options.onRowUpdating                  更新行之前執行的函數
     * @param {Function} options.onRowRemoving                  刪除行之前執行的函數
     * @param {Function} options.onRowInserting                 新增行之前執行的函數
     * @param {Function} options.onSelectionChanged             在選擇一行或清除其選擇後執行的功能
     * @param {Array<any>} options.selectedRowKeys              允許您選擇行或確定選擇了哪些行
     * @param {Object} options.selection                        配置運行時選擇
     * @param {String} options.mode                             指定選擇模式   'multiple' | 'none' | 'single'
     * @param {Object} options.summary                          網格摘要的屬性
     * @param {Array.<{}>} options.summary.totalItems           指定總匯總的項目
     * @param {String} options.summary.totalItems.column        指定為匯總項目提供數據的列
     * @param {String} options.summary.totalItems.alignment     指定匯總項的對齊方式
     * @param {String} options.summary.totalItems.summaryType   指定如何聚合總計匯總項的數據
     * 
     */
    constructor(options = {}) {
        this.columns = (options.columns || []);
        this.dataSource = (options.dataSource || []);


        options.searchPanel = (options.searchPanel || {});
        this.searchPanel = {
            visible: (options.searchPanel.visible !== undefined ? options.searchPanel.visible : false),
            placeholder: (options.searchPanel.placeholder !== undefined ? options.searchPanel.placeholder : '搜尋關鍵字'),
            width: (options.searchPanel.width !== undefined ? options.searchPanel.width : 240),
        }

        options.editing = (options.editing || {});
        options.editing.form = (options.editing.form || {});
        options.editing.popup = (options.editing.popup || {});
        this.editing = {
            allowAdding: (options.editing.allowAdding !== undefined ? options.editing.allowAdding : true),
            allowDeleting: (options.editing.allowDeleting !== undefined ? options.editing.allowDeleting : true),
            allowUpdating: (options.editing.allowUpdating !== undefined ? options.editing.allowUpdating : true),
            mode: (options.editing.mode || 'popup'),
            form: {
                items: (options.editing.form.items || undefined),
                showColonAfterLabel: (options.editing.form.showColonAfterLabel || false),
            },
            popup: {
                fullScreen: (options.editing.popup.fullScreen || false),
                title: (options.editing.popup.title || '設定'),
                height: (options.editing.popup.height || '50%'),
                width: (options.editing.popup.width || '50%'),
                minHeight: (options.editing.popup.minHeight || '25rem'),
                minWidth: (options.editing.popup.minWidth || '30rem'),
                maxHeight: (options.editing.popup.maxHeight || '90%'),
                maxWidth: (options.editing.popup.maxWidth || '90%'),
            },
            startEditAction: (options.editing.startEditAction || 'dblClick'),
            useIcons: (options.editing.useIcons || true),
        };

        this.height = (options.height || '');
        this.noDataText = (options.noDataText || '尚未有任何資料');

        options.toolbar = (options.toolbar || {});
        this.toolbar = {
            browsePath: (options.toolbar.browsePath || false),
            browsePathText: (options.toolbar.browsePathText || ''),
            tableTitle: (options.toolbar.tableTitle || false),
            tableTitleText: (options.toolbar.tableTitleText || 'Table Title'),
            uploadButton: (options.toolbar.uploadButton || false),
            uploadButtonLocation: (options.toolbar.uploadButtonLocation || 'before'),
            uploadCheckTableHead: (options.toolbar.uploadCheckTableHead || []),
            exportButton: (options.toolbar.exportButton || false),
        }

        this.onCellDblClick = (options.onCellDblClick || null);
        this.onEditorPreparing = (options.onEditorPreparing || null);
        this.onInitNewRow = (options.onInitNewRow || null);
        this.onRowDblClick = (options.onRowDblClick || null);
        this.onSave = (options.onSave || null);

        options.paging = (options.paging || {});
        options.pager = (options.pager || {});
        this.pager = {};
        this.paging = {
            pageSize: (options.paging.pageSize || 20),
        }
        if (this.paging.pageSize !== 0) {
            this.pager.showInfo = (options.paging.showInfo || true);
            this.pager.infoText = (options.paging.infoText ||
                'Page {0} of {1} (每頁' + this.paging.pageSize + '筆，共 {2} 筆資料)');
        }

        this.pager.showPageSizeSelector = (options.pager.showPageSizeSelector || false);
        if (this.pager.showPageSizeSelector) {
            this.pager.allowedPageSizes = (options.pager.allowedPageSizes || [5, 10, 15, 20]);
        }
        this.onRowUpdating = (options.onRowUpdating || null);
        this.onRowRemoving = (options.onRowRemoving || null);
        this.onRowInserting = (options.onRowInserting || null);
        this.onSelectionChanged = (options.onSelectionChanged || null);
        this.selectedRowKeys = (options.selectedRowKeys || null)

        options.summary = (options.summary || {});
        options.summary.totalItems = (options.summary.totalItems || {});

        options.selection = (options.selection || {});
        this.selection = {
            mode: (options.selection.mode || 'none')
        }

        this.summary = {
            totalItems: [{
                column: (options.summary.totalItems.column || null),
                alignment: (options.summary.totalItems.alignment || 'left'),
                summaryType: (options.summary.totalItems.summaryType || 'count'),
            }],
        }

    }
}

/** 繪製 DevExtreme DataGrid
 * @param {jQuery}              $panel  被繪製的jQuery元件
 * @param {DxDataGridOptions}   options DevExtreme DataGrid 設定資訊
 * @returns 如果錯誤回傳false
 */
function DrawDataGrid($panel, options) {
    if ($panel === null) {
        console.log('缺少 $panel.');

        return false;
    }
    $panel.dxDataGrid({
        allowColumnResizing: true,
        hoverStateEnabled: true,
        columnAutoWidth: true,
        columns: options.columns,
        dataSource: (typeof options.dataSource === 'function' ? options.dataSource() : options.dataSource),
        paging: {
            pageSize: options.pageSize
        },
        searchPanel: {
            visible: options.searchPanel.visible,
            placeholder: options.searchPanel.placeholder,
            width: options.searchPanel.width
        },
        editing: {
            allowUpdating: options.editing.allowUpdating,
            allowDeleting: options.editing.allowDeleting,
            allowAdding: options.editing.allowAdding,
            form: options.editing.form,
            mode: options.editing.mode,
            popup: {
                fullScreen: options.editing.popup.fullScreen,
                title: options.editing.popup.title,
                height: options.editing.popup.height,
                width: options.editing.popup.width,
                maxHeight: options.editing.popup.maxHeight,
                maxWidth: options.editing.popup.maxWidth,
                minHeight: options.editing.popup.minHeight,
                minWidth: options.editing.popup.minWidth,
                position: {
                    my: 'center',
                    at: 'center',
                    of: $panel.parent(),
                },
                showTitle: true,
            },
            startEditAction: options.editing.startEditAction,
            texts: {
                addRow: '新增一筆',
                cancelAllChanges: '放棄變更',
                cancelRowChanges: '取消',
                confirmDeleteMessage: '確定要刪除這筆資料嗎？',
                deleteRow: '刪除這筆資料',
                saveAllChanges: '儲存變更',
                saveRowChanges: '儲存',
                undeleteRow: '取消刪除',
            },
            useIcons: options.editing.useIcons,
        },
        //資料匯出
        export: {
            enabled: options.toolbar.exportButton,
            texts: {
                exportAll: '匯出為Xls檔',
            }
        },
        height: options.height,
        filterRow: {
            operationDescriptions: {
                between: '數值範圍',
                contains: '包含',
                endsWith: '符合字尾',
                equal: '完全相同',
                greaterThan: '大於',
                greaterThanOrEqual: '大於或等於',
                lessThan: '小於',
                lessThanOrEqual: '小於或等於',
                notContains: '不包含',
                notEqual: '完全不同',
                startsWith: '符合字首',
            },
            betweenEndText: '結束值',
            betweenStartText: '起始值',
            resetOperationText: '重置搜尋',
            visible: false,
            showAllText: '全部',
        },
        selection: {
            mode: options.selection.mode
        },
        showBorders: true,
        sorting: {
            clearText: '清除',
            ascendingText: '升序',
            descendingText: '降序',
        },
        noDataText: options.noDataText,
        onCellDblClick: options.onCellDblClick,
        //匯出Xls
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('My Sheet');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'data.xlsx');
                });
            });
            e.cancel = true;
        },
        onEditorPreparing: options.onEditorPreparing,
        onInitNewRow: options.onInitNewRow,
        onRowUpdating: options.onRowUpdating,
        onRowRemoving: options.onRowRemoving,
        onRowDblClick: options.onRowDblClick,
        onRowInserting: options.onRowInserting,
        onSelectionChanged: options.onSelectionChanged,
        selectedRowKeys: options.selectedRowKeys,
        paging: {
            pageSize: options.paging.pageSize,
        },
        pager: {
            allowedPageSizes: options.pager.allowedPageSizes,
            infoText: options.pager.infoText,
            showPageSizeSelector: options.pager.showPageSizeSelector,
            showInfo: options.pager.showInfo,
        },
        summary: {
            totalItems: [{
                column: options.summary.totalItems.column,
                alignment: options.summary.totalItems.alignment,
                summaryType: options.summary.totalItems.summaryType,
            }]
        }
    });
    return $panel;
}

export { DrawDataGrid, DxDataGridOptions }