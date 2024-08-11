import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    RecipeView.renderSpinner();

    //0 upate results view - mark search results
    if (model.state.search.results.length) {
      ResultsView.update(model.getSearchResultsPage());
      BookmarksView.update(model.state.bookmarks);
    }

    //1 Loading Recipe
    await model.loadRecipe(id);

    //2 Rendering recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1 Get search query
    const query = SearchView.getQuery();
    if (!query) return;

    //2 Load Search Results
    ResultsView.renderSpinner();
    await model.loadSearchResults(query);

    //3 change URL
    window.history.pushState(null, '', '#');

    //4 controlPagination will render results and pagination
    controlPagination();
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (page = 1) {
  RecipeView.renderMessage(
    `${model.state.search.results.length} ${ResultsView._message}`
  );

  ResultsView.render(model.getSearchResultsPage(page));
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update recipe servings
  model.updateServings(newServings);

  //Update Recipe View
  RecipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update recipeView
  RecipeView.update(model.state.recipe);

  //render bookmarks
  BookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show spinner
    AddRecipeView.renderSpinner();

    //upload the new recipe data
    await model.uploadRecipe(newRecipe);

    //render recipe
    RecipeView.render(model.state.recipe);

    //Add success message
    AddRecipeView.renderMessage();

    //render bookmark view
    BookmarksView.render(model.state.bookmarks);

    //change URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //waits MODAL_CLOSE_SEC seconds and closes modal
    setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('🧨', err);
    AddRecipeView.renderError(err.message);
  }
};

const init = function () {
  BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerServings(controlServings);
  RecipeView.addHandlerBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
};
console.log('Welcome');
init();
