import { ApiUrls } from './apiUtils';

export const getAllNews = async (pageNumber, phrase) =>
    await fetch(ApiUrls.allNews(pageNumber, phrase), {
        method: 'GET',
    })
        .then(response => response.json())
        .then(response => response.response)
        .catch(handleError);

export const getSections = async () =>
    await fetch(ApiUrls.sections, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(response => response.response)
        .catch(handleError);

export const getNewsBySection = async (section, pageNumber, phrase) =>
    await fetch(ApiUrls.newsBySection(section, pageNumber, phrase), {
        method: 'GET',
    })
        .then(response => response.json())
        .then(response => response.response)
        .catch(handleError);

const handleError = error =>
    error?.response?.status && alert(`Error occured when getting data. Status code ${error.response.status}`);
