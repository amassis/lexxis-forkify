import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';

class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    ['submit'].forEach((event) =>
      this.#parentElement.addEventListener(event, function (e) {
        e.preventDefault();
        handler();
      })
    );
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
