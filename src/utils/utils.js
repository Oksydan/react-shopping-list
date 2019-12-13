export const getUniqueId = function () {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};