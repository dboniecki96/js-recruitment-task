import { ADD_READ_LATER, REMOVE_READ_LATER } from '../main';

export const loadingInfo = '<li id="loading">Loading...</li>';
const itemsNotFoundInfo = '<li class="items-not-found">Items not found</li>';

const listItem = (
    title,
    section,
    publicationDate,
    webUrl,
    id,
) => `<article class='news'>
        <header>
            <h3>${title}</h3>
        </header>
        <section class='newsDetails'>
            <ul>
                <li><strong>Section Name:</strong> ${section}</li>
                <li><strong>Publication Date:</strong> ${new Date(publicationDate).toLocaleString()}</li>
            </ul>
        </section>
        <section class='newsActions'>
            <a href='${webUrl}' class='button'>Full article</a>
            <button class='button button-outline' id='${ADD_READ_LATER}_${id}'>Read Later</button>
        </section>
    </article>`;

const readLaterItem = (
    title,
    url,
    id,
) => `<h4 class='readLaterItem-title'>${title}</h4>
      <section>
          <a href='${url}' class='button button-clear'>Read</a>
          <button class='button button-clear' id='${REMOVE_READ_LATER}_${id}'>Remove</button>
      </section>`;

export const renderReadLaterList = () => {
    const readLaterArray = JSON.parse(sessionStorage.getItem('readLater'));
    const ul = document.getElementsByClassName('readLaterList')[0];

    ul.innerHTML = '';
    readLaterArray.forEach((item) => {
        const { webTitle, webUrl, id } = item;
        const itemForRender = document.createElement('li');
        itemForRender.innerHTML = readLaterItem(webTitle, webUrl, id);
        ul.appendChild(itemForRender);
    });
};

export const renderResults = (results, isRendered) => {
    const ul = document.getElementsByClassName('newsList')[0];

    results.forEach((result) => {
        const { webTitle, sectionName, webPublicationDate, webUrl, id } = result;
        const itemForRender = document.createElement('li');
        itemForRender.innerHTML = listItem(
            webTitle,
            sectionName,
            webPublicationDate,
            webUrl,
            id,
        );
        ul.appendChild(itemForRender);
    });

    if (!results.length) ul.innerHTML = itemsNotFoundInfo;
    isRendered();
};

export const renderPages = (pages, currentPage) => {
    const pageSelect = document.getElementById('activePageSelect');
    pageSelect.innerHTML = '';
    for (let i = 1; i <= pages; i++) {
        const option = document.createElement('option');
        option.value = String(i);
        option.innerHTML = String(i);
        pageSelect.appendChild(option);
    }
    pageSelect.value = currentPage;
};

export const renderSections = (response) => {
    const { results } = response;
    const sectionSelect = document.getElementById('sectionSelect');
    const allOption = document.createElement('option');

    sectionSelect.innerHTML = '';
    allOption.value = 'all';
    allOption.innerHTML = 'All';
    sectionSelect.appendChild(allOption);

    results.forEach(result => {
        const { id, webTitle } = result;
        const option = document.createElement('option');
        option.value = id;
        option.innerHTML = webTitle;
        sectionSelect.appendChild(option);
    });
};
