import Page from './page.js';
import { DrawDateBox, DxDateBoxOptions } from './dxDateBox.js';
import moment from 'moment';

Page.dateRange._init = function () {
    const now = moment().startOf('day').valueOf();
    const firstTime = moment(now).subtract(7, 'days').valueOf();
    const secondTime = moment(now).valueOf();

    const options = {
        acceptCustomValue: true,
        type: "datetime",
        value: firstTime,
        displayFormat: 'yyyy/MM/dd HH:mm',
        useMaskBehavior: true,
        elementAttr: {
            'data-mode': 'startTime',
        },
    };
    DrawDateBox($(`#${this.start}`),options);
    options.value = secondTime;
    options.elementAttr['data-mode'] = 'endTime';
    $(`#${this.end}`).DrawDateBox(options);
}
Page.dateRange.draw = function () {
    this.$panel = $panel;
    const html = `
    <div class="form-group">
        <div class="time__Box">
            <div class="time__title">開始</div>
            <div class="dx-field-value">
                <div id="${this.start}"></div>
            </div>
        </div>
        <div class="time__Box">
            <div class="time__title">結束</div>
            <div class="dx-field-value">
                <div id="${this.end}"></div>
            </div>
        </div>
    </div>`;
    //#endregion
    this.$panel.html(html).addClass('date-range');

    this.$start = this.$panel.find('input[data-type="start"]');
    this.$end = this.$panel.find('input[data-type="end"]');

    Panel.datagrid.choose.$inputGroupDate =
        this.$panel.find('.input-group.date');

    this._init();
}

Page.dateRange.get = function () {
    this.getTimeValue = function (id) {
        const time = $(`#${id}`).DrawDateBox('instance');
        const value = time.option('value');
        const timeValue = moment(value).valueOf();

        return timeValue;
    };
    let first = this.getTimeValue(this.start);
    let second = this.getTimeValue(this.end);

    if (first === second) {
        Alert.show('warning', '請選擇正確的時間範圍！');
        this.timeRange = false;
        return false;
    }
    if (!first || !second) {
        Alert.show('warning', '請選擇正確的時間格式！');
        this.timeRange = false;
        return false;
    }

    if (first > second) {
        [first, second] = [second, first]
    }
    return {
        start: first,
        end: second,
    };
}
Page.dateRange.clear = function () {
    console.log(this,"this clear")
}