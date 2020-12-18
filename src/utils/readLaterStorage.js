import { renderReadLaterList } from './renderListItems';

export const readLaterListAsArray = () =>
    JSON.parse(sessionStorage.getItem('readLater'));

export const addDataToReadLaterList = (data) => {
    if (!data) return;
    const arr = readLaterListAsArray();

    if (arr?.find((item) => item.id === data.id)) {
        alert('Article already included in Read Later news');
    } else {
        sessionStorage.setItem('readLater', JSON.stringify(!arr ? [data] : [...arr, data]));
        renderReadLaterList();
    }
};

export const removeDataFromReadLaterList = (id) => {
    const arr = readLaterListAsArray();

    sessionStorage.setItem('readLater', JSON.stringify(arr.filter((item) => item.id !== id)));
    renderReadLaterList();
};
