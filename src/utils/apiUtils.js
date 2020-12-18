export const API_KEY = '19e95cd0-aa24-4ae8-a74d-22197effa259';

const API_ROOT = 'https://content.guardianapis.com';

const apiKeyParam = {
    'api-key': API_KEY,
};

export const formatToDateWithSubtractedDays = (numberOfDays) => {
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - (numberOfDays ? numberOfDays : 0));
    return todayDate.toISOString().slice(0, 10);
};

export const convertParamsToString = (withDate, pageNumber, phrase) =>
    `?${new URLSearchParams({
        ...(withDate && { 'from-date': formatToDateWithSubtractedDays(30) }),
        ...(pageNumber && { page: pageNumber }),
        ...(phrase && phrase !== '' && { q: phrase }),
        ...apiKeyParam,
    }).toString()}`;

export const ApiUrls = {
    allNews: (pageNumber, phrase) =>
        `${API_ROOT}/search${convertParamsToString(true, pageNumber, phrase)}`,
    sections: `${API_ROOT}/sections${convertParamsToString()}`,
    newsBySection: (section, pageNumber, phrase) =>
        `${API_ROOT}/${section + convertParamsToString(true, pageNumber, phrase)}`,
};
