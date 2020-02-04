export const getUniqueId = () => {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export const getDateByTimestamp = timestamp => {
    const a = new Date(timestamp * 1000);
    const month = a.getMonth();
    const date = a.getDate();
    const time = date + '.' + month;
    return time;
}