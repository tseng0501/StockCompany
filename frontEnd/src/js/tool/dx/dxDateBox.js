import UUID from '../UUID.js';
import moment from 'moment';

class dateRange {

    /**
        * @param {object}  options 
        * @param {string}  options.format      日期與時間顯示的格式.
        * @param {string}  options.value      日期與時間顯示的格式.
        * @param {number}  options.startDate   開始的日期與時間
        * @param {number}  options.endDate     結束的日期與時間
        * @param {boolean} options.acceptCustomValue     
        * @param {string}  options.type        日期類型
        * @param {string}  options.displayFormat     日期格式
        * @param {boolean} options.useMaskBehavior     是否需要直接修改
        */
    constructor(options = {}) {

        this._id = UUID.v4();
        this.start = 'timeStart-' + this._id;
        this.end = 'timeEnd-' + this._id;
        this.value = (options.value || '');

        this.acceptCustomValue = (options.acceptCustomValue || true);
        this.type = (options.type || 'date');
        this.displayFormat = (options.displayFormat || 'yyyy/MM/dd');
        this.useMaskBehavior = (options.useMaskBehavior || true);

    }
    _init(historyReportInclude_time) {
        const now = moment().startOf('day').valueOf();
        const firstTime = moment(now).subtract(7, 'days').valueOf();
        const secondTime = moment(now).valueOf();

        const options = {
            value: firstTime,
            displayFormat: 'yyyy/MM/dd',
            elementAttr: {
                'data-mode': 'startTime',
            },
        };

        $(`#${this.start}`).dxDateBox(options);
        if (!historyReportInclude_time) {
            options.value = secondTime;
            options.elementAttr['data-mode'] = 'endTime';
            $(`#${this.end}`).dxDateBox(options);
        }
    }
    draw($panel, data) {
        this.$panel = $panel;
        const html = `
            <div class="time_Box">
                <div class="time_title">${data === undefined ? '開始' : data.titleStart}</div>
                    <div id="${this.start}"></div>
            </div>
            <div class="time_Box">
                <div class="time_title">${data === undefined ? '結束' : data.titleEnd}</div>
                    <div id="${this.end}"></div>
            </div>
        `;
        //#endregion
        this.$panel.html(html).addClass('date-range');
        this.$start = this.$panel.find('input[data-type="start"]');
        this.$end = this.$panel.find('input[data-type="end"]');

        this._init();
    }

    get() {
        this.getTimeValue = function (id) {
            const time = $(`#${id}`).dxDateBox('instance');
            const value = time.option('value');
            const timeValue = moment(value).valueOf();

            return timeValue;
        };
        let first = this.getTimeValue(this.start);
        let second = this.getTimeValue(this.end);
        let now = moment().startOf('day').valueOf();

        var getFirstValue = new Date(first)
        let getFirstMonth = getFirstValue.getMonth() + 1

        var getEndValue = new Date(second)
        let getEndMonth = getEndValue.getMonth() + 1

        if(getEndMonth - getFirstMonth > 3){
            notify("時間間隔不能大於3個月", "warning", 2000);
            return false;
        }
        if (first === second) {
            notify("請選擇正確的時間範圍！", "warning", 2000);
            return false;
        }
        if (!first || !second) {
            notify("請選擇正確的時間格式！", "warning", 2000);
            return false;
        }

        if (first > second) {
            [first, second] = [second, first]
        }
        if (first > now || second > now) {
            notify("超過目前時間！", "warning", 2000);
            return false;
        }

        return {
            start: first,
            end: second,
        };
    }
}

export default dateRange
