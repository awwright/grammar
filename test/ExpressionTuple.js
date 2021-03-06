
var assert = require('assert');

var p = require('../index.js');

describe('ExpressionTuple', function() {
	describe('[constructor]', function(){
		it('Requires Expression argument', function() {
			assert.throws(function(){
				new p.ExpressionTuple(0, 2, 2);
			});
		});
		it('Requires number argument[1]', function() {
			assert.throws(function(){
				new p.ExpressionTuple(new p.ExpressionString('keyword'), "", 2);
			});
		});
		it('Requires number argument[2]', function() {
			assert.throws(function(){
				new p.ExpressionTuple(new p.ExpressionString('keyword'), 2, "");
			});
		});
	});
	describe('parse', function(){
		it('3-5 repeats', function() {
				var Grammar = new p.Grammar;
				Grammar.define('root', new p.ExpressionTuple(new p.ExpressionCharRange(["0-9"]), 3, 5));
				assert.throws(function(){ Grammar.parse(''); });
				assert.throws(function(){ Grammar.parse('1'); });
				assert.throws(function(){ Grammar.parse('12'); });
				assert.ok(Grammar.parse('123'));
				assert.ok(Grammar.parse('1234'));
				assert.ok(Grammar.parse('12345'));
				assert.throws(function(){ Grammar.parse('123456'); });
				assert.throws(function(){ Grammar.parse('1234567'); });
		});
		it('0-5 repeats', function() {
				var Grammar = new p.Grammar;
				Grammar.define('root', new p.ExpressionTuple(new p.ExpressionCharRange(["0-9"]), 0, 5));
				assert.ok(Grammar.parse(''));
				assert.ok(Grammar.parse('1'));
				assert.ok(Grammar.parse('12'));
				assert.ok(Grammar.parse('123'));
				assert.ok(Grammar.parse('1234'));
				assert.ok(Grammar.parse('12345'));
				assert.throws(function(){ Grammar.parse('123456'); });
				assert.throws(function(){ Grammar.parse('1234567'); });
		});
		it('2+ repeats', function() {
				var Grammar = new p.Grammar;
				Grammar.define('root', new p.ExpressionTuple(new p.ExpressionCharRange(["0-9"]), 2));
				assert.throws(function(){ Grammar.parse(''); });
				assert.throws(function(){ Grammar.parse('1'); });
				assert.ok(Grammar.parse('12'));
				assert.ok(Grammar.parse('123'));
				assert.ok(Grammar.parse('1234'));
				assert.ok(Grammar.parse('12345'));
				assert.ok(Grammar.parse('123456'));
				assert.ok(Grammar.parse('1234567'));
				assert.ok(Grammar.parse('12345678'));
				assert.ok(Grammar.parse('123456789'));
				assert.ok(Grammar.parse('1234567890'));
		});
	});
});
