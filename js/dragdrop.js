function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  //  console.log(ev);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    var nodeCopy = document.getElementById(data).cloneNode(true);
    //nodeCopy.id = "newId";
    ev.target.innerHTML="";
    ev.target.appendChild(nodeCopy);
      // console.log(nodeCopy.innerHTML + ev.target.parentNode.id);
    listUpdate(nodeCopy.innerHTML, ev.target.parentNode.id);
}
