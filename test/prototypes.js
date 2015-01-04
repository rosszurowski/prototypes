describe('Prototypes', function() {
	
	var fixtures = document.querySelector('#fixtures');
	
	describe('#find', function() {
	
		it ('should find an element', function() {
			var result = document.find('a');
			expect(result).to.exist();
			expect(result).to.be.instanceof(Element);
			expect(result.textContent).to.equal(document.querySelector('a').textContent);
		});
		
		it ('should work from document and elements', function() {
			expect(document.find('a')).to.exist();
			expect(fixtures.find('a')).to.exist();
		});
	
	});
	
	describe('#findAll', function() {
		
		it ('should find a set of elements', function() {
			var result = fixtures.findAll('a');
			expect(result).to.exist();
			expect(result).to.be.instanceof(NodeList);
			expect(result).to.have.length(2);
		});
		
	});
	
	describe('#findParent', function() {
		
		it ('should find a parent that matches the selector', function() {
			var result = fixtures.find('a').findParent('#fixtures');
			expect(result).to.exist();
			expect(result).to.equal(fixtures);
		});
		
		it ('should find distant parents', function() {
			var result = fixtures.find('a').findParent('body');
			expect(result).to.exist();
			expect(result).to.equal(document.body);
		});
		
	});
	
	describe('#remove', function() {
		
		it ('should remove an element', function() {
			var selector = '.remove-me';
			var el = fixtures.find(selector);
			expect(el).to.exist();
			el.remove();
			expect(fixtures.find(selector)).to.not.exist();
		});
		
		it ('should return the element that was removed', function() {
			var el = fixtures.find('.remove-me-chain');
			expect(el).to.exist();
			expect(el.remove()).to.equal(el);
		});
		
	});
	
	describe('#bind', function() {
		
		var el = fixtures.find('.bind-test');
		
		afterEach(function() {
			// replacing the node clears all the event listeners
			// maybe this is something prototypes could handle?
			var clone = el.cloneNode(true);
			el.parentNode.replaceChild(clone, el);
			el = clone;
		});
		
		it ('should add an event listener', function() {
			var a = 5;
			el.bind('click', function() {
				a++;
			});
			expect(a).to.equal(5);
			trigger('click', el);
			expect(a).to.equal(6);
		});
		
		it ('should bind multiple events at once', function() {
			var a = 2;
			el.bind('click mouseover mouseout', function() {
				a++;
			});
			expect(a).to.equal(2);
			trigger('click', el);
			expect(a).to.equal(3)
			trigger('mouseover', el);
			expect(a).to.equal(4);
			trigger('mouseout', el);
			expect(a).to.equal(5);
		});
		
	});
	
	describe('#unbind', function() {
		
		var el = fixtures.find('.bind-test');
		
		it ('should unbind an event listener', function() {
			var a = 5;
			var increment = function() { a++; }
			el.bind('click', increment);
			trigger('click', el);
			expect(a).to.equal(6);
			el.unbind('click', increment);
			trigger('click', el);
			expect(a).to.equal(6);
			function increment() { a++; }
		});
		
		it ('should unbind multiple events at once', function() {
			var a = 5;
			var increment = function() { a++; }
			var fire = function() {
				trigger('click', el);
				trigger('mouseover', el);
				trigger('mouseout', el);
			}
			el.bind('click mouseover mouseout', increment);
			fire();
			expect(a).to.equal(8);
			el.unbind('click mouseover mouseout', increment);
			fire();
			expect(a).to.equal(8);
		});
		
	});
	
	describe('#once', function() {
		
		var el = fixtures.find('.bind-test');
		
		it ('should only fire an event once', function() {
			var a = 5;
			var increment = function() { a++; }
			el.once('click', increment);
			trigger('click', el);
			trigger('click', el);
			trigger('click', el);
			expect(a).to.equal(6);
		});
		
	});
	
	describe('#delegate', function() {
		
		var parent = fixtures.find('.delegater');
		
		it ('should delegate events', function() {
			var a = 5;
			var fire = function() {
				parent.findAll('span').forEach(trigger.bind(null, 'click'));
			}
			parent.delegate('click', 'span', function() { a++; });
			fire();
			expect(a).to.equal(7);
			parent.appendChild(document.createElement('span'));
			fire();
			expect(a).to.equal(10);
		});
		
	});
	
	describe('NodeList', function() {
		
		var nodes = fixtures.findAll('a');
		
		describe('#forEach', function() {
			it ('should loop through each node', function() {
				expect(nodes).to.exist();
				expect(nodes.length).to.equal(2);
				nodes.forEach(function(node) {
					expect(node).to.exist()
					expect(node).to.be.instanceof(Element);
				});
			});
		});
		
		describe('#first', function() {
			it ('should return the first node', function() {
				var first = nodes.first();
				expect(first).to.exist();
				expect(first).to.equal(fixtures.find('a'));
			});
		});
		
		describe('#last', function() {
			it ('should return the last node', function() {
				var last = nodes.last();
				expect(last).to.exist();
				expect(last).to.equal(nodes.item(nodes.length-1));
			});
		});
		
		describe('#toArray', function() {
			it ('should return an array', function() {
				var arr = nodes.toArray();
				expect(arr).to.be.an('array');
				expect(arr).to.not.be.empty();
			});
		});
		
	});
	
	function trigger(event, el) {
		var ev = document.createEvent('MouseEvent');
		ev.initMouseEvent(
			event, // type
			true, // bubbles
			true, // cancelable
			window, null,
			0, 0, 0, 0, // coordinates
			false, false, false, false, // modifier keys
			0, // left
			null
		);
		el.dispatchEvent(ev);
	}
	
})