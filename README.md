# JS Recruitment Task

## Description

We would like you to create an application that will display display list of news fetched from The Guardian. You should use their API, which can be found here: [https://open-platform.theguardian.com/](https://open-platform.theguardian.com/)

Goal of this task is to check you JavaScript knowledge so please don't use any additional libraries, you can use `fetch` for http requests.

We have provided sample html + css styling, so you can focus on writing JS code.

## Requirements

- Display list of news from last month
- Add pagination: 10 items per page
- Add news filtering based on section selection from dropdown. You can restrict it only to: `sport`, `books`, `business`, `culture`
- Add search functionality for filtering news content based on provided phrase
- Each news list element should have following elements:
  - Title
  - Section name
  - Date of publication
  - Link to full article (open in new window)
  - "Read Later" button
- Clicking "Read later" button should add selected news to the "Read later" section on the right. Those elements should be stored somewhere and displayed even after refresh.
- Each element from "read "later" can be removed by clicking "delete" button
- (Bonus) If you will find time, please briefly describe your approach to solving this task.

## Tools used

In order to keep things simple we used only really small number of libs for this boilerplate:

- [Parcel](https://en.parceljs.org) as a bundler
- [Milligram](https://milligram.io/) and [Normalize](https://necolas.github.io/normalize.css/) for some simple styling
- [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) for static code check
- [PostCSS](https://postcss.org/) with [Autoprefixr](https://autoprefixer.github.io/) for css compatibility
