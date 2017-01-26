/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(7);

	var _map = __webpack_require__(10);

	var _map2 = _interopRequireDefault(_map);

	var _countries = __webpack_require__(6);

	var _countries2 = _interopRequireDefault(_countries);

	var _pieChart = __webpack_require__(11);

	var _pieChart2 = _interopRequireDefault(_pieChart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SELECT_COUNTRY = document.querySelector('.button__select');
	var IMG_COUNTRY = document.querySelector('#country img');
	var H3_COUNTRY = document.querySelector('#country h3 strong span');
	var POOL_INFO = document.querySelector('.pool__info strong span');
	var POOL_SPRITE = document.querySelector('.pool__sprite');

	var country = new Vue({
	  el: '#count2ry',
	  data: {
	    info: {
	      name: 'Deutschland',
	      flag: 'images/flags/Flag_of_Germany.svg',
	      flow: [117, 75]
	    }
	  },
	  computed: {
	    pools: function pools() {
	      var pools = this.info.resources / 2.5;
	      return (Math.round(pools * 100) / 100).toFixed(0);
	    },
	    flowTotal: function flowTotal() {
	      var total = this.info.flow.reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      return (Math.round(total * 100) / 100).toFixed(1);
	    },
	    namePrefix: function namePrefix() {
	      if (this.info.name === 'Europäische Union') {
	        return 'der Europäischen Union';
	      } else if (this.info.name === 'Ver. Königreich') {
	        return 'dem Ver. Königreich';
	      } else if (this.info.name === 'Tsch. Republik') {
	        return 'der Tsch. Republik';
	      }

	      return this.info.name;
	    }
	  }
	});

	function changeMapActive(id) {
	  for (var i = 0; i < _map2.default.features.length; i++) {
	    document.querySelectorAll('[data-id="' + _map2.default.features[i].properties.id + '"]')[0].classList.remove('active');
	  }

	  document.querySelectorAll('[data-id="' + id + '"]')[0].classList.add('active');
	}

	function updatePoolSprite() {
	  if (country.info.name === 'Island') {
	    $('.pool__sprite').not(':first').remove();
	    POOL_SPRITE.style = '\n      background: url(\'images/pool_sprite_211.png\') no-repeat;\n      width: 0px;\n      height: 0px;\n      background-size: auto 80%;\n    ';
	    console.log('asd');
	    setTimeout(function () {
	      POOL_SPRITE.style = '\n        background: url(\'images/pool_sprite_211.png\') no-repeat;\n        width: 800px;\n        height: 400px;\n        background-size: auto 80%;\n      ';
	    }, 100);
	    return;
	  }

	  var colsNum = 8;
	  $('.pool__sprite').not(':first').remove();
	  if (country.pools > colsNum) {
	    POOL_SPRITE.style = 'width: ' + 116 * colsNum + 'px;';
	    var rowsNum = (country.pools - country.pools % colsNum) / colsNum;

	    var _loop = function _loop(i) {
	      var SECTION2 = document.querySelector('.section2 div');
	      var DIV = document.createElement('div');
	      DIV.classList.add('pool__sprite');

	      if (i + 1 === rowsNum) {
	        DIV.style = 'width: ' + 116 * 0 + 'px;';
	        setTimeout(function () {
	          DIV.style = 'width: ' + 116 * (country.pools % colsNum) + 'px;';
	        }, 100);
	      } else {
	        DIV.style = 'width: ' + 116 * 0 + 'px;';
	        setTimeout(function () {
	          DIV.style = 'width: ' + 116 * colsNum + 'px;';
	        }, 100);
	      }

	      SECTION2.appendChild(DIV);
	    };

	    for (var i = 0; i < rowsNum; i++) {
	      _loop(i);
	    }
	  } else {
	    POOL_SPRITE.style = 'width: ' + 116 * country.pools + 'px;';
	  }
	}

	var w = 700;
	var h = 800;

	var projection = d3.geo.mercator().center([13, 52]).translate([w / 2.0, h / 2.2]).scale([w / 0.9]);

	var path = d3.geo.path().projection(projection);

	var svg = d3.select('#map').append('svg').attr('width', w).attr('height', h);

	svg.selectAll('path').data(_map2.default.features).enter().append('path').attr('d', path).attr('data-id', function (d) {
	  return d.properties.id;
	}).on('click', function (d) {
	  var id = d.properties.id;
	  if (id === 99 || id === 35 || id === 36 || id === 37) {
	    return;
	  }

	  country.info = _countries2.default.filter(function (item) {
	    return item.name === d.properties.name;
	  })[0];
	  changeMapActive(d.properties.id);
	  _pieChart2.default.update(country.info.flow);
	  $(SELECT_COUNTRY).val(country.info.name);
	  IMG_COUNTRY.src = country.info.flag;
	  H3_COUNTRY.innerHTML = country.flowTotal;
	  POOL_INFO.innerHTML = country.pools;
	  updatePoolSprite();
	}).append('title').text(function (d) {
	  return d.properties.name;
	});

	country.info = _countries2.default.filter(function (item) {
	  return item.name === 'Deutschland';
	})[0];
	changeMapActive(5);
	_pieChart2.default.update(country.info.flow);
	$(document).ready(function () {
	  $(SELECT_COUNTRY).val('Deutschland');
	});
	IMG_COUNTRY.src = country.info.flag;
	H3_COUNTRY.innerHTML = country.flowTotal;
	POOL_INFO.innerHTML = country.pools;
	updatePoolSprite();

	document.querySelector('.button__min').addEventListener('click', function () {
	  country.info = _countries2.default.filter(function (item) {
	    return item.name === 'Malta';
	  })[0];
	  changeMapActive(country.info.id);
	  _pieChart2.default.update(country.info.flow);
	  $(SELECT_COUNTRY).val(country.info.name);
	  IMG_COUNTRY.src = country.info.flag;
	  H3_COUNTRY.innerHTML = country.flowTotal;
	  POOL_INFO.innerHTML = country.pools;
	  updatePoolSprite();
	});

	document.querySelector('.button__max').addEventListener('click', function () {
	  country.info = _countries2.default.filter(function (item) {
	    return item.name === 'Norwegen';
	  })[0];
	  changeMapActive(country.info.id);
	  _pieChart2.default.update(country.info.flow);
	  $(SELECT_COUNTRY).val(country.info.name);
	  IMG_COUNTRY.src = country.info.flag;
	  H3_COUNTRY.innerHTML = country.flowTotal;
	  POOL_INFO.innerHTML = country.pools;
	  updatePoolSprite();
	});

	var sortedCountries = _countries2.default.sort(function (a, b) {
	  if (a.name < b.name) return -1;
	  if (a.name > b.name) return 1;
	  return 0;
	});

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
	  for (var _iterator = sortedCountries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	    var optCountry = _step.value;

	    var id = optCountry.id;

	    if (id !== 99 && id !== 35 && id !== 36 && id !== 37) {
	      var OPTION = document.createElement('option');
	      OPTION.innerHTML = optCountry.name;

	      SELECT_COUNTRY.appendChild(OPTION);
	    }
	  }
	} catch (err) {
	  _didIteratorError = true;
	  _iteratorError = err;
	} finally {
	  try {
	    if (!_iteratorNormalCompletion && _iterator.return) {
	      _iterator.return();
	    }
	  } finally {
	    if (_didIteratorError) {
	      throw _iteratorError;
	    }
	  }
	}

	SELECT_COUNTRY.addEventListener('change', function (e) {
	  country.info = _countries2.default.filter(function (item) {
	    return item.name === e.target.value;
	  })[0];
	  changeMapActive(country.info.id);
	  _pieChart2.default.update(country.info.flow);
	  IMG_COUNTRY.src = country.info.flag;
	  H3_COUNTRY.innerHTML = country.flowTotal;
	  POOL_INFO.innerHTML = country.pools;
	  updatePoolSprite();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	$('.button__data').click(function () {
	  $('html, body').animate({
	    scrollTop: $('.section1').offset().top - 100
	  }, 800);
	});

	$('.nav1').click(function () {
	  $('html, body').animate({
	    scrollTop: $('.section1').offset().top - 100
	  }, 800);
	});

	$('.nav2').click(function () {
	  $('html, body').animate({
	    scrollTop: $('.section3').offset().top - 100
	  }, 800);
	});

	$('.nav3').click(function () {
	  $('html, body').animate({
	    scrollTop: $('.section5').offset().top - 100
	  }, 800);
	});

	$('.section1').on('inview', function (event, isInView) {
	  if (isInView) {
	    document.querySelector('.nav1').classList.toggle('active');
	  } else {
	    document.querySelector('.nav1').classList.toggle('active');
	  }
	});

	$('.section3').on('inview', function (event, isInView) {
	  if (isInView) {
	    document.querySelector('.nav2').classList.toggle('active');
	  } else {
	    document.querySelector('.nav2').classList.toggle('active');
	  }
	});

	$('.section5').on('inview', function (event, isInView) {
	  if (isInView) {
	    document.querySelector('.nav3').classList.toggle('active');
	  } else {
	    document.querySelector('.nav3').classList.toggle('active');
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	(function () {
	    'use strict';

	    var onloadDo;
	    onloadDo = function onloadDo() {
	        var addPath, addPoints, animatePath, canvas, i, j, n, opacity, path, paths, ref, view;
	        canvas = document.getElementById('canvas');
	        paper.setup(canvas);
	        view = paper.project.view;
	        paths = new paper.Group();
	        addPoints = function addPoints(path, quantity) {
	            var i, j, ref, x, y;
	            path.add(view.bounds.bottomLeft);
	            for (i = j = -1, ref = quantity + 1; j <= ref; i = j += 1) {
	                x = view.viewSize.width / quantity * i;
	                y = view.viewSize.height / 1.118;
	                path.add(new paper.Point(x, y));
	            }

	            return path.add(view.bounds.bottomRight);
	        };
	        addPath = function addPath(quantity, color, opacity) {
	            var path;
	            path = new paper.Path();
	            path.fillColor = color;
	            path.opacity = opacity;
	            addPoints(path, quantity);
	            path.smooth();
	            return path;
	        };
	        animatePath = function animatePath(path, event, index) {
	            var i, j, len, ref, results, segment, sin;
	            ref = path.segments;
	            results = [];
	            for (i = j = 0, len = ref.length; j < len; i = ++j) {
	                segment = ref[i];
	                if (i > 0 && i < path.segments.length - 1) {
	                    sin = Math.sin(event.time * 1 + i - index);
	                    results.push(segment.point.y = sin * 10 + view.viewSize.height / 6 + index * 10);
	                } else {
	                    results.push(void 0);
	                }
	            }
	            return results;
	        };
	        n = 8;
	        opacity = 1 / (n / 2);
	        for (i = j = 1, ref = n; j <= ref; i = j += 1) {
	            path = addPath(8 - i, '#a8e0f6', i * opacity);
	            path.position.y += 25 * i;
	            paths.addChild(path);
	        }
	        view.onFrame = function (event) {
	            var k, len, ref1, results;
	            ref1 = paths.children;
	            results = [];
	            for (i = k = 0, len = ref1.length; k < len; i = ++k) {
	                path = ref1[i];
	                results.push(animatePath(path, event, i));
	            }

	            return results;
	        };

	        view.draw();
	        return null;
	    };
	    window.onload = onloadDo;
	}).call(undefined);

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var dataInit = {
	  children: [{ name: 'Landwirtschaft', id: 'agri', val: 27.4 }, { name: 'Kompostierung', id: 'compost', val: 14.7 }, { name: 'Deponierung', id: 'landfill', val: 0 }, { name: 'Verbrennung', id: 'incineration', val: 57.7 }, { name: 'Andere', id: 'other', val: 0.2 }]
	};

	var graphWidth = 700;
	var graphHeight = 400;
	var fontSize = 48;

	var container = d3.select('#treemap').append('div').attr('style', function () {
	  return 'width: ' + graphWidth + 'px; height: ' + graphHeight + 'px;';
	});

	var treemap = d3.layout.treemap().size([graphWidth, graphHeight]).value(function (d) {
	  return parseInt(d.val);
	}).sticky(true);

	container.selectAll('.node').data(treemap.nodes(dataInit)).enter().append('div').attr('class', function (d) {
	  return 'node treemap__' + d.id;
	}).attr('style', function (d, i) {
	  var hue = parseInt(i * 40 + 120);
	  var styleCode = '';
	  styleCode += 'width:' + d.dx + 'px;';
	  styleCode += 'height:' + d.dy + 'px;';
	  styleCode += 'top:' + (graphHeight - d.y - d.dy) + 'px;';
	  styleCode += 'left:' + (graphWidth - d.x - d.dx) + 'px;';
	  styleCode += 'background-color:hsl(' + hue + ', 50%, 40%);';
	  return styleCode;
	});

	var textContainers = container.selectAll('.node').append('div');

	var percentage = textContainers.append('p').data(treemap.nodes(dataInit)).text(function (d) {
	  return d.val + '%';
	}).style('font-size', function (d) {
	  if (d.val > 10 && d.val <= 30) {
	    return fontSize * (d.val / 30) + 'px';
	  } else if (d.val > 30 && d.val <= 60) {
	    return fontSize * (d.val / 40) + 'px';
	  } else if (d.val > 60) {
	    return fontSize * (d.val / 60) + 'px';
	  } else {
	    return '15px';
	  }
	});

	var containerText = textContainers.append('p').attr('class', 'treemapText').data(treemap.nodes(dataInit)).text(function (d) {
	  return d.name;
	}).style('font-size', function (d) {
	  if (d.val > 10 && d.val <= 30) {
	    return fontSize * (d.val / 70) + 'px';
	  } else if (d.val > 30 && d.val <= 50) {
	    return fontSize * (d.val / 65) + 'px';
	  } else if (d.val > 50 && d.val <= 60) {
	    return fontSize * (d.val / 55) + 'px';
	  } else if (d.val > 60) {
	    return fontSize * (d.val / 65) + 'px';
	  } else {
	    return '0px';
	  }
	});

	treemap.sticky(true);

	function update(newData) {
	  var data = {
	    children: [{ name: 'Landwirtschaft', id: 'agri', val: newData.agri }, { name: 'Kompostierung', id: 'compost', val: newData.compost }, { name: 'Deponierung', id: 'landfill', val: newData.landfill }, { name: 'Verbrennung', id: 'incineration', val: newData.incineration }, { name: 'Andere', id: 'other', val: newData.others }]
	  };

	  container.selectAll('.node').data(treemap.nodes(data)).transition().attr('class', function (d) {
	    return 'node treemap__' + d.id;
	  }).attr('style', function (d, i) {
	    var hue = parseInt(i * 40 + 120);
	    var styleCode = '';
	    styleCode += 'width:' + d.dx + 'px;';
	    styleCode += 'height:' + d.dy + 'px;';
	    styleCode += 'top:' + (graphHeight - d.y - d.dy) + 'px;';
	    styleCode += 'left:' + (graphWidth - d.x - d.dx) + 'px;';
	    styleCode += 'background-color:hsl(' + hue + ', 50%, 40%);';

	    if (d.val <= 7.5) {
	      styleCode += 'background-size: 0 0;';
	    }

	    return styleCode;
	  });

	  percentage.data(treemap.nodes(data)).text(function (d) {
	    return d.val + '%';
	  }).style('font-size', function (d) {
	    if (d.val > 10 && d.val <= 30) {
	      return fontSize * (d.val / 30) + 'px';
	    } else if (d.val > 30 && d.val <= 60) {
	      return fontSize * (d.val / 40) + 'px';
	    } else if (d.val > 60) {
	      return fontSize * (d.val / 60) + 'px';
	    } else {
	      return '15px';
	    }
	  });

	  containerText.data(treemap.nodes(data)).style('font-size', function (d) {
	    if (d.val > 10 && d.val <= 30) {
	      return fontSize * (d.val / 70) + 'px';
	    } else if (d.val > 30 && d.val <= 50) {
	      return fontSize * (d.val / 65) + 'px';
	    } else if (d.val > 50 && d.val <= 60) {
	      return fontSize * (d.val / 55) + 'px';
	    } else if (d.val > 60) {
	      return fontSize * (d.val / 65) + 'px';
	    } else {
	      return '0px';
	    }
	  });
	  treemap.sticky(true);
	}

	module.exports = {
	  update: update
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _countries = __webpack_require__(6);

	var _countries2 = _interopRequireDefault(_countries);

	var _treemap = __webpack_require__(4);

	var _treemap2 = _interopRequireDefault(_treemap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DIV_RESULT = document.querySelector('.countrySearch__result');
	var INPUT_SEARCH = document.querySelector('.countrySearch input');

	function addFlagsForCountries(data) {
	  var filteredData = data.filter(function (country) {
	    return country.disposal;
	  });
	  filteredData = filteredData.sort(function (a, b) {
	    if (a.name < b.name) return -1;
	    if (a.name > b.name) return 1;
	    return 0;
	  });

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    var _loop = function _loop() {
	      var country = _step.value;

	      var IMG = document.createElement('img');
	      IMG.id = country.id;

	      IMG.addEventListener('click', function (e) {
	        var selCountry = _countries2.default.filter(function (c) {
	          return c.id === Number(e.target.id);
	        })[0];
	        _treemap2.default.update(selCountry.disposal);

	        // Update countryInfo
	        document.querySelector('.section6 .countryInfo h2').innerHTML = country.name;
	        document.querySelector('.section6 .countryInfo img').src = country.flag;
	      });

	      IMG.src = country.flag;
	      DIV_RESULT.appendChild(IMG);
	    };

	    for (var _iterator = filteredData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      _loop();
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}

	addFlagsForCountries(_countries2.default);

	INPUT_SEARCH.addEventListener('input', function () {
	  DIV_RESULT.innerHTML = '';

	  var inputValue = INPUT_SEARCH.value.toLowerCase();

	  var filteredCountries = _countries2.default.filter(function (country) {
	    return country.name.toLowerCase().indexOf(inputValue) === 0;
	  });
	  addFlagsForCountries(filteredCountries);
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = [
		{
			"id": 1,
			"name": "Belgien",
			"nameAbrev": "BE",
			"flag": "images/flags/Flag_of_Belgium.svg",
			"flow": [
				12.3,
				7.6
			],
			"resources": 1.8,
			"usage": {
				"public": {
					"nace": 16.7,
					"households": 9.7
				},
				"economic": {
					"nace": {
						"total": 185,
						"agri": 9,
						"industry": {
							"total": 103,
							"manu": 103,
							"prod": 2
						},
						"services": 73
					},
					"households": 107
				}
			},
			"disposal": {
				"agri": 17.3,
				"compost": 0,
				"landfill": 0,
				"incineration": 82.7,
				"others": 0
			}
		},
		{
			"id": 2,
			"name": "Bulgarien",
			"nameAbrev": "BG",
			"flag": "images/flags/Flag_of_Bulgaria.svg",
			"flow": [
				17.6,
				89.1
			],
			"resources": 14.6,
			"usage": {
				"public": {
					"nace": 17.5,
					"households": 35.9
				},
				"economic": {
					"nace": {
						"total": 127.1,
						"agri": 3.1,
						"industry": {
							"total": 81,
							"manu": 24.7,
							"prod": 1.7
						},
						"services": 43
					},
					"households": 260.7
				}
			},
			"disposal": {
				"agri": 55.3,
				"compost": 7.5,
				"landfill": 34.8,
				"incineration": 0,
				"others": 2.5
			}
		},
		{
			"id": 3,
			"name": "Tsch. Republik",
			"nameAbrev": "CZ",
			"flag": "images/flags/Flag_of_the_Czech_Republic.svg",
			"flow": [
				15.3,
				30.2
			],
			"resources": 1.5,
			"usage": {
				"public": {
					"nace": 16.7,
					"households": 9.7
				},
				"economic": {
					"nace": {
						"total": 160.7,
						"agri": 7.6,
						"industry": {
							"total": 42.9,
							"manu": null,
							"prod": null
						},
						"services": 110.1
					},
					"households": 317.6
				}
			},
			"disposal": {
				"agri": 31.2,
				"compost": 53.4,
				"landfill": 6.8,
				"incineration": 2.3,
				"others": 6.4
			}
		},
		{
			"id": 4,
			"name": "Dänemark",
			"nameAbrev": "DK",
			"flag": "images/flags/Flag_of_Denmark.svg",
			"flow": [
				16.3,
				0
			],
			"resources": 2.9,
			"usage": {
				"public": {
					"nace": 23.8,
					"households": 44.8
				},
				"economic": null
			},
			"disposal": {
				"agri": 64.4,
				"compost": 0,
				"landfill": 1.2,
				"incineration": 29.5,
				"others": 4.9
			}
		},
		{
			"id": 5,
			"name": "Deutschland",
			"nameAbrev": "DE",
			"flag": "images/flags/Flag_of_Germany.svg",
			"flow": [
				117,
				75
			],
			"resources": 2.3,
			"usage": {
				"public": {
					"nace": 11.8,
					"households": 45.5
				},
				"economic": null
			},
			"disposal": {
				"agri": 27.4,
				"compost": 14.7,
				"landfill": 0,
				"incineration": 57.7,
				"others": 0.2
			}
		},
		{
			"id": 6,
			"name": "Estland",
			"nameAbrev": "EE",
			"flag": "images/flags/Flag_of_Estonia.svg",
			"flow": [
				12.3,
				null
			],
			"resources": 9.4,
			"usage": {
				"public": {
					"nace": 39.1,
					"households": null
				},
				"economic": {
					"nace": {
						"total": null,
						"agri": 0.3,
						"industry": {
							"total": null,
							"manu": 7.9,
							"prod": 0.1
						},
						"services": null
					},
					"households": null
				}
			},
			"disposal": {
				"agri": 1.5,
				"compost": 86.6,
				"landfill": 9.6,
				"incineration": 0,
				"others": 2.2
			}
		},
		{
			"id": 7,
			"name": "Irland",
			"nameAbrev": "IE",
			"flag": "images/flags/Flag_of_Ireland.svg",
			"flow": [
				47.5,
				3.5
			],
			"resources": 11.1,
			"usage": {
				"public": {
					"nace": 146.2,
					"households": null
				},
				"economic": null
			},
			"disposal": {
				"agri": 80.6,
				"compost": 14.5,
				"landfill": 4.4,
				"incineration": 0,
				"others": 0.5
			}
		},
		{
			"id": 8,
			"name": "Griechenland",
			"nameAbrev": "GR",
			"flag": "images/flags/Flag_of_Greece.svg",
			"flow": [
				60,
				12
			],
			"resources": 6.5,
			"usage": {
				"public": {
					"nace": 20.7,
					"households": 35.4
				},
				"economic": {
					"nace": {
						"total": 125.4,
						"agri": 21.5,
						"industry": {
							"total": 72.1,
							"manu": null,
							"prod": null
						},
						"services": 31.8
					},
					"households": 884.5
				}
			},
			"disposal": {
				"agri": 12,
				"compost": 0,
				"landfill": 34,
				"incineration": 33.2,
				"others": 20.9
			}
		},
		{
			"id": 9,
			"name": "Spanien",
			"nameAbrev": "ES",
			"flag": "images/flags/Flag_of_Spain.svg",
			"flow": [
				111.1,
				0
			],
			"resources": 2.4,
			"usage": {
				"public": {
					"nace": 19.9,
					"households": 57.5
				},
				"economic": {
					"nace": {
						"total": 932.8,
						"agri": 47.8,
						"industry": {
							"total": 361.9,
							"manu": 351.2,
							"prod": 0
						},
						"services": 523.1
					},
					"households": 2688
				}
			},
			"disposal": {
				"agri": 74.6,
				"compost": 0,
				"landfill": 14.9,
				"incineration": 3.9,
				"others": 6.6
			}
		},
		{
			"id": 10,
			"name": "Frankreich",
			"nameAbrev": "FR",
			"flag": "images/flags/Flag_of_France.svg",
			"flow": [
				180,
				11
			],
			"resources": 2.8,
			"usage": {
				"public": {
					"nace": 5.6,
					"households": 53.8
				},
				"economic": {
					"nace": {
						"total": 366,
						"agri": null,
						"industry": {
							"total": null,
							"manu": null,
							"prod": null
						},
						"services": null
					},
					"households": 3506
				}
			},
			"disposal": {
				"agri": 42.4,
				"compost": 33.1,
				"landfill": 3.6,
				"incineration": 18.5,
				"others": 2.5
			}
		},
		{
			"id": 11,
			"name": "Kroatien",
			"nameAbrev": "HR",
			"flag": "images/flags/Flag_of_Croatia.svg",
			"flow": [
				26.1,
				85.6
			],
			"resources": 26.2,
			"usage": {
				"public": {
					"nace": 19.9,
					"households": 45.6
				},
				"economic": {
					"nace": {
						"total": 84.5,
						"agri": null,
						"industry": {
							"total": 84.5,
							"manu": null,
							"prod": null
						},
						"services": null
					},
					"households": 194.1
				}
			}
		},
		{
			"id": 12,
			"name": "Italien",
			"nameAbrev": "IT",
			"flag": "images/flags/Flag_of_Italy.svg",
			"flow": [
				85.3,
				30.5
			],
			"resources": 1.9,
			"usage": {
				"public": {
					"nace": 87.9,
					"households": null
				},
				"economic": null
			},
			"disposal": {
				"agri": 33.1,
				"compost": 0,
				"landfill": 48.5,
				"incineration": 3.8,
				"others": 14.6
			}
		},
		{
			"id": 13,
			"name": "Zypern",
			"nameAbrev": "CY",
			"flag": "images/flags/Flag_of_Cyprus.svg",
			"flow": [
				0.3,
				0
			],
			"resources": 0.4,
			"usage": {
				"public": {
					"nace": 2.7,
					"households": 88.6
				},
				"economic": {
					"nace": {
						"total": 2.4,
						"agri": null,
						"industry": {
							"total": 2.4,
							"manu": 2.3,
							"prod": 0.1
						},
						"services": null
					},
					"households": 76.5
				}
			},
			"disposal": {
				"agri": 42.3,
				"compost": 0,
				"landfill": 0,
				"incineration": 0,
				"others": 57.7
			}
		},
		{
			"id": 14,
			"name": "Lettland",
			"nameAbrev": "LV",
			"flag": "images/flags/Flag_of_Latvia.svg",
			"flow": [
				16.9,
				16.8
			],
			"resources": 16.7,
			"usage": {
				"public": {
					"nace": 112.9,
					"households": null
				},
				"economic": null
			},
			"disposal": {
				"agri": 36.1,
				"compost": 11.1,
				"landfill": 1.2,
				"incineration": 0,
				"others": 51.7
			}
		},
		{
			"id": 15,
			"name": "Litauen",
			"nameAbrev": "LT",
			"flag": "images/flags/Flag_of_Lithuania.svg",
			"flow": [
				15.5,
				9
			],
			"resources": 8.2,
			"usage": {
				"public": {
					"nace": 13.5,
					"households": 19.4
				},
				"economic": {
					"nace": {
						"total": 40.2,
						"agri": 0.1,
						"industry": {
							"total": 13.4,
							"manu": 7.8,
							"prod": 0.4
						},
						"services": 26.7
					},
					"households": 58
				}
			},
			"disposal": {
				"agri": 34.4,
				"compost": 65.6,
				"landfill": 0,
				"incineration": 0,
				"others": 0
			}
		},
		{
			"id": 16,
			"name": "Luxemburg",
			"nameAbrev": "LU",
			"flag": "images/flags/Flag_of_Luxembourg.svg",
			"flow": [
				0.9,
				0.7
			],
			"resources": 3.1,
			"usage": {
				"public": null,
				"economic": null
			},
			"disposal": {
				"agri": 75.8,
				"compost": 0,
				"landfill": 0,
				"incineration": 14.4,
				"others": 9.8
			}
		},
		{
			"id": 17,
			"name": "Ungarn",
			"nameAbrev": "HU",
			"flag": "images/flags/Flag_of_Hungary.svg",
			"flow": [
				7.5,
				108.9
			],
			"resources": 11.8,
			"usage": {
				"public": {
					"nace": 10.7,
					"households": 33.5
				},
				"economic": {
					"nace": {
						"total": 105.8,
						"agri": 1.3,
						"industry": {
							"total": 58.2,
							"manu": 6.4,
							"prod": 0.1
						},
						"services": 46.3
					},
					"households": 331.3
				}
			},
			"disposal": {
				"agri": 8.3,
				"compost": 70.6,
				"landfill": 9.5,
				"incineration": 10.7,
				"others": 0.9
			}
		},
		{
			"id": 18,
			"name": "Malta",
			"nameAbrev": "MT",
			"flag": "images/flags/Flag_of_Malta.svg",
			"flow": [
				0.1,
				0
			],
			"resources": 0.2,
			"usage": {
				"public": {
					"nace": 18.8,
					"households": 43.9
				},
				"economic": {
					"nace": {
						"total": 7.9,
						"agri": 0.2,
						"industry": {
							"total": 2.1,
							"manu": 1.8,
							"prod": 0.1
						},
						"services": 5.7
					},
					"households": 18.6
				}
			},
			"disposal": {
				"agri": 0,
				"compost": 0,
				"landfill": 100,
				"incineration": 0,
				"others": 0
			}
		},
		{
			"id": 19,
			"name": "Niederlande",
			"nameAbrev": "NL",
			"flag": "images/flags/Flag_of_the_Netherlands.svg",
			"flow": [
				10.3,
				81.5
			],
			"resources": 5.5,
			"usage": {
				"public": {
					"nace": 17.2,
					"households": 46.7
				},
				"economic": {
					"nace": {
						"total": 287.4,
						"agri": 39.3,
						"industry": {
							"total": 146,
							"manu": 132,
							"prod": 3.3
						},
						"services": 102.1
					},
					"households": 783
				}
			},
			"disposal": {
				"agri": 0,
				"compost": 0,
				"landfill": 0,
				"incineration": 98.9,
				"others": 1.1
			}
		},
		{
			"id": 20,
			"name": "Österreich",
			"nameAbrev": "AT",
			"flag": "images/flags/Flag_of_Austria.svg",
			"flow": [
				55,
				29
			],
			"resources": 9.9,
			"usage": {
				"public": {
					"nace": 24.6,
					"households": 45.6
				},
				"economic": {
					"nace": {
						"total": 206,
						"agri": null,
						"industry": {
							"total": null,
							"manu": null,
							"prod": null
						},
						"services": null
					},
					"households": 381
				}
			},
			"disposal": {
				"agri": 15,
				"compost": 27.9,
				"landfill": 5.1,
				"incineration": 52,
				"others": 0
			}
		},
		{
			"id": 21,
			"name": "Polen",
			"nameAbrev": "PL",
			"flag": "images/flags/Flag_of_Poland.svg",
			"flow": [
				54.8,
				8.3
			],
			"resources": 1.7,
			"usage": {
				"public": {
					"nace": 8.7,
					"households": 31.3
				},
				"economic": {
					"nace": {
						"total": 330.7,
						"agri": 145.2,
						"industry": {
							"total": 27,
							"manu": 12.5,
							"prod": 8.7
						},
						"services": 158.5
					},
					"households": 1191.1
				}
			},
			"disposal": {
				"agri": 19.5,
				"compost": 6,
				"landfill": 5.8,
				"incineration": 13.5,
				"others": 55.2
			}
		},
		{
			"id": 22,
			"name": "Portugal",
			"nameAbrev": "PT",
			"flag": "images/flags/Flag_of_Portugal.svg",
			"flow": [
				38.6,
				35
			],
			"resources": 7,
			"usage": {
				"public": {
					"nace": 9.4,
					"households": 58.6
				},
				"economic": {
					"nace": {
						"total": 98.9,
						"agri": 0.7,
						"industry": {
							"total": null,
							"manu": 17.1,
							"prod": null
						},
						"services": 10.8
					},
					"households": 619.3
				}
			},
			"disposal": {
				"agri": 89.8,
				"compost": 0,
				"landfill": 10.1,
				"incineration": 0.1,
				"others": 0
			}
		},
		{
			"id": 23,
			"name": "Rumänien",
			"nameAbrev": "RO",
			"flag": "images/flags/Flag_of_Romania.svg",
			"flow": [
				39.4,
				2.9
			],
			"resources": 2.1,
			"usage": {
				"public": {
					"nace": 19.4,
					"households": 29.4
				},
				"economic": {
					"nace": {
						"total": 388,
						"agri": 1.4,
						"industry": {
							"total": 272.3,
							"manu": null,
							"prod": 5.6
						},
						"services": 114.3
					},
					"households": 587.5
				}
			},
			"disposal": {
				"agri": 4.6,
				"compost": 0.2,
				"landfill": 68.2,
				"incineration": 0,
				"others": 26.9
			}
		},
		{
			"id": 24,
			"name": "Slowenien",
			"nameAbrev": "SI",
			"flag": "images/flags/Flag_of_Slovenia.svg",
			"flow": [
				18.6,
				13.5
			],
			"resources": 15.6,
			"usage": {
				"public": {
					"nace": 14.4,
					"households": 38.1
				},
				"economic": {
					"nace": {
						"total": 29.7,
						"agri": 1.8,
						"industry": {
							"total": 9.3,
							"manu": 10.7,
							"prod": 0.2
						},
						"services": 18.5
					},
					"households": 78.6
				}
			},
			"disposal": {
				"agri": 0,
				"compost": 10,
				"landfill": 2,
				"incineration": 53.3,
				"others": 34.7
			}
		},
		{
			"id": 25,
			"name": "Slowakei",
			"nameAbrev": "SK",
			"flag": "images/flags/Flag_of_Slovakia.svg",
			"flow": [
				13.1,
				67.3
			],
			"resources": 14.8,
			"usage": {
				"public": {
					"nace": 54.3,
					"households": null
				},
				"economic": null
			},
			"disposal": {
				"agri": 0.9,
				"compost": 61.3,
				"landfill": 11.6,
				"incineration": 8.7,
				"others": 17.5
			}
		},
		{
			"id": 26,
			"name": "Finnland",
			"nameAbrev": "FI",
			"flag": "images/flags/Flag_of_Finland.svg",
			"flow": [
				107,
				3.2
			],
			"resources": 20.3,
			"usage": {
				"public": null,
				"economic": null
			},
			"disposal": {
				"agri": 5.1,
				"compost": 65.7,
				"landfill": 6.8,
				"incineration": 22.4,
				"others": 0
			}
		},
		{
			"id": 27,
			"name": "Schweden",
			"nameAbrev": "SE",
			"flag": "images/flags/Flag_of_Sweden.svg",
			"flow": [
				172.6,
				13.6
			],
			"resources": 19.5,
			"usage": {
				"public": {
					"nace": 28.7,
					"households": 52.9
				},
				"economic": null
			},
			"disposal": {
				"agri": 24.7,
				"compost": 34,
				"landfill": 3.6,
				"incineration": 0.8,
				"others": 36.9
			}
		},
		{
			"id": 28,
			"name": "Ver. Königreich",
			"nameAbrev": "UK",
			"flag": "images/flags/Flag_of_the_United_Kingdom.svg",
			"flow": [
				161.4,
				6.5
			],
			"resources": 2.7,
			"usage": {
				"public": {
					"nace": 16.9,
					"households": 45.9
				},
				"economic": {
					"nace": {
						"total": 1066,
						"agri": 120,
						"industry": {
							"total": 345,
							"manu": 263,
							"prod": 26
						},
						"services": 601
					},
					"households": 2902
				}
			},
			"disposal": {
				"agri": 78.3,
				"compost": 0,
				"landfill": 0.4,
				"incineration": 21.2,
				"others": 0
			}
		},
		{
			"id": 29,
			"name": "Island",
			"nameAbrev": "IS",
			"flag": "images/flags/Flag_of_Iceland.svg",
			"flow": [
				170,
				0
			],
			"resources": 528.2,
			"usage": {
				"public": {
					"nace": 124.7,
					"households": 101.1
				},
				"economic": null
			}
		},
		{
			"id": 30,
			"name": "Norwegen",
			"nameAbrev": "NO",
			"flag": "images/flags/Flag_of_Norway.svg",
			"flow": [
				380.7,
				12.3
			],
			"resources": 77.8,
			"usage": {
				"public": {
					"nace": 0,
					"households": 77.1
				},
				"economic": {
					"nace": {
						"total": null,
						"agri": null,
						"industry": {
							"total": null,
							"manu": 165.1,
							"prod": null
						},
						"services": 118.6
					},
					"households": 372.4
				}
			},
			"disposal": {
				"agri": 63,
				"compost": 22.8,
				"landfill": 14.2,
				"incineration": 0,
				"others": 0.1
			}
		},
		{
			"id": 31,
			"name": "Schweiz",
			"nameAbrev": "CH",
			"flag": "images/flags/Flag_of_Switzerland.svg",
			"flow": [
				39.8,
				12.6
			],
			"resources": 6.5,
			"usage": {
				"public": {
					"nace": 32.4,
					"households": 65.5
				},
				"economic": {
					"nace": {
						"total": 264,
						"agri": 41.2,
						"industry": {
							"total": 80,
							"manu": 76.5,
							"prod": 0
						},
						"services": 141.8
					},
					"households": 544
				}
			},
			"disposal": {
				"agri": 0,
				"compost": 0,
				"landfill": 0,
				"incineration": 96.8,
				"others": 3.2
			}
		},
		{
			"id": 32,
			"name": "EJR Mazedonien",
			"nameAbrev": "MK",
			"flag": "images/flags/Flag_of_Macedonia.svg",
			"flow": [
				null,
				1
			],
			"resources": null,
			"usage": {
				"public": {
					"nace": 20.7,
					"households": 37.2
				},
				"economic": {
					"nace": {
						"total": null,
						"agri": null,
						"industry": {
							"total": 354.6,
							"manu": 352.9,
							"prod": 0.4
						},
						"services": null
					},
					"households": null
				}
			}
		},
		{
			"id": 33,
			"name": "Serbien",
			"nameAbrev": "RS",
			"flag": "images/flags/Flag_of_Serbia.svg",
			"flow": [
				12.8,
				162.6
			],
			"resources": 24.4,
			"usage": {
				"public": {
					"nace": 17.7,
					"households": 45.2
				},
				"economic": {
					"nace": {
						"total": 127,
						"agri": 4.3,
						"industry": {
							"total": 21.3,
							"manu": 15.6,
							"prod": 0.4
						},
						"services": 101
					},
					"households": 323.7
				}
			}
		},
		{
			"id": 34,
			"name": "Türkei",
			"nameAbrev": "TR",
			"flag": "images/flags/Flag_of_Turkey.svg",
			"flow": [
				227.4,
				6.9
			],
			"resources": 3.1,
			"usage": {
				"public": {
					"nace": 9.5,
					"households": 34.7
				},
				"economic": {
					"nace": {
						"total": 635.8,
						"agri": 6,
						"industry": {
							"total": 115,
							"manu": 74.5,
							"prod": 2.9
						},
						"services": 515
					},
					"households": 2377.5
				}
			}
		},
		{
			"id": 35,
			"name": "Bosnien und Herzegowina",
			"nameAbrev": "BA",
			"flag": "images/flags/Flag_of_Bosnia.svg",
			"flow": [
				null,
				null
			],
			"resources": null,
			"usage": {
				"public": {
					"nace": 8,
					"households": 28.5
				},
				"economic": {
					"nace": {
						"total": 30.8,
						"agri": 1.5,
						"industry": {
							"total": 12.6,
							"manu": null,
							"prod": null
						},
						"services": 14.3
					},
					"households": 109.3
				}
			},
			"disposal": {
				"agri": 0,
				"compost": 0,
				"landfill": 100,
				"incineration": 0,
				"others": 0
			}
		},
		{
			"id": 36,
			"name": "Kosovo",
			"nameAbrev": "XK",
			"flag": "images/flags/Flag_of_Kosovo.svg",
			"flow": [
				null,
				null
			],
			"resources": null,
			"usage": {
				"public": {
					"nace": 34.9,
					"households": 23.8
				},
				"economic": {
					"nace": {
						"total": 63,
						"agri": 52,
						"industry": {
							"total": 7,
							"manu": 5,
							"prod": null
						},
						"services": 4
					},
					"households": 43
				}
			}
		},
		{
			"id": 37,
			"name": "Albanien",
			"nameAbrev": "AL",
			"flag": "images/flags/Flag_of_Albania.svg",
			"flow": [
				null,
				null
			],
			"resources": null,
			"usage": {
				"public": {
					"nace": 100.1,
					"households": null
				},
				"economic": null
			}
		}
	];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _countries = __webpack_require__(6);

	var _countries2 = _interopRequireDefault(_countries);

	var _extendablePieChart = __webpack_require__(8);

	var _extendablePieChart2 = _interopRequireDefault(_extendablePieChart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$.fn.d3Click = function click() {
	  this.each(function (i, e) {
	    var evt = new MouseEvent('click');
	    e.dispatchEvent(evt);
	  });
	};

	// set the dimensions of the canvas
	var margin = { top: 20, right: 20, bottom: 40, left: 40 };
	var width = 1200 - margin.left - margin.right;
	var height = 400 - margin.top - margin.bottom;

	// add the SVG element
	var svg = d3.select('#barChart').append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

	var data = _countries2.default.filter(function (d) {
	  return d.usage.public !== null;
	});
	data = data.sort(function (a, b) {
	  if (a.name < b.name) return -1;
	  if (a.name > b.name) return 1;
	  return 0;
	});

	var backgroundClickDone = false;

	var headers = ['nace', 'households'];

	var layers = d3.layout.stack()(headers.map(function (category) {
	  return data.map(function (d) {
	    if (d.usage.public[category] !== null) {
	      return { x: d.nameAbrev, y: +d.usage.public[category], sector: category, data: d };
	    }
	    return { x: d.nameAbrev, y: 0, sector: category, data: d };
	  });
	}));

	var yStackMax = d3.max(layers, function (layer) {
	  return d3.max(layer, function (d) {
	    return d.y0 + d.y;
	  });
	});

	// set the ranges
	var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.15).domain(data.map(function (d) {
	  return d.nameAbrev;
	}));

	var y = d3.scale.linear().range([height, 0]).domain([0, yStackMax]);

	var color = d3.scale.ordinal().range(['#0065a8', '#41BEEE']);

	// define the axis
	var xAxis = d3.svg.axis().scale(x).orient('bottom');

	var yAxis = d3.svg.axis().scale(y).orient('left').ticks(10);

	var layer = svg.selectAll('.layer').data(layers).enter().append('g').attr('class', 'layer').style('fill', function (d, i) {
	  return color(i);
	});

	var rect = layer.selectAll('rect').data(function (d) {
	  return d;
	}).enter().append('rect').attr('x', function (d) {
	  return x(d.x);
	}).attr('y', height).attr('class', function (d) {
	  return 'data' + d.data.id;
	}).attr('width', x.rangeBand()).attr('height', 0).style('cursor', 'pointer');

	rect.transition().delay(function (d, i) {
	  return i * 10;
	}).attr('y', function (d) {
	  return y(d.y0 + d.y);
	}).attr('height', function (d) {
	  return y(d.y0) - y(d.y0 + d.y);
	});

	// add axis
	svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + height + ')').call(xAxis).selectAll('text').style('text-anchor', 'middle');

	svg.append('g').attr('class', 'y axis').call(yAxis).append('text').attr('transform', 'rotate(-90)').attr('y', 5).attr('dy', '.71em').attr('font-size', '14px').style('text-anchor', 'end').text('Verbrauch in m³');

	// Prep the tooltip bits, initial display is hidden
	var tooltip = svg.append('g').attr('class', 'barChartTooltip').style('display', 'none');

	tooltip.append('rect').attr('width', 130).attr('height', 50).attr('fill', 'white').style('opacity', 0.5);

	var tooltipCountry = tooltip.append('text').attr('x', 5).attr('dy', '1.2em').style('text-anchor', 'start').attr('font-size', '12px').attr('font-weight', 'bold');

	var tooltipHouseholds = tooltip.append('text').attr('x', 5).attr('dy', '2.4em').style('text-anchor', 'start').attr('font-size', '12px').attr('font-weight', 'bold');

	var tooltipNace = tooltip.append('text').attr('x', 5).attr('dy', '3.6em').style('text-anchor', 'start').attr('font-size', '12px').attr('font-weight', 'bold');

	// Click indicator
	var clickIndicator = svg.append('svg:image').attr('xlink:href', 'images/icons/clickindicator.svg').attr('width', '200').attr('x', 500).attr('y', 30);

	// Legend
	var legend = svg.append('g').attr('class', 'barChartLegend').attr('transform', 'translate(1000,10)');

	legend.append('rect').attr('height', 15).attr('width', 15).attr('fill', '#41BEEE');

	legend.append('text').text('Haushalte').style('text-anchor', 'start').attr('font-size', '12px').attr('x', 20).attr('y', 12);

	legend.append('rect').attr('height', 15).attr('width', 15).attr('fill', '#0065a8').attr('y', 20);

	legend.append('text').text('Unternehmen').style('text-anchor', 'start').attr('font-size', '12px').attr('x', 20).attr('y', 32);

	// EVENTS
	rect.on('mouseover', function (d) {
	  tooltip.style('display', null);

	  var rects = document.querySelectorAll('rect.data' + d.data.id);

	  rects[0].classList.toggle('hover1');
	  rects[1].classList.toggle('hover2');
	}).on('mouseout', function (d) {
	  tooltip.style('display', 'none');

	  var rects = document.querySelectorAll('rect.data' + d.data.id);

	  rects[0].classList.toggle('hover1');
	  rects[1].classList.toggle('hover2');
	}).on('mousemove', function (d) {
	  // eslint-disable-line func-names
	  var countryName = d.data.name;
	  if (countryName === 'Bosnien und Herzegowina') countryName = 'Bosn. u. Herzegowina';
	  var dataHouseholds = d.data.usage.public.households;
	  var dataNace = d.data.usage.public.nace;
	  var xPosition = d3.mouse(this)[0] - 65;
	  var yPosition = d3.mouse(this)[1] - 35;
	  tooltip.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
	  if (dataHouseholds !== null) {
	    tooltipCountry.text(countryName);
	    tooltipHouseholds.text('Haushalte: ' + dataHouseholds);
	    tooltipNace.text('Unternehmen: ' + dataNace);
	  } else {
	    tooltipCountry.text(countryName);
	    tooltipHouseholds.text('Haushalte und');
	    tooltipNace.text('Unternehmen: ' + dataNace);
	  }
	}).on('click', function (d) {
	  clickIndicator.style('display', 'none');

	  var allRects = document.querySelectorAll('#barChart rect');

	  allRects.forEach(function (el) {
	    el.classList.remove('clicked1');
	    el.classList.remove('clicked2');
	  });

	  document.querySelectorAll('rect.data' + d.data.id)[0].classList.add('clicked1');
	  document.querySelectorAll('rect.data' + d.data.id)[1].classList.add('clicked2');

	  document.querySelector('#usageCountry img').src = d.data.flag;
	  document.querySelector('#usageCountry h2').innerHTML = d.data.name;

	  var selCountry = _countries2.default.filter(function (country) {
	    return country.name === d.data.name;
	  });
	  if (!backgroundClickDone) {
	    if (d.x === 'NO') {
	      _extendablePieChart2.default.update(selCountry);
	      $('#pieChartSvg path').last().d3Click();
	    } else {
	      $('#pieChartSvg path').first().d3Click();
	    }
	    backgroundClickDone = true;
	  }
	  if (d.x === 'NO') {
	    _extendablePieChart2.default.update(selCountry);
	    $('#pieChartSvg path').last().d3Click();
	  }
	  _extendablePieChart2.default.update(selCountry);
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _liquidFillGauge = __webpack_require__(9);

	var _liquidFillGauge2 = _interopRequireDefault(_liquidFillGauge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dataset = {
	  "id": 1,
	  "name": "Belgien",
	  "flag": "images/flags/Flag_of_Belgium.svg",
	  "flow": [12.3, 7.6],
	  "usage": {
	    "public": {
	      "nace": 16.7,
	      "households": 9.7
	    },
	    "economic": {
	      "nace": {
	        "total": 185,
	        "agri": 9,
	        "industry": {
	          "total": 103,
	          "manu": 103,
	          "prod": 2
	        },
	        "services": 73
	      },
	      "households": {
	        "total": 107
	      }
	    }
	  }
	};

	var data = [dataset.usage.economic.nace.total, dataset.usage.economic.households.total];

	var width = 220;
	var height = 220;
	var radius = 110;
	var color = d3.scale.ordinal().range(['#0065a8', '#41BEEE']);

	var selCountryData = void 0;
	var selSector = 'nace';

	var headers = ['nace', 'households'];

	var animatedTextTimer = void 0;

	var pie = d3.layout.pie().value(function (d) {
	  return d;
	}).sort(null);

	var arc = d3.svg.arc().innerRadius(radius - 20).outerRadius(radius - 10);

	var svg = d3.select('#extendablePieChart').append('svg').data([data]).attr('id', 'pieChartSvg').attr('width', width).attr('height', height).append('g').attr('transform', "translate( " + width / 2 + ", " + height / 2 + ")");

	$('#pieChartSvg').hide();

	var path = svg.selectAll('path').data(pie).enter().append('path').attr('d', arc).attr('data-sector', function (d) {
	  return d.startAngle === 0 ? 'nace' : 'households';
	}).attr('fill', function (d, i) {
	  return color(i);
	}).each(function (d) {
	  this.current = d;
	}).on('mouseover', function (d) {
	  d3.select(this).transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(radius - 20).outerRadius(radius));

	  if ($(this).data('sector') === 'nace') {
	    donutImage.attr('xlink:href', 'images/icons/industry.svg');
	    donutText.text('Unternehmen');
	  } else {
	    donutImage.attr('xlink:href', 'images/icons/households.svg');
	    donutText.text('Haushalte');
	  }
	}).on('mouseout', function (d) {
	  var thisPath = d3.select(this);
	  if (!thisPath.classed('clicked')) {
	    d3.select(this).transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(radius - 20).outerRadius(radius - 10));
	  }

	  if (thisPath.classed('clicked')) {
	    if ($(this).data('sector') === 'nace') {
	      donutImage.attr('xlink:href', 'images/icons/industry.svg');
	      donutText.text('Unternehmen');
	    } else {
	      donutImage.attr('xlink:href', 'images/icons/households.svg');
	      donutText.text('Haushalte');
	    }
	  } else {
	    if ($(this).data('sector') === 'nace') {
	      donutImage.attr('xlink:href', 'images/icons/households.svg');
	      donutText.text('Haushalte');
	    } else {
	      donutImage.attr('xlink:href', 'images/icons/industry.svg');
	      donutText.text('Unternehmen');
	    }
	  }
	}).on('click', function (d) {
	  svg.selectAll('path').classed('clicked', false);

	  svg.selectAll('path').transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(radius - 20).outerRadius(radius - 10));

	  var thisPath = d3.select(this);
	  var clicked = thisPath.classed('clicked');
	  thisPath.transition().duration(500).ease('bounce').attr('d', d3.svg.arc().innerRadius(radius - 20).outerRadius(radius));
	  thisPath.classed('clicked', !clicked);

	  if ($(this).data('sector') === 'nace') {
	    $('#householdsGauge').hide();
	    $('#liquidFillGauges').show();
	    updateGauges();
	  } else {
	    $('#liquidFillGauges').hide();
	    $('#householdsGauge').show();
	    $('#householdsGaugeText').show();
	    var oldValue = Math.floor(Number($('#householdsGauge').text().split(' ')[0]));
	    var newValue = Math.floor(selCountryData[0].usage.economic.households);
	    animatedTextTimer = animateValue('householdsGaugeText', oldValue, newValue, 1000);
	  }
	  selSector = thisPath.attr('data-sector');
	});

	var donutImage = svg.append('svg:image').attr('xlink:href', 'images/icons/industry.svg').attr('x', -40).attr('y', -55).attr('width', '80').attr('height', '80');

	var donutText = svg.append('text').text('Unternehmen').attr('y', 50).attr('fill', '#0065a8').attr('text-anchor', 'middle');

	function update(newData) {
	  document.querySelector('.economicUsage').style = 'height: 450px';
	  selCountryData = newData;
	  var nace = newData[0].usage.economic !== null ? newData[0].usage.economic.nace.total : null;
	  var households = newData[0].usage.economic !== null ? newData[0].usage.economic.households : null;
	  if (nace === null && households === null) {
	    $('#pieChartSvg path').first().d3Click();
	    $('#pieChartSvg').show();
	    $('#gaugesContainer').show();
	    $('.hoverDisabler').show();
	    svg.selectAll('path').data(pie([100, 0])).transition().duration(750).attrTween('d', arcTween).style('opacity', 0.5);
	    donutImage.style('display', 'none');
	    donutText.text('Keine Daten vorhanden').attr('y', 5).style('opacity', 0.5);
	    $('#householdsGaugeText').hide();
	  } else {
	    $('#pieChartSvg').show();
	    $('#gaugesContainer').show();
	    $('.hoverDisabler').hide();
	    svg.selectAll('path').data(pie([nace, households])).transition().duration(750).attrTween('d', arcTween).style('opacity', 1);
	    donutImage.style('display', 'block');

	    if ($('#extendablePieChart path.clicked').data('sector') === 'nace') {
	      donutText.text('Unternehmen');
	    } else {
	      donutText.text('Haushalte');
	      donutImage.attr('xlink:href', 'images/icons/households.svg');
	      $('#householdsGaugeText').show();
	    }
	    donutText.attr('y', 50).style('opacity', 1);
	  }

	  if (selSector === 'nace') {
	    updateGauges();
	  } else if (selSector === 'households') {
	    var oldValue = Math.floor(Number($('#householdsGauge').text().split(' ')[0]));
	    var newValue = Math.floor(selCountryData[0].usage.economic.households);

	    clearInterval(animatedTextTimer);
	    animatedTextTimer = animateValue('householdsGaugeText', oldValue, newValue, 1000);
	  }
	}

	// Gauges
	var agriGauge = _liquidFillGauge2.default.render('agriGauge', 0, 0, 'Land- und\nForstwirtschaft,\nFischerei');
	var manuGauge = _liquidFillGauge2.default.render('manuGauge', 0, 0, 'Verarbeitendes\nGewerbe');
	var prodGauge = _liquidFillGauge2.default.render('prodGauge', 0, 0, 'Elektrizitäts-\nerzeugung und\n-verteilung');
	var servicesGauge = _liquidFillGauge2.default.render('servicesGauge', 0, 0, 'Dienstleistungen');

	function animateValue(id, start, end, duration) {
	  if (start !== end) {
	    var _ret = function () {
	      var range = end - start;
	      var current = start;
	      var increment = end > start ? 8 : -8;
	      var stepTime = Math.abs(Math.floor(duration / range));
	      var obj = document.getElementById(id);
	      var timer = setInterval(function () {
	        if (Math.abs(start - end) < 8) {
	          increment = end > start ? 1 : -1;
	        }

	        current += increment;
	        obj.innerHTML = current + " Mio. M\xB3";

	        if (end - current < 8 && end > current) {
	          increment = end > start ? 1 : -1;
	        }

	        if (current - end < 8 && end < current) {
	          increment = end > start ? 1 : -1;
	        }

	        if (current === end) {
	          clearInterval(timer);
	        }
	      }, stepTime);

	      return {
	        v: timer
	      };
	    }();

	    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	  }
	}

	function updateGauges() {
	  if (selCountryData === undefined) {
	    return;
	  }
	  if (selCountryData[0].usage.economic === null) {
	    updateGaugesWithNoData();
	    return;
	  }
	  var total = selCountryData[0].usage.economic.nace.agri + selCountryData[0].usage.economic.nace.industry.manu + selCountryData[0].usage.economic.nace.industry.prod + selCountryData[0].usage.economic.nace.services;

	  var dataAgri = selCountryData[0].usage.economic.nace.agri;
	  var dataManu = selCountryData[0].usage.economic.nace.industry.manu;
	  var dataProd = selCountryData[0].usage.economic.nace.industry.prod;
	  var dataServices = selCountryData[0].usage.economic.nace.services;

	  agriGauge.update(dataAgri !== null ? dataAgri / total * 100 : dataAgri, dataAgri);
	  manuGauge.update(dataManu !== null ? dataManu / total * 100 : dataManu, dataManu);
	  prodGauge.update(dataProd !== null ? dataProd / total * 100 : dataProd, dataProd);
	  servicesGauge.update(dataServices !== null ? dataServices / total * 100 : dataServices, dataServices);
	}

	function updateGaugesWithNoData() {
	  agriGauge.update(null, null);
	  manuGauge.update(null, null);
	  prodGauge.update(null, null);
	  servicesGauge.update(null, null);
	}

	// Store the displayed angles in _current.
	// Then, interpolate from _current to the new angles.
	// During the transition, _current is updated in-place by d3.interpolate.
	function arcTween(a) {
	  var clickedPath = $('#pieChartSvg path.clicked')[0].__data__;

	  var arcNew = d3.svg.arc().innerRadius(radius - 20).outerRadius(radius - 10);

	  if (clickedPath.startAngle === a.startAngle) {
	    arcNew = d3.svg.arc().innerRadius(radius - 20).outerRadius(radius);
	  }

	  var i = d3.interpolate(this.current, a);
	  this.current = i(0);
	  return function (t) {
	    return arcNew(i(t));
	  };
	}

	module.exports = {
	  update: update
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	function liquidFillGaugeDefaultSettings() {
	    return {
	        minValue: 0, // The gauge minimum value.
	        maxValue: 100, // The gauge maximum value.
	        circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
	        circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
	        circleColor: '#41BEEE', // The color of the outer circle.
	        waveHeight: 0.07, // The wave height as a percentage of the radius of the wave circle.
	        waveCount: 1, // The number of full waves per width of the wave circle.
	        waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
	        waveAnimateTime: 3000, // The amount of time in milliseconds for a full wave to enter the wave circle.
	        waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
	        waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
	        waveAnimate: true, // Controls if the wave scrolls or is static.
	        waveColor: '#178BCA', // The color of the fill wave.
	        waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
	        textVertPosition: 0.5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
	        textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
	        valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
	        displayPercent: true, // If true, a % symbol is displayed after the value.
	        textColor: '#0065a8', // The color of the value text when the wave does not overlap it.
	        waveTextColor: '#a8e0f6' // The color of the value text when the wave overlaps it.
	    };
	}

	function render(elementId, value, absoluteNumber, label, config) {
	    if (config == null) config = liquidFillGaugeDefaultSettings();

	    var gauge = d3.select("#" + elementId);
	    var radius = 50;
	    var locationX = parseInt(gauge.style("width")) / 2 - radius;
	    var locationY = 0;
	    var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;

	    var waveHeightScale;
	    if (config.waveHeightScaling) {
	        waveHeightScale = d3.scale.linear().range([0, config.waveHeight, 0]).domain([0, 50, 100]);
	    } else {
	        waveHeightScale = d3.scale.linear().range([config.waveHeight, config.waveHeight]).domain([0, 100]);
	    }

	    var textPixels = config.textSize * radius / 2;
	    var textPixelsLabel = config.textSize * radius / 3.5;
	    var textPixelsNumber = config.textSize * radius / 4;
	    var textFinalValue = Math.round(value);
	    var numberFinalValue = absoluteNumber;
	    var textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
	    var numberStartValue = config.minValue;
	    var percentText = config.displayPercent ? "%" : "";
	    var circleThickness = config.circleThickness * radius;
	    var circleFillGap = config.circleFillGap * radius;
	    var fillCircleMargin = circleThickness + circleFillGap;
	    var fillCircleRadius = radius - fillCircleMargin;
	    var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);

	    var waveLength = fillCircleRadius * 2 / config.waveCount;
	    var waveClipCount = 1 + config.waveCount;
	    var waveClipWidth = waveLength * waveClipCount;

	    // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
	    var textRounder = function textRounder(value) {
	        return Math.round(value);
	    };
	    if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
	        textRounder = function textRounder(value) {
	            return Math.round(value);
	        };
	    }
	    if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
	        textRounder = function textRounder(value) {
	            return Math.round(value);
	        };
	    }

	    // Data for building the clip wave area.
	    var data = [];
	    for (var i = 0; i <= 40 * waveClipCount; i++) {
	        data.push({ x: i / (40 * waveClipCount), y: i / 40 });
	    }

	    // Scales for drawing the outer circle.
	    var gaugeCircleX = d3.scale.linear().range([0, 2 * Math.PI]).domain([0, 1]);
	    var gaugeCircleY = d3.scale.linear().range([0, radius]).domain([0, radius]);

	    // Scales for controlling the size of the clipping path.
	    var waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
	    var waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);

	    // Scales for controlling the position of the clipping path.
	    var waveRiseScale = d3.scale.linear()
	    // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
	    // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
	    // circle at 100%.
	    .range([fillCircleMargin + fillCircleRadius * 2 + waveHeight, fillCircleMargin - waveHeight]).domain([0, 1]);
	    var waveAnimateScale = d3.scale.linear().range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
	    .domain([0, 1]);

	    // Scale for controlling the position of the text within the gauge.
	    var textRiseScaleY = d3.scale.linear().range([fillCircleMargin + fillCircleRadius * 2, fillCircleMargin + textPixels * 0.7]).domain([0, 1]);

	    // Center the gauge within the parent SVG.
	    var gaugeGroup = gauge.append("g").attr('transform', 'translate(' + locationX + ',' + locationY + ')');

	    // Draw the outer circle.
	    var gaugeCircleArc = d3.svg.arc().startAngle(gaugeCircleX(0)).endAngle(gaugeCircleX(1)).outerRadius(gaugeCircleY(radius)).innerRadius(gaugeCircleY(radius - circleThickness));
	    gaugeGroup.append("path").attr("d", gaugeCircleArc).style("fill", config.circleColor).attr('transform', 'translate(' + radius + ',' + radius + ')');

	    // Text where the wave does not overlap.
	    var text1 = gaugeGroup.append("text").text(textRounder(textStartValue) + percentText).attr("class", "liquidFillGaugeText").attr("text-anchor", "middle").attr("font-size", textPixels + "px").attr('dy', '-7px').style("fill", config.textColor).attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');

	    var absoluteNumber1 = gaugeGroup.append("text").text(textRounder(numberStartValue) + ' Mio. m³').attr("class", "liquidFillGaugeText").attr("text-anchor", "middle").attr("font-size", textPixelsNumber + "px").attr('dy', '11px').style("fill", config.textColor).attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');

	    // The clipping wave area.
	    var clipArea = d3.svg.area().x(function (d) {
	        return waveScaleX(d.x);
	    }).y0(function (d) {
	        return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI));
	    }).y1(function (d) {
	        return fillCircleRadius * 2 + waveHeight;
	    });
	    var waveGroup = gaugeGroup.append("defs").append("clipPath").attr("id", "clipWave" + elementId);
	    var wave = waveGroup.append("path").datum(data).attr("d", clipArea).attr("T", 0);

	    // The inner circle with the clipping wave attached.
	    var fillCircleGroup = gaugeGroup.append("g").attr("clip-path", "url(#clipWave" + elementId + ")");
	    fillCircleGroup.append("circle").attr("cx", radius).attr("cy", radius).attr("r", fillCircleRadius).style("fill", config.waveColor);

	    // Text where the wave does overlap.
	    var text2 = fillCircleGroup.append("text").text(textRounder(textStartValue) + percentText).attr("class", "liquidFillGaugeText").attr("text-anchor", "middle").attr("font-size", textPixels + "px").attr('dy', '-7px').style("fill", config.waveTextColor).attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');

	    var absoluteNumber2 = fillCircleGroup.append("text").text(textRounder(numberStartValue) + ' Mio. m³').attr("class", "liquidFillGaugeText").attr("text-anchor", "middle").attr("font-size", textPixelsNumber + "px").attr('dy', '11px').style("fill", config.waveTextColor).attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');

	    var labelText = gauge.append('text').attr('class', 'gaugeLabels').attr('y', '105px');
	    var labelParts = label.split('\n');
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = labelParts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _label = _step.value;

	            labelText.append('tspan').text(_label).attr("font-size", textPixelsLabel + "px").attr('dy', '20px').attr('dx', '75px').attr('x', 0).attr("text-anchor", "middle").style("fill", config.textColor);
	        }

	        // Make the value count up.
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    if (config.valueCountUp) {
	        var textTween = function textTween() {
	            var i = d3.interpolate(this.textContent, textFinalValue);
	            return function (t) {
	                this.textContent = textRounder(i(t)) + percentText;
	            };
	        };
	        text1.transition().duration(config.waveRiseTime).tween("text", textTween);
	        text2.transition().duration(config.waveRiseTime).tween("text", textTween);
	    }

	    // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
	    var waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
	    if (config.waveRise) {
	        waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')').transition().duration(config.waveRiseTime).attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')').each("start", function () {
	            wave.attr('transform', 'translate(1,0)');
	        }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
	    } else {
	        waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')');
	    }

	    if (config.waveAnimate) animateWave();

	    function animateWave() {
	        wave.attr('transform', 'translate(' + waveAnimateScale(wave.attr('T')) + ',0)');
	        wave.transition().duration(config.waveAnimateTime * (1 - wave.attr('T'))).ease('linear').attr('transform', 'translate(' + waveAnimateScale(1) + ',0)').attr('T', 1).each('end', function () {
	            wave.attr('T', 0);
	            animateWave(config.waveAnimateTime);
	        });
	    }

	    function GaugeUpdater() {
	        this.update = function (value, absoluteNumber) {
	            if (value === null) {
	                gauge.style('opacity', 0.5);
	            } else {
	                gauge.style('opacity', 1);
	            }
	            var newFinalValue = Math.round(value);
	            var textRounderUpdater = function textRounderUpdater(value) {
	                return Math.round(value);
	            };
	            if (parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))) {
	                textRounderUpdater = function textRounderUpdater(value) {
	                    return Math.round(value);
	                };
	            }
	            if (parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))) {
	                textRounderUpdater = function textRounderUpdater(value) {
	                    return Math.round(value);
	                };
	            }

	            var textTween = function textTween() {
	                var i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
	                return function (t) {
	                    this.textContent = textRounderUpdater(i(t)) + percentText;
	                };
	            };

	            var numberTween = function numberTween() {
	                var i = d3.interpolate(this.textContent, parseFloat(absoluteNumber).toFixed(2));
	                return function (t) {
	                    this.textContent = textRounderUpdater(i(t)) + ' Mio. m³';
	                };
	            };

	            if (value === null) {
	                text1.text('✕').attr('dy', '0px');
	                text2.text('✕').attr('dy', '0px');
	                absoluteNumber1.text('');
	                absoluteNumber2.text('');
	            } else {
	                if (text1.text() === '✕' || text1.text() === 'NaN%') {
	                    text1.text('0%').attr('dy', '-7px').transition().duration(config.waveRiseTime).tween("text", textTween);
	                    text2.text('0%').attr('dy', '-7px').transition().duration(config.waveRiseTime).tween("text", textTween);
	                    absoluteNumber1.text('0 Mio. m³').transition().duration(config.waveRiseTime).tween('text', numberTween);
	                    absoluteNumber2.text('0 Mio. m³').transition().duration(config.waveRiseTime).tween('text', numberTween);
	                } else {
	                    text1.attr('dy', '-7px').transition().duration(config.waveRiseTime).tween("text", textTween);
	                    text2.attr('dy', '-7px').transition().duration(config.waveRiseTime).tween("text", textTween);
	                    absoluteNumber1.transition().duration(config.waveRiseTime).tween('text', numberTween);
	                    absoluteNumber2.transition().duration(config.waveRiseTime).tween('text', numberTween);
	                }
	            }

	            var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
	            var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
	            var waveRiseScale = d3.scale.linear()
	            // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
	            // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
	            // circle at 100%.
	            .range([fillCircleMargin + fillCircleRadius * 2 + waveHeight, fillCircleMargin - waveHeight]).domain([0, 1]);
	            var newHeight = waveRiseScale(fillPercent);
	            var waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
	            var waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);
	            var newClipArea;
	            if (config.waveHeightScaling) {
	                newClipArea = d3.svg.area().x(function (d) {
	                    return waveScaleX(d.x);
	                }).y0(function (d) {
	                    return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI));
	                }).y1(function (d) {
	                    return fillCircleRadius * 2 + waveHeight;
	                });
	            } else {
	                newClipArea = clipArea;
	            }

	            var newWavePosition = config.waveAnimate ? waveAnimateScale(1) : 0;
	            wave.transition().duration(0).transition().duration(config.waveAnimate ? config.waveAnimateTime * (1 - wave.attr('T')) : config.waveRiseTime).ease('linear').attr('d', newClipArea).attr('transform', 'translate(' + newWavePosition + ',0)').attr('T', '1').each("end", function () {
	                if (config.waveAnimate) {
	                    wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
	                    animateWave(config.waveAnimateTime);
	                }
	            });
	            waveGroup.transition().duration(config.waveRiseTime).attr('transform', 'translate(' + waveGroupXPosition + ',' + newHeight + ')');
	        };
	    }
	    return new GaugeUpdater();
	}

	module.exports = {
	    render: render
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = {
		"type": "FeatureCollection",
		"features": [
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 6,
					"sovereignt": "Albania",
					"sov_a3": "ALB",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Albania",
					"adm0_a3": "ALB",
					"geou_dif": 0,
					"geounit": "Albania",
					"gu_a3": "ALB",
					"su_dif": 0,
					"subunit": "Albania",
					"su_a3": "ALB",
					"brk_diff": 0,
					"id": 37,
					"name": "Albanien",
					"name_long": "Albania",
					"brk_a3": "ALB",
					"brk_name": "Albania",
					"brk_group": null,
					"abbrev": "Alb.",
					"postal": "AL",
					"formal_en": "Republic of Albania",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Albania",
					"name_alt": null,
					"mapcolor7": 1,
					"mapcolor8": 4,
					"mapcolor9": 1,
					"mapcolor13": 6,
					"pop_est": 3639453,
					"gdp_md_est": 21810,
					"pop_year": -99,
					"lastcensus": 2001,
					"gdp_year": -99,
					"economy": "6. Developing region",
					"income_grp": "4. Lower middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "AL",
					"iso_a3": "ALB",
					"iso_n3": "008",
					"un_a3": "008",
					"wb_a2": "AL",
					"wb_a3": "ALB",
					"woe_id": -99,
					"adm0_a3_is": "ALB",
					"adm0_a3_us": "ALB",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								20.59024743010491,
								41.855404161133606
							],
							[
								20.463175083099202,
								41.51508901627534
							],
							[
								20.605181919037364,
								41.086226304685226
							],
							[
								21.0200403174764,
								40.84272695572588
							],
							[
								20.999989861747224,
								40.58000397395398
							],
							[
								20.674996779063633,
								40.43499990494303
							],
							[
								20.615000441172754,
								40.11000682225938
							],
							[
								20.15001590341052,
								39.62499766698397
							],
							[
								19.980000441170148,
								39.69499339452341
							],
							[
								19.960001661873207,
								39.91500580500605
							],
							[
								19.406081984136733,
								40.250773423822466
							],
							[
								19.319058872157143,
								40.72723012955356
							],
							[
								19.40354983895429,
								41.40956574153546
							],
							[
								19.540027296637106,
								41.71998607031276
							],
							[
								19.37176883309496,
								41.877547512370654
							],
							[
								19.304486118250793,
								42.19574514420782
							],
							[
								19.73805138517963,
								42.68824738216557
							],
							[
								19.801613396898688,
								42.50009349219084
							],
							[
								20.0707,
								42.58863
							],
							[
								20.283754510181893,
								42.32025950781508
							],
							[
								20.52295,
								42.21787
							],
							[
								20.59024743010491,
								41.855404161133606
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 4,
					"sovereignt": "Austria",
					"sov_a3": "AUT",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Austria",
					"adm0_a3": "AUT",
					"geou_dif": 0,
					"geounit": "Austria",
					"gu_a3": "AUT",
					"su_dif": 0,
					"subunit": "Austria",
					"su_a3": "AUT",
					"brk_diff": 0,
					"id": 20,
					"name": "Österreich",
					"name_long": "Austria",
					"brk_a3": "AUT",
					"brk_name": "Austria",
					"brk_group": null,
					"abbrev": "Aust.",
					"postal": "A",
					"formal_en": "Republic of Austria",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Austria",
					"name_alt": null,
					"mapcolor7": 3,
					"mapcolor8": 1,
					"mapcolor9": 3,
					"mapcolor13": 4,
					"pop_est": 8210281,
					"gdp_md_est": 329500,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "AT",
					"iso_a3": "AUT",
					"iso_n3": "040",
					"un_a3": "040",
					"wb_a2": "AT",
					"wb_a3": "AUT",
					"woe_id": -99,
					"adm0_a3_is": "AUT",
					"adm0_a3_us": "AUT",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Western Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 5,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								16.979666782304037,
								48.123497015976305
							],
							[
								16.90375410326726,
								47.71486562762833
							],
							[
								16.340584344150415,
								47.71290192320123
							],
							[
								16.534267612380376,
								47.49617096616912
							],
							[
								16.202298211337364,
								46.85238597267696
							],
							[
								16.011663852612656,
								46.6836107448117
							],
							[
								15.137091912504985,
								46.65870270444703
							],
							[
								14.63247155117483,
								46.43181732846955
							],
							[
								13.806475457421527,
								46.509306138691215
							],
							[
								12.376485223040817,
								46.76755910906985
							],
							[
								12.153088006243054,
								47.11539317482645
							],
							[
								11.16482791509327,
								46.94157949481273
							],
							[
								11.048555942436536,
								46.75135854754634
							],
							[
								10.44270145024663,
								46.89354625099743
							],
							[
								9.932448357796659,
								46.92072805438296
							],
							[
								9.479969516649021,
								47.102809963563374
							],
							[
								9.632931756232978,
								47.34760122332999
							],
							[
								9.59422610844635,
								47.52505809182027
							],
							[
								9.89606814946319,
								47.580196845075704
							],
							[
								10.402083774465211,
								47.30248769793916
							],
							[
								10.544504021861627,
								47.56639923765377
							],
							[
								11.426414015354737,
								47.523766181012974
							],
							[
								12.141357456112788,
								47.703083401065776
							],
							[
								12.620759718484493,
								47.67238760028441
							],
							[
								12.932626987365948,
								47.467645575544
							],
							[
								13.02585127122049,
								47.63758352313583
							],
							[
								12.884102817443903,
								48.28914581968792
							],
							[
								13.243357374737,
								48.416114813829054
							],
							[
								13.595945672264437,
								48.87717194273715
							],
							[
								14.338897739324722,
								48.55530528420721
							],
							[
								14.901447381254057,
								48.964401760445824
							],
							[
								15.253415561593982,
								49.03907420510758
							],
							[
								16.02964725105022,
								48.73389903420793
							],
							[
								16.499282667718774,
								48.78580801044511
							],
							[
								16.960288120194576,
								48.5969823268506
							],
							[
								16.879982944413,
								48.47001333270947
							],
							[
								16.979666782304037,
								48.123497015976305
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 2,
					"sovereignt": "Belgium",
					"sov_a3": "BEL",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Belgium",
					"adm0_a3": "BEL",
					"geou_dif": 0,
					"geounit": "Belgium",
					"gu_a3": "BEL",
					"su_dif": 0,
					"subunit": "Belgium",
					"su_a3": "BEL",
					"brk_diff": 0,
					"id": 1,
					"name": "Belgien",
					"name_long": "Belgium",
					"brk_a3": "BEL",
					"brk_name": "Belgium",
					"brk_group": null,
					"abbrev": "Belg.",
					"postal": "B",
					"formal_en": "Kingdom of Belgium",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Belgium",
					"name_alt": null,
					"mapcolor7": 3,
					"mapcolor8": 2,
					"mapcolor9": 1,
					"mapcolor13": 8,
					"pop_est": 10414336,
					"gdp_md_est": 389300,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "BE",
					"iso_a3": "BEL",
					"iso_n3": "056",
					"un_a3": "056",
					"wb_a2": "BE",
					"wb_a3": "BEL",
					"woe_id": -99,
					"adm0_a3_is": "BEL",
					"adm0_a3_us": "BEL",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Western Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 5,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								3.314971144228537,
								51.345780951536085
							],
							[
								4.047071160507528,
								51.26725861266857
							],
							[
								4.973991326526914,
								51.47502370869813
							],
							[
								5.606975945670001,
								51.03729848896978
							],
							[
								6.15665815595878,
								50.80372101501058
							],
							[
								6.043073357781111,
								50.128051662794235
							],
							[
								5.782417433300907,
								50.09032786722122
							],
							[
								5.674051954784829,
								49.529483547557504
							],
							[
								4.79922163251581,
								49.985373033236385
							],
							[
								4.286022983425084,
								49.907496649772554
							],
							[
								3.588184441755686,
								50.37899241800358
							],
							[
								3.123251580425801,
								50.780363267614575
							],
							[
								2.658422071960274,
								50.796848049515745
							],
							[
								2.513573032246143,
								51.14850617126183
							],
							[
								3.314971144228537,
								51.345780951536085
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 4,
					"sovereignt": "Bulgaria",
					"sov_a3": "BGR",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Bulgaria",
					"adm0_a3": "BGR",
					"geou_dif": 0,
					"geounit": "Bulgaria",
					"gu_a3": "BGR",
					"su_dif": 0,
					"subunit": "Bulgaria",
					"su_a3": "BGR",
					"brk_diff": 0,
					"id": 2,
					"name": "Bulgarien",
					"name_long": "Bulgaria",
					"brk_a3": "BGR",
					"brk_name": "Bulgaria",
					"brk_group": null,
					"abbrev": "Bulg.",
					"postal": "BG",
					"formal_en": "Republic of Bulgaria",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Bulgaria",
					"name_alt": null,
					"mapcolor7": 4,
					"mapcolor8": 5,
					"mapcolor9": 1,
					"mapcolor13": 8,
					"pop_est": 7204687,
					"gdp_md_est": 93750,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "BG",
					"iso_a3": "BGR",
					"iso_n3": "100",
					"un_a3": "100",
					"wb_a2": "BG",
					"wb_a3": "BGR",
					"woe_id": -99,
					"adm0_a3_is": "BGR",
					"adm0_a3_us": "BGR",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Eastern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 8,
					"long_len": 8,
					"abbrev_len": 5,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								22.65714969248299,
								44.23492300066128
							],
							[
								22.944832391051847,
								43.82378530534713
							],
							[
								23.332302280376325,
								43.897010809904714
							],
							[
								24.100679152124172,
								43.74105133724785
							],
							[
								25.569271681426926,
								43.68844472917472
							],
							[
								26.065158725699746,
								43.94349376075127
							],
							[
								27.242399529740908,
								44.175986029632405
							],
							[
								27.970107049275075,
								43.81246816667522
							],
							[
								28.558081495891997,
								43.70746165625813
							],
							[
								28.03909508638472,
								43.293171698574184
							],
							[
								27.67389773937805,
								42.57789236100622
							],
							[
								27.99672041190539,
								42.00735871028779
							],
							[
								27.13573937349048,
								42.14148489030134
							],
							[
								26.1170418637208,
								41.82690460872456
							],
							[
								26.106138136507212,
								41.32889883072778
							],
							[
								25.197201368925448,
								41.23448598893053
							],
							[
								24.492644891058035,
								41.583896185872035
							],
							[
								23.692073601992348,
								41.309080918943856
							],
							[
								22.952377150166452,
								41.33799388281115
							],
							[
								22.88137373219743,
								41.99929718685026
							],
							[
								22.380525750424592,
								42.32025950781509
							],
							[
								22.54501183440962,
								42.46136200618804
							],
							[
								22.43659467946128,
								42.580321153323936
							],
							[
								22.60480146657133,
								42.898518785161144
							],
							[
								22.986018507588483,
								43.211161200526966
							],
							[
								22.50015669118028,
								43.64281443946099
							],
							[
								22.410446404721597,
								44.008063462899955
							],
							[
								22.65714969248299,
								44.23492300066128
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 5,
					"sovereignt": "Bosnia and Herzegovina",
					"sov_a3": "BIH",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Bosnia and Herzegovina",
					"adm0_a3": "BIH",
					"geou_dif": 0,
					"geounit": "Bosnia and Herzegovina",
					"gu_a3": "BIH",
					"su_dif": 0,
					"subunit": "Bosnia and Herzegovina",
					"su_a3": "BIH",
					"brk_diff": 0,
					"id": 35,
					"name": "Bosnien und Herzegowina",
					"name_long": "Bosnia and Herzegovina",
					"brk_a3": "BIH",
					"brk_name": "Bosnia and Herz.",
					"brk_group": null,
					"abbrev": "B.H.",
					"postal": "BiH",
					"formal_en": "Bosnia and Herzegovina",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Bosnia and Herzegovina",
					"name_alt": null,
					"mapcolor7": 1,
					"mapcolor8": 1,
					"mapcolor9": 1,
					"mapcolor13": 2,
					"pop_est": 4613414,
					"gdp_md_est": 29700,
					"pop_year": -99,
					"lastcensus": 1991,
					"gdp_year": -99,
					"economy": "6. Developing region",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "BA",
					"iso_a3": "BIH",
					"iso_n3": "070",
					"un_a3": "070",
					"wb_a2": "BA",
					"wb_a3": "BIH",
					"woe_id": -99,
					"adm0_a3_is": "BIH",
					"adm0_a3_us": "BIH",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 16,
					"long_len": 22,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								19.00548628101012,
								44.86023366960916
							],
							[
								19.36803,
								44.863
							],
							[
								19.11761,
								44.42307000000011
							],
							[
								19.59976,
								44.03847
							],
							[
								19.454,
								43.56810000000013
							],
							[
								19.21852,
								43.52384
							],
							[
								19.03165,
								43.43253
							],
							[
								18.70648,
								43.20011
							],
							[
								18.56,
								42.65
							],
							[
								17.674921502358984,
								43.02856252702361
							],
							[
								17.297373488034452,
								43.44634064388737
							],
							[
								16.91615644701733,
								43.66772247982567
							],
							[
								16.456442905348865,
								44.04123973243128
							],
							[
								16.23966027188453,
								44.35114329688571
							],
							[
								15.750026075918981,
								44.818711656262565
							],
							[
								15.959367303133376,
								45.23377676043094
							],
							[
								16.318156772535872,
								45.00412669532591
							],
							[
								16.534939406000206,
								45.21160757097772
							],
							[
								17.002146030351014,
								45.23377676043094
							],
							[
								17.861783481526402,
								45.067740383477144
							],
							[
								18.553214145591653,
								45.08158966733146
							],
							[
								19.00548628101012,
								44.86023366960916
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 4,
					"sovereignt": "Belarus",
					"sov_a3": "BLR",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Belarus",
					"adm0_a3": "BLR",
					"geou_dif": 0,
					"geounit": "Belarus",
					"gu_a3": "BLR",
					"su_dif": 0,
					"subunit": "Belarus",
					"su_a3": "BLR",
					"brk_diff": 0,
					"id": 99,
					"name": "Weißrussland",
					"name_long": "Belarus",
					"brk_a3": "BLR",
					"brk_name": "Belarus",
					"brk_group": null,
					"abbrev": "Bela.",
					"postal": "BY",
					"formal_en": "Republic of Belarus",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Belarus",
					"name_alt": null,
					"mapcolor7": 1,
					"mapcolor8": 1,
					"mapcolor9": 5,
					"mapcolor13": 11,
					"pop_est": 9648533,
					"gdp_md_est": 114100,
					"pop_year": -99,
					"lastcensus": 2009,
					"gdp_year": -99,
					"economy": "6. Developing region",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "BY",
					"iso_a3": "BLR",
					"iso_n3": "112",
					"un_a3": "112",
					"wb_a2": "BY",
					"wb_a3": "BLR",
					"woe_id": -99,
					"adm0_a3_is": "BLR",
					"adm0_a3_us": "BLR",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Eastern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 5,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								23.48412763844985,
								53.91249766704114
							],
							[
								24.450683628037037,
								53.905702216194754
							],
							[
								25.536353794056993,
								54.28242340760253
							],
							[
								25.7684326514798,
								54.84696259217509
							],
							[
								26.58827924979039,
								55.16717560487167
							],
							[
								26.494331495883756,
								55.615106919977634
							],
							[
								27.10245975109453,
								55.783313707087686
							],
							[
								28.176709425577997,
								56.169129950578814
							],
							[
								29.229513380660308,
								55.91834422466636
							],
							[
								29.371571893030673,
								55.670090643936184
							],
							[
								29.896294386522356,
								55.78946320253041
							],
							[
								30.87390913262001,
								55.55097646750341
							],
							[
								30.971835971813135,
								55.08154775656404
							],
							[
								30.75753380709872,
								54.81177094178432
							],
							[
								31.38447228366374,
								54.157056382862436
							],
							[
								31.79142418796224,
								53.974638576872124
							],
							[
								31.731272820774507,
								53.79402944601202
							],
							[
								32.405598585751164,
								53.61804535584204
							],
							[
								32.69364301934604,
								53.35142080343212
							],
							[
								32.30451948418823,
								53.13272614197291
							],
							[
								31.49764367038293,
								53.1674268662569
							],
							[
								31.305200636528014,
								53.07399587667321
							],
							[
								31.54001834486226,
								52.74205231384636
							],
							[
								31.785998162571587,
								52.101677964885454
							],
							[
								30.927549269338982,
								52.04235342061439
							],
							[
								30.619454380014844,
								51.822806098022376
							],
							[
								30.555117221811457,
								51.31950348571566
							],
							[
								30.157363722460897,
								51.41613841410147
							],
							[
								29.254938185347925,
								51.368234361366895
							],
							[
								28.992835320763533,
								51.602044379271476
							],
							[
								28.61761274589225,
								51.42771393493484
							],
							[
								28.24161502453657,
								51.57222707783907
							],
							[
								27.454066196408434,
								51.59230337178447
							],
							[
								26.337958611768556,
								51.83228872334793
							],
							[
								25.32778771332701,
								51.91065603291855
							],
							[
								24.553106316839518,
								51.888461005249184
							],
							[
								24.00507775238421,
								51.61744395609446
							],
							[
								23.527070753684374,
								51.57845408793024
							],
							[
								23.508002150168693,
								52.02364655212473
							],
							[
								23.199493849386187,
								52.48697744405367
							],
							[
								23.79919884613338,
								52.69109935160657
							],
							[
								23.80493493011778,
								53.089731350306074
							],
							[
								23.527535841575002,
								53.470121568406555
							],
							[
								23.48412763844985,
								53.91249766704114
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 4,
					"sovereignt": "Switzerland",
					"sov_a3": "CHE",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Switzerland",
					"adm0_a3": "CHE",
					"geou_dif": 0,
					"geounit": "Switzerland",
					"gu_a3": "CHE",
					"su_dif": 0,
					"subunit": "Switzerland",
					"su_a3": "CHE",
					"brk_diff": 0,
					"id": 31,
					"name": "Schweiz",
					"name_long": "Switzerland",
					"brk_a3": "CHE",
					"brk_name": "Switzerland",
					"brk_group": null,
					"abbrev": "Switz.",
					"postal": "CH",
					"formal_en": "Swiss Confederation",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Switzerland",
					"name_alt": null,
					"mapcolor7": 5,
					"mapcolor8": 2,
					"mapcolor9": 7,
					"mapcolor13": 3,
					"pop_est": 7604467,
					"gdp_md_est": 316700,
					"pop_year": -99,
					"lastcensus": 2010,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "CH",
					"iso_a3": "CHE",
					"iso_n3": "756",
					"un_a3": "756",
					"wb_a2": "CH",
					"wb_a3": "CHE",
					"woe_id": -99,
					"adm0_a3_is": "CHE",
					"adm0_a3_us": "CHE",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Western Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 11,
					"long_len": 11,
					"abbrev_len": 6,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								9.59422610844635,
								47.52505809182027
							],
							[
								9.632931756232978,
								47.34760122332999
							],
							[
								9.479969516649021,
								47.102809963563374
							],
							[
								9.932448357796659,
								46.92072805438296
							],
							[
								10.44270145024663,
								46.89354625099743
							],
							[
								10.363378126678612,
								46.48357127540986
							],
							[
								9.922836541390382,
								46.31489940040919
							],
							[
								9.182881707403055,
								46.44021474871698
							],
							[
								8.966305779667806,
								46.03693187111119
							],
							[
								8.489952426801324,
								46.005150865251686
							],
							[
								8.31662967289438,
								46.16364248309086
							],
							[
								7.755992058959833,
								45.82449005795931
							],
							[
								7.273850945676656,
								45.776947740250776
							],
							[
								6.843592970414505,
								45.99114655210061
							],
							[
								6.500099724970426,
								46.42967275652944
							],
							[
								6.022609490593538,
								46.27298981382047
							],
							[
								6.037388950229001,
								46.725778713561866
							],
							[
								6.768713820023606,
								47.2877082383037
							],
							[
								6.736571079138059,
								47.541801255882845
							],
							[
								7.192202182655507,
								47.44976552997102
							],
							[
								7.466759067422231,
								47.62058197691181
							],
							[
								8.317301466514152,
								47.61357982033626
							],
							[
								8.522611932009767,
								47.83082754169129
							],
							[
								9.59422610844635,
								47.52505809182027
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 5,
					"sovereignt": "Czech Republic",
					"sov_a3": "CZE",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Czech Republic",
					"adm0_a3": "CZE",
					"geou_dif": 0,
					"geounit": "Czech Republic",
					"gu_a3": "CZE",
					"su_dif": 0,
					"subunit": "Czech Republic",
					"su_a3": "CZE",
					"brk_diff": 0,
					"id": 3,
					"name": "Tsch. Republik",
					"name_long": "Czech Republic",
					"brk_a3": "CZE",
					"brk_name": "Czech Rep.",
					"brk_group": null,
					"abbrev": "Cz. Rep.",
					"postal": "CZ",
					"formal_en": "Czech Republic",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Czech Republic",
					"name_alt": null,
					"mapcolor7": 1,
					"mapcolor8": 1,
					"mapcolor9": 2,
					"mapcolor13": 6,
					"pop_est": 10211904,
					"gdp_md_est": 265200,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "CZ",
					"iso_a3": "CZE",
					"iso_n3": "203",
					"un_a3": "203",
					"wb_a2": "CZ",
					"wb_a3": "CZE",
					"woe_id": -99,
					"adm0_a3_is": "CZE",
					"adm0_a3_us": "CZE",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Eastern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 10,
					"long_len": 14,
					"abbrev_len": 8,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								16.960288120194576,
								48.5969823268506
							],
							[
								16.499282667718774,
								48.78580801044511
							],
							[
								16.02964725105022,
								48.73389903420793
							],
							[
								15.253415561593982,
								49.03907420510758
							],
							[
								14.901447381254057,
								48.964401760445824
							],
							[
								14.338897739324722,
								48.55530528420721
							],
							[
								13.595945672264437,
								48.87717194273715
							],
							[
								13.031328973043431,
								49.30706818297324
							],
							[
								12.521024204161193,
								49.547415269562734
							],
							[
								12.415190870827445,
								49.96912079528057
							],
							[
								12.240111118222558,
								50.266337795607285
							],
							[
								12.966836785543194,
								50.484076443069085
							],
							[
								13.338131951560285,
								50.73323436136435
							],
							[
								14.056227654688172,
								50.9269176295943
							],
							[
								14.307013380600637,
								51.117267767941414
							],
							[
								14.570718214586066,
								51.002339382524276
							],
							[
								15.01699588385867,
								51.10667409932158
							],
							[
								15.490972120839729,
								50.78472992614321
							],
							[
								16.23862674323857,
								50.69773265237984
							],
							[
								16.176253289462267,
								50.42260732685791
							],
							[
								16.719475945714436,
								50.21574656839354
							],
							[
								16.86876915860566,
								50.47397370055603
							],
							[
								17.55456709155112,
								50.36214590107642
							],
							[
								17.64944502123899,
								50.049038397819956
							],
							[
								18.392913852622172,
								49.98862864847075
							],
							[
								18.853144158613617,
								49.49622976337764
							],
							[
								18.554971144289482,
								49.495015367218784
							],
							[
								18.399993523846177,
								49.31500051533004
							],
							[
								18.170498488037964,
								49.271514797556435
							],
							[
								18.104972771891852,
								49.04398346617531
							],
							[
								17.913511590250465,
								48.996492824899086
							],
							[
								17.88648481616181,
								48.90347524677371
							],
							[
								17.545006951577108,
								48.80001902932537
							],
							[
								17.101984897538898,
								48.816968899117114
							],
							[
								16.960288120194576,
								48.5969823268506
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 2,
					"sovereignt": "Germany",
					"sov_a3": "DEU",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Germany",
					"adm0_a3": "DEU",
					"geou_dif": 0,
					"geounit": "Germany",
					"gu_a3": "DEU",
					"su_dif": 0,
					"subunit": "Germany",
					"su_a3": "DEU",
					"brk_diff": 0,
					"id": 5,
					"name": "Deutschland",
					"name_long": "Germany",
					"brk_a3": "DEU",
					"brk_name": "Germany",
					"brk_group": null,
					"abbrev": "Ger.",
					"postal": "D",
					"formal_en": "Federal Republic of Germany",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Germany",
					"name_alt": null,
					"mapcolor7": 2,
					"mapcolor8": 5,
					"mapcolor9": 5,
					"mapcolor13": 1,
					"pop_est": 82329758,
					"gdp_md_est": 2918000,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "1. Developed region: G7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "DE",
					"iso_a3": "DEU",
					"iso_n3": "276",
					"un_a3": "276",
					"wb_a2": "DE",
					"wb_a3": "DEU",
					"woe_id": -99,
					"adm0_a3_is": "DEU",
					"adm0_a3_us": "DEU",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Western Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								9.921906365609232,
								54.98310415304803
							],
							[
								9.9395797054529,
								54.596641954153256
							],
							[
								10.950112338920519,
								54.363607082733154
							],
							[
								10.93946699386845,
								54.00869334575259
							],
							[
								11.956252475643282,
								54.19648550070116
							],
							[
								12.518440382546714,
								54.470370591847995
							],
							[
								13.647467075259499,
								54.0755109727059
							],
							[
								14.119686313542559,
								53.75702912049104
							],
							[
								14.353315463934166,
								53.248171291713106
							],
							[
								14.074521111719434,
								52.98126251892535
							],
							[
								14.437599725002201,
								52.624850165408304
							],
							[
								14.685026482815715,
								52.089947414755216
							],
							[
								14.607098422919648,
								51.74518809671997
							],
							[
								15.016995883858783,
								51.10667409932171
							],
							[
								14.570718214586122,
								51.00233938252438
							],
							[
								14.307013380600665,
								51.11726776794137
							],
							[
								14.056227654688314,
								50.92691762959436
							],
							[
								13.338131951560399,
								50.73323436136428
							],
							[
								12.96683678554325,
								50.48407644306917
							],
							[
								12.240111118222671,
								50.26633779560723
							],
							[
								12.415190870827473,
								49.96912079528062
							],
							[
								12.521024204161336,
								49.54741526956275
							],
							[
								13.031328973043514,
								49.30706818297324
							],
							[
								13.595945672264577,
								48.877171942737164
							],
							[
								13.243357374737116,
								48.41611481382904
							],
							[
								12.884102817443875,
								48.28914581968786
							],
							[
								13.025851271220517,
								47.63758352313596
							],
							[
								12.932626987366064,
								47.467645575544
							],
							[
								12.620759718484521,
								47.672387600284424
							],
							[
								12.141357456112871,
								47.70308340106578
							],
							[
								11.426414015354851,
								47.52376618101306
							],
							[
								10.544504021861599,
								47.5663992376538
							],
							[
								10.402083774465325,
								47.30248769793917
							],
							[
								9.89606814946319,
								47.580196845075704
							],
							[
								9.594226108446378,
								47.5250580918202
							],
							[
								8.522611932009795,
								47.83082754169135
							],
							[
								8.317301466514095,
								47.61357982033627
							],
							[
								7.466759067422288,
								47.62058197691192
							],
							[
								7.593676385131062,
								48.33301911070373
							],
							[
								8.099278598674857,
								49.01778351500343
							],
							[
								6.65822960778371,
								49.20195831969164
							],
							[
								6.186320428094177,
								49.463802802114515
							],
							[
								6.242751092156993,
								49.90222565367873
							],
							[
								6.043073357781111,
								50.128051662794235
							],
							[
								6.15665815595878,
								50.80372101501058
							],
							[
								5.988658074577813,
								51.851615709025054
							],
							[
								6.589396599970826,
								51.852029120483394
							],
							[
								6.842869500362383,
								52.22844025329755
							],
							[
								7.092053256873896,
								53.144043280644894
							],
							[
								6.905139601274129,
								53.48216217713065
							],
							[
								7.100424838905269,
								53.69393219666267
							],
							[
								7.936239454793963,
								53.74829580343379
							],
							[
								8.121706170289485,
								53.52779246684429
							],
							[
								8.800734490604668,
								54.020785630908904
							],
							[
								8.57211795414537,
								54.39564647075406
							],
							[
								8.526229282270208,
								54.96274363872516
							],
							[
								9.282048780971138,
								54.83086538351631
							],
							[
								9.921906365609232,
								54.98310415304803
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 4,
					"sovereignt": "Denmark",
					"sov_a3": "DN1",
					"adm0_dif": 1,
					"level": 2,
					"type": "Country",
					"admin": "Denmark",
					"adm0_a3": "DNK",
					"geou_dif": 0,
					"geounit": "Denmark",
					"gu_a3": "DNK",
					"su_dif": 0,
					"subunit": "Denmark",
					"su_a3": "DNK",
					"brk_diff": 0,
					"id": 4,
					"name": "Dänemark",
					"name_long": "Denmark",
					"brk_a3": "DNK",
					"brk_name": "Denmark",
					"brk_group": null,
					"abbrev": "Den.",
					"postal": "DK",
					"formal_en": "Kingdom of Denmark",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Denmark",
					"name_alt": null,
					"mapcolor7": 4,
					"mapcolor8": 1,
					"mapcolor9": 3,
					"mapcolor13": 12,
					"pop_est": 5500510,
					"gdp_md_est": 203600,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "DK",
					"iso_a3": "DNK",
					"iso_n3": "208",
					"un_a3": "208",
					"wb_a2": "DK",
					"wb_a3": "DNK",
					"woe_id": -99,
					"adm0_a3_is": "DNK",
					"adm0_a3_us": "DNK",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Northern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "MultiPolygon",
					"coordinates": [
						[
							[
								[
									12.690006137755631,
									55.609990953180784
								],
								[
									12.089991082414741,
									54.80001455343793
								],
								[
									11.043543328504228,
									55.364863796604254
								],
								[
									10.903913608451631,
									55.77995473898875
								],
								[
									12.370904168353292,
									56.111407375708836
								],
								[
									12.690006137755631,
									55.609990953180784
								]
							]
						],
						[
							[
								[
									10.912181837618363,
									56.458621324277914
								],
								[
									10.667803989309988,
									56.08138336854722
								],
								[
									10.369992710011985,
									56.19000722922473
								],
								[
									9.649984978889307,
									55.469999498102055
								],
								[
									9.921906365609175,
									54.98310415304806
								],
								[
									9.282048780971138,
									54.83086538351617
								],
								[
									8.526229282270236,
									54.96274363872499
								],
								[
									8.12031090661759,
									55.517722683323626
								],
								[
									8.08997684086225,
									56.5400117051376
								],
								[
									8.256581658571264,
									56.8099693874303
								],
								[
									8.543437534223386,
									57.110002753316905
								],
								[
									9.42446902836761,
									57.17206614849948
								],
								[
									9.775558709358563,
									57.44794078228966
								],
								[
									10.580005730846153,
									57.73001658795485
								],
								[
									10.546105991262692,
									57.215732733786155
								],
								[
									10.250000034230226,
									56.89001618105047
								],
								[
									10.369992710011985,
									56.609981594460834
								],
								[
									10.912181837618363,
									56.458621324277914
								]
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 2,
					"sovereignt": "Spain",
					"sov_a3": "ESP",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Spain",
					"adm0_a3": "ESP",
					"geou_dif": 0,
					"geounit": "Spain",
					"gu_a3": "ESP",
					"su_dif": 0,
					"subunit": "Spain",
					"su_a3": "ESP",
					"brk_diff": 0,
					"id": 9,
					"name": "Spanien",
					"name_long": "Spain",
					"brk_a3": "ESP",
					"brk_name": "Spain",
					"brk_group": null,
					"abbrev": "Sp.",
					"postal": "E",
					"formal_en": "Kingdom of Spain",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Spain",
					"name_alt": null,
					"mapcolor7": 4,
					"mapcolor8": 5,
					"mapcolor9": 5,
					"mapcolor13": 5,
					"pop_est": 40525002,
					"gdp_md_est": 1403000,
					"pop_year": -99,
					"lastcensus": 2001,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "ES",
					"iso_a3": "ESP",
					"iso_n3": "724",
					"un_a3": "724",
					"wb_a2": "ES",
					"wb_a3": "ESP",
					"woe_id": -99,
					"adm0_a3_is": "ESP",
					"adm0_a3_us": "ESP",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 5,
					"long_len": 5,
					"abbrev_len": 3,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								-9.034817674180246,
								41.880570583659676
							],
							[
								-8.984433152695672,
								42.59277517350627
							],
							[
								-9.392883673530648,
								43.0266246608127
							],
							[
								-7.97818966310831,
								43.74833771420099
							],
							[
								-6.754491746436756,
								43.567909450853925
							],
							[
								-5.411886359061597,
								43.57423981380968
							],
							[
								-4.347842779955783,
								43.40344920508504
							],
							[
								-3.517531704106091,
								43.4559007838613
							],
							[
								-1.901351284177764,
								43.42280202897834
							],
							[
								-1.502770961910528,
								43.03401439063043
							],
							[
								0.338046909190581,
								42.57954600683955
							],
							[
								0.701590610363894,
								42.795734361332606
							],
							[
								1.826793247087153,
								42.34338471126569
							],
							[
								2.985998976258458,
								42.47301504166986
							],
							[
								3.039484083680549,
								41.892120266276905
							],
							[
								2.091841668312185,
								41.226088568683096
							],
							[
								0.810524529635188,
								41.01473196060934
							],
							[
								0.721331007499401,
								40.678318386389236
							],
							[
								0.106691521819869,
								40.12393362076202
							],
							[
								-0.278711310212941,
								39.30997813573272
							],
							[
								0.111290724293838,
								38.73851430923304
							],
							[
								-0.467123582349103,
								38.29236583104115
							],
							[
								-0.683389451490598,
								37.642353827457825
							],
							[
								-1.438382127274849,
								37.44306366632422
							],
							[
								-2.146452602538119,
								36.67414419203729
							],
							[
								-3.415780808923387,
								36.65889964451118
							],
							[
								-4.368900926114719,
								36.677839056946155
							],
							[
								-4.995219285492212,
								36.32470815687964
							],
							[
								-5.377159796561457,
								35.946850083961465
							],
							[
								-5.866432257500904,
								36.02981659600606
							],
							[
								-6.236693894872175,
								36.367677110330334
							],
							[
								-6.520190802425404,
								36.94291331638732
							],
							[
								-7.453725551778092,
								37.09778758396607
							],
							[
								-7.537105475281024,
								37.42890432387624
							],
							[
								-7.166507941099865,
								37.803894354802225
							],
							[
								-7.029281175148796,
								38.07576406508977
							],
							[
								-7.374092169616318,
								38.37305858006492
							],
							[
								-7.098036668313128,
								39.03007274022379
							],
							[
								-7.498632371439726,
								39.62957103124181
							],
							[
								-7.066591559263529,
								39.711891587882775
							],
							[
								-7.026413133156595,
								40.184524237624245
							],
							[
								-6.864019944679385,
								40.33087189387483
							],
							[
								-6.851126674822552,
								41.11108266861753
							],
							[
								-6.389087693700915,
								41.381815497394655
							],
							[
								-6.668605515967656,
								41.883386949219584
							],
							[
								-7.251308966490824,
								41.91834605566505
							],
							[
								-7.422512986673795,
								41.79207469335984
							],
							[
								-8.013174607769912,
								41.790886135417125
							],
							[
								-8.263856980817792,
								42.28046865495034
							],
							[
								-8.67194576662672,
								42.13468943945496
							],
							[
								-9.034817674180246,
								41.880570583659676
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 6,
					"sovereignt": "Estonia",
					"sov_a3": "EST",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Estonia",
					"adm0_a3": "EST",
					"geou_dif": 0,
					"geounit": "Estonia",
					"gu_a3": "EST",
					"su_dif": 0,
					"subunit": "Estonia",
					"su_a3": "EST",
					"brk_diff": 0,
					"id": 6,
					"name": "Estland",
					"name_long": "Estonia",
					"brk_a3": "EST",
					"brk_name": "Estonia",
					"brk_group": null,
					"abbrev": "Est.",
					"postal": "EST",
					"formal_en": "Republic of Estonia",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Estonia",
					"name_alt": null,
					"mapcolor7": 3,
					"mapcolor8": 2,
					"mapcolor9": 1,
					"mapcolor13": 10,
					"pop_est": 1299371,
					"gdp_md_est": 27410,
					"pop_year": -99,
					"lastcensus": 2000,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "EE",
					"iso_a3": "EST",
					"iso_n3": "233",
					"un_a3": "233",
					"wb_a2": "EE",
					"wb_a3": "EST",
					"woe_id": -99,
					"adm0_a3_is": "EST",
					"adm0_a3_us": "EST",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Northern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								24.312862583114622,
								57.79342357037697
							],
							[
								24.42892785004216,
								58.38341339785329
							],
							[
								24.061198357853186,
								58.25737457949341
							],
							[
								23.426560092876684,
								58.612753404364625
							],
							[
								23.339795363058645,
								59.187240302153384
							],
							[
								24.604214308376186,
								59.46585378685502
							],
							[
								25.86418908051664,
								59.61109039981133
							],
							[
								26.949135776484525,
								59.445803331125774
							],
							[
								27.981114129353244,
								59.475388088612874
							],
							[
								28.13169925305175,
								59.300825100330925
							],
							[
								27.420166456824944,
								58.72458120384424
							],
							[
								27.71668582531572,
								57.79189911562436
							],
							[
								27.288184848751513,
								57.47452830670383
							],
							[
								26.463532342237787,
								57.47638865826633
							],
							[
								25.60280968598437,
								57.84752879498657
							],
							[
								25.16459354014927,
								57.97015696881519
							],
							[
								24.312862583114622,
								57.79342357037697
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 3,
					"sovereignt": "Finland",
					"sov_a3": "FI1",
					"adm0_dif": 1,
					"level": 2,
					"type": "Country",
					"admin": "Finland",
					"adm0_a3": "FIN",
					"geou_dif": 0,
					"geounit": "Finland",
					"gu_a3": "FIN",
					"su_dif": 0,
					"subunit": "Finland",
					"su_a3": "FIN",
					"brk_diff": 0,
					"id": 26,
					"name": "Finnland",
					"name_long": "Finland",
					"brk_a3": "FIN",
					"brk_name": "Finland",
					"brk_group": null,
					"abbrev": "Fin.",
					"postal": "FIN",
					"formal_en": "Republic of Finland",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Finland",
					"name_alt": null,
					"mapcolor7": 4,
					"mapcolor8": 1,
					"mapcolor9": 4,
					"mapcolor13": 6,
					"pop_est": 5250275,
					"gdp_md_est": 193500,
					"pop_year": -99,
					"lastcensus": 2010,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "FI",
					"iso_a3": "FIN",
					"iso_n3": "246",
					"un_a3": "246",
					"wb_a2": "FI",
					"wb_a3": "FIN",
					"woe_id": -99,
					"adm0_a3_is": "FIN",
					"adm0_a3_us": "FIN",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Northern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								28.591929559043194,
								69.06477692328666
							],
							[
								28.445943637818658,
								68.36461294216404
							],
							[
								29.97742638522061,
								67.69829702419266
							],
							[
								29.054588657352326,
								66.94428620062193
							],
							[
								30.21765,
								65.80598
							],
							[
								29.54442955904699,
								64.94867157659048
							],
							[
								30.44468468600371,
								64.20445343693909
							],
							[
								30.035872430142717,
								63.55281362573855
							],
							[
								31.516092156711125,
								62.86768748641289
							],
							[
								31.139991082490894,
								62.35769277612441
							],
							[
								30.21110721204445,
								61.780027777749694
							],
							[
								28.069997592895277,
								60.50351654727584
							],
							[
								26.255172967236973,
								60.4239606797625
							],
							[
								24.496623976344523,
								60.05731639265166
							],
							[
								22.869694858499457,
								59.846373196036225
							],
							[
								22.290763787533592,
								60.39192129174154
							],
							[
								21.322244093519316,
								60.720169989659524
							],
							[
								21.544866163832694,
								61.70532949487179
							],
							[
								21.05921105315369,
								62.60739329695874
							],
							[
								21.536029493910803,
								63.18973501245587
							],
							[
								22.442744174903993,
								63.81781037053129
							],
							[
								24.730511508897536,
								64.90234365504084
							],
							[
								25.398067661243942,
								65.11142650009374
							],
							[
								25.294043003040404,
								65.53434642197045
							],
							[
								23.903378533633802,
								66.00692739527962
							],
							[
								23.565879754335583,
								66.39605093043743
							],
							[
								23.53947309743444,
								67.93600861273525
							],
							[
								21.978534783626117,
								68.6168456081807
							],
							[
								20.645592889089528,
								69.10624726020087
							],
							[
								21.244936150810673,
								69.37044302029308
							],
							[
								22.356237827247412,
								68.84174144151491
							],
							[
								23.66204959483076,
								68.89124746365054
							],
							[
								24.735679152126725,
								68.64955678982146
							],
							[
								25.689212680776365,
								69.09211375596904
							],
							[
								26.179622023226244,
								69.82529897732614
							],
							[
								27.732292107867863,
								70.16419302029625
							],
							[
								29.015572950971972,
								69.76649119737799
							],
							[
								28.591929559043194,
								69.06477692328666
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 2,
					"sovereignt": "France",
					"sov_a3": "FR1",
					"adm0_dif": 1,
					"level": 2,
					"type": "Country",
					"admin": "France",
					"adm0_a3": "FRA",
					"geou_dif": 0,
					"geounit": "France",
					"gu_a3": "FRA",
					"su_dif": 0,
					"subunit": "France",
					"su_a3": "FRA",
					"brk_diff": 0,
					"id": 10,
					"name": "Frankreich",
					"name_long": "France",
					"brk_a3": "FRA",
					"brk_name": "France",
					"brk_group": null,
					"abbrev": "Fr.",
					"postal": "F",
					"formal_en": "French Republic",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "France",
					"name_alt": null,
					"mapcolor7": 7,
					"mapcolor8": 5,
					"mapcolor9": 9,
					"mapcolor13": 11,
					"pop_est": 64057792,
					"gdp_md_est": 2128000,
					"pop_year": -99,
					"lastcensus": -99,
					"gdp_year": -99,
					"economy": "1. Developed region: G7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "FR",
					"iso_a3": "FRA",
					"iso_n3": "250",
					"un_a3": "250",
					"wb_a2": "FR",
					"wb_a3": "FRA",
					"woe_id": -99,
					"adm0_a3_is": "FRA",
					"adm0_a3_us": "FRA",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Western Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 6,
					"long_len": 6,
					"abbrev_len": 3,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "MultiPolygon",
					"coordinates": [
						[
							[
								[
									-52.55642473001839,
									2.504705308437053
								],
								[
									-52.93965715189498,
									2.124857692875622
								],
								[
									-53.418465135295264,
									2.053389187016037
								],
								[
									-53.554839240113495,
									2.334896551925965
								],
								[
									-53.778520677288896,
									2.376702785650053
								],
								[
									-54.08806250671728,
									2.105556545414629
								],
								[
									-54.52475419779975,
									2.311848863123785
								],
								[
									-54.27122962097579,
									2.738747870286943
								],
								[
									-54.18428402364475,
									3.194172268075235
								],
								[
									-54.01150387227682,
									3.622569891774859
								],
								[
									-54.399542202356514,
									4.212611395683481
								],
								[
									-54.47863298197922,
									4.896755682795643
								],
								[
									-53.95804460307093,
									5.756548163267809
								],
								[
									-53.618452928264844,
									5.646529038918402
								],
								[
									-52.88214128275408,
									5.409850979021599
								],
								[
									-51.82334286152593,
									4.565768133966145
								],
								[
									-51.65779741067888,
									4.156232408053029
								],
								[
									-52.249337531123984,
									3.241094468596287
								],
								[
									-52.55642473001839,
									2.504705308437053
								]
							]
						],
						[
							[
								[
									9.560016310269134,
									42.15249197037957
								],
								[
									9.229752231491773,
									41.38000682226445
								],
								[
									8.775723097375362,
									41.58361196549444
								],
								[
									8.54421268070783,
									42.256516628583086
								],
								[
									8.746009148807588,
									42.62812185319396
								],
								[
									9.390000848028905,
									43.00998484961474
								],
								[
									9.560016310269134,
									42.15249197037957
								]
							]
						],
						[
							[
								[
									3.588184441755715,
									50.37899241800358
								],
								[
									4.286022983425141,
									49.907496649772554
								],
								[
									4.799221632515753,
									49.98537303323633
								],
								[
									5.674051954784886,
									49.52948354755745
								],
								[
									5.897759230176376,
									49.44266714130717
								],
								[
									6.186320428094206,
									49.46380280211446
								],
								[
									6.658229607783539,
									49.201958319691556
								],
								[
									8.099278598674772,
									49.01778351500337
								],
								[
									7.593676385131062,
									48.33301911070373
								],
								[
									7.466759067422231,
									47.620581976911865
								],
								[
									7.192202182655535,
									47.44976552997099
								],
								[
									6.736571079138088,
									47.54180125588289
								],
								[
									6.768713820023635,
									47.28770823830368
								],
								[
									6.037388950228973,
									46.72577871356191
								],
								[
									6.022609490593567,
									46.272989813820516
								],
								[
									6.500099724970454,
									46.42967275652944
								],
								[
									6.843592970414562,
									45.99114655210067
								],
								[
									6.802355177445662,
									45.70857982032868
								],
								[
									7.096652459347837,
									45.333098863295874
								],
								[
									6.749955275101712,
									45.02851797136759
								],
								[
									7.007562290076663,
									44.25476675066139
								],
								[
									7.549596388386163,
									44.12790110938482
								],
								[
									7.435184767291844,
									43.69384491634918
								],
								[
									6.529245232783069,
									43.12889232031836
								],
								[
									4.556962517931396,
									43.39965098731159
								],
								[
									3.10041059735272,
									43.075200507167125
								],
								[
									2.985998976258486,
									42.473015041669896
								],
								[
									1.826793247087181,
									42.34338471126566
								],
								[
									0.701590610363922,
									42.79573436133265
								],
								[
									0.338046909190581,
									42.579546006839564
								],
								[
									-1.502770961910471,
									43.03401439063049
								],
								[
									-1.901351284177736,
									43.42280202897834
								],
								[
									-1.384225226232957,
									44.02261037859017
								],
								[
									-1.193797573237362,
									46.014917710954876
								],
								[
									-2.225724249673789,
									47.06436269793821
								],
								[
									-2.963276129559574,
									47.570326646507965
								],
								[
									-4.491554938159481,
									47.95495433205642
								],
								[
									-4.592349819344747,
									48.68416046812695
								],
								[
									-3.295813971357745,
									48.901692409859635
								],
								[
									-1.616510789384932,
									48.644421291694584
								],
								[
									-1.933494025063254,
									49.77634186461577
								],
								[
									-0.98946895995536,
									49.347375800160876
								],
								[
									1.338761020522753,
									50.12717316344526
								],
								[
									1.6390010921385,
									50.946606350297515
								],
								[
									2.513573032246171,
									51.14850617126186
								],
								[
									2.658422071960331,
									50.79684804951566
								],
								[
									3.123251580425716,
									50.78036326761452
								],
								[
									3.588184441755715,
									50.37899241800358
								]
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 2,
					"sovereignt": "United Kingdom",
					"sov_a3": "GB1",
					"adm0_dif": 1,
					"level": 2,
					"type": "Country",
					"admin": "United Kingdom",
					"adm0_a3": "GBR",
					"geou_dif": 0,
					"geounit": "United Kingdom",
					"gu_a3": "GBR",
					"su_dif": 0,
					"subunit": "United Kingdom",
					"su_a3": "GBR",
					"brk_diff": 0,
					"id": 28,
					"name": "Ver. Königreich",
					"name_long": "United Kingdom",
					"brk_a3": "GBR",
					"brk_name": "United Kingdom",
					"brk_group": null,
					"abbrev": "U.K.",
					"postal": "GB",
					"formal_en": "United Kingdom of Great Britain and Northern Ireland",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "United Kingdom",
					"name_alt": null,
					"mapcolor7": 6,
					"mapcolor8": 6,
					"mapcolor9": 6,
					"mapcolor13": 3,
					"pop_est": 62262000,
					"gdp_md_est": 1977704,
					"pop_year": 0,
					"lastcensus": 2011,
					"gdp_year": 2009,
					"economy": "1. Developed region: G7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "GB",
					"iso_a3": "GBR",
					"iso_n3": "826",
					"un_a3": "826",
					"wb_a2": "GB",
					"wb_a3": "GBR",
					"woe_id": -99,
					"adm0_a3_is": "GBR",
					"adm0_a3_us": "GBR",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Northern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 14,
					"long_len": 14,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "MultiPolygon",
					"coordinates": [
						[
							[
								[
									-5.661948614921897,
									54.55460317648385
								],
								[
									-6.197884894220977,
									53.86756500916334
								],
								[
									-6.953730231137996,
									54.073702297575636
								],
								[
									-7.572167934591079,
									54.05995636658599
								],
								[
									-7.366030646178785,
									54.595840969452695
								],
								[
									-7.572167934591079,
									55.1316222194549
								],
								[
									-6.733847011736145,
									55.1728600124238
								],
								[
									-5.661948614921897,
									54.55460317648385
								]
							]
						],
						[
							[
								[
									-3.005004848635281,
									58.63500010846633
								],
								[
									-4.073828497728016,
									57.55302480735526
								],
								[
									-3.055001796877661,
									57.69001902936094
								],
								[
									-1.959280564776918,
									57.68479970969952
								],
								[
									-2.219988165689301,
									56.87001740175353
								],
								[
									-3.119003058271119,
									55.973793036515474
								],
								[
									-2.085009324543023,
									55.90999848085127
								],
								[
									-2.005675679673857,
									55.80490285035023
								],
								[
									-1.11499101399221,
									54.624986477265395
								],
								[
									-0.4304849918542,
									54.46437612570216
								],
								[
									0.184981316742039,
									53.32501414653103
								],
								[
									0.469976840831777,
									52.92999949809197
								],
								[
									1.681530795914739,
									52.739520168664
								],
								[
									1.559987827164377,
									52.09999848083601
								],
								[
									1.050561557630914,
									51.806760565795685
								],
								[
									1.449865349950301,
									51.28942780212196
								],
								[
									0.550333693045502,
									50.765738837275876
								],
								[
									-0.78751746255864,
									50.77498891865622
								],
								[
									-2.489997524414377,
									50.50001862243124
								],
								[
									-2.956273972984036,
									50.696879991247016
								],
								[
									-3.617448085942328,
									50.22835561787272
								],
								[
									-4.542507900399244,
									50.341837063185665
								],
								[
									-5.245023159191135,
									49.95999990498109
								],
								[
									-5.776566941745301,
									50.15967763935683
								],
								[
									-4.309989793301838,
									51.21000112568916
								],
								[
									-3.414850633142123,
									51.42600861266925
								],
								[
									-3.422719467108323,
									51.42684816740609
								],
								[
									-4.984367234710874,
									51.593466091510976
								],
								[
									-5.267295701508885,
									51.991400458374585
								],
								[
									-4.222346564134853,
									52.301355699261364
								],
								[
									-4.770013393564113,
									52.840004991255626
								],
								[
									-4.579999152026915,
									53.49500377055517
								],
								[
									-3.093830673788659,
									53.404547400669685
								],
								[
									-3.092079637047107,
									53.40444082296355
								],
								[
									-2.945008510744344,
									53.984999701546684
								],
								[
									-3.614700825433033,
									54.600936773292574
								],
								[
									-3.630005458989331,
									54.615012925833014
								],
								[
									-4.844169073903004,
									54.790971177786844
								],
								[
									-5.082526617849226,
									55.06160065369937
								],
								[
									-4.719112107756644,
									55.50847260194348
								],
								[
									-5.047980922862109,
									55.78398550070753
								],
								[
									-5.58639767091114,
									55.31114614523682
								],
								[
									-5.644998745130181,
									56.275014960344805
								],
								[
									-6.149980841486354,
									56.78500967063354
								],
								[
									-5.786824713555291,
									57.81884837506465
								],
								[
									-5.009998745127575,
									58.63001333275005
								],
								[
									-4.211494513353557,
									58.55084503847917
								],
								[
									-3.005004848635281,
									58.63500010846633
								]
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 3,
					"sovereignt": "Greece",
					"sov_a3": "GRC",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Greece",
					"adm0_a3": "GRC",
					"geou_dif": 0,
					"geounit": "Greece",
					"gu_a3": "GRC",
					"su_dif": 0,
					"subunit": "Greece",
					"su_a3": "GRC",
					"brk_diff": 0,
					"id": 8,
					"name": "Griechenland",
					"name_long": "Greece",
					"brk_a3": "GRC",
					"brk_name": "Greece",
					"brk_group": null,
					"abbrev": "Greece",
					"postal": "GR",
					"formal_en": "Hellenic Republic",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Greece",
					"name_alt": null,
					"mapcolor7": 2,
					"mapcolor8": 2,
					"mapcolor9": 2,
					"mapcolor13": 9,
					"pop_est": 10737428,
					"gdp_md_est": 343000,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "GR",
					"iso_a3": "GRC",
					"iso_n3": "300",
					"un_a3": "300",
					"wb_a2": "GR",
					"wb_a3": "GRC",
					"woe_id": -99,
					"adm0_a3_is": "GRC",
					"adm0_a3_us": "GRC",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 6,
					"long_len": 6,
					"abbrev_len": 6,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "MultiPolygon",
					"coordinates": [
						[
							[
								[
									23.699980096133004,
									35.70500438083553
								],
								[
									24.24666507334868,
									35.368022365860156
								],
								[
									25.02501549652888,
									35.424995632461986
								],
								[
									25.769207797964185,
									35.35401805270908
								],
								[
									25.745023227651586,
									35.179997666966216
								],
								[
									26.290002882601726,
									35.29999034274792
								],
								[
									26.16499759288766,
									35.004995429009796
								],
								[
									24.724982130642303,
									34.91998769788961
								],
								[
									24.735007358506948,
									35.08499054619759
								],
								[
									23.514978468528113,
									35.27999156345098
								],
								[
									23.699980096133004,
									35.70500438083553
								]
							]
						],
						[
							[
								[
									26.604195590936285,
									41.562114569661105
								],
								[
									26.29460208507578,
									40.93626129817426
								],
								[
									26.056942172965506,
									40.824123440100834
								],
								[
									25.447677036244187,
									40.85254547786147
								],
								[
									24.92584842296094,
									40.94706167252323
								],
								[
									23.714811232200816,
									40.68712921809512
								],
								[
									24.407998894964066,
									40.1249929876241
								],
								[
									23.899967889102584,
									39.96200552017558
								],
								[
									23.3429993018608,
									39.96099782974579
								],
								[
									22.813987664488963,
									40.476005153966554
								],
								[
									22.62629886240478,
									40.25656118423919
								],
								[
									22.84974775563481,
									39.65931081802577
								],
								[
									23.3500272966526,
									39.19001129816726
								],
								[
									22.973099399515547,
									38.97090322524966
								],
								[
									23.530016310324953,
									38.51000112563847
								],
								[
									24.025024855248944,
									38.21999298761645
								],
								[
									24.040011020613605,
									37.655014553369426
								],
								[
									23.115002882589152,
									37.92001129816222
								],
								[
									23.409971958111072,
									37.409990749657396
								],
								[
									22.774971958108637,
									37.30501007745656
								],
								[
									23.15422529469862,
									36.422505804992056
								],
								[
									22.490028110451107,
									36.41000010837746
								],
								[
									21.670026482843696,
									36.8449864771942
								],
								[
									21.295010613701578,
									37.644989325504696
								],
								[
									21.120034213961333,
									38.31032339126273
								],
								[
									20.730032179454582,
									38.769985256498785
								],
								[
									20.217712029712857,
									39.340234686839636
								],
								[
									20.15001590341052,
									39.62499766698403
								],
								[
									20.615000441172782,
									40.110006822259436
								],
								[
									20.674996779063633,
									40.434999904943055
								],
								[
									20.99998986174728,
									40.58000397395398
								],
								[
									21.02004031747643,
									40.84272695572588
								],
								[
									21.674160597426976,
									40.93127452245798
								],
								[
									22.05537763844427,
									41.14986583105269
								],
								[
									22.597308383889015,
									41.130487168943205
								],
								[
									22.76177,
									41.3048
								],
								[
									22.95237715016657,
									41.33799388281122
								],
								[
									23.692073601992462,
									41.30908091894386
								],
								[
									24.492644891058035,
									41.58389618587205
								],
								[
									25.197201368925533,
									41.23448598893066
								],
								[
									26.106138136507184,
									41.32889883072784
								],
								[
									26.117041863720914,
									41.82690460872473
								],
								[
									26.604195590936285,
									41.562114569661105
								]
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 6,
					"sovereignt": "Croatia",
					"sov_a3": "HRV",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Croatia",
					"adm0_a3": "HRV",
					"geou_dif": 0,
					"geounit": "Croatia",
					"gu_a3": "HRV",
					"su_dif": 0,
					"subunit": "Croatia",
					"su_a3": "HRV",
					"brk_diff": 0,
					"id": 11,
					"name": "Kroatien",
					"name_long": "Croatia",
					"brk_a3": "HRV",
					"brk_name": "Croatia",
					"brk_group": null,
					"abbrev": "Cro.",
					"postal": "HR",
					"formal_en": "Republic of Croatia",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Croatia",
					"name_alt": null,
					"mapcolor7": 5,
					"mapcolor8": 4,
					"mapcolor9": 5,
					"mapcolor13": 1,
					"pop_est": 4489409,
					"gdp_md_est": 82390,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "2. High income: nonOECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "HR",
					"iso_a3": "HRV",
					"iso_n3": "191",
					"un_a3": "191",
					"wb_a2": "HR",
					"wb_a3": "HRV",
					"woe_id": -99,
					"adm0_a3_is": "HRV",
					"adm0_a3_us": "HRV",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								18.829838087650046,
								45.908877671891844
							],
							[
								19.072768995854176,
								45.52151113543209
							],
							[
								19.39047570158459,
								45.236515611342384
							],
							[
								19.00548628101012,
								44.86023366960916
							],
							[
								18.553214145591653,
								45.08158966733146
							],
							[
								17.861783481526402,
								45.067740383477144
							],
							[
								17.002146030351014,
								45.23377676043094
							],
							[
								16.534939406000206,
								45.21160757097772
							],
							[
								16.318156772535872,
								45.00412669532591
							],
							[
								15.959367303133376,
								45.23377676043094
							],
							[
								15.750026075918981,
								44.818711656262565
							],
							[
								16.23966027188453,
								44.35114329688571
							],
							[
								16.456442905348865,
								44.04123973243128
							],
							[
								16.91615644701733,
								43.66772247982567
							],
							[
								17.297373488034452,
								43.44634064388737
							],
							[
								17.674921502358984,
								43.02856252702361
							],
							[
								18.56,
								42.65
							],
							[
								18.450016310304818,
								42.47999136002932
							],
							[
								17.509970330483327,
								42.849994615239154
							],
							[
								16.930005730871642,
								43.20999848080038
							],
							[
								16.015384555737683,
								43.50721548112722
							],
							[
								15.174453973052096,
								44.243191229827914
							],
							[
								15.376250441151797,
								44.31791535092208
							],
							[
								14.92030927904051,
								44.73848399512946
							],
							[
								14.901602410550879,
								45.07606028907611
							],
							[
								14.258747592839995,
								45.23377676043094
							],
							[
								13.952254672917036,
								44.80212352149687
							],
							[
								13.656975538801191,
								45.13693512631596
							],
							[
								13.67940311041582,
								45.48414907488501
							],
							[
								13.715059848697251,
								45.500323798192426
							],
							[
								14.4119682145855,
								45.46616567644742
							],
							[
								14.59510949062792,
								45.63494090431283
							],
							[
								14.935243767972963,
								45.471695054702764
							],
							[
								15.327674594797429,
								45.45231639259333
							],
							[
								15.323953891672431,
								45.731782538427694
							],
							[
								15.671529575267641,
								45.83415355079791
							],
							[
								15.768732944408612,
								46.23810822202353
							],
							[
								16.564808383864943,
								46.50375092221981
							],
							[
								16.882515089595415,
								46.38063182228444
							],
							[
								17.630066359129557,
								45.9517691106941
							],
							[
								18.45606245288286,
								45.75948110613615
							],
							[
								18.829838087650046,
								45.908877671891844
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 5,
					"sovereignt": "Hungary",
					"sov_a3": "HUN",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Hungary",
					"adm0_a3": "HUN",
					"geou_dif": 0,
					"geounit": "Hungary",
					"gu_a3": "HUN",
					"su_dif": 0,
					"subunit": "Hungary",
					"su_a3": "HUN",
					"brk_diff": 0,
					"id": 17,
					"name": "Ungarn",
					"name_long": "Hungary",
					"brk_a3": "HUN",
					"brk_name": "Hungary",
					"brk_group": null,
					"abbrev": "Hun.",
					"postal": "HU",
					"formal_en": "Republic of Hungary",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Hungary",
					"name_alt": null,
					"mapcolor7": 4,
					"mapcolor8": 6,
					"mapcolor9": 1,
					"mapcolor13": 5,
					"pop_est": 9905596,
					"gdp_md_est": 196600,
					"pop_year": -99,
					"lastcensus": 2001,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "HU",
					"iso_a3": "HUN",
					"iso_n3": "348",
					"un_a3": "348",
					"wb_a2": "HU",
					"wb_a3": "HUN",
					"woe_id": -99,
					"adm0_a3_is": "HUN",
					"adm0_a3_us": "HUN",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Eastern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								16.202298211337364,
								46.85238597267696
							],
							[
								16.534267612380376,
								47.49617096616912
							],
							[
								16.340584344150415,
								47.71290192320123
							],
							[
								16.90375410326726,
								47.71486562762833
							],
							[
								16.979666782304037,
								48.123497015976305
							],
							[
								17.48847293464982,
								47.867466132186216
							],
							[
								17.857132602620027,
								47.75842886005037
							],
							[
								18.696512892336926,
								47.880953681014404
							],
							[
								18.77702477384767,
								48.081768296900634
							],
							[
								19.17436486173989,
								48.11137889260387
							],
							[
								19.661363559658497,
								48.26661489520866
							],
							[
								19.769470656013112,
								48.202691148463614
							],
							[
								20.239054396249347,
								48.32756724709692
							],
							[
								20.473562045989866,
								48.562850043321816
							],
							[
								20.801293979584926,
								48.623854071642384
							],
							[
								21.872236362401736,
								48.31997081155002
							],
							[
								22.085608351334855,
								48.42226430927179
							],
							[
								22.640819939878753,
								48.15023956968736
							],
							[
								22.710531447040495,
								47.88219391538941
							],
							[
								22.099767693782837,
								47.6724392767167
							],
							[
								21.626514926853872,
								46.99423777931816
							],
							[
								21.02195234547125,
								46.3160879583519
							],
							[
								20.220192498462836,
								46.127468980486555
							],
							[
								19.596044549241583,
								46.17172984474454
							],
							[
								18.82983808764996,
								45.90887767189193
							],
							[
								18.45606245288286,
								45.759481106136136
							],
							[
								17.630066359129557,
								45.95176911069419
							],
							[
								16.8825150895953,
								46.38063182228444
							],
							[
								16.564808383864857,
								46.50375092221983
							],
							[
								16.370504998447416,
								46.841327216166505
							],
							[
								16.202298211337364,
								46.85238597267696
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 3,
					"sovereignt": "Ireland",
					"sov_a3": "IRL",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Ireland",
					"adm0_a3": "IRL",
					"geou_dif": 0,
					"geounit": "Ireland",
					"gu_a3": "IRL",
					"su_dif": 0,
					"subunit": "Ireland",
					"su_a3": "IRL",
					"brk_diff": 0,
					"id": 7,
					"name": "Irland",
					"name_long": "Ireland",
					"brk_a3": "IRL",
					"brk_name": "Ireland",
					"brk_group": null,
					"abbrev": "Ire.",
					"postal": "IRL",
					"formal_en": "Ireland",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Ireland",
					"name_alt": null,
					"mapcolor7": 2,
					"mapcolor8": 3,
					"mapcolor9": 2,
					"mapcolor13": 2,
					"pop_est": 4203200,
					"gdp_md_est": 188400,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "IE",
					"iso_a3": "IRL",
					"iso_n3": "372",
					"un_a3": "372",
					"wb_a2": "IE",
					"wb_a3": "IRL",
					"woe_id": -99,
					"adm0_a3_is": "IRL",
					"adm0_a3_us": "IRL",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Northern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								-6.197884894220991,
								53.867565009163364
							],
							[
								-6.032985398777611,
								53.15316417094435
							],
							[
								-6.788856573910849,
								52.260117906292336
							],
							[
								-8.56161658368356,
								51.669301255899356
							],
							[
								-9.977085740590269,
								51.82045482035308
							],
							[
								-9.166282517930782,
								52.86462881124268
							],
							[
								-9.688524542672454,
								53.8813626165853
							],
							[
								-8.327987433292009,
								54.66451894796863
							],
							[
								-7.572167934591064,
								55.13162221945487
							],
							[
								-7.366030646178785,
								54.59584096945272
							],
							[
								-7.572167934591064,
								54.059956366586
							],
							[
								-6.953730231138067,
								54.073702297575636
							],
							[
								-6.197884894220991,
								53.867565009163364
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 3,
					"sovereignt": "Iceland",
					"sov_a3": "ISL",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Iceland",
					"adm0_a3": "ISL",
					"geou_dif": 0,
					"geounit": "Iceland",
					"gu_a3": "ISL",
					"su_dif": 0,
					"subunit": "Iceland",
					"su_a3": "ISL",
					"brk_diff": 0,
					"id": 29,
					"name": "Island",
					"name_long": "Iceland",
					"brk_a3": "ISL",
					"brk_name": "Iceland",
					"brk_group": null,
					"abbrev": "Iceland",
					"postal": "IS",
					"formal_en": "Republic of Iceland",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Iceland",
					"name_alt": null,
					"mapcolor7": 1,
					"mapcolor8": 4,
					"mapcolor9": 4,
					"mapcolor13": 9,
					"pop_est": 306694,
					"gdp_md_est": 12710,
					"pop_year": -99,
					"lastcensus": -99,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "IS",
					"iso_a3": "ISL",
					"iso_n3": "352",
					"un_a3": "352",
					"wb_a2": "IS",
					"wb_a3": "ISL",
					"woe_id": -99,
					"adm0_a3_is": "ISL",
					"adm0_a3_us": "ISL",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Northern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 7,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								-1.508695441129234,
								64.45589223903143
							],
							[
								-0.60973222497981,
								64.12667104761987
							],
							[
								-1.909833746794902,
								62.36408193628868
							],
							[
								-4.794438035543422,
								61.678749091233854
							],
							[
								-4.656245896874992,
								61.49638296167582
							],
							[
								-6.97275468594276,
								61.64363495549153
							],
							[
								-9.762971971110158,
								61.960178941495386
							],
							[
								-8.778484259517683,
								62.40211579045551
							],
							[
								-10.95504391121911,
								62.8911298692335
							],
							[
								-9.184402635170358,
								63.0849681667603
							],
							[
								-9.227423265053332,
								63.37859365504274
							],
							[
								-11.326184047939336,
								63.61118927678847
							],
							[
								-10.65051469572309,
								64.26251902939522
							],
							[
								-9.134922451250887,
								64.41046865504687
							],
							[
								-7.57628373867955,
								63.73211212835143
							],
							[
								-4.05684160000159,
								64.27660085719477
							],
							[
								-3.167818976292125,
								64.52679230413587
							],
							[
								-1.508695441129234,
								64.45589223903143
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 2,
					"sovereignt": "Italy",
					"sov_a3": "ITA",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Italy",
					"adm0_a3": "ITA",
					"geou_dif": 0,
					"geounit": "Italy",
					"gu_a3": "ITA",
					"su_dif": 0,
					"subunit": "Italy",
					"su_a3": "ITA",
					"brk_diff": 0,
					"id": 12,
					"name": "Italien",
					"name_long": "Italy",
					"brk_a3": "ITA",
					"brk_name": "Italy",
					"brk_group": null,
					"abbrev": "Italy",
					"postal": "I",
					"formal_en": "Italian Republic",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Italy",
					"name_alt": null,
					"mapcolor7": 6,
					"mapcolor8": 7,
					"mapcolor9": 8,
					"mapcolor13": 7,
					"pop_est": 58126212,
					"gdp_md_est": 1823000,
					"pop_year": -99,
					"lastcensus": 2012,
					"gdp_year": -99,
					"economy": "1. Developed region: G7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "IT",
					"iso_a3": "ITA",
					"iso_n3": "380",
					"un_a3": "380",
					"wb_a2": "IT",
					"wb_a3": "ITA",
					"woe_id": -99,
					"adm0_a3_is": "ITA",
					"adm0_a3_us": "ITA",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 5,
					"long_len": 5,
					"abbrev_len": 5,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "MultiPolygon",
					"coordinates": [
						[
							[
								[
									15.520376010813834,
									38.23115509699147
								],
								[
									15.160242954171736,
									37.44404551853782
								],
								[
									15.309897902089006,
									37.1342194687318
								],
								[
									15.09998823411945,
									36.6199872909954
								],
								[
									14.335228712632016,
									36.996630967754754
								],
								[
									13.82673261887993,
									37.1045313583802
								],
								[
									12.431003859108813,
									37.61294993748382
								],
								[
									12.570943637755136,
									38.12638113051969
								],
								[
									13.741156447004585,
									38.03496552179536
								],
								[
									14.76124922044616,
									38.143873602850505
								],
								[
									15.520376010813834,
									38.23115509699147
								]
							]
						],
						[
							[
								[
									9.210011834356266,
									41.20999136002422
								],
								[
									9.809975213264977,
									40.5000088567661
								],
								[
									9.669518670295673,
									39.177376410471794
								],
								[
									9.21481774255949,
									39.240473334300134
								],
								[
									8.80693566247973,
									38.90661774347848
								],
								[
									8.428302443077115,
									39.17184703221662
								],
								[
									8.38825320805094,
									40.378310858718805
								],
								[
									8.15999840661766,
									40.95000722916379
								],
								[
									8.709990675500109,
									40.89998444270523
								],
								[
									9.210011834356266,
									41.20999136002422
								]
							]
						],
						[
							[
								[
									12.376485223040845,
									46.76755910906988
								],
								[
									13.806475457421556,
									46.50930613869119
								],
								[
									13.698109978905478,
									46.016778062517375
								],
								[
									13.937630242578336,
									45.591015936864665
								],
								[
									13.141606479554298,
									45.73669179949542
								],
								[
									12.328581170306308,
									45.381778062514854
								],
								[
									12.383874952858605,
									44.88537425391908
								],
								[
									12.261453484759159,
									44.600482082694015
								],
								[
									12.589237094786483,
									44.091365871754476
								],
								[
									13.526905958722494,
									43.58772736263791
								],
								[
									14.029820997787027,
									42.76100779883248
								],
								[
									15.142569614327954,
									41.955139675456905
								],
								[
									15.926191033601896,
									41.96131500911574
								],
								[
									16.169897088290412,
									41.740294908203424
								],
								[
									15.889345737377795,
									41.5410822617182
								],
								[
									16.785001661860576,
									41.179605617836586
								],
								[
									17.519168735431208,
									40.87714345963224
								],
								[
									18.376687452882578,
									40.35562490494266
								],
								[
									18.480247023195403,
									40.168866278639825
								],
								[
									18.2933850440281,
									39.81077444107325
								],
								[
									17.738380161213286,
									40.2776710068303
								],
								[
									16.869595981522338,
									40.44223460546385
								],
								[
									16.448743116937322,
									39.79540070246648
								],
								[
									17.1714896989715,
									39.42469981542072
								],
								[
									17.052840610429342,
									38.902871202137305
								],
								[
									16.635088331781844,
									38.8435724960824
								],
								[
									16.100960727613057,
									37.98589874933418
								],
								[
									15.684086948314501,
									37.90884918878703
								],
								[
									15.68796268073632,
									38.214592800441864
								],
								[
									15.891981235424709,
									38.750942491199226
								],
								[
									16.109332309644316,
									38.96454702407769
								],
								[
									15.718813510814641,
									39.544072374014945
								],
								[
									15.413612501698822,
									40.04835683853517
								],
								[
									14.998495721098237,
									40.17294871679093
								],
								[
									14.70326826341477,
									40.604550279292624
								],
								[
									14.060671827865264,
									40.78634796809544
								],
								[
									13.627985060285397,
									41.188287258461656
								],
								[
									12.88808190273042,
									41.25308950455562
								],
								[
									12.10668257004491,
									41.70453481705741
								],
								[
									11.191906365614187,
									42.35542531998968
								],
								[
									10.511947869517797,
									42.931462510747224
								],
								[
									10.200028924204048,
									43.920006822274615
								],
								[
									9.702488234097814,
									44.03627879493132
								],
								[
									8.88894616052687,
									44.36633616797954
								],
								[
									8.428560825238577,
									44.23122813575242
								],
								[
									7.850766635783202,
									43.76714793555524
								],
								[
									7.435184767291844,
									43.69384491634918
								],
								[
									7.549596388386163,
									44.12790110938482
								],
								[
									7.007562290076663,
									44.25476675066139
								],
								[
									6.749955275101712,
									45.02851797136759
								],
								[
									7.096652459347837,
									45.333098863295874
								],
								[
									6.802355177445662,
									45.70857982032868
								],
								[
									6.843592970414562,
									45.99114655210067
								],
								[
									7.273850945676685,
									45.77694774025076
								],
								[
									7.755992058959833,
									45.82449005795928
								],
								[
									8.31662967289438,
									46.163642483090854
								],
								[
									8.489952426801295,
									46.00515086525175
								],
								[
									8.966305779667834,
									46.036931871111165
								],
								[
									9.182881707403112,
									46.44021474871698
								],
								[
									9.922836541390353,
									46.31489940040919
								],
								[
									10.363378126678668,
									46.483571275409844
								],
								[
									10.442701450246602,
									46.893546250997446
								],
								[
									11.048555942436508,
									46.7513585475464
								],
								[
									11.164827915093326,
									46.94157949481274
								],
								[
									12.153088006243081,
									47.11539317482644
								],
								[
									12.376485223040845,
									46.76755910906988
								]
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 6,
					"sovereignt": "Kosovo",
					"sov_a3": "KOS",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Kosovo",
					"adm0_a3": "KOS",
					"geou_dif": 0,
					"geounit": "Kosovo",
					"gu_a3": "KOS",
					"su_dif": 0,
					"subunit": "Kosovo",
					"su_a3": "KOS",
					"brk_diff": 1,
					"id": 36,
					"name": "Kosovo",
					"name_long": "Kosovo",
					"brk_a3": "B57",
					"brk_name": "Kosovo",
					"brk_group": null,
					"abbrev": "Kos.",
					"postal": "KO",
					"formal_en": "Republic of Kosovo",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": "Self admin.; Claimed by Serbia",
					"name_sort": "Kosovo",
					"name_alt": null,
					"mapcolor7": 2,
					"mapcolor8": 2,
					"mapcolor9": 3,
					"mapcolor13": 11,
					"pop_est": 1804838,
					"gdp_md_est": 5352,
					"pop_year": -99,
					"lastcensus": 1981,
					"gdp_year": -99,
					"economy": "6. Developing region",
					"income_grp": "4. Lower middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "-99",
					"iso_a3": "-99",
					"iso_n3": "-99",
					"un_a3": "-099",
					"wb_a2": "KV",
					"wb_a3": "KSV",
					"woe_id": -99,
					"adm0_a3_is": "SRB",
					"adm0_a3_us": "KOS",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 6,
					"long_len": 6,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								20.76216,
								42.05186
							],
							[
								20.71731000000011,
								41.84711
							],
							[
								20.59023,
								41.85541
							],
							[
								20.52295,
								42.21787
							],
							[
								20.28374,
								42.3202500000001
							],
							[
								20.0707,
								42.58863
							],
							[
								20.25758,
								42.81275000000011
							],
							[
								20.49679,
								42.88469
							],
							[
								20.63508,
								43.21671
							],
							[
								20.81448,
								43.27205
							],
							[
								20.95651,
								43.13094
							],
							[
								21.143395,
								43.06868500000013
							],
							[
								21.27421,
								42.90959
							],
							[
								21.43866,
								42.86255
							],
							[
								21.63302,
								42.67717
							],
							[
								21.77505,
								42.6827
							],
							[
								21.66292,
								42.43922
							],
							[
								21.54332,
								42.3202500000001
							],
							[
								21.57663598940212,
								42.24522439706186
							],
							[
								21.35270000000014,
								42.2068
							],
							[
								20.76216,
								42.05186
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 5,
					"sovereignt": "Lithuania",
					"sov_a3": "LTU",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Lithuania",
					"adm0_a3": "LTU",
					"geou_dif": 0,
					"geounit": "Lithuania",
					"gu_a3": "LTU",
					"su_dif": 0,
					"subunit": "Lithuania",
					"su_a3": "LTU",
					"brk_diff": 0,
					"id": 15,
					"name": "Litauen",
					"name_long": "Lithuania",
					"brk_a3": "LTU",
					"brk_name": "Lithuania",
					"brk_group": null,
					"abbrev": "Lith.",
					"postal": "LT",
					"formal_en": "Republic of Lithuania",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Lithuania",
					"name_alt": null,
					"mapcolor7": 6,
					"mapcolor8": 3,
					"mapcolor9": 3,
					"mapcolor13": 9,
					"pop_est": 3555179,
					"gdp_md_est": 63330,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "LT",
					"iso_a3": "LTU",
					"iso_n3": "440",
					"un_a3": "440",
					"wb_a2": "LT",
					"wb_a3": "LTU",
					"woe_id": -99,
					"adm0_a3_is": "LTU",
					"adm0_a3_us": "LTU",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Northern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 9,
					"long_len": 9,
					"abbrev_len": 5,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								22.731098667092652,
								54.327536932993326
							],
							[
								22.65105187347254,
								54.582740993866736
							],
							[
								22.75776370615526,
								54.85657440858138
							],
							[
								22.315723504330577,
								55.015298570365864
							],
							[
								21.268448927503467,
								55.190481675835315
							],
							[
								21.055800408622417,
								56.031076361711065
							],
							[
								22.201156853939494,
								56.33780182557949
							],
							[
								23.878263787539964,
								56.27367137310527
							],
							[
								24.86068444184076,
								56.37252838807963
							],
							[
								25.000934279080894,
								56.16453074810484
							],
							[
								25.533046502390334,
								56.100296942766036
							],
							[
								26.494331495883756,
								55.615106919977634
							],
							[
								26.58827924979039,
								55.16717560487167
							],
							[
								25.7684326514798,
								54.84696259217509
							],
							[
								25.536353794056993,
								54.28242340760253
							],
							[
								24.450683628037037,
								53.905702216194754
							],
							[
								23.48412763844985,
								53.91249766704114
							],
							[
								23.24398725758951,
								54.22056671814914
							],
							[
								22.731098667092652,
								54.327536932993326
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 6,
					"sovereignt": "Luxembourg",
					"sov_a3": "LUX",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Luxembourg",
					"adm0_a3": "LUX",
					"geou_dif": 0,
					"geounit": "Luxembourg",
					"gu_a3": "LUX",
					"su_dif": 0,
					"subunit": "Luxembourg",
					"su_a3": "LUX",
					"brk_diff": 0,
					"id": 16,
					"name": "Luxemburg",
					"name_long": "Luxembourg",
					"brk_a3": "LUX",
					"brk_name": "Luxembourg",
					"brk_group": null,
					"abbrev": "Lux.",
					"postal": "L",
					"formal_en": "Grand Duchy of Luxembourg",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Luxembourg",
					"name_alt": null,
					"mapcolor7": 1,
					"mapcolor8": 7,
					"mapcolor9": 3,
					"mapcolor13": 7,
					"pop_est": 491775,
					"gdp_md_est": 39370,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "LU",
					"iso_a3": "LUX",
					"iso_n3": "442",
					"un_a3": "442",
					"wb_a2": "LU",
					"wb_a3": "LUX",
					"woe_id": -99,
					"adm0_a3_is": "LUX",
					"adm0_a3_us": "LUX",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Western Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 10,
					"long_len": 10,
					"abbrev_len": 4,
					"tiny": 5,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								6.043073357781111,
								50.128051662794235
							],
							[
								6.242751092156993,
								49.90222565367873
							],
							[
								6.186320428094177,
								49.463802802114515
							],
							[
								5.897759230176405,
								49.44266714130703
							],
							[
								5.674051954784829,
								49.529483547557504
							],
							[
								5.782417433300907,
								50.09032786722122
							],
							[
								6.043073357781111,
								50.128051662794235
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 5,
					"sovereignt": "Latvia",
					"sov_a3": "LVA",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Latvia",
					"adm0_a3": "LVA",
					"geou_dif": 0,
					"geounit": "Latvia",
					"gu_a3": "LVA",
					"su_dif": 0,
					"subunit": "Latvia",
					"su_a3": "LVA",
					"brk_diff": 0,
					"id": 14,
					"name": "Lettland",
					"name_long": "Latvia",
					"brk_a3": "LVA",
					"brk_name": "Latvia",
					"brk_group": null,
					"abbrev": "Lat.",
					"postal": "LV",
					"formal_en": "Republic of Latvia",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Latvia",
					"name_alt": null,
					"mapcolor7": 4,
					"mapcolor8": 7,
					"mapcolor9": 6,
					"mapcolor13": 13,
					"pop_est": 2231503,
					"gdp_md_est": 38860,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "LV",
					"iso_a3": "LVA",
					"iso_n3": "428",
					"un_a3": "428",
					"wb_a2": "LV",
					"wb_a3": "LVA",
					"woe_id": -99,
					"adm0_a3_is": "LVA",
					"adm0_a3_us": "LVA",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Northern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 6,
					"long_len": 6,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								21.055800408622417,
								56.031076361711065
							],
							[
								21.090423618257972,
								56.78387278912294
							],
							[
								21.581866489353672,
								57.411870632549935
							],
							[
								22.52434126149288,
								57.75337433535076
							],
							[
								23.318452996522097,
								57.00623647727487
							],
							[
								24.12072960785343,
								57.02569265403277
							],
							[
								24.312862583114622,
								57.79342357037697
							],
							[
								25.16459354014927,
								57.97015696881519
							],
							[
								25.60280968598437,
								57.84752879498657
							],
							[
								26.463532342237787,
								57.47638865826633
							],
							[
								27.288184848751513,
								57.47452830670383
							],
							[
								27.77001590344093,
								57.24425812441123
							],
							[
								27.855282016722526,
								56.75932648378429
							],
							[
								28.176709425577997,
								56.169129950578814
							],
							[
								27.10245975109453,
								55.783313707087686
							],
							[
								26.494331495883756,
								55.615106919977634
							],
							[
								25.533046502390334,
								56.100296942766036
							],
							[
								25.000934279080894,
								56.16453074810484
							],
							[
								24.86068444184076,
								56.37252838807963
							],
							[
								23.878263787539964,
								56.27367137310527
							],
							[
								22.201156853939494,
								56.33780182557949
							],
							[
								21.055800408622417,
								56.031076361711065
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 6,
					"sovereignt": "Moldova",
					"sov_a3": "MDA",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Moldova",
					"adm0_a3": "MDA",
					"geou_dif": 0,
					"geounit": "Moldova",
					"gu_a3": "MDA",
					"su_dif": 0,
					"subunit": "Moldova",
					"su_a3": "MDA",
					"brk_diff": 0,
					"id": 99,
					"name": "Moldavien",
					"name_long": "Moldova",
					"brk_a3": "MDA",
					"brk_name": "Moldova",
					"brk_group": null,
					"abbrev": "Mda.",
					"postal": "MD",
					"formal_en": "Republic of Moldova",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Moldova",
					"name_alt": null,
					"mapcolor7": 3,
					"mapcolor8": 5,
					"mapcolor9": 4,
					"mapcolor13": 12,
					"pop_est": 4320748,
					"gdp_md_est": 10670,
					"pop_year": -99,
					"lastcensus": 2004,
					"gdp_year": -99,
					"economy": "6. Developing region",
					"income_grp": "4. Lower middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "MD",
					"iso_a3": "MDA",
					"iso_n3": "498",
					"un_a3": "498",
					"wb_a2": "MD",
					"wb_a3": "MDA",
					"woe_id": -99,
					"adm0_a3_is": "MDA",
					"adm0_a3_us": "MDA",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Eastern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								26.619336785597795,
								48.22072622333347
							],
							[
								26.857823520624805,
								48.368210761094495
							],
							[
								27.522537469195157,
								48.467119452501116
							],
							[
								28.259546746541844,
								48.15556224221342
							],
							[
								28.670891147585166,
								48.1181485052341
							],
							[
								29.12269819511303,
								47.849095160506465
							],
							[
								29.05086795422733,
								47.5102269557525
							],
							[
								29.415135125452736,
								47.34664520933258
							],
							[
								29.559674106573112,
								46.928582872091326
							],
							[
								29.908851759569302,
								46.67436066343146
							],
							[
								29.838210076626297,
								46.52532583270169
							],
							[
								30.024658644335375,
								46.42393667254504
							],
							[
								29.759971958136394,
								46.34998769793536
							],
							[
								29.170653924279886,
								46.3792623968287
							],
							[
								29.07210696789929,
								46.517677720722496
							],
							[
								28.862972446414062,
								46.43788930926383
							],
							[
								28.933717482221624,
								46.2588304713725
							],
							[
								28.65998742037158,
								45.93998688413164
							],
							[
								28.485269402792767,
								45.5969070501459
							],
							[
								28.233553501099042,
								45.488283189468376
							],
							[
								28.0544429867754,
								45.944586086605625
							],
							[
								28.160017937947714,
								46.37156260841722
							],
							[
								28.128030226359044,
								46.810476386088254
							],
							[
								27.551166212684848,
								47.40511709247083
							],
							[
								27.233872918412743,
								47.82677094175638
							],
							[
								26.924176059687568,
								48.123264472030996
							],
							[
								26.619336785597795,
								48.22072622333347
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 6,
					"sovereignt": "Macedonia",
					"sov_a3": "MKD",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Macedonia",
					"adm0_a3": "MKD",
					"geou_dif": 0,
					"geounit": "Macedonia",
					"gu_a3": "MKD",
					"su_dif": 0,
					"subunit": "Macedonia",
					"su_a3": "MKD",
					"brk_diff": 0,
					"id": 32,
					"name": "EJR Mazedonien",
					"name_long": "Macedonia",
					"brk_a3": "MKD",
					"brk_name": "Macedonia",
					"brk_group": null,
					"abbrev": "Mkd.",
					"postal": "MK",
					"formal_en": "Former Yugoslav Republic of Macedonia",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Macedonia, FYR",
					"name_alt": null,
					"mapcolor7": 5,
					"mapcolor8": 3,
					"mapcolor9": 7,
					"mapcolor13": 3,
					"pop_est": 2066718,
					"gdp_md_est": 18780,
					"pop_year": -99,
					"lastcensus": 2010,
					"gdp_year": -99,
					"economy": "6. Developing region",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "MK",
					"iso_a3": "MKD",
					"iso_n3": "807",
					"un_a3": "807",
					"wb_a2": "MK",
					"wb_a3": "MKD",
					"woe_id": -99,
					"adm0_a3_is": "MKD",
					"adm0_a3_us": "MKD",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 9,
					"long_len": 9,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								20.59023,
								41.85541
							],
							[
								20.71731000000011,
								41.84711
							],
							[
								20.76216,
								42.05186
							],
							[
								21.35270000000014,
								42.2068
							],
							[
								21.57663598940212,
								42.24522439706186
							],
							[
								21.917080000000112,
								42.30364
							],
							[
								22.38052575042468,
								42.32025950781508
							],
							[
								22.881373732197346,
								41.999297186850356
							],
							[
								22.952377150166512,
								41.33799388281119
							],
							[
								22.76177,
								41.3048
							],
							[
								22.597308383889015,
								41.130487168943205
							],
							[
								22.05537763844427,
								41.14986583105269
							],
							[
								21.674160597426976,
								40.931274522457954
							],
							[
								21.0200403174764,
								40.84272695572588
							],
							[
								20.60518,
								41.08622
							],
							[
								20.46315,
								41.5150900000001
							],
							[
								20.59023,
								41.85541
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 6,
					"sovereignt": "Montenegro",
					"sov_a3": "MNE",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Montenegro",
					"adm0_a3": "MNE",
					"geou_dif": 0,
					"geounit": "Montenegro",
					"gu_a3": "MNE",
					"su_dif": 0,
					"subunit": "Montenegro",
					"su_a3": "MNE",
					"brk_diff": 0,
					"id": 99,
					"name": "Montenegro",
					"name_long": "Montenegro",
					"brk_a3": "MNE",
					"brk_name": "Montenegro",
					"brk_group": null,
					"abbrev": "Mont.",
					"postal": "ME",
					"formal_en": "Montenegro",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Montenegro",
					"name_alt": null,
					"mapcolor7": 4,
					"mapcolor8": 1,
					"mapcolor9": 4,
					"mapcolor13": 5,
					"pop_est": 672180,
					"gdp_md_est": 6816,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "6. Developing region",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "ME",
					"iso_a3": "MNE",
					"iso_n3": "499",
					"un_a3": "499",
					"wb_a2": "ME",
					"wb_a3": "MNE",
					"woe_id": -99,
					"adm0_a3_is": "MNE",
					"adm0_a3_us": "MNE",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 10,
					"long_len": 10,
					"abbrev_len": 5,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								19.801613396898688,
								42.50009349219084
							],
							[
								19.73805138517963,
								42.68824738216557
							],
							[
								19.3044900000001,
								42.19574
							],
							[
								19.37177000000014,
								41.87755
							],
							[
								19.16246,
								41.95502
							],
							[
								18.88214,
								42.28151
							],
							[
								18.45,
								42.48
							],
							[
								18.56,
								42.65
							],
							[
								18.70648,
								43.20011
							],
							[
								19.03165,
								43.43253
							],
							[
								19.21852,
								43.52384
							],
							[
								19.48389,
								43.35229
							],
							[
								19.63,
								43.21377997027054
							],
							[
								19.95857,
								43.10604
							],
							[
								20.3398,
								42.89852
							],
							[
								20.25758,
								42.81275000000011
							],
							[
								20.0707,
								42.58863
							],
							[
								19.801613396898688,
								42.50009349219084
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 5,
					"sovereignt": "Netherlands",
					"sov_a3": "NL1",
					"adm0_dif": 1,
					"level": 2,
					"type": "Country",
					"admin": "Netherlands",
					"adm0_a3": "NLD",
					"geou_dif": 0,
					"geounit": "Netherlands",
					"gu_a3": "NLD",
					"su_dif": 0,
					"subunit": "Netherlands",
					"su_a3": "NLD",
					"brk_diff": 0,
					"id": 19,
					"name": "Niederlande",
					"name_long": "Netherlands",
					"brk_a3": "NLD",
					"brk_name": "Netherlands",
					"brk_group": null,
					"abbrev": "Neth.",
					"postal": "NL",
					"formal_en": "Kingdom of the Netherlands",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Netherlands",
					"name_alt": null,
					"mapcolor7": 4,
					"mapcolor8": 2,
					"mapcolor9": 2,
					"mapcolor13": 9,
					"pop_est": 16715999,
					"gdp_md_est": 672000,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "NL",
					"iso_a3": "NLD",
					"iso_n3": "528",
					"un_a3": "528",
					"wb_a2": "NL",
					"wb_a3": "NLD",
					"woe_id": -99,
					"adm0_a3_is": "NLD",
					"adm0_a3_us": "NLD",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Western Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 11,
					"long_len": 11,
					"abbrev_len": 5,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								6.074182570020923,
								53.510403347378144
							],
							[
								6.905139601274129,
								53.48216217713065
							],
							[
								7.092053256873896,
								53.144043280644894
							],
							[
								6.842869500362383,
								52.22844025329755
							],
							[
								6.589396599970826,
								51.852029120483394
							],
							[
								5.988658074577813,
								51.851615709025054
							],
							[
								6.15665815595878,
								50.80372101501058
							],
							[
								5.606975945670001,
								51.03729848896978
							],
							[
								4.973991326526914,
								51.47502370869813
							],
							[
								4.047071160507528,
								51.26725861266857
							],
							[
								3.314971144228537,
								51.34575511331991
							],
							[
								3.830288527043137,
								51.62054454203195
							],
							[
								4.705997348661185,
								53.091798407597764
							],
							[
								6.074182570020923,
								53.510403347378144
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 3,
					"sovereignt": "Norway",
					"sov_a3": "NOR",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Norway",
					"adm0_a3": "NOR",
					"geou_dif": 0,
					"geounit": "Norway",
					"gu_a3": "NOR",
					"su_dif": 0,
					"subunit": "Norway",
					"su_a3": "NOR",
					"brk_diff": 0,
					"id": 30,
					"name": "Norwegen",
					"name_long": "Norway",
					"brk_a3": "NOR",
					"brk_name": "Norway",
					"brk_group": null,
					"abbrev": "Nor.",
					"postal": "N",
					"formal_en": "Kingdom of Norway",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Norway",
					"name_alt": null,
					"mapcolor7": 5,
					"mapcolor8": 3,
					"mapcolor9": 8,
					"mapcolor13": 12,
					"pop_est": 4676305,
					"gdp_md_est": 276400,
					"pop_year": -99,
					"lastcensus": 2001,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "NO",
					"iso_a3": "NOR",
					"iso_n3": "578",
					"un_a3": "578",
					"wb_a2": "NO",
					"wb_a3": "NOR",
					"woe_id": -99,
					"adm0_a3_is": "NOR",
					"adm0_a3_us": "NOR",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Northern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 6,
					"long_len": 6,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "MultiPolygon",
					"coordinates": [
						[
							[
								[
									28.165547316202918,
									71.18547435168051
								],
								[
									31.293418409965483,
									70.45378774685992
								],
								[
									30.005435011522792,
									70.1862588568849
								],
								[
									31.101078728975125,
									69.55808014594487
								],
								[
									29.399580519332886,
									69.15691600206307
								],
								[
									28.591929559043194,
									69.0647769232867
								],
								[
									29.015572950971972,
									69.76649119737797
								],
								[
									27.73229210786789,
									70.1641930202963
								],
								[
									26.1796220232263,
									69.82529897732616
								],
								[
									25.689212680776393,
									69.09211375596902
								],
								[
									24.73567915212672,
									68.64955678982145
								],
								[
									23.662049594830762,
									68.89124746365053
								],
								[
									22.356237827247412,
									68.84174144151496
								],
								[
									21.24493615081073,
									69.37044302029312
								],
								[
									20.645592889089585,
									69.10624726020086
								],
								[
									20.025268995857914,
									69.06513865831272
								],
								[
									19.878559604581255,
									68.40719432237262
								],
								[
									17.99386844246439,
									68.56739126247734
								],
								[
									17.729181756265348,
									68.01055186631623
								],
								[
									16.76887861498554,
									68.01393667263139
								],
								[
									16.108712192456835,
									67.3024555528369
								],
								[
									15.108411492583059,
									66.19386688909543
								],
								[
									13.55568973150909,
									64.78702769638147
								],
								[
									13.919905226302205,
									64.44542064071612
								],
								[
									13.57191613124877,
									64.04911408146967
								],
								[
									12.579935336973932,
									64.06621898055835
								],
								[
									11.930569288794231,
									63.12831757267699
								],
								[
									11.992064243221535,
									61.800362453856565
								],
								[
									12.631146681375242,
									61.2935716823701
								],
								[
									12.3003658382749,
									60.11793284773006
								],
								[
									11.468271925511175,
									59.432393296946
								],
								[
									11.027368605196926,
									58.8561494004594
								],
								[
									10.356556837616097,
									59.46980703392538
								],
								[
									8.382000359743643,
									58.31328847923328
								],
								[
									7.048748406613299,
									58.078884182357285
								],
								[
									5.665835402050419,
									58.58815542259367
								],
								[
									5.308234490590735,
									59.66323191999382
								],
								[
									4.992078077829007,
									61.970998033284275
								],
								[
									5.912900424837886,
									62.614472968182696
								],
								[
									8.553411085655767,
									63.45400828719647
								],
								[
									10.527709181366788,
									64.48603831649748
								],
								[
									12.358346795306375,
									65.87972585719316
								],
								[
									14.761145867581604,
									67.81064158799515
								],
								[
									16.43592736172897,
									68.56320547146169
								],
								[
									19.184028354578516,
									69.81744415961782
								],
								[
									21.378416375420613,
									70.25516937934606
								],
								[
									23.023742303161583,
									70.20207184516627
								],
								[
									24.546543409938522,
									71.03049673123724
								],
								[
									26.37004967622181,
									70.98626170519537
								],
								[
									28.165547316202918,
									71.18547435168051
								]
							]
						],
						[
							[
								[
									24.72412,
									77.85385
								],
								[
									22.49032,
									77.44493
								],
								[
									20.72601,
									77.67704
								],
								[
									21.41611,
									77.93504
								],
								[
									20.8119,
									78.25463
								],
								[
									22.88426,
									78.45494
								],
								[
									23.28134,
									78.07954
								],
								[
									24.72412,
									77.85385
								]
							]
						],
						[
							[
								[
									18.25183,
									79.70175
								],
								[
									21.54383,
									78.95611
								],
								[
									19.02737,
									78.5626
								],
								[
									18.47172,
									77.82669
								],
								[
									17.59441,
									77.63796
								],
								[
									17.1182,
									76.80941
								],
								[
									15.91315,
									76.77045
								],
								[
									13.76259,
									77.38035
								],
								[
									14.66956,
									77.73565
								],
								[
									13.1706,
									78.02493
								],
								[
									11.22231,
									78.8693
								],
								[
									10.44453,
									79.65239
								],
								[
									13.17077,
									80.01046
								],
								[
									13.71852,
									79.66039
								],
								[
									15.14282,
									79.67431
								],
								[
									15.52255,
									80.01608
								],
								[
									16.99085,
									80.05086
								],
								[
									18.25183,
									79.70175
								]
							]
						],
						[
							[
								[
									25.447625359811894,
									80.40734039989451
								],
								[
									27.4075057309135,
									80.05640574820046
								],
								[
									25.92465050629818,
									79.51783397085455
								],
								[
									23.02446577321362,
									79.4000117052291
								],
								[
									20.075188429451885,
									79.56682322866726
								],
								[
									19.897266473070914,
									79.84236196564751
								],
								[
									18.462263624757924,
									79.85988027619442
								],
								[
									17.368015170977458,
									80.31889618602702
								],
								[
									20.455992059010697,
									80.59815562613224
								],
								[
									21.907944777115404,
									80.35767934846209
								],
								[
									22.919252557067438,
									80.6571442735935
								],
								[
									25.447625359811894,
									80.40734039989451
								]
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 3,
					"sovereignt": "Poland",
					"sov_a3": "POL",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Poland",
					"adm0_a3": "POL",
					"geou_dif": 0,
					"geounit": "Poland",
					"gu_a3": "POL",
					"su_dif": 0,
					"subunit": "Poland",
					"su_a3": "POL",
					"brk_diff": 0,
					"id": 21,
					"name": "Polen",
					"name_long": "Poland",
					"brk_a3": "POL",
					"brk_name": "Poland",
					"brk_group": null,
					"abbrev": "Pol.",
					"postal": "PL",
					"formal_en": "Republic of Poland",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Poland",
					"name_alt": null,
					"mapcolor7": 3,
					"mapcolor8": 7,
					"mapcolor9": 1,
					"mapcolor13": 2,
					"pop_est": 38482919,
					"gdp_md_est": 667900,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "PL",
					"iso_a3": "POL",
					"iso_n3": "616",
					"un_a3": "616",
					"wb_a2": "PL",
					"wb_a3": "POL",
					"woe_id": -99,
					"adm0_a3_is": "POL",
					"adm0_a3_us": "POL",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Eastern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 6,
					"long_len": 6,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								15.01699588385867,
								51.10667409932158
							],
							[
								14.607098422919535,
								51.74518809671997
							],
							[
								14.685026482815687,
								52.0899474147552
							],
							[
								14.437599725002201,
								52.62485016540839
							],
							[
								14.074521111719491,
								52.98126251892543
							],
							[
								14.353315463934138,
								53.24817129171297
							],
							[
								14.119686313542587,
								53.75702912049104
							],
							[
								14.802900424873458,
								54.05070628520575
							],
							[
								16.36347700365573,
								54.513158677785725
							],
							[
								17.622831658608675,
								54.85153595643291
							],
							[
								18.62085859546164,
								54.68260569927078
							],
							[
								18.696254510175464,
								54.43871877706929
							],
							[
								19.660640089606403,
								54.42608388937393
							],
							[
								20.892244500418627,
								54.31252492941253
							],
							[
								22.731098667092652,
								54.327536932993326
							],
							[
								23.24398725758951,
								54.22056671814914
							],
							[
								23.48412763844985,
								53.91249766704114
							],
							[
								23.527535841575002,
								53.470121568406555
							],
							[
								23.80493493011778,
								53.089731350306074
							],
							[
								23.79919884613338,
								52.69109935160657
							],
							[
								23.199493849386187,
								52.48697744405367
							],
							[
								23.508002150168693,
								52.02364655212473
							],
							[
								23.527070753684374,
								51.57845408793024
							],
							[
								24.029985792748903,
								50.70540660257518
							],
							[
								23.922757195743262,
								50.42488108987875
							],
							[
								23.426508416444392,
								50.308505764357456
							],
							[
								22.518450148211603,
								49.47677358661974
							],
							[
								22.776418898212626,
								49.02739533140962
							],
							[
								22.558137648211755,
								49.085738023467144
							],
							[
								21.607808058364213,
								49.47010732685409
							],
							[
								20.887955356538413,
								49.32877228453583
							],
							[
								20.415839471119853,
								49.43145335549977
							],
							[
								19.825022820726872,
								49.21712535256923
							],
							[
								19.320712517990472,
								49.571574001659194
							],
							[
								18.90957482267632,
								49.435845852244576
							],
							[
								18.853144158613617,
								49.49622976337764
							],
							[
								18.392913852622172,
								49.98862864847075
							],
							[
								17.64944502123899,
								50.049038397819956
							],
							[
								17.55456709155112,
								50.36214590107642
							],
							[
								16.86876915860566,
								50.47397370055603
							],
							[
								16.719475945714436,
								50.21574656839354
							],
							[
								16.176253289462267,
								50.42260732685791
							],
							[
								16.23862674323857,
								50.69773265237984
							],
							[
								15.490972120839729,
								50.78472992614321
							],
							[
								15.01699588385867,
								51.10667409932158
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 2,
					"sovereignt": "Portugal",
					"sov_a3": "PRT",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Portugal",
					"adm0_a3": "PRT",
					"geou_dif": 0,
					"geounit": "Portugal",
					"gu_a3": "PRT",
					"su_dif": 1,
					"subunit": "Portugal",
					"su_a3": "PR1",
					"brk_diff": 0,
					"id": 22,
					"name": "Portugal",
					"name_long": "Portugal",
					"brk_a3": "PR1",
					"brk_name": "Portugal",
					"brk_group": null,
					"abbrev": "Port.",
					"postal": "P",
					"formal_en": "Portuguese Republic",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Portugal",
					"name_alt": null,
					"mapcolor7": 1,
					"mapcolor8": 7,
					"mapcolor9": 1,
					"mapcolor13": 4,
					"pop_est": 10707924,
					"gdp_md_est": 208627,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": 0,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "PT",
					"iso_a3": "PRT",
					"iso_n3": "620",
					"un_a3": "620",
					"wb_a2": "PT",
					"wb_a3": "PRT",
					"woe_id": -99,
					"adm0_a3_is": "PRT",
					"adm0_a3_us": "PRT",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 8,
					"long_len": 8,
					"abbrev_len": 5,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								-9.034817674180246,
								41.880570583659676
							],
							[
								-8.67194576662672,
								42.13468943945496
							],
							[
								-8.263856980817792,
								42.28046865495034
							],
							[
								-8.013174607769912,
								41.790886135417125
							],
							[
								-7.422512986673795,
								41.79207469335984
							],
							[
								-7.251308966490824,
								41.91834605566505
							],
							[
								-6.668605515967656,
								41.883386949219584
							],
							[
								-6.389087693700915,
								41.381815497394655
							],
							[
								-6.851126674822552,
								41.11108266861753
							],
							[
								-6.864019944679385,
								40.33087189387483
							],
							[
								-7.026413133156595,
								40.184524237624245
							],
							[
								-7.066591559263529,
								39.711891587882775
							],
							[
								-7.498632371439726,
								39.62957103124181
							],
							[
								-7.098036668313128,
								39.03007274022379
							],
							[
								-7.374092169616318,
								38.37305858006492
							],
							[
								-7.029281175148796,
								38.07576406508977
							],
							[
								-7.166507941099865,
								37.803894354802225
							],
							[
								-7.537105475281024,
								37.42890432387624
							],
							[
								-7.453725551778092,
								37.09778758396607
							],
							[
								-7.855613165711986,
								36.83826854099627
							],
							[
								-8.382816127953689,
								36.97888011326246
							],
							[
								-8.898856980820327,
								36.86880931248078
							],
							[
								-8.746101446965554,
								37.65134552667661
							],
							[
								-8.83999752443988,
								38.266243394517616
							],
							[
								-9.287463751655224,
								38.3584858261586
							],
							[
								-9.526570603869715,
								38.73742910415491
							],
							[
								-9.446988898140233,
								39.39206614842837
							],
							[
								-9.048305223008427,
								39.75509308527877
							],
							[
								-8.977353481471681,
								40.15930613866581
							],
							[
								-8.768684047877102,
								40.76063894303019
							],
							[
								-8.79085323733031,
								41.18433401139126
							],
							[
								-8.99078935386757,
								41.54345937760364
							],
							[
								-9.034817674180246,
								41.880570583659676
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 3,
					"sovereignt": "Romania",
					"sov_a3": "ROU",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Romania",
					"adm0_a3": "ROU",
					"geou_dif": 0,
					"geounit": "Romania",
					"gu_a3": "ROU",
					"su_dif": 0,
					"subunit": "Romania",
					"su_a3": "ROU",
					"brk_diff": 0,
					"id": 23,
					"name": "Rumänien",
					"name_long": "Romania",
					"brk_a3": "ROU",
					"brk_name": "Romania",
					"brk_group": null,
					"abbrev": "Rom.",
					"postal": "RO",
					"formal_en": "Romania",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Romania",
					"name_alt": null,
					"mapcolor7": 1,
					"mapcolor8": 4,
					"mapcolor9": 3,
					"mapcolor13": 13,
					"pop_est": 22215421,
					"gdp_md_est": 271400,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "RO",
					"iso_a3": "ROU",
					"iso_n3": "642",
					"un_a3": "642",
					"wb_a2": "RO",
					"wb_a3": "ROM",
					"woe_id": -99,
					"adm0_a3_is": "ROU",
					"adm0_a3_us": "ROU",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Eastern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								22.710531447040495,
								47.88219391538941
							],
							[
								23.142236362406805,
								48.09634105080695
							],
							[
								23.76095828623741,
								47.985598456405455
							],
							[
								24.40205610525038,
								47.98187775328043
							],
							[
								24.866317172960578,
								47.737525743188314
							],
							[
								25.20774336111299,
								47.89105642352747
							],
							[
								25.9459411964024,
								47.987148749374214
							],
							[
								26.19745039236693,
								48.22088125263035
							],
							[
								26.619336785597795,
								48.22072622333347
							],
							[
								26.924176059687568,
								48.123264472030996
							],
							[
								27.233872918412743,
								47.82677094175638
							],
							[
								27.551166212684848,
								47.40511709247083
							],
							[
								28.128030226359044,
								46.810476386088254
							],
							[
								28.160017937947714,
								46.37156260841722
							],
							[
								28.0544429867754,
								45.944586086605625
							],
							[
								28.233553501099042,
								45.488283189468376
							],
							[
								28.67977949393938,
								45.304030870131704
							],
							[
								29.149724969201653,
								45.464925442072456
							],
							[
								29.603289015427436,
								45.293308010431126
							],
							[
								29.62654340995877,
								45.0353909368624
							],
							[
								29.141611769331835,
								44.820210272799045
							],
							[
								28.8378577003202,
								44.913873806328056
							],
							[
								28.558081495891997,
								43.70746165625813
							],
							[
								27.970107049275075,
								43.81246816667522
							],
							[
								27.242399529740908,
								44.175986029632405
							],
							[
								26.065158725699746,
								43.94349376075127
							],
							[
								25.569271681426926,
								43.68844472917472
							],
							[
								24.100679152124172,
								43.74105133724785
							],
							[
								23.332302280376325,
								43.897010809904714
							],
							[
								22.944832391051847,
								43.82378530534713
							],
							[
								22.65714969248299,
								44.23492300066128
							],
							[
								22.4740084164406,
								44.40922760678177
							],
							[
								22.705725538837356,
								44.57800283464702
							],
							[
								22.459022251075936,
								44.7025171982543
							],
							[
								22.14508792490281,
								44.47842234962059
							],
							[
								21.56202273935361,
								44.7689472519655
							],
							[
								21.483526238702236,
								45.18117015235778
							],
							[
								20.874312778413355,
								45.416375433934235
							],
							[
								20.762174920339987,
								45.73457306577144
							],
							[
								20.220192498462836,
								46.127468980486555
							],
							[
								21.02195234547125,
								46.3160879583519
							],
							[
								21.626514926853872,
								46.99423777931816
							],
							[
								22.099767693782837,
								47.6724392767167
							],
							[
								22.710531447040495,
								47.88219391538941
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 2,
					"sovereignt": "Russia",
					"sov_a3": "RUS",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Russia",
					"adm0_a3": "RUS",
					"geou_dif": 0,
					"geounit": "Russia",
					"gu_a3": "RUS",
					"su_dif": 0,
					"subunit": "Russia",
					"su_a3": "RUS",
					"brk_diff": 0,
					"id": 99,
					"name": "Russland",
					"name_long": "Russian Federation",
					"brk_a3": "RUS",
					"brk_name": "Russia",
					"brk_group": null,
					"abbrev": "Rus.",
					"postal": "RUS",
					"formal_en": "Russian Federation",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Russian Federation",
					"name_alt": null,
					"mapcolor7": 2,
					"mapcolor8": 5,
					"mapcolor9": 7,
					"mapcolor13": 7,
					"pop_est": 140041247,
					"gdp_md_est": 2266000,
					"pop_year": -99,
					"lastcensus": 2010,
					"gdp_year": -99,
					"economy": "3. Emerging region: BRIC",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "RU",
					"iso_a3": "RUS",
					"iso_n3": "643",
					"un_a3": "643",
					"wb_a2": "RU",
					"wb_a3": "RUS",
					"woe_id": -99,
					"adm0_a3_is": "RUS",
					"adm0_a3_us": "RUS",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Eastern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 6,
					"long_len": 18,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "MultiPolygon",
					"coordinates": [
						[
							[
								[
									143.64800744036287,
									50.74760040954152
								],
								[
									144.65414757708564,
									48.976390692737596
								],
								[
									143.17392785051723,
									49.30655141865037
								],
								[
									142.5586682476501,
									47.861575018904915
								],
								[
									143.53349246640406,
									46.83672801369249
								],
								[
									143.50527713437262,
									46.13790761980948
								],
								[
									142.74770063697392,
									46.74076487892657
								],
								[
									142.0920300640545,
									45.96675527605879
								],
								[
									141.90692508358504,
									46.80592886004655
								],
								[
									142.0184428244709,
									47.780132961612935
								],
								[
									141.90444461483506,
									48.85918854429957
								],
								[
									142.13580000220568,
									49.61516307229746
								],
								[
									142.1799833518153,
									50.95234243428192
								],
								[
									141.59407596249005,
									51.93543488220254
								],
								[
									141.68254601457366,
									53.30196645772878
								],
								[
									142.60693403541077,
									53.762145087287905
								],
								[
									142.2097489768154,
									54.22547597921687
								],
								[
									142.654786411713,
									54.36588084575388
								],
								[
									142.91461551327657,
									53.70457754171474
								],
								[
									143.26084760963207,
									52.74076040303905
								],
								[
									143.23526777564766,
									51.75666026468875
								],
								[
									143.64800744036287,
									50.74760040954152
								]
							]
						],
						[
							[
								[
									22.731098667092652,
									54.327536932993326
								],
								[
									20.892244500418656,
									54.312524929412575
								],
								[
									19.660640089606403,
									54.426083889373984
								],
								[
									19.888481479581344,
									54.8661603867715
								],
								[
									21.2684489275035,
									55.19048167583529
								],
								[
									22.315723504330606,
									55.0152985703659
								],
								[
									22.757763706155288,
									54.85657440858142
								],
								[
									22.651051873472568,
									54.58274099386671
								],
								[
									22.731098667092652,
									54.327536932993326
								]
							]
						],
						[
							[
								[
									-175.01425,
									66.58435
								],
								[
									-174.33983,
									66.33556
								],
								[
									-174.57182,
									67.06219
								],
								[
									-171.85731,
									66.91308
								],
								[
									-169.89958,
									65.97724
								],
								[
									-170.89107,
									65.54139
								],
								[
									-172.53025,
									65.43791
								],
								[
									-172.555,
									64.46079
								],
								[
									-172.95533,
									64.25269
								],
								[
									-173.89184,
									64.2826
								],
								[
									-174.65392,
									64.63125
								],
								[
									-175.98353,
									64.92288
								],
								[
									-176.20716,
									65.35667
								],
								[
									-177.22266,
									65.52024
								],
								[
									-178.35993,
									65.39052
								],
								[
									-178.90332,
									65.74044
								],
								[
									-178.68611,
									66.11211
								],
								[
									-179.88377,
									65.87456
								],
								[
									-179.43268,
									65.40411
								],
								[
									-180,
									64.97970870219837
								],
								[
									-180,
									68.96363636363637
								],
								[
									-177.55,
									68.2
								],
								[
									-174.92825,
									67.20589
								],
								[
									-175.01425,
									66.58435
								]
							]
						],
						[
							[
								[
									180.00000000000014,
									70.83219920854668
								],
								[
									178.9034250000001,
									70.78114
								],
								[
									178.7253,
									71.0988
								],
								[
									180.00000000000014,
									71.51571433642826
								],
								[
									180.00000000000014,
									70.83219920854668
								]
							]
						],
						[
							[
								[
									-178.69378,
									70.89302
								],
								[
									-180,
									70.83219920854668
								],
								[
									-180,
									71.51571433642826
								],
								[
									-179.87187,
									71.55762
								],
								[
									-179.02433,
									71.55553
								],
								[
									-177.577945,
									71.26948
								],
								[
									-177.663575,
									71.13277
								],
								[
									-178.69378,
									70.89302
								]
							]
						],
						[
							[
								[
									143.60385,
									73.21244
								],
								[
									142.08763,
									73.20544
								],
								[
									140.038155,
									73.31692
								],
								[
									139.86312,
									73.36983
								],
								[
									140.81171,
									73.76506
								],
								[
									142.06207,
									73.85758
								],
								[
									143.48283,
									73.47525
								],
								[
									143.60385,
									73.21244
								]
							]
						],
						[
							[
								[
									150.73167,
									75.08406
								],
								[
									149.575925,
									74.68892
								],
								[
									147.97746,
									74.778355
								],
								[
									146.11919,
									75.17298
								],
								[
									146.358485,
									75.49682
								],
								[
									148.22223,
									75.345845
								],
								[
									150.73167,
									75.08406
								]
							]
						],
						[
							[
								[
									145.086285,
									75.56262
								],
								[
									144.3,
									74.82
								],
								[
									140.61381,
									74.84768
								],
								[
									138.95544,
									74.61148
								],
								[
									136.97439,
									75.26167
								],
								[
									137.51176,
									75.94917
								],
								[
									138.831075,
									76.13676
								],
								[
									141.47161,
									76.09289
								],
								[
									145.086285,
									75.56262
								]
							]
						],
						[
							[
								[
									57.5356925799924,
									70.72046397570216
								],
								[
									56.94497928246395,
									70.63274323188668
								],
								[
									53.6773751157842,
									70.76265778266847
								],
								[
									53.41201663596539,
									71.2066616889202
								],
								[
									51.60189456564572,
									71.47475901965049
								],
								[
									51.45575361512422,
									72.01488108996514
								],
								[
									52.47827518088357,
									72.22944163684096
								],
								[
									52.444168735570855,
									72.77473135038485
								],
								[
									54.42761355979766,
									73.62754751249759
								],
								[
									53.50828982932515,
									73.74981395130015
								],
								[
									55.90245893740766,
									74.62748647734534
								],
								[
									55.631932814359715,
									75.08141225859717
								],
								[
									57.86864383324885,
									75.60939036732321
								],
								[
									61.170044386647504,
									76.25188345000814
								],
								[
									64.49836836127022,
									76.43905548776928
								],
								[
									66.2109770038551,
									76.80978221303124
								],
								[
									68.15705976753483,
									76.93969676381292
								],
								[
									68.85221113472514,
									76.54481130645462
								],
								[
									68.18057254422766,
									76.23364166940911
								],
								[
									64.63732628770302,
									75.73775462513623
								],
								[
									61.58350752141476,
									75.2608845079468
								],
								[
									58.47708214705338,
									74.30905630156283
								],
								[
									56.98678551618801,
									73.33304352486624
								],
								[
									55.419335971910954,
									72.37126760526598
								],
								[
									55.622837762276305,
									71.54059479439033
								],
								[
									57.5356925799924,
									70.72046397570216
								]
							]
						],
						[
							[
								[
									106.97013000000013,
									76.97419
								],
								[
									107.24000000000015,
									76.48
								],
								[
									108.1538,
									76.72335000000015
								],
								[
									111.07726000000017,
									76.71
								],
								[
									113.33151,
									76.22224
								],
								[
									114.13417,
									75.84764
								],
								[
									113.88539,
									75.32779000000014
								],
								[
									112.77918,
									75.03186
								],
								[
									110.1512500000002,
									74.47673
								],
								[
									109.4,
									74.18
								],
								[
									110.64,
									74.04
								],
								[
									112.11919,
									73.78774000000013
								],
								[
									113.01954000000026,
									73.97693000000015
								],
								[
									113.52958000000032,
									73.33505000000011
								],
								[
									113.96881,
									73.5948800000001
								],
								[
									115.56782,
									73.75285
								],
								[
									118.77633000000023,
									73.58772
								],
								[
									119.02,
									73.12
								],
								[
									123.20066000000011,
									72.97122
								],
								[
									123.25777000000019,
									73.73503000000011
								],
								[
									125.3800000000002,
									73.56
								],
								[
									126.97644,
									73.56549
								],
								[
									128.59126,
									73.03871
								],
								[
									129.05157,
									72.39872
								],
								[
									128.46000000000012,
									71.98
								],
								[
									129.71599000000023,
									71.19304
								],
								[
									131.28858000000028,
									70.78699000000012
								],
								[
									132.25350000000017,
									71.83630000000011
								],
								[
									133.85766000000032,
									71.38642000000016
								],
								[
									135.56193,
									71.65525000000014
								],
								[
									137.49755,
									71.34763
								],
								[
									138.23409000000018,
									71.62803
								],
								[
									139.86983000000012,
									71.48783000000014
								],
								[
									139.14791,
									72.41619000000011
								],
								[
									140.46817,
									72.84941000000015
								],
								[
									149.5,
									72.2
								],
								[
									150.3511800000002,
									71.60643
								],
								[
									152.96890000000022,
									70.84222
								],
								[
									157.00688,
									71.03141
								],
								[
									158.99779,
									70.86672
								],
								[
									159.83031000000025,
									70.45324
								],
								[
									159.70866,
									69.72198
								],
								[
									160.94053000000034,
									69.4372800000001
								],
								[
									162.27907000000013,
									69.64204
								],
								[
									164.05248000000014,
									69.66823
								],
								[
									165.94037000000023,
									69.47199
								],
								[
									167.83567,
									69.58269
								],
								[
									169.5776300000002,
									68.6938
								],
								[
									170.81688000000028,
									69.01363
								],
								[
									170.0082000000002,
									69.65276
								],
								[
									170.4534500000003,
									70.09703
								],
								[
									173.64391000000026,
									69.81743
								],
								[
									175.72403000000023,
									69.87725000000023
								],
								[
									178.6,
									69.4
								],
								[
									180.00000000000014,
									68.96363636363657
								],
								[
									180.00000000000014,
									64.97970870219848
								],
								[
									179.99281,
									64.97433
								],
								[
									178.70720000000026,
									64.53493
								],
								[
									177.41128000000018,
									64.60821
								],
								[
									178.31300000000024,
									64.07593
								],
								[
									178.9082500000002,
									63.25197000000014
								],
								[
									179.37034,
									62.98262000000011
								],
								[
									179.48636,
									62.56894
								],
								[
									179.22825000000014,
									62.30410000000015
								],
								[
									177.3643,
									62.5219
								],
								[
									174.56929000000022,
									61.76915
								],
								[
									173.68013,
									61.65261
								],
								[
									172.15,
									60.95
								],
								[
									170.6985000000001,
									60.33618
								],
								[
									170.3308500000003,
									59.88177
								],
								[
									168.90046,
									60.57355
								],
								[
									166.29498000000032,
									59.788550000000214
								],
								[
									165.84000000000023,
									60.16
								],
								[
									164.87674,
									59.7316
								],
								[
									163.53929000000014,
									59.86871
								],
								[
									163.21711000000025,
									59.21101
								],
								[
									162.0173300000001,
									58.24328
								],
								[
									162.05297,
									57.83912
								],
								[
									163.19191,
									57.615030000000104
								],
								[
									163.05794000000017,
									56.159240000000125
								],
								[
									162.12958000000023,
									56.12219
								],
								[
									161.70146,
									55.285680000000156
								],
								[
									162.11749000000017,
									54.85514
								],
								[
									160.36877000000035,
									54.34433
								],
								[
									160.02173000000025,
									53.20257
								],
								[
									158.5309400000002,
									52.95868000000024
								],
								[
									158.23118,
									51.94269
								],
								[
									156.7897900000003,
									51.01105
								],
								[
									156.42000000000016,
									51.7
								],
								[
									155.99182,
									53.15895
								],
								[
									155.43366000000012,
									55.38103000000012
								],
								[
									155.91442000000032,
									56.767920000000146
								],
								[
									156.75815,
									57.3647
								],
								[
									156.8103500000001,
									57.83204
								],
								[
									158.3643300000002,
									58.05575
								],
								[
									160.15064000000015,
									59.314770000000124
								],
								[
									161.87204,
									60.34300000000013
								],
								[
									163.66969,
									61.1409000000001
								],
								[
									164.47355000000013,
									62.55061
								],
								[
									163.2584200000002,
									62.46627
								],
								[
									162.65791,
									61.6425
								],
								[
									160.1214800000001,
									60.54423
								],
								[
									159.30232,
									61.7739600000001
								],
								[
									156.7206800000001,
									61.43442
								],
								[
									154.21806000000035,
									59.758180000000124
								],
								[
									155.04375,
									59.14495
								],
								[
									152.81185,
									58.88385
								],
								[
									151.26573000000027,
									58.78089
								],
								[
									151.33815000000013,
									59.50396
								],
								[
									149.78371,
									59.65573000000015
								],
								[
									148.54481,
									59.16448
								],
								[
									145.48722,
									59.33637
								],
								[
									142.19782000000018,
									59.03998
								],
								[
									138.95848000000032,
									57.08805
								],
								[
									135.12619,
									54.72959
								],
								[
									136.70171,
									54.603550000000126
								],
								[
									137.19342,
									53.97732
								],
								[
									138.1647,
									53.755010000000254
								],
								[
									138.80463,
									54.25455000000011
								],
								[
									139.90151,
									54.18968000000018
								],
								[
									141.34531,
									53.08957000000012
								],
								[
									141.37923,
									52.23877
								],
								[
									140.5974200000002,
									51.2396700000001
								],
								[
									140.51308,
									50.04553000000013
								],
								[
									140.06193000000022,
									48.44671000000017
								],
								[
									138.55472000000023,
									46.99965
								],
								[
									138.21971,
									46.30795
								],
								[
									136.86232,
									45.14350000000019
								],
								[
									135.5153500000002,
									43.989
								],
								[
									134.86939000000027,
									43.39821
								],
								[
									133.53687000000028,
									42.81147
								],
								[
									132.90627000000015,
									42.7984900000001
								],
								[
									132.27807000000027,
									43.28456000000011
								],
								[
									130.93587000000016,
									42.55274
								],
								[
									130.78,
									42.2200000000002
								],
								[
									130.64000000000019,
									42.395
								],
								[
									130.63386640840983,
									42.90301463477056
								],
								[
									131.144687941615,
									42.92998973242695
								],
								[
									131.28855512911562,
									44.111519680348266
								],
								[
									131.02519000000026,
									44.96796
								],
								[
									131.8834542176596,
									45.32116160743652
								],
								[
									133.09712000000022,
									45.14409
								],
								[
									133.7696439963132,
									46.116926988299156
								],
								[
									134.1123500000002,
									47.21248000000014
								],
								[
									134.50081,
									47.578450000000146
								],
								[
									135.0263114767868,
									48.47822988544391
								],
								[
									133.37359581922803,
									48.18344167743484
								],
								[
									132.50669000000013,
									47.78896
								],
								[
									130.98726000000013,
									47.79013
								],
								[
									130.58229332898267,
									48.729687404976204
								],
								[
									129.3978178244205,
									49.440600084015614
								],
								[
									127.65740000000037,
									49.76027
								],
								[
									127.28745568248493,
									50.73979726826545
								],
								[
									126.93915652883786,
									51.35389415140591
								],
								[
									126.564399041857,
									51.7842554795327
								],
								[
									125.94634891164648,
									52.79279857035695
								],
								[
									125.06821129771046,
									53.16104482686893
								],
								[
									123.57147,
									53.4588
								],
								[
									122.24574791879306,
									53.431725979213695
								],
								[
									121.00308475147037,
									53.25140106873124
								],
								[
									120.1770886577169,
									52.75388621684121
								],
								[
									120.725789015792,
									52.51622630473091
								],
								[
									120.7382,
									51.96411
								],
								[
									120.18208000000018,
									51.64355
								],
								[
									119.27939,
									50.58292
								],
								[
									119.28846072802585,
									50.14288279886196
								],
								[
									117.8792444194265,
									49.51098338479704
								],
								[
									116.67880089728621,
									49.888531399121405
								],
								[
									115.48569542853144,
									49.80517731383475
								],
								[
									114.9621098165504,
									50.14024730081513
								],
								[
									114.36245649623535,
									50.248302720737485
								],
								[
									112.89773969935439,
									49.54356537535699
								],
								[
									111.58123091028668,
									49.37796824807768
								],
								[
									110.66201053267886,
									49.13012807880585
								],
								[
									109.40244917199672,
									49.29296051695769
								],
								[
									108.47516727095129,
									49.28254771585071
								],
								[
									107.86817589725112,
									49.793705145865886
								],
								[
									106.88880415245532,
									50.27429596618029
								],
								[
									105.8865914245869,
									50.406019192092174
								],
								[
									104.62158,
									50.275320000000164
								],
								[
									103.67654544476036,
									50.089966132195144
								],
								[
									102.25589000000011,
									50.51056000000011
								],
								[
									102.06521,
									51.259910000000104
								],
								[
									100.88948042196265,
									51.51685578063842
								],
								[
									99.98173221232358,
									51.63400625264396
								],
								[
									98.8614905131005,
									52.04736603454671
								],
								[
									97.82573978067452,
									51.01099518493325
								],
								[
									98.23176150919173,
									50.42240062112873
								],
								[
									97.25976000000023,
									49.72605
								],
								[
									95.81402000000017,
									49.97746000000012
								],
								[
									94.81594933469879,
									50.01343333597089
								],
								[
									94.14756635943561,
									50.48053660745717
								],
								[
									93.10421,
									50.49529
								],
								[
									92.23471154171969,
									50.80217072204175
								],
								[
									90.71366743364078,
									50.331811835321105
								],
								[
									88.80556684769559,
									49.47052073831247
								],
								[
									87.75126427607685,
									49.29719798440556
								],
								[
									87.3599703307627,
									49.21498078062916
								],
								[
									86.82935672398966,
									49.82667470966814
								],
								[
									85.5412699726825,
									49.69285858824816
								],
								[
									85.11555952346211,
									50.11730296487764
								],
								[
									84.41637739455305,
									50.311399644565824
								],
								[
									83.93511478061893,
									50.88924551045358
								],
								[
									83.38300377801247,
									51.069182847693895
								],
								[
									81.94598554883996,
									50.81219594990634
								],
								[
									80.56844689323546,
									51.38833649352844
								],
								[
									80.03555952344172,
									50.864750881547224
								],
								[
									77.80091556184433,
									53.40441498474755
								],
								[
									76.52517947785478,
									54.17700348572714
								],
								[
									76.89110029491346,
									54.49052440044193
								],
								[
									74.38482000000013,
									53.54685000000012
								],
								[
									73.42567874542053,
									53.489810289109755
								],
								[
									73.50851606638437,
									54.0356167669766
								],
								[
									72.22415001820221,
									54.37665538188679
								],
								[
									71.1801310566095,
									54.13328522400826
								],
								[
									70.86526655465516,
									55.169733588270105
								],
								[
									69.0681669452729,
									55.3852501491435
								],
								[
									68.16910037625891,
									54.97039175070438
								],
								[
									65.6668700000001,
									54.601250000000164
								],
								[
									65.17853356309595,
									54.35422781027208
								],
								[
									61.43660000000014,
									54.00625
								],
								[
									60.97806644068325,
									53.66499339457914
								],
								[
									61.699986199800634,
									52.97999644633427
								],
								[
									60.73999311711455,
									52.71998647725775
								],
								[
									60.92726850774025,
									52.44754832621501
								],
								[
									59.967533807215574,
									51.960420437215674
								],
								[
									61.58800337102414,
									51.272658799843185
								],
								[
									61.33742435084102,
									50.79907013610426
								],
								[
									59.932807244715576,
									50.842194118851836
								],
								[
									59.64228234237058,
									50.545442206415714
								],
								[
									58.36332000000013,
									51.06364
								],
								[
									56.77798,
									51.04355
								],
								[
									55.71694000000011,
									50.62171000000015
								],
								[
									54.532878452376195,
									51.02623973245937
								],
								[
									52.32872358583106,
									51.718652248738096
								],
								[
									50.76664839051219,
									51.692762356159875
								],
								[
									48.70238162618105,
									50.60512848571284
								],
								[
									48.577841424357615,
									49.874759629915644
								],
								[
									47.549480421749394,
									50.454698391311126
								],
								[
									46.75159630716277,
									49.35600576435374
								],
								[
									47.0436715024766,
									49.152038886097586
								],
								[
									46.4664457537763,
									48.39415233010493
								],
								[
									47.31524000000016,
									47.71585
								],
								[
									48.05725,
									47.74377
								],
								[
									48.694733514201886,
									47.0756281601779
								],
								[
									48.593250000000154,
									46.561040000000105
								],
								[
									49.101160000000135,
									46.399330000000106
								],
								[
									48.64541000000011,
									45.80629
								],
								[
									47.67591,
									45.64149000000012
								],
								[
									46.68201,
									44.6092000000001
								],
								[
									47.59094,
									43.66016000000013
								],
								[
									47.49252,
									42.98658
								],
								[
									48.58437000000018,
									41.80888
								],
								[
									47.98728315612604,
									41.4058192001944
								],
								[
									47.81566572448466,
									41.15141612402135
								],
								[
									47.373315464066394,
									41.21973236751114
								],
								[
									46.686070591016716,
									41.827137152669906
								],
								[
									46.40495079934894,
									41.86067515722743
								],
								[
									45.7764,
									42.09244000000024
								],
								[
									45.470279168485916,
									42.50278066667005
								],
								[
									44.53762291848207,
									42.711992702803684
								],
								[
									43.93121000000011,
									42.55496000000011
								],
								[
									43.755990000000196,
									42.74083
								],
								[
									42.39440000000016,
									43.2203
								],
								[
									40.92219000000014,
									43.38215000000014
								],
								[
									40.07696495947985,
									43.553104153002494
								],
								[
									39.955008579271095,
									43.434997666999294
								],
								[
									38.68,
									44.28
								],
								[
									37.53912000000011,
									44.65721
								],
								[
									36.67546000000013,
									45.24469
								],
								[
									37.40317,
									45.4045100000001
								],
								[
									38.23295,
									46.24087
								],
								[
									37.67372,
									46.63657
								],
								[
									39.14767,
									47.044750000000136
								],
								[
									39.12120000000013,
									47.26336
								],
								[
									38.22353803889948,
									47.10218984637598
								],
								[
									38.25511233902981,
									47.54640045835697
								],
								[
									38.77057,
									47.82562000000024
								],
								[
									39.738277622238996,
									47.89893707945208
								],
								[
									39.89562000000015,
									48.23241
								],
								[
									39.67465,
									48.783820000000134
								],
								[
									40.08078901546949,
									49.30742991799937
								],
								[
									40.069040000000115,
									49.60105
								],
								[
									38.59498823421356,
									49.92646190042373
								],
								[
									38.010631137857075,
									49.91566152607473
								],
								[
									37.39345950699524,
									50.38395335550368
								],
								[
									36.626167840325394,
									50.225590928745135
								],
								[
									35.35611616388812,
									50.57719737405915
								],
								[
									35.37791,
									50.77394
								],
								[
									35.02218305841794,
									51.2075723333715
								],
								[
									34.22481570815441,
									51.255993150428935
								],
								[
									34.14197838719062,
									51.566413479206204
								],
								[
									34.391730584457235,
									51.768881740925906
								],
								[
									33.75269982273588,
									52.33507457133166
								],
								[
									32.71576053236717,
									52.238465481162166
								],
								[
									32.412058139787774,
									52.28869497334978
								],
								[
									32.15944000000022,
									52.061250000000115
								],
								[
									31.78597,
									52.10168
								],
								[
									31.54001834486226,
									52.74205231384644
								],
								[
									31.305200636527985,
									53.07399587667331
								],
								[
									31.49764,
									53.16743000000014
								],
								[
									32.304519484188376,
									53.13272614197285
								],
								[
									32.693643019346126,
									53.35142080343215
								],
								[
									32.405598585751164,
									53.618045355842014
								],
								[
									31.731272820774592,
									53.79402944601202
								],
								[
									31.791424187962406,
									53.974638576872195
								],
								[
									31.384472283663825,
									54.15705638286238
								],
								[
									30.75753380709878,
									54.8117709417844
								],
								[
									30.97183597181325,
									55.081547756564134
								],
								[
									30.87390913262007,
									55.55097646750352
								],
								[
									29.89629438652244,
									55.7894632025305
								],
								[
									29.37157189303079,
									55.67009064393628
								],
								[
									29.229513380660393,
									55.91834422466641
								],
								[
									28.17670942557794,
									56.16912995057879
								],
								[
									27.855282016722526,
									56.75932648378438
								],
								[
									27.770015903440992,
									57.2442581244112
								],
								[
									27.288184848751655,
									57.47452830670392
								],
								[
									27.71668582531578,
									57.79189911562446
								],
								[
									27.420150000000206,
									58.72457000000014
								],
								[
									28.131699253051863,
									59.300825100331
								],
								[
									27.98112,
									59.47537
								],
								[
									29.1177,
									60.02805000000012
								],
								[
									28.07,
									60.50352000000015
								],
								[
									30.211107212044652,
									61.780027777749694
								],
								[
									31.139991082491036,
									62.35769277612445
								],
								[
									31.516092156711267,
									62.867687486412905
								],
								[
									30.035872430142803,
									63.552813625738565
								],
								[
									30.44468468600374,
									64.20445343693908
								],
								[
									29.544429559047018,
									64.94867157659056
								],
								[
									30.21765,
									65.80598
								],
								[
									29.054588657352383,
									66.94428620062203
								],
								[
									29.977426385220696,
									67.69829702419275
								],
								[
									28.445943637818772,
									68.364612942164
								],
								[
									28.591929559043365,
									69.0647769232867
								],
								[
									29.39955,
									69.15692000000018
								],
								[
									31.10108000000011,
									69.55811
								],
								[
									32.13272000000026,
									69.90595000000025
								],
								[
									33.77547,
									69.30142000000012
								],
								[
									36.51396,
									69.06342
								],
								[
									40.292340000000166,
									67.9324
								],
								[
									41.05987000000013,
									67.45713000000012
								],
								[
									41.12595000000019,
									66.79158000000012
								],
								[
									40.01583,
									66.26618000000013
								],
								[
									38.38295,
									65.9995300000001
								],
								[
									33.918710000000175,
									66.75961
								],
								[
									33.18444,
									66.63253
								],
								[
									34.81477,
									65.90015000000014
								],
								[
									34.87857425307877,
									65.4362128770482
								],
								[
									34.94391000000016,
									64.41437000000016
								],
								[
									36.23129,
									64.10945
								],
								[
									37.01273000000012,
									63.84983000000011
								],
								[
									37.14197000000016,
									64.33471
								],
								[
									36.539579035089815,
									64.76446
								],
								[
									37.17604000000014,
									65.14322000000013
								],
								[
									39.59345,
									64.52079000000018
								],
								[
									40.43560000000011,
									64.76446
								],
								[
									39.76260000000016,
									65.49682
								],
								[
									42.0930900000001,
									66.47623
								],
								[
									43.01604000000012,
									66.4185800000001
								],
								[
									43.94975000000014,
									66.06908
								],
								[
									44.53226,
									66.75634000000014
								],
								[
									43.69839,
									67.35245
								],
								[
									44.18795000000014,
									67.95051
								],
								[
									43.45282,
									68.57079
								],
								[
									46.25000000000014,
									68.25
								],
								[
									46.82134000000016,
									67.68997
								],
								[
									45.55517,
									67.56652
								],
								[
									45.5620200000001,
									67.0100500000002
								],
								[
									46.34915000000015,
									66.6676700000001
								],
								[
									47.894160000000255,
									66.88455000000016
								],
								[
									48.13876,
									67.52238
								],
								[
									50.22766000000016,
									67.99867000000015
								],
								[
									53.71743000000018,
									68.85738000000012
								],
								[
									54.47171,
									68.80815
								],
								[
									53.48582000000013,
									68.20131
								],
								[
									54.72628,
									68.09702
								],
								[
									55.44268000000014,
									68.43866
								],
								[
									57.317020000000156,
									68.46628
								],
								[
									58.80200000000022,
									68.88082
								],
								[
									59.94142000000019,
									68.2784400000001
								],
								[
									61.07784000000018,
									68.94069
								],
								[
									60.03,
									69.52
								],
								[
									60.55,
									69.85
								],
								[
									63.50400000000016,
									69.54739
								],
								[
									64.888115,
									69.23483500000015
								],
								[
									68.51216000000014,
									68.09233000000017
								],
								[
									69.18068,
									68.61563000000012
								],
								[
									68.16444,
									69.14436
								],
								[
									68.13522,
									69.35649
								],
								[
									66.93008000000012,
									69.45461000000012
								],
								[
									67.25976,
									69.92873
								],
								[
									66.72492000000014,
									70.70889000000014
								],
								[
									66.69466,
									71.02897000000024
								],
								[
									68.54006000000012,
									71.93450000000024
								],
								[
									69.19636000000011,
									72.84336000000016
								],
								[
									69.94,
									73.04000000000013
								],
								[
									72.58754,
									72.7762900000001
								],
								[
									72.79603,
									72.22006
								],
								[
									71.8481100000001,
									71.40898
								],
								[
									72.47011,
									71.09019
								],
								[
									72.79188,
									70.39114
								],
								[
									72.56470000000022,
									69.02085
								],
								[
									73.66787,
									68.4079
								],
								[
									73.2387,
									67.7404
								],
								[
									71.28000000000011,
									66.32000000000016
								],
								[
									72.42301000000018,
									66.17267000000018
								],
								[
									72.82077,
									66.53267
								],
								[
									73.92099000000016,
									66.78946000000013
								],
								[
									74.1865100000002,
									67.28429
								],
								[
									75.052,
									67.76047000000017
								],
								[
									74.46926000000016,
									68.32899
								],
								[
									74.93584000000013,
									68.98918
								],
								[
									73.84236,
									69.07146
								],
								[
									73.60187000000022,
									69.62763
								],
								[
									74.3998,
									70.63175
								],
								[
									73.1011,
									71.44717000000026
								],
								[
									74.89082000000022,
									72.12119
								],
								[
									74.65926,
									72.83227
								],
								[
									75.15801000000019,
									72.85497000000012
								],
								[
									75.68351,
									72.30056000000013
								],
								[
									75.28898000000012,
									71.33556
								],
								[
									76.35911,
									71.15287000000015
								],
								[
									75.90313000000017,
									71.87401
								],
								[
									77.57665000000011,
									72.26717
								],
								[
									79.65202000000014,
									72.32011
								],
								[
									81.5,
									71.75
								],
								[
									80.61071000000013,
									72.58285000000012
								],
								[
									80.51109,
									73.6482
								],
								[
									82.25,
									73.85000000000011
								],
								[
									84.65526,
									73.80591000000018
								],
								[
									86.82230000000024,
									73.93688
								],
								[
									86.00956,
									74.45967000000016
								],
								[
									87.16682000000017,
									75.11643
								],
								[
									88.31571000000011,
									75.14393
								],
								[
									90.26,
									75.64
								],
								[
									92.90058,
									75.77333
								],
								[
									93.23421000000016,
									76.0472
								],
								[
									95.86000000000016,
									76.1400000000001
								],
								[
									96.67821,
									75.91548
								],
								[
									98.92254000000023,
									76.44689
								],
								[
									100.75967000000023,
									76.43028
								],
								[
									101.03532,
									76.86189
								],
								[
									101.99084000000013,
									77.2875400000002
								],
								[
									104.3516000000001,
									77.69792
								],
								[
									106.06664000000015,
									77.37389
								],
								[
									104.70500000000024,
									77.1274
								],
								[
									106.97013000000013,
									76.97419
								]
							]
						],
						[
							[
								[
									105.07547,
									78.30689
								],
								[
									99.43814,
									77.921
								],
								[
									101.2649,
									79.23399
								],
								[
									102.08635,
									79.34641
								],
								[
									102.837815,
									79.28129
								],
								[
									105.37243,
									78.71334
								],
								[
									105.07547,
									78.30689
								]
							]
						],
						[
							[
								[
									51.13618655783128,
									80.54728017854094
								],
								[
									49.79368452332071,
									80.41542776154822
								],
								[
									48.89441124857754,
									80.3395667589437
								],
								[
									48.754936557821765,
									80.17546824820084
								],
								[
									47.586119012244154,
									80.01018117951534
								],
								[
									46.502825962109654,
									80.24724681265437
								],
								[
									47.07245527526291,
									80.55942414012947
								],
								[
									44.846958042181114,
									80.58980988231718
								],
								[
									46.79913862487123,
									80.77191762971364
								],
								[
									48.318477410684665,
									80.78400991486996
								],
								[
									48.522806023966695,
									80.51456899690015
								],
								[
									49.09718956889091,
									80.75398590770843
								],
								[
									50.03976769389462,
									80.91888540315182
								],
								[
									51.52293297710369,
									80.69972565380192
								],
								[
									51.13618655783128,
									80.54728017854094
								]
							]
						],
						[
							[
								[
									99.93976,
									78.88094
								],
								[
									97.75794,
									78.7562
								],
								[
									94.97259,
									79.044745
								],
								[
									93.31288,
									79.4265
								],
								[
									92.5454,
									80.14379
								],
								[
									91.18107,
									80.34146
								],
								[
									93.77766,
									81.0246
								],
								[
									95.940895,
									81.2504
								],
								[
									97.88385,
									80.746975
								],
								[
									100.186655,
									79.780135
								],
								[
									99.93976,
									78.88094
								]
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 5,
					"sovereignt": "Republic of Serbia",
					"sov_a3": "SRB",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Republic of Serbia",
					"adm0_a3": "SRB",
					"geou_dif": 0,
					"geounit": "Republic of Serbia",
					"gu_a3": "SRB",
					"su_dif": 0,
					"subunit": "Republic of Serbia",
					"su_a3": "SRB",
					"brk_diff": 0,
					"id": 33,
					"name": "Serbien",
					"name_long": "Serbia",
					"brk_a3": "SRB",
					"brk_name": "Serbia",
					"brk_group": null,
					"abbrev": "Serb.",
					"postal": "RS",
					"formal_en": "Republic of Serbia",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Serbia",
					"name_alt": null,
					"mapcolor7": 3,
					"mapcolor8": 3,
					"mapcolor9": 2,
					"mapcolor13": 10,
					"pop_est": 7379339,
					"gdp_md_est": 80340,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "6. Developing region",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "RS",
					"iso_a3": "SRB",
					"iso_n3": "688",
					"un_a3": "688",
					"wb_a2": "YF",
					"wb_a3": "SRB",
					"woe_id": -99,
					"adm0_a3_is": "SRB",
					"adm0_a3_us": "SRB",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 6,
					"long_len": 6,
					"abbrev_len": 5,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								20.87431277841341,
								45.41637543393432
							],
							[
								21.48352623870221,
								45.18117015235788
							],
							[
								21.562022739353722,
								44.76894725196564
							],
							[
								22.145087924902896,
								44.47842234962059
							],
							[
								22.459022251075965,
								44.70251719825444
							],
							[
								22.70572553883744,
								44.57800283464701
							],
							[
								22.474008416440654,
								44.40922760678177
							],
							[
								22.657149692483074,
								44.234923000661354
							],
							[
								22.410446404721597,
								44.008063462900054
							],
							[
								22.500156691180223,
								43.642814439461006
							],
							[
								22.986018507588483,
								43.2111612005271
							],
							[
								22.60480146657136,
								42.898518785161116
							],
							[
								22.436594679461393,
								42.58032115332395
							],
							[
								22.54501183440965,
								42.46136200618804
							],
							[
								22.38052575042468,
								42.32025950781508
							],
							[
								21.917080000000112,
								42.30364
							],
							[
								21.57663598940212,
								42.24522439706186
							],
							[
								21.54332,
								42.3202500000001
							],
							[
								21.66292,
								42.43922
							],
							[
								21.77505,
								42.6827
							],
							[
								21.63302,
								42.67717
							],
							[
								21.43866,
								42.86255
							],
							[
								21.27421,
								42.90959
							],
							[
								21.143395,
								43.06868500000013
							],
							[
								20.95651,
								43.13094
							],
							[
								20.81448,
								43.27205
							],
							[
								20.63508,
								43.21671
							],
							[
								20.49679,
								42.88469
							],
							[
								20.25758,
								42.81275000000011
							],
							[
								20.3398,
								42.89852
							],
							[
								19.95857,
								43.10604
							],
							[
								19.63,
								43.21377997027054
							],
							[
								19.48389,
								43.35229
							],
							[
								19.21852,
								43.52384
							],
							[
								19.454,
								43.56810000000013
							],
							[
								19.59976,
								44.03847
							],
							[
								19.11761,
								44.42307000000011
							],
							[
								19.36803,
								44.863
							],
							[
								19.00548,
								44.86023
							],
							[
								19.39047570158459,
								45.236515611342384
							],
							[
								19.072768995854176,
								45.52151113543209
							],
							[
								18.82982,
								45.90888
							],
							[
								19.59604454924164,
								46.17172984474456
							],
							[
								20.220192498462893,
								46.12746898048658
							],
							[
								20.762174920339987,
								45.734573065771485
							],
							[
								20.87431277841341,
								45.41637543393432
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 6,
					"sovereignt": "Slovakia",
					"sov_a3": "SVK",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Slovakia",
					"adm0_a3": "SVK",
					"geou_dif": 0,
					"geounit": "Slovakia",
					"gu_a3": "SVK",
					"su_dif": 0,
					"subunit": "Slovakia",
					"su_a3": "SVK",
					"brk_diff": 0,
					"id": 25,
					"name": "Slowakei",
					"name_long": "Slovakia",
					"brk_a3": "SVK",
					"brk_name": "Slovakia",
					"brk_group": null,
					"abbrev": "Svk.",
					"postal": "SK",
					"formal_en": "Slovak Republic",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Slovak Republic",
					"name_alt": null,
					"mapcolor7": 2,
					"mapcolor8": 4,
					"mapcolor9": 4,
					"mapcolor13": 9,
					"pop_est": 5463046,
					"gdp_md_est": 119500,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "SK",
					"iso_a3": "SVK",
					"iso_n3": "703",
					"un_a3": "703",
					"wb_a2": "SK",
					"wb_a3": "SVK",
					"woe_id": -99,
					"adm0_a3_is": "SVK",
					"adm0_a3_us": "SVK",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Eastern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 8,
					"long_len": 8,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								18.853144158613617,
								49.49622976337764
							],
							[
								18.90957482267632,
								49.435845852244576
							],
							[
								19.320712517990472,
								49.571574001659194
							],
							[
								19.825022820726872,
								49.21712535256923
							],
							[
								20.415839471119853,
								49.43145335549977
							],
							[
								20.887955356538413,
								49.32877228453583
							],
							[
								21.607808058364213,
								49.47010732685409
							],
							[
								22.558137648211755,
								49.085738023467144
							],
							[
								22.28084191253356,
								48.82539215758067
							],
							[
								22.085608351334855,
								48.42226430927179
							],
							[
								21.872236362401736,
								48.31997081155002
							],
							[
								20.801293979584926,
								48.623854071642384
							],
							[
								20.473562045989866,
								48.562850043321816
							],
							[
								20.239054396249347,
								48.32756724709692
							],
							[
								19.769470656013112,
								48.202691148463614
							],
							[
								19.661363559658497,
								48.26661489520866
							],
							[
								19.17436486173989,
								48.11137889260387
							],
							[
								18.77702477384767,
								48.081768296900634
							],
							[
								18.696512892336926,
								47.880953681014404
							],
							[
								17.857132602620027,
								47.75842886005037
							],
							[
								17.48847293464982,
								47.867466132186216
							],
							[
								16.979666782304037,
								48.123497015976305
							],
							[
								16.879982944413,
								48.47001333270947
							],
							[
								16.960288120194576,
								48.5969823268506
							],
							[
								17.101984897538898,
								48.816968899117114
							],
							[
								17.545006951577108,
								48.80001902932537
							],
							[
								17.88648481616181,
								48.90347524677371
							],
							[
								17.913511590250465,
								48.996492824899086
							],
							[
								18.104972771891852,
								49.04398346617531
							],
							[
								18.170498488037964,
								49.271514797556435
							],
							[
								18.399993523846177,
								49.31500051533004
							],
							[
								18.554971144289482,
								49.495015367218784
							],
							[
								18.853144158613617,
								49.49622976337764
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 6,
					"sovereignt": "Slovenia",
					"sov_a3": "SVN",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Slovenia",
					"adm0_a3": "SVN",
					"geou_dif": 0,
					"geounit": "Slovenia",
					"gu_a3": "SVN",
					"su_dif": 0,
					"subunit": "Slovenia",
					"su_a3": "SVN",
					"brk_diff": 0,
					"id": 24,
					"name": "Slowenien",
					"name_long": "Slovenia",
					"brk_a3": "SVN",
					"brk_name": "Slovenia",
					"brk_group": null,
					"abbrev": "Slo.",
					"postal": "SLO",
					"formal_en": "Republic of Slovenia",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Slovenia",
					"name_alt": null,
					"mapcolor7": 2,
					"mapcolor8": 3,
					"mapcolor9": 2,
					"mapcolor13": 12,
					"pop_est": 2005692,
					"gdp_md_est": 59340,
					"pop_year": -99,
					"lastcensus": 2011,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "SI",
					"iso_a3": "SVN",
					"iso_n3": "705",
					"un_a3": "705",
					"wb_a2": "SI",
					"wb_a3": "SVN",
					"woe_id": -99,
					"adm0_a3_is": "SVN",
					"adm0_a3_us": "SVN",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Southern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 8,
					"long_len": 8,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								13.806475457421527,
								46.509306138691215
							],
							[
								14.63247155117483,
								46.43181732846955
							],
							[
								15.137091912504985,
								46.65870270444703
							],
							[
								16.011663852612656,
								46.6836107448117
							],
							[
								16.202298211337364,
								46.85238597267696
							],
							[
								16.370504998447416,
								46.841327216166505
							],
							[
								16.564808383864857,
								46.50375092221983
							],
							[
								15.768732944408553,
								46.23810822202345
							],
							[
								15.671529575267556,
								45.83415355079788
							],
							[
								15.323953891672405,
								45.73178253842768
							],
							[
								15.327674594797429,
								45.45231639259323
							],
							[
								14.935243767972935,
								45.471695054702685
							],
							[
								14.595109490627806,
								45.634940904312714
							],
							[
								14.411968214585414,
								45.46616567644746
							],
							[
								13.715059848697223,
								45.500323798192376
							],
							[
								13.937630242578308,
								45.59101593686462
							],
							[
								13.698109978905478,
								46.01677806251735
							],
							[
								13.806475457421527,
								46.509306138691215
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 3,
					"sovereignt": "Sweden",
					"sov_a3": "SWE",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Sweden",
					"adm0_a3": "SWE",
					"geou_dif": 0,
					"geounit": "Sweden",
					"gu_a3": "SWE",
					"su_dif": 0,
					"subunit": "Sweden",
					"su_a3": "SWE",
					"brk_diff": 0,
					"id": 27,
					"name": "Schweden",
					"name_long": "Sweden",
					"brk_a3": "SWE",
					"brk_name": "Sweden",
					"brk_group": null,
					"abbrev": "Swe.",
					"postal": "S",
					"formal_en": "Kingdom of Sweden",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Sweden",
					"name_alt": null,
					"mapcolor7": 1,
					"mapcolor8": 4,
					"mapcolor9": 2,
					"mapcolor13": 4,
					"pop_est": 9059651,
					"gdp_md_est": 344300,
					"pop_year": -99,
					"lastcensus": -99,
					"gdp_year": -99,
					"economy": "2. Developed region: nonG7",
					"income_grp": "1. High income: OECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "SE",
					"iso_a3": "SWE",
					"iso_n3": "752",
					"un_a3": "752",
					"wb_a2": "SE",
					"wb_a3": "SWE",
					"woe_id": -99,
					"adm0_a3_is": "SWE",
					"adm0_a3_us": "SWE",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Northern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 6,
					"long_len": 6,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								22.18317345550193,
								65.72374054632017
							],
							[
								21.21351687997722,
								65.02600535751527
							],
							[
								21.369631381930958,
								64.41358795842429
							],
							[
								19.77887576669022,
								63.60955434839504
							],
							[
								17.84777916837521,
								62.74940013289681
							],
							[
								17.119554884518124,
								61.34116567651097
							],
							[
								17.83134606290639,
								60.63658336042741
							],
							[
								18.78772179533209,
								60.081914374422595
							],
							[
								17.86922488777634,
								58.9537661810587
							],
							[
								16.829185011470088,
								58.71982697207339
							],
							[
								16.447709588291474,
								57.041118069071885
							],
							[
								15.879785597403783,
								56.10430186626866
							],
							[
								14.666681349352075,
								56.200885118222175
							],
							[
								14.100721062891465,
								55.40778107362265
							],
							[
								12.942910597392057,
								55.36173737245058
							],
							[
								12.625100538797028,
								56.30708018658197
							],
							[
								11.787942335668674,
								57.44181712506307
							],
							[
								11.027368605196868,
								58.85614940045936
							],
							[
								11.468271925511146,
								59.43239329694604
							],
							[
								12.3003658382749,
								60.11793284773003
							],
							[
								12.631146681375185,
								61.293571682370136
							],
							[
								11.992064243221563,
								61.80036245385655
							],
							[
								11.930569288794231,
								63.12831757267698
							],
							[
								12.579935336973934,
								64.06621898055833
							],
							[
								13.571916131248713,
								64.04911408146971
							],
							[
								13.919905226302204,
								64.44542064071608
							],
							[
								13.55568973150909,
								64.78702769638151
							],
							[
								15.108411492583002,
								66.19386688909547
							],
							[
								16.108712192456778,
								67.30245555283689
							],
							[
								16.768878614985482,
								68.0139366726314
							],
							[
								17.729181756265348,
								68.01055186631628
							],
							[
								17.993868442464333,
								68.56739126247736
							],
							[
								19.878559604581255,
								68.40719432237258
							],
							[
								20.025268995857886,
								69.0651386583127
							],
							[
								20.645592889089528,
								69.10624726020087
							],
							[
								21.978534783626117,
								68.6168456081807
							],
							[
								23.53947309743444,
								67.93600861273525
							],
							[
								23.565879754335583,
								66.39605093043743
							],
							[
								23.903378533633802,
								66.00692739527962
							],
							[
								22.18317345550193,
								65.72374054632017
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 3,
					"sovereignt": "Ukraine",
					"sov_a3": "UKR",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Ukraine",
					"adm0_a3": "UKR",
					"geou_dif": 0,
					"geounit": "Ukraine",
					"gu_a3": "UKR",
					"su_dif": 0,
					"subunit": "Ukraine",
					"su_a3": "UKR",
					"brk_diff": 0,
					"id": 99,
					"name": "Ukraine",
					"name_long": "Ukraine",
					"brk_a3": "UKR",
					"brk_name": "Ukraine",
					"brk_group": null,
					"abbrev": "Ukr.",
					"postal": "UA",
					"formal_en": "Ukraine",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Ukraine",
					"name_alt": null,
					"mapcolor7": 5,
					"mapcolor8": 1,
					"mapcolor9": 6,
					"mapcolor13": 3,
					"pop_est": 45700395,
					"gdp_md_est": 339800,
					"pop_year": -99,
					"lastcensus": 2001,
					"gdp_year": -99,
					"economy": "6. Developing region",
					"income_grp": "4. Lower middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "UA",
					"iso_a3": "UKR",
					"iso_n3": "804",
					"un_a3": "804",
					"wb_a2": "UA",
					"wb_a3": "UKR",
					"woe_id": -99,
					"adm0_a3_is": "UKR",
					"adm0_a3_us": "UKR",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Europe",
					"region_un": "Europe",
					"subregion": "Eastern Europe",
					"region_wb": "Europe & Central Asia",
					"name_len": 7,
					"long_len": 7,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								31.785998162571587,
								52.101677964885454
							],
							[
								32.15941206231267,
								52.06126699483322
							],
							[
								32.41205813978763,
								52.28869497334975
							],
							[
								32.71576053236697,
								52.23846548116205
							],
							[
								33.75269982273571,
								52.335074571331695
							],
							[
								34.39173058445701,
								51.76888174092579
							],
							[
								34.14197838719039,
								51.56641347920623
							],
							[
								34.22481570815427,
								51.25599315042896
							],
							[
								35.02218305841788,
								51.20757233337146
							],
							[
								35.37792361831512,
								50.77395539001035
							],
							[
								35.35611616388795,
								50.57719737405906
							],
							[
								36.62616784032534,
								50.225590928745135
							],
							[
								37.39345950699507,
								50.38395335550359
							],
							[
								38.010631137856905,
								49.91566152607463
							],
							[
								38.59498823421342,
								49.92646190042363
							],
							[
								40.06905846533911,
								49.6010554062817
							],
							[
								40.08078901546935,
								49.307429917999286
							],
							[
								39.67466393408753,
								48.78381846780188
							],
							[
								39.89563235856758,
								48.23240509703143
							],
							[
								39.738277622238826,
								47.89893707945199
							],
							[
								38.7705847511412,
								47.825608222029814
							],
							[
								38.25511233902975,
								47.546400458356814
							],
							[
								38.22353803889942,
								47.102189846375886
							],
							[
								37.42513715998999,
								47.022220567404204
							],
							[
								36.75985477066439,
								46.698700263040934
							],
							[
								35.82368452326483,
								46.64596446388707
							],
							[
								34.96234174982388,
								46.27319651954964
							],
							[
								35.020787794745985,
								45.65121898048466
							],
							[
								35.51000857925317,
								45.40999339454619
							],
							[
								36.52999799983016,
								45.46998973243706
							],
							[
								36.33471276219916,
								45.113215643893966
							],
							[
								35.23999922052812,
								44.939996242851606
							],
							[
								33.882511020652885,
								44.36147858334407
							],
							[
								33.326420932760044,
								44.56487702084489
							],
							[
								33.54692426934946,
								45.03477081967489
							],
							[
								32.4541744321055,
								45.32746613217608
							],
							[
								32.630804477679135,
								45.51918569597891
							],
							[
								33.58816206231839,
								45.85156850848024
							],
							[
								33.29856733575471,
								46.080598456397844
							],
							[
								31.74414025241518,
								46.333347886737386
							],
							[
								31.675307244602408,
								46.70624502215554
							],
							[
								30.7487488136091,
								46.583100084004
							],
							[
								30.377608676888883,
								46.03241018328567
							],
							[
								29.603289015427436,
								45.293308010431126
							],
							[
								29.149724969201653,
								45.464925442072456
							],
							[
								28.67977949393938,
								45.304030870131704
							],
							[
								28.233553501099042,
								45.488283189468376
							],
							[
								28.485269402792767,
								45.5969070501459
							],
							[
								28.65998742037158,
								45.93998688413164
							],
							[
								28.933717482221624,
								46.2588304713725
							],
							[
								28.862972446414062,
								46.43788930926383
							],
							[
								29.07210696789929,
								46.517677720722496
							],
							[
								29.170653924279886,
								46.3792623968287
							],
							[
								29.759971958136394,
								46.34998769793536
							],
							[
								30.024658644335375,
								46.42393667254504
							],
							[
								29.838210076626297,
								46.52532583270169
							],
							[
								29.908851759569302,
								46.67436066343146
							],
							[
								29.559674106573112,
								46.928582872091326
							],
							[
								29.415135125452736,
								47.34664520933258
							],
							[
								29.05086795422733,
								47.5102269557525
							],
							[
								29.12269819511303,
								47.849095160506465
							],
							[
								28.670891147585166,
								48.1181485052341
							],
							[
								28.259546746541844,
								48.15556224221342
							],
							[
								27.522537469195157,
								48.467119452501116
							],
							[
								26.857823520624805,
								48.368210761094495
							],
							[
								26.619336785597795,
								48.22072622333347
							],
							[
								26.19745039236693,
								48.22088125263035
							],
							[
								25.9459411964024,
								47.987148749374214
							],
							[
								25.20774336111299,
								47.89105642352747
							],
							[
								24.866317172960578,
								47.737525743188314
							],
							[
								24.40205610525038,
								47.98187775328043
							],
							[
								23.76095828623741,
								47.985598456405455
							],
							[
								23.142236362406805,
								48.09634105080695
							],
							[
								22.710531447040495,
								47.88219391538941
							],
							[
								22.640819939878753,
								48.15023956968736
							],
							[
								22.085608351334855,
								48.42226430927179
							],
							[
								22.28084191253356,
								48.82539215758067
							],
							[
								22.558137648211755,
								49.085738023467144
							],
							[
								22.776418898212626,
								49.02739533140962
							],
							[
								22.518450148211603,
								49.47677358661974
							],
							[
								23.426508416444392,
								50.308505764357456
							],
							[
								23.922757195743262,
								50.42488108987875
							],
							[
								24.029985792748903,
								50.70540660257518
							],
							[
								23.527070753684374,
								51.57845408793024
							],
							[
								24.00507775238421,
								51.61744395609446
							],
							[
								24.553106316839518,
								51.888461005249184
							],
							[
								25.32778771332701,
								51.91065603291855
							],
							[
								26.337958611768556,
								51.83228872334793
							],
							[
								27.454066196408434,
								51.59230337178447
							],
							[
								28.24161502453657,
								51.57222707783907
							],
							[
								28.61761274589225,
								51.42771393493484
							],
							[
								28.992835320763533,
								51.602044379271476
							],
							[
								29.254938185347925,
								51.368234361366895
							],
							[
								30.157363722460897,
								51.41613841410147
							],
							[
								30.555117221811457,
								51.31950348571566
							],
							[
								30.619454380014844,
								51.822806098022376
							],
							[
								30.927549269338982,
								52.04235342061439
							],
							[
								31.785998162571587,
								52.101677964885454
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 2,
					"sovereignt": "Turkey",
					"sov_a3": "TUR",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Turkey",
					"adm0_a3": "TUR",
					"geou_dif": 0,
					"geounit": "Turkey",
					"gu_a3": "TUR",
					"su_dif": 0,
					"subunit": "Turkey",
					"su_a3": "TUR",
					"brk_diff": 0,
					"id": 34,
					"name": "Türkei",
					"name_long": "Turkey",
					"brk_a3": "TUR",
					"brk_name": "Turkey",
					"brk_group": null,
					"abbrev": "Tur.",
					"postal": "TR",
					"formal_en": "Republic of Turkey",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Turkey",
					"name_alt": null,
					"mapcolor7": 6,
					"mapcolor8": 3,
					"mapcolor9": 8,
					"mapcolor13": 4,
					"pop_est": 76805524,
					"gdp_md_est": 902700,
					"pop_year": -99,
					"lastcensus": 2000,
					"gdp_year": -99,
					"economy": "4. Emerging region: MIKT",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "TR",
					"iso_a3": "TUR",
					"iso_n3": "792",
					"un_a3": "792",
					"wb_a2": "TR",
					"wb_a3": "TUR",
					"woe_id": -99,
					"adm0_a3_is": "TUR",
					"adm0_a3_us": "TUR",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Asia",
					"region_un": "Asia",
					"subregion": "Western Asia",
					"region_wb": "Europe & Central Asia",
					"name_len": 6,
					"long_len": 6,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "MultiPolygon",
					"coordinates": [
						[
							[
								[
									36.91312706884216,
									41.335358384764305
								],
								[
									38.34766482926452,
									40.94858612727572
								],
								[
									39.51260664242025,
									41.102762763018575
								],
								[
									40.37343265153825,
									41.013672593747344
								],
								[
									41.554084100110714,
									41.53565623632761
								],
								[
									42.619548781104555,
									41.58317271581993
								],
								[
									43.58274580259271,
									41.09214325618257
								],
								[
									43.7526579119685,
									40.74020091405882
								],
								[
									43.65643639504097,
									40.25356395116617
								],
								[
									44.400008579288766,
									40.00500031184231
								],
								[
									44.793989699082005,
									39.713002631177034
								],
								[
									44.10922529478236,
									39.428136298168056
								],
								[
									44.4214026222576,
									38.28128123631453
								],
								[
									44.22575564960053,
									37.97158437758935
								],
								[
									44.77269900897775,
									37.17044464776845
								],
								[
									44.29345177590287,
									37.00151439060636
								],
								[
									43.94225874204736,
									37.256227525372935
								],
								[
									42.77912560402186,
									37.38526357680581
								],
								[
									42.34959109881177,
									37.22987254490411
								],
								[
									41.21208947120303,
									37.07435232192174
								],
								[
									40.673259311695716,
									37.09127635349736
								],
								[
									39.52258019385252,
									36.71605377862602
								],
								[
									38.69989139176593,
									36.71292735447233
								],
								[
									38.16772749202417,
									36.90121043552779
								],
								[
									37.06676110204583,
									36.62303620050062
								],
								[
									36.739494256341374,
									36.817520453431115
								],
								[
									36.68538903173183,
									36.259699205056506
								],
								[
									36.41755008316309,
									36.0406169703551
								],
								[
									36.14976281102659,
									35.82153473565367
								],
								[
									35.782084995269855,
									36.27499542901492
								],
								[
									36.160821567537056,
									36.650605577128374
								],
								[
									35.55093631362834,
									36.56544281671134
								],
								[
									34.714553256984374,
									36.795532131490916
								],
								[
									34.02689497247647,
									36.21996002862397
								],
								[
									32.5091581560641,
									36.1075637883892
								],
								[
									31.699595167779563,
									36.64427521417261
								],
								[
									30.62162479017107,
									36.677864895162315
								],
								[
									30.39109622571712,
									36.26298065850699
								],
								[
									29.699975620245567,
									36.14435740818101
								],
								[
									28.732902866335394,
									36.67683136651644
								],
								[
									27.64118655773737,
									36.658822129862756
								],
								[
									27.048767937943296,
									37.65336090753601
								],
								[
									26.31821821463305,
									38.208133246405396
								],
								[
									26.804700148228733,
									38.98576019953356
								],
								[
									26.17078535330438,
									39.463612168936464
								],
								[
									27.280019972449395,
									40.42001373957831
								],
								[
									28.81997765474722,
									40.46001129817222
								],
								[
									29.240003696415584,
									41.21999074967269
								],
								[
									31.145933872204438,
									41.087621568357065
								],
								[
									32.34797936374579,
									41.73626414648464
								],
								[
									33.51328291192752,
									42.01896006933731
								],
								[
									35.16770389175187,
									42.040224921225445
								],
								[
									36.91312706884216,
									41.335358384764305
								]
							]
						],
						[
							[
								[
									27.19237674328241,
									40.690565700842455
								],
								[
									26.35800906749779,
									40.15199392349649
								],
								[
									26.04335127127254,
									40.61775360774317
								],
								[
									26.056942172965336,
									40.82412344010075
								],
								[
									26.294602085075695,
									40.93626129817417
								],
								[
									26.604195590936285,
									41.56211456966102
								],
								[
									26.11704186372083,
									41.82690460872456
								],
								[
									27.13573937349051,
									42.141484890301314
								],
								[
									27.996720411905414,
									42.007358710287775
								],
								[
									28.115524529744448,
									41.622886054036286
								],
								[
									28.98844282401879,
									41.29993419042819
								],
								[
									28.806438429486747,
									41.05496206314854
								],
								[
									27.61901736828412,
									40.99982330989312
								],
								[
									27.19237674328241,
									40.690565700842455
								]
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 6,
					"sovereignt": "Northern Cyprus",
					"sov_a3": "CYN",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Northern Cyprus",
					"adm0_a3": "CYN",
					"geou_dif": 0,
					"geounit": "Northern Cyprus",
					"gu_a3": "CYN",
					"su_dif": 0,
					"subunit": "Northern Cyprus",
					"su_a3": "CYN",
					"brk_diff": 1,
					"id": 99,
					"name": "N. Cyprus",
					"name_long": "Northern Cyprus",
					"brk_a3": "B20",
					"brk_name": "N. Cyprus",
					"brk_group": null,
					"abbrev": "N. Cy.",
					"postal": "CN",
					"formal_en": "Turkish Republic of Northern Cyprus",
					"formal_fr": null,
					"note_adm0": "Self admin.",
					"note_brk": "Self admin.; Claimed by Cyprus",
					"name_sort": "Cyprus, Northern",
					"name_alt": null,
					"mapcolor7": 3,
					"mapcolor8": 1,
					"mapcolor9": 4,
					"mapcolor13": 8,
					"pop_est": 265100,
					"gdp_md_est": 3600,
					"pop_year": -99,
					"lastcensus": -99,
					"gdp_year": -99,
					"economy": "6. Developing region",
					"income_grp": "3. Upper middle income",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "-99",
					"iso_a3": "-99",
					"iso_n3": "-99",
					"un_a3": "-099",
					"wb_a2": "-99",
					"wb_a3": "-99",
					"woe_id": -99,
					"adm0_a3_is": "CYP",
					"adm0_a3_us": "CYP",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Asia",
					"region_un": "Asia",
					"subregion": "Western Asia",
					"region_wb": "Europe & Central Asia",
					"name_len": 9,
					"long_len": 15,
					"abbrev_len": 6,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								32.73178022637745,
								35.14002594658844
							],
							[
								32.80247358575275,
								35.14550364841138
							],
							[
								32.946960890440806,
								35.3867033961337
							],
							[
								33.667227003724946,
								35.37321584730552
							],
							[
								34.576473829900465,
								35.67159556735879
							],
							[
								33.900804477684204,
								35.245755927057616
							],
							[
								33.97361657078346,
								35.058506374648005
							],
							[
								33.86643965021011,
								35.09359467217419
							],
							[
								33.675391880027064,
								35.01786286065045
							],
							[
								33.5256852556775,
								35.03868846286407
							],
							[
								33.47581749851585,
								35.000344550103506
							],
							[
								33.45592207208347,
								35.10142365166641
							],
							[
								33.3838334490363,
								35.16271190036457
							],
							[
								33.19097700372305,
								35.17312470147138
							],
							[
								32.919572381326134,
								35.08783274997364
							],
							[
								32.73178022637745,
								35.14002594658844
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"scalerank": 1,
					"featurecla": "Admin-0 country",
					"labelrank": 5,
					"sovereignt": "Cyprus",
					"sov_a3": "CYP",
					"adm0_dif": 0,
					"level": 2,
					"type": "Sovereign country",
					"admin": "Cyprus",
					"adm0_a3": "CYP",
					"geou_dif": 0,
					"geounit": "Cyprus",
					"gu_a3": "CYP",
					"su_dif": 0,
					"subunit": "Cyprus",
					"su_a3": "CYP",
					"brk_diff": 0,
					"id": 13,
					"name": "Zypern",
					"name_long": "Cyprus",
					"brk_a3": "CYP",
					"brk_name": "Cyprus",
					"brk_group": null,
					"abbrev": "Cyp.",
					"postal": "CY",
					"formal_en": "Republic of Cyprus",
					"formal_fr": null,
					"note_adm0": null,
					"note_brk": null,
					"name_sort": "Cyprus",
					"name_alt": null,
					"mapcolor7": 1,
					"mapcolor8": 2,
					"mapcolor9": 3,
					"mapcolor13": 7,
					"pop_est": 531640,
					"gdp_md_est": 22700,
					"pop_year": -99,
					"lastcensus": 2001,
					"gdp_year": -99,
					"economy": "6. Developing region",
					"income_grp": "2. High income: nonOECD",
					"wikipedia": -99,
					"fips_10": null,
					"iso_a2": "CY",
					"iso_a3": "CYP",
					"iso_n3": "196",
					"un_a3": "196",
					"wb_a2": "CY",
					"wb_a3": "CYP",
					"woe_id": -99,
					"adm0_a3_is": "CYP",
					"adm0_a3_us": "CYP",
					"adm0_a3_un": -99,
					"adm0_a3_wb": -99,
					"continent": "Asia",
					"region_un": "Asia",
					"subregion": "Western Asia",
					"region_wb": "Europe & Central Asia",
					"name_len": 6,
					"long_len": 6,
					"abbrev_len": 4,
					"tiny": -99,
					"homepart": 1
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								33.97361657078346,
								35.058506374648005
							],
							[
								34.00488081232004,
								34.97809784600186
							],
							[
								32.97982710137845,
								34.57186941175544
							],
							[
								32.49029625827754,
								34.701654771456475
							],
							[
								32.25666710788596,
								35.10323232679663
							],
							[
								32.73178022637745,
								35.14002594658844
							],
							[
								32.919572381326134,
								35.08783274997364
							],
							[
								33.19097700372305,
								35.17312470147138
							],
							[
								33.3838334490363,
								35.16271190036457
							],
							[
								33.45592207208347,
								35.10142365166641
							],
							[
								33.47581749851585,
								35.000344550103506
							],
							[
								33.5256852556775,
								35.03868846286407
							],
							[
								33.675391880027064,
								35.01786286065045
							],
							[
								33.86643965021011,
								35.09359467217419
							],
							[
								33.97361657078346,
								35.058506374648005
							]
						]
					]
				}
			},
			{
				"type": "Feature",
				"properties": {
					"id": 18,
					"name": "Malta"
				}
			}
		]
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var height = 320;
	var color = d3.scale.ordinal().range(['#0065a8', '#41BEEE']);
	var svg = d3.select('#pieChart').append('svg').attr('width', '100%');

	var width = d3.select('#pieChart').node().offsetWidth;

	var g = svg.attr('height', height).append('g').attr('transform', 'translate(' + width / 2.5 + ', ' + height / 2 + ')');

	var radius = Math.min(width, height) / 1.8;

	var pie = d3.layout.pie()
	/*.value(function(d) {
	  return d;
	})*/
	.sort(null);

	var arc = d3.svg.arc().outerRadius(radius - 50);

	function arcTween(a) {
	  var i = d3.interpolate(this.current, a);
	  this.current = i(0);
	  return function (t) {
	    return arc(i(t));
	  };
	}

	g.selectAll('path').data(pie([437, 893])).enter().append('g').attr('class', 'slice');

	var slice = d3.selectAll('g.slice').append('path').attr('fill', function (d, i) {
	  return color(i);
	}).attr('d', arc).each(function (d) {
	  this.current = d;
	});

	var text = d3.selectAll('g.slice').append('text').data(pie([437, 893])).text(function (d) {
	  return d.value;
	}).attr('font-size', '20px').attr('fill', 'white').attr('text-anchor', 'middle').attr('transform', function (d) {
	  d.innerRadius = 0;
	  d.outerRadius = radius;
	  return 'translate(' + arc.centroid(d) + ')';
	});

	function update(newData) {
	  svg.selectAll('path').data(pie(newData)).attr('d', arc).transition().duration(750).attrTween('d', arcTween);

	  text.data(pie(newData)).text(function (d) {
	    if (d.value === 0) {
	      return '';
	    } else {
	      return d.value;
	    }
	  }).transition().duration(750).attr('transform', function (d) {
	    d.innerRadius = 0;
	    d.outerRadius = radius;
	    return 'translate(' + arc.centroid(d) + ')';
	  });
	}

	module.exports = {
	  update: update
	};

/***/ }
/******/ ]);
