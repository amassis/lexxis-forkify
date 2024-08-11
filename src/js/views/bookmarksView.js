import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';
import View from './view.js';
import PreviewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it.';
  _message = `recipes found.`;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map((bookmark) => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
