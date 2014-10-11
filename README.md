This is a collection of prototypes for standard DOM Classes that I've found very helpful for the past couple of projects.

## API

#### DOM Querying/Manipulation

##### #find(query)

Finds the first child element that matches `selector` and returns it. Just a quick wrapper around `querySelector`.

```javascript
document.find('.class');
element.find('.class');
docFragment.find('.class');
```

##### #findAll(query)

Finds all children elements that match `selector` and returns them as a NodeList. Just a quick wrapper around `querySelectorAll`.

##### #findParent(query)

Retrieves the first parent elements that match `selector` and returns it.

##### #remove()

Removes the element from the DOM. Uses the browser-native function if it exists.


#### Events

##### #bind(type, fn, [useCapture])

Binds an event listener to the given `type` of event, using `fn` and `useCapture`. Works on Elements, NodeLists, and the Document and Window.

Also works with multiple events:
```javascript
document.bind('transitionend webkitTransitionEnd MozTransitionEnd', transitionEnd);

function transitionEnd(e) {
	// this function is called for all three events
}
```

##### #unbind(type, fn, [useCapture])

Unbinds event listeners of the given `type`. Also works with multiple events.

##### #once(type, fn, useCapture)

Binds an event listener that only runs once and then removes itself.

##### #delegate(type, selector, fn, useCapture)

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

##### #forEach(fn)

A wrapper around `Array.forEach` for a NodeList.

##### #toArray()

Simple function to convert `NodeList`s and `HTMLCollection`s to Arrays. Helpful for using any browser array functionality like `#filter()` or `#map()` on the results of `findAll`.

## Caveats

**Yes, it uses prototypes**, hence the name.

People are always very scared about using prototypes, though projects like (SugarJS)[http://sugarjs.com] are helping to alleviate this. This fear of prototypes makes sense when building a large web app with a massive team: having unexpected functions and properties polluting your object's enumerable properties can be catastrophic. But, building one-off sites is a whole other deal.

Especially with ECMAScript 5, we can now add non-enumerable properties and functions to objects, addressing these concerns. 

#### Native APIs Intersecting

First off, explicitly setting prototypes naturally overrides browser-native functionality, so this isn't actually a concern except for new code. In which case, I'm totally down to change/remove bits of this as browsers either use the function names or provide similar functionality.
