import { dayjs } from "element-plus";

// 生成uuid
export function uuid(len: number, radix: number) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

export function formatDate(date: number) {
    return dayjs(date).format("YYYY/MM/DD HH:mm")
}

export function formatDate2(date: number) {
    return dayjs(date).format("YYYY/MM/DD")
}

// 过期时间
export function getExpireTime(time: number) {
    // time是预计过期时间,返回的是还剩余几天几小时几分几秒
    return dayjs(dayjs()).diff(time, 'day') + '天' + dayjs(dayjs()).diff(time, 'hour') % 24 + '小时' + dayjs(dayjs()).diff(time, 'minute') % 60 + '分' + dayjs(dayjs()).diff(time, 'second') % 60 + '秒'
}


export function highText(
    text: string,
    high: string,
    ...classes: string[]
): string {
    const template = `<span style="color:red" class="${classes.join(
        ' ',
    )}">${high}</span>`;
    const myReg = new RegExp(high, 'g');
    const result = text.replace(myReg, template);
    return result;
}

/**
 * "顺丰速运",
    "EMS（邮政速递）",
    "圆通速递",
    "中通快递",
    "韵达快递",
    "申通快递",
    "百世快递",
    "天天快递",
    "京东物流",
    "快捷快递",
    "德邦物流",
    "邮政快递包裹",
    "优速快递",
    "全峰快递",
    "汇通快递",
    "宅急送",
    "安能物流",
    "如风达快递",
    "速尔快递",
    "安鲜达快递",
    "易迅快递",
    "德邦快递",
    "速腾快递",
    "瑞丰速递",
    "飞豹快递",
    "希伊艾斯快递",
    "万象物流",
    "韵达电商",
    "中铁快运",
    "比利时邮政",
    "极兔快递"
 */
export const expressCompanies = [
    { text: '顺丰速运', value: '顺丰速运' },
    { text: 'EMS（邮政速递）', value: 'EMS（邮政速递）' },
    { text: '圆通速递', value: '圆通速递' },
    { text: '中通快递', value: '中通快递' },
    { text: '韵达快递', value: '韵达快递' },
    { text: '申通快递', value: '申通快递' },
    { text: '百世快递', value: '百世快递' },
    { text: '天天快递', value: '天天快递' },
    { text: '京东物流', value: '京东物流' },
    { text: '快捷快递', value: '快捷快递' },
    { text: '德邦物流', value: '德邦物流' },
    { text: '邮政快递包裹', value: '邮政快递包裹' },
    { text: '优速快递', value: '优速快递' },
    { text: '全峰快递', value: '全峰快递' },
    { text: '汇通快递', value: '汇通快递' },
    { text: '宅急送', value: '宅急送' },
    { text: '安能物流', value: '安能物流' },
    { text: '如风达快递', value: '如风达快递' },
    { text: '速尔快递', value: '速尔快递' },
    { text: '安鲜达快递', value: '安鲜达快递' },
    { text: '易迅快递', value: '易迅快递' },
    { text: '德邦快递', value: '德邦快递' },
    { text: '速腾快递', value: '速腾快递' },
    { text: '瑞丰速递', value: '瑞丰速递' },
    { text: '飞豹快递', value: '飞豹快递' },
    { text: '希伊艾斯快递', value: '希伊艾斯快递' },
    { text: '万象物流', value: '万象物流' },
    { text: '韵达电商', value: '韵达电商' },
    { text: '中铁快运', value: '中铁快运' },
    { text: '比利时邮政', value: '比利时邮政' },
    { text: '极兔快递', value: '极兔快递' },
];