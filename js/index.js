"use strict";

// React component Model
// -->Container
// ---->ButtonSection
// ------>AddButton
// ---->RecipeSection
// ------>Recipe

var Container = React.createClass({
  displayName: "Container",

  render: function render() {
    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(ButtonSection, null),
      React.createElement(RecipeSection, null)
    );
  }
});

var ButtonSection = React.createClass({
  displayName: "ButtonSection",

  addRecipe: function addRecipe() {},
  render: function render() {
    return React.createElement(
      "div",
      { className: "row buttonSect" },
      React.createElement(
        "div",
        { className: "col-xs-8" },
        React.createElement(
          "h2",
          { className: "heading" },
          "Recipe Box"
        )
      ),
      React.createElement(
        "div",
        { className: "col-xs-4" },
        React.createElement(
          "button",
          { className: "addBtn bs ts", onClick: this.addRecipe },
          "Add recipe"
        )
      )
    );
  }
});

var RecipeSection = React.createClass({
  displayName: "RecipeSection",

  getInitialState: function getInitialState() {
    return { recipies: [{
        id: 1,
        name: "Apple Pie",
        ingredients: ["Apple", "Flour", "Sugar", "Cream"],
        showRecipe: true
      }, {
        id: 2,
        name: "Another Apple Pie",
        ingredients: ["Apple", "Flour", "Sugar", "Cream"],
        showRecipe: true
      }] };
  },
  removeRecipe: function removeRecipe(id) {
    var stateVar = this.state.recipies;
    stateVar = stateVar.map(function (elem) {
      if (elem.id.toString() === id) elem.showRecipe = false;
      return elem;
    });
    this.setState({ recipies: stateVar });
  },
  alotId: function alotId() {
    var date = new Date();
    return date.getTime();
  },
  addRecipe: function addRecipe(name, ingredients) {
    var id = this.alotId();
    var state = this.state.recipies;
    state.push({ id: id, showRecipe: true, name: name, ingredients: ingredients });
    this.setState({ recipes: state });
  },
  render: function render() {
    console.log("rendering recipe sect");
    var recipies = [];
    var parent_this = this;
    this.state.recipies.forEach(function (elem) {
      if (elem.showRecipe) recipies.push(React.createElement(Recipe, { id: elem.id, name: elem.name, ingredients: elem.ingredients, remove: parent_this.removeRecipe }));
    });
    return React.createElement(
      "div",
      { className: "recipeSect", id: "recipeSect" },
      recipies
    );
  }
});

var Recipe = React.createClass({
  displayName: "Recipe",

  handleClickOnMain: function handleClickOnMain(e) {
    if (e.target.classList.contains("deleteBtn")) {
      return;
    }
    var condition = e.currentTarget.classList.contains('opened');
    $(".opened").removeClass("opened");
    if (!condition) e.currentTarget.classList.add("opened");
  },
  remove: function remove(e) {
    this.props.remove(e.currentTarget.parentNode.parentNode.id);
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "row recipe ts", onClick: this.handleClickOnMain, id: this.props.id },
      React.createElement(
        "div",
        { className: "col-xs-12 recipeHeader ts" },
        React.createElement(
          "h3",
          { className: "recipeName" },
          this.props.name
        ),
        React.createElement("span", { "data-toggle": "tooltip", className: "btn editBtn ts glyphicon glyphicon-pencil", title: "Edit", "data-placement": "top" }),
        React.createElement("span", { className: "btn deleteBtn ts glyphicon glyphicon-trash", "data-toggle": "tooltip", title: "Delete", "data-placement": "top", onClick: this.remove })
      ),
      React.createElement(
        "div",
        { className: "col-xs-12 recipeContent ts" },
        React.createElement(
          "h4",
          null,
          "Ingridients:"
        ),
        React.createElement(Ingredients, { data: this.props.ingredients })
      )
    );
  }
});

var Ingredients = React.createClass({
  displayName: "Ingredients",

  render: function render() {
    var ingredients = [];
    this.props.data.forEach(function (elem) {
      ingredients.push(React.createElement(
        "button",
        { className: "ingredients" },
        "elem"
      ));
    });
    return React.createElement(
      "div",
      { className: "ingridientsList" },
      ingredients
    );
  }
});

ReactDOM.render(React.createElement(Container, null), document.getElementById("app"));

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});