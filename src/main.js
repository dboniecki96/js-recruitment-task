import './styles/main.css';
import { getAllNews, getNewsBySection, getSections } from './utils/newsService';
import { loadingInfo, renderPages, renderReadLaterList, renderResults, renderSections } from './utils/renderListItems';
import { addDataToReadLaterList, readLaterListAsArray, removeDataFromReadLaterList } from './utils/readLaterStorage';

export const ADD_READ_LATER = 'add-read-later';
export const REMOVE_READ_LATER = 'remove-add-later';

let state = {
    currentPage: 1,
};

const setState = (data) => {
    state = { ...state, ...data };
};

const handleApiCallsWithStateParams = (params) => {
    setState(params);
    const { phrase, currentPage, section } = state;
    const newsListEl = document.getElementsByClassName('newsList')[0];
    newsListEl.innerHTML = loadingInfo;
    if (!section || section === 'all') {
        getAllNews(currentPage, phrase).then(handleResponse);
    } else {
        getNewsBySection(section, currentPage, phrase).then(handleResponse);
    }
};

const handleResponse = (response) => {
    const { currentPage, section, results, pages } = response;
    setState({
        currentPage, results, pages, section: section?.id,
    });
    renderPages(pages, currentPage);
    renderResults(state.results, () => {
        const loadingItem = document.getElementById('loading');
        if (loadingItem) loadingItem.remove();
    });
};

//Handle when DOM loaded (get all news on start)

document.addEventListener('DOMContentLoaded', () => {
    getAllNews(state.currentPage, state.phrase).then(handleResponse);
    getSections().then(renderSections);
    const readLaterArray = readLaterListAsArray();
    if (readLaterArray?.length) {
        renderReadLaterList();
    }
});

//DOM Event Listeners

document.getElementById('sectionSelect').addEventListener('change', (event) => {
    handleApiCallsWithStateParams({
        section: event.target.value,
    });
});

document
    .getElementById('newsContentSearch')
    .addEventListener('change', (event) => {
        handleApiCallsWithStateParams({
            phrase: event.target.value,
        });
    });

document
    .getElementById('activePageSelect')
    .addEventListener('change', (event) => {
        handleApiCallsWithStateParams({
            currentPage: event.target.value,
        });
    });

document.addEventListener('click', (event) => {
    const { id } = event.target;
    const [firstPart, newsId] = id.split('_');
    if (firstPart === ADD_READ_LATER) {
        const resultById = state.results.find((result) => result.id === newsId);
        addDataToReadLaterList(resultById);
    }
    if (firstPart === REMOVE_READ_LATER) {
        removeDataFromReadLaterList(newsId);
    }
});
