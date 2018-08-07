function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    };
  }
}
// =============================================================================
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
// =============================================================================
function addClass(element, value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName += " ";
    newClassName += value;
    element.className = newClassName;
  }
}

function addId(element, value) {
  if (!element.id) {
    element.id = value;
  } else {
    newId = element.id;
    newId += " ";
    newId += value;
    element.id = newId;
  }
}
// =============================================================================
function styleElementNextSiblings(tag, theclass) {
  if (!document.getElementsByTagName) return false;
  var elems = document.getElementsByTagName(tag);
  for (var i = 0; i < elems.length; i++) {
    var elem = getNextElement(elems[i].nextSibling);
    addClass(elem, theclass);
  }
  // var elem = document.getElementsByTagName(tag);
  // addClass(getNextElement(elem), theclass);
}

function getNextElement(node) {
  if (node.nodeType == 1) {
    return node;
  }
  if (node.nextSibling) {
    return getNextElement(node.nextSibling);
  }
  return null;
}
// =============================================================================
function moveElement(elementID, final_x, final_y, interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos) / 5);
    xpos += dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x) / 5);
    xpos -= dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos) / 5);
    ypos += dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y) / 5);
    ypos -= dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  // var repeat = "moveElement(${elementID}, ${final_x}, ${final_y}, ${interval})";
  var repeat =
    "moveElement('" +
    elementID +
    "'," +
    final_x +
    "," +
    final_y +
    "," +
    interval +
    ")";
  elem.movement = setTimeout(repeat, interval);
}
// =============================================================================
function getHttpObject() {
  if (typeof XMLHttpRequest == "undefined")
    XMLHttpRequest = function() {
      try {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
      } catch (e) {}
      try {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
      } catch (e) {}
      try {
        return new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {}
      return false;
    };
  return new XMLHttpRequest();
}
// =============================================================================
function loadScript(url) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script);
}
// =============================================================================
