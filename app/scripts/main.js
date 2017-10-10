var blocks = document.querySelectorAll('.mainBlock');
var mainBlockInfo = [
  {"blockName": "Usuario","blockHeight":"100px"},
  {"blockName": "Pie de Página","blockHeight":"100px"},
];

blocks.forEach(function (block, i) {
  block.innerHTML = PriceApp.block(mainBlockInfo[i]);
})



