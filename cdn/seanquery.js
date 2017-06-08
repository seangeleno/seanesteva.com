/* Basic Arithmetic Start */
function add(a,b){
return a + b
};

function subtract(a,b){return a - b};

function divide (a,b){
return a / b
};

function multiply(a,b){return a * b};

/* Basic Arithmetic End */


/* FUNCTIONAL PROGRAMMING START */


function newEl(element,className){
var newElement = document.createElement(element);
newElement.setAttribute("class", className);

return newElement;
}

/* Straight Outta jQuery START */

/* hasClass */

function hasClass(selector) {
    var className = " " + selector + " ";
    var i = 0,
        l = this.length;
    for (; i < l; i++) {
        if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
            return true;
        }
    }

    return false;
}

function sethtml(value) {
    return value == undefined ? (this[0] ? this[0].innerHTML : null) : this.empty().append(value);
}

function each(object, callback, args) {
    var name, i = 0,
        length = object.length;

    if (args) {
        if (length == undefined) {
            for (name in object)
            if (callback.apply(object[name], args) === false) break;
        } else for (; i < length;) if (callback.apply(object[i++], args) === false) break;

    } else {
        if (length == undefined) {
            for (name in object)
            if (callback.call(object[name], name, object[name]) === false) break;
        } else for (var value = object[0];
        i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
    }

    return object;
}

var regchktag = /^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;


function nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
}

/* Straight Outta jQuery END */

/* JS + CSS LIBRARIES START */

function bootstrapify(){
	var hyperlinkreference = "https://seanesteva.com/cdn/css/bootstrap-3.3.7.css";
	var dochead = document.querySelector('head');
	var bootScript = newEl('link');
	bootScript.setAttribute("href", hyperlinkreference);
	bootScript.setAttribute("rel", "stylesheet");
	dochead.appendChild(bootScript);
}

function jquerify(){
var queryscript = document.createElement('script');
queryscript.setAttribute("type", "text/javascript");
queryscript.setAttribute("src", "http://seanesteva.com/cdn/js/jquery-3.2.1.js");
document.head.appendChild(queryscript);
}
