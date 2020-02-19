export const getUniqueId = () => {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export const getDateByTimestamp = timestamp => {
    const a = new Date(timestamp);
    const month = a.getMonth() + 1;
    const date = a.getDate();
    const time = (date < 10 ? '0' + date : date) + '.' + (month < 10 ? '0' + month : month);
    return time;
}