import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';
import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    // console.log(this._data);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.currentPage;
    // console.log(numPages);
    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      // No previous page, next page is 2
      return this._generatePaginationMarkup(0, 2, numPages);
    }
    // Page 1, there are NO more pages
    if (currentPage === 1) {
      // No previous or next page
      return '';
    }

    // Last page
    if (currentPage === numPages) {
      // Previous page is 1 before last page, no next page
      return this._generatePaginationMarkup(currentPage - 1, 0, numPages);
    }

    // Other page
    // Previous page is before currentPage, next page is after currentPage
    return this._generatePaginationMarkup(
      currentPage - 1,
      currentPage + 1,
      numPages
    );

    // return this._data.map(this._generatePreviewMarkup).join('');
  }

  _generatePaginationMarkup(prev, next, total) {
    const prevMarkup = `
      <button data-goto="${prev}" class="btn--inline ${
      prev ? '' : 'hidden'
    } pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
      </button>`;

    const pageMarkup = `<button class="btn--noclick pagination__btn--page">
        <span>Page ${prev + 1} of ${total}</span>
      </button>`;

    const nextMarkup = `<button data-goto="${next}" class="btn--inline ${
      next ? '' : 'hidden'
    } pagination__btn--next">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    return `${prevMarkup}${pageMarkup}${nextMarkup}`;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log('Continue and paginate');
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
}

export default new PaginationView();
