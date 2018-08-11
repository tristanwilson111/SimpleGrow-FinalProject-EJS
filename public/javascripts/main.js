// adds the spec form to the dom
function addSpecForm() {
  //;;What does this "#product_specification" do?
  let specTemp = document.querySelector('#product_specification');
  let insertPnt = document.querySelector('#product_specifications');

  let clone = document.importNode(specTemp.content, true);

  insertPnt.appendChild(clone);
}

//Removes the spec form from the dom
function delSpecForm(event) {
  event.target.parentNode.remove();
}