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
    var tableProductsInfo=document.querySelector("#productsTable");
    var productsInfo=[
      {"name":"Producto 1","price":152,"competitor1":65,"competitor2":46,"inventory":5},
      {"name":"Producto 2","price":152,"competitor1":3,"competitor2":31,"inventory":5},
      {"name":"Producto 3","price":152,"competitor1":45,"competitor2":64,"inventory":5}
    ];
    tableProductsInfo.innerHTML=PriceApp.tableProducts({products:productsInfo})

  } else if (state === "seleccionCompetidores") {
    var competidorInfo = document.querySelector("#competidorInfo")
    var compInfo=[
      {"name":"Amazon","url":"https://www.amazon.com","upValues":10,"downValues":5},
      {"name":"Ebay","url":"https://www.ebay.com","upValues":10,"downValues":5}
    ];
    competidorInfo.innerHTML=PriceApp.competidorInfo({competitors:compInfo})
  }
}

changeState("seleccionCompetidores");
$(".button-collapse").sideNav()


