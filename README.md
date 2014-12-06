This is a collection of prototypes for standard DOM Classes that make front-end development life a little easier. They've been very helpful for the past couple of (small) projects I've done.

It transforms code like this:

```javascript
var element = document.querySelector('.class');
var parent;

while

```

## API

#### DOM Querying/Manipulation

##### `#find(query)`

Finds the first child element that matches `selector` and returns it. Just a quick wrapper around `querySelector`.

```javascript
document.find('.class'); // returns first element with .class
element.find('.class');  // returns first child element with .class
```

##### `#findAll(query)`

Finds all children elements that match `selector` and returns them as a NodeList. Just a quick wrapper around `querySelectorAll`.

```javascript
document.findAll('.class'); // returns array of elements with .class
element.findAll('.class');  // returns array of child elements with .class
```

##### `#findParent(query)`

Retrieves the first parent elements that match `selector`.

```javascript
// given the html:
//   <div class="parent">
//     <div class="wrapper">
//       <a href="#" class="link">Link</a>
//     </div>
//  </div>

var link = document.find('.link');
link.findParent('.parent');           // returns the .parent element
link.findParent('.wrapper, .parent'); // returns the .wrapper element
link.findParent('.bonanza');          // returns false
```

##### `#remove()`

Removes the element from the DOM. Uses the browser-native function if it exists.

```javascript
document.find('.remove-me').remove(); // poof!
```

#### Events

##### `#bind(type, fn, [useCapture])`

Binds an event listener to the given `type` of event, using `fn` and `useCapture`. Works on Elements, NodeLists, and the Document and Window. Also works with multiple events.

```javascript
document.bind('mousemove', mouseMove);
document.bind('transitionend webkitTransitionEnd MozTransitionEnd', transitionEnd);
```

##### `#unbind(type, fn, [useCapture])`

Unbinds event listeners of the given `type`. Also works with multiple events.

```javascript
document.unbind('mousemove', mouseMove);
document.unbind('transitionend webkitTransitionEnd MozTransitionEnd', transitionEnd);
```

##### `#once(type, fn, useCapture)`

Binds an event listener that only runs once and then removes itself.

```javascript
document.once('mousemove', mouseMove);

function mouseMove() {
	// only triggered once
}

```

##### `#delegate(type, selector, fn, useCapture)`

Delegates all `type` events from `selector` to element. This is useful if you're constantly adding and removing elements to the DOM that need event listeners.

Example:
```javascript
parent.delegate('click', '.todo', function(e) {
	e.preventDefault();
});

parent.addChild(newTodo);
newTodo.click();
// newTodo will have it's click preventDefault'd, even though it didn't exist when we assigned the listener
```

#### Utilities

##### `#forEach(fn)`

A wrapper around `Array.forEach` for a NodeList.

```javascript
document.findAll('a[href]').forEach(function(element) {
	// do something with `element`
});
```

##### `#toArray()`

Simple function to convert `NodeList`s and `HTMLCollection`s to Arrays. Helpful for using any browser array functionality like `#filter()` or `#map()` on the results of `findAll`.

```javascript
var elementsArray = document.findAll('a[href]').toArray(); // Returns an Array rather than the usual NodeList
```

## Caveats

**Yes, it uses prototypes**, hence the name.

People have been very scared about using prototypes for a long time, though projects like [SugarJS](http://sugarjs.com) are starting to change their negative perception. Thanks to new functionality within ECMAScript 5, we can now add non-enumerable properties and functions to objects, addressing concerns around unexpected properties and methods showing up in `for .. in` loops.

Other problems, such as performance overheads are many years outdated. If you build for modern browsers, these things needn't be of any concern.

Another oft-cited issue is the opaqueness of adding global prototypes. New developers coming in to a project may not know what `[2,4,5].foo()` does, or where to find it. Again, these issues come down to developing clearly and responsibly. By defining prototypes in one place with semantic names and proper documentation, these issues are allieviated.

The only relevant issue anymore is the [volatility of "host objects"](http://sugarjs.com/native#modifying_host_objects). In Javascript, there are two types of objects: native objects that defined as part of the ECMAScript speicification (`Object`, `String`, `Array`, etc) and host objects which are defined by the javascript environment. For the DOM this includes objects such as `HTMLElement`, `NodeList`, and so on. However, these host objects are also governed by a [strict specification](http://www.w3.org/TR/dom/), and careful consideration is given before changing any of the critical APIs. Additionally, functionality already built into the spec can be deferred to (`Element#remove()` for example), and polyfilled if it doesn't exist.

The issue isn't with DOM extension, it's careless implementations of DOM extension. Javascript is, by nature, a prototypal language. We end up with more clear and concise code when we use this nature to our advantage.
