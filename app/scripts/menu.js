Handlebars.registerHelper("switch", function (value, options) {
  this._switch_value_ = value;
  var html = options.fn(this);
  delete this._switch_value_;
  return html;
});

Handlebars.registerHelper("case", function (value, options) {
  if (value == this._switch_value_) {
    return options.fn(this);
  }
});


var menu = document.querySelector("#menu");

var menuItems = [
  {"item": "Importación de Producto", "active": false},
  {"item": "Selección de Competidores", "state": "seleccionCompetidores", "active": true},
  {"item": "Exploración de Producto", "state": "exploracionProductos", "active": false},
  {"item": "Definición de Precios", "active": false},
  {"item": "Exportación de Productos", "active": false},
];
var menuContext = {menuItems};
menu.innerHTML = PriceApp.menu(menuContext);

var appContent = document.querySelector("#appContent");

var blockInfo = {
  "seleccionCompetidores": [
    {"blockName": "Competidores Seleccionado", "blockHeight": "150px"},
    {"blockName": "Seleccionar nuevo competidor", "blockHeight": "350px"},
  ],
  "exploracionProductos": [
    {"blockName": "Filtros", "blockHeight": "200px"},
    {"blockName": "Exploración Productos", "blockHeight": "300px"},
  ]
};

function getStateTitle(state) {
  for (var i = 0; i < menuItems.length; i++) {
    if (menuItems[i].state === state) {
      return menuItems[i].item;
    }
  }
}

function changeState(state) {
  var appContenContext = {"state": state, "title": getStateTitle(state)};
  appContent.innerHTML = PriceApp.content(appContenContext);
  var stagePage = document.querySelector("#" + state);
  stagePage.innerHTML = PriceApp[state]();

  $(".menuLinks").removeClass("menuActive");
  $("#" + state + "Link").addClass("menuActive");
  if (state === "exploracionProductos") {
    var sliders = document.querySelectorAll(".sliders")
    sliders.forEach(function (slider) {
      slider.innerHTML = PriceApp.slider();
      noUiSlider.create(slider.querySelector(".filterSliders"), {
        start: [10, 50],
        conect: true,
        step: 1,
        range: {
          'min': 0,
          'max': 100
        },
        format: wNumb({
          decimals: 0
        })
      })
    });
  }
}

changeState("seleccionCompetidores");
$(".button-collapse").sideNav()


