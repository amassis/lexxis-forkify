import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';
import View from './view.js';
import PreviewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for that query. Please, try again.';
  _message = `recipes found.`;

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map((result) => PreviewView.render(result, false))
      .join('');
  }
}

export default new ResultsView();
