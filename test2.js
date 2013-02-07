describe('Dashboard', function () {

	var newsItems,
		ajaxCalls,
		oldAjax;

	beforeEach(function () {
		oldAjax = $.ajax;
		ajaxCalls = [];
		$.ajax = function (options) {
			ajaxCalls.push(options);
		}

		$('<div id="dashboard" class="container-fluid">' +
			'<div id="catalog-box"></div>' +
			'<div id="insight-box"></div>' +
			'<div id="didyouknow-box"></div>' +
			'<div id="news-box"></div>' +
			'<div id="buzz-box"></div></div>').appendTo('body');

		$('<div id="slide-deck-template" class="hide">' +
			'<section class="span12 box-group {{name}}-box">' +
			'<h5 class="box-title uppercase">{{title}}</h5>' +
			'<div class="box">' +
			'<div class="skin-slidedeck carousel-holder">' +
			'<dl class="slidedeck">' +
			'{{#interests}}' +
			'<dd> ' +
			'<article id="{{boxId}}" class="{{active}} item">' +
			'<header class="{{imageClass}}">' +
			'<div class="image">' +
			'<div class="border">' +
			'<a href="{{url}}">' +
			'<img src="{{image}}" class="center-img">' +
			'</a>' +
			'</div>' +
			'</div>' +
			'<h4><a href="{{url}}">{{name}}</a></h4>' +
			'</header>' +
			'{{^catalog}}' +
			'<div class="content"></div>' +
			'{{/catalog}}' +
			'{{#catalog}}' +
			'<div class="catalog">' +
			'<h4>Products - Summary</h4>' +
			'<div class="container-fluid">' +
			'<div class="content row-fluid">' +
			'<div class="load-target">' +
			'<div class="row-fluid upper strip-row products-strip-row">' +
			'<div class="span3" id="products-count">' +
			'</div>' +
			'<div class="span3" id="products-rise-drop">' +
			'<div id="products-rise"></div>' +
			'<div id="products-drop"></div>' +
			'</div>' +
			'<div class="span3" id="products-added">' +
			'</div>' +
			'<div class="span3" id="products-oos-promotion">' +
			'<div id="products-oos"></div>' +
			'<div id="products-promotion"></div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'{{/catalog}} ' +
			'</article>' +
			'</dd>' +
			'{{/interests}}' +
			'</dl>' +
			'</div>' +
			'<div class="footer">' +
			'<ul class="carousel-nav">' +
			'{{#interests}}' +
			'<li class="{{active}}"></li>' +
			'{{/interests}}' +
			'</ul>' +
			'<div class="icons">' +
			'<a class="ico-settings" href="/account?following"></a>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</section>' +
			'</div>').appendTo('body');

		$('<div id="did-you-know-item-template">' +
			'{{#didYouKnowItems}}' +
			'{{^no_data}}{{^error}}' +
			'<div class="item">' +
			'<span class="title">{{title}}</span>' +
			'<span class="image">{{image}}</span>' +
			'<span class="date">{{date}}</span>' +
			'<span class="value_with_sign">{{value_with_sign}}</span>' +
			'<span class="value">{{value}}</span>' +
			'</div>' +
			'{{/error}}{{/no_data}}' +
			'{{#no_data}}' +
			'<div>We\'re not there yet!</div>' +
			'{{/no_data}}' +
			'{{#error}}' +
			'<div>Did you know error message</div>' +
			'{{/error}}' +
			'{{/didYouKnowItems}}' +
			'</div>').appendTo('body');

		$('<div id="news-item-template">' +
			'{{^no_data}}{{^error}}' +
			'{{#news}}' +
			'<div class="item">' +
			'<span class="url">{{url}}</span>' +
			'<span class="title">{{title}}</span>' +
			'<span class="summary">{{summary}}</span>' +
			'<span class="source">{{source}}</span>' +
			'<span class="pub_date">{{pub_date}}</span>' +
			'<span class="image">{{image}}</span>' +
			'</div>' +
			'{{/news}}' +
			'{{/error}}{{/no_data}}' +
			'{{#no_data}}' +
			'<div>We\'re not there yet!</div>' +
			'{{/no_data}}' +
			'{{#error}}' +
			'<div>News error message</div>' +
			'{{/error}}' +
			'</div>').appendTo('body');

		$('<div id="buzz-item-template">' +
			'{{^no_data}}{{^error}}' +
			'<span class="fb-likes">{{fb_likes}}</span>' +
			'<span class="fb-talking-about">{{fb_talking_about}}</span>' +
			'<span class="twitter-tweets">{{tw_count}}</span>' +
			'<span class="twitter-followers">{{tw_follower_count}}</span>' +
			'{{/error}}{{/no_data}}' +
			'{{#no_data}}' +
			'<div>We\'re not there yet!</div>' +
			'{{/no_data}}' +
			'{{#error}}' +
			'<div>Buzz error message</div>' +
			'{{/error}}' +
			'</div>').appendTo('body');

		$('<div id="tile-template" style="display:none">' +
			'<section class="tile {{semi}} {{static}} {{image}}">' +
			'<div class="shadow"></div>' +
			'{{#imageSrc}}' +
			'<img src="{{imageSrc}}" class="center-img" />	' +
			'{{/imageSrc}}' +
			'<div class="data">' +
			'<div class="value">{{value}}</div>' +
			'{{#subtitle}}' +
			'<div class="subtitle">{{subtitle}}</div>' +
			'{{/subtitle}}' +
			'<div class="title">{{title}}</div>' +
			'<input name="filter" type="hidden" value="{{filter}}">' +
			'</div>' +
			'{{#future}}' +
			'<div class="coming-soon-splash">' +
			'</div>' +
			'{{/future}}' +
			'</section>' +
			'</div>').appendTo('body');

		$('<div id="insight-template" class="hide">' +
			'{{^no_data}}{{^error}}{{^not_found}}' +
			'<section class="insight-display">' +
			'<div class="insight-text">' +
			'<span class="title">{{title}}</span>' +
			'<div class="insight-value">' +
			'{{#values}}' +
			'<span class="value">{{value}}</span>' +
			'<span class="subtitle">{{subtitle}}</span>' +
			'{{/values}}' +
			'</div>' +
			'</div>' +
			'<div class="visual-area">' +
			'<div class="chart-container"></div>' +
			'</div>' +
			'</section>' +
			'{{/not_found}}{{/error}}{{/no_data}}' +
			'{{#no_data}}' +
			'no_data' +
			'{{/no_data}}' +
			'{{#error}}' +
			'error' +
			'{{/error}}' +
			'{{#not_found}}' +
			'not_found' +
			'{{/not_found}}' +
			'</div>').appendTo('body');
	});

	afterEach(function () {
		$.ajax = oldAjax;
		$('#dashboard').remove();
		$('#slide-deck-template').remove();
		$('#buzz-item-template').remove();
		$('#news-item-template').remove();
		$('#did-you-know-item-template').remove();
	});

	describe('Initialize', function () {

		it('should not load when there are no interests defined', function () {
			var message = '';
			try {
				var dashboard = new Dashboard();
			} catch (e) {
				message = e;
			}

			expect(message).toBe('Please specify atleast an interest to instatiate.');
		});

		it('should initialize when user interests are passed', function () {
			var message = '';
			var dashboard;
			try {
				dashboard = new Dashboard({
					interests:[
						{
							filter_type:'store',
							id:34,
							name:'some store'
						}
					]
				});
			} catch (e) {
				message = e;
			}

			expect(message).toBe('');
			expect(dashboard.get('interests').length).toBe(1);
			expect(dashboard.get('interests')[0].id).toBe(34);
			expect(dashboard.get('interests')[0].filter_type).toBe('store');
			expect(dashboard.catalog.length).toBe(1);
			expect(dashboard.insight.length).toBe(1);
			expect(dashboard.buzz.length).toBe(1);
			expect(dashboard.didYouKnow.length).toBe(1);
			expect(dashboard.news.length).toBe(1);
		});

		it('should initialize the Slide deck when user interests are passed', function () {
			var message = '';
			var dashboard;
			try {
				dashboard = new Dashboard({
					interests:[
						{
							filter_type:'category',
							id:34,
							name:'some category',
							image:'some image'
						}
					]
				});
			} catch (e) {
				message = e;
			}

			expect(message).toBe('');
			expect($('#catalog-box h5').html()).toBe('Catalog Updates');
			expect($('#insight-box h5').html()).toBe('Insights');
			expect($('#didyouknow-box h5').html()).toBe('Did You Know?');
			expect($('#news-box h5').html()).toBe('News');
			expect($('#buzz-box h5').html()).toBe('Buzz');

			expect($('#catalog-box h4 a').html()).toBe('some category');
			expect($('#insight-box h4 a').html()).toBe('some category');
			expect($('#didyouknow-box h4 a').html()).toBe('some category');
			expect($('#news-box h4 a').html()).toBe('some category');
			expect($('#buzz-box h4 a').html()).toBe('some category');

			expect($('#catalog-box h4 a').attr('href')).toBe('/explore#categoryId=34');
			expect($('#insight-box h4 a').attr('href')).toBe('/explore#categoryId=34');
			expect($('#didyouknow-box h4 a').attr('href')).toBe('/explore#categoryId=34');
			expect($('#news-box h4 a').attr('href')).toBe('/explore#categoryId=34');
			expect($('#buzz-box h4 a').attr('href')).toBe('/explore#categoryId=34');

			expect($('#catalog-box .image img').attr('src')).toBe('some image');
			expect($('#insight-box .image img').attr('src')).toBe('some image');
			expect($('#didyouknow-box .image img').attr('src')).toBe('some image');
			expect($('#news-box .image img').attr('src')).toBe('some image');
			expect($('#buzz-box .image img').attr('src')).toBe('some image');

			expect($('.footer .carousel-nav li').length).toBe(6);

		});

		it('should initialize the content in each box when user interests are passed', function () {
			var message = '';
			var dashboard;
			try {
				dashboard = new Dashboard({
					interests:[
						{
							filter_type:'store',
							id:34,
							name:'some store'
						}
					]
				});
			} catch (e) {
				message = e;
			}

			expect(message).toBe('');
			expect(dashboard.catalog[0].get('pageType')).toBe('dashboard');
			expect(dashboard.catalog[0].get('stripType')).toBe('products');
			expect(dashboard.catalog[0].get('storeId')).toBe(34);

			expect(dashboard.insight[0].get('type')).toBe('price_history');

			expect(dashboard.didYouKnow[0].get('storeId')).toBe(34);

			expect(dashboard.buzz[0].get('storeId')).toBe(34);

			expect(dashboard.news[0].get('storeId')).toBe(34);
		});
	});

	describe('Mechanics', function () {
		it('should fetch the content for each box when fetch is called', function () {
			var message = '';
			var dashboard;
			try {
				dashboard = new Dashboard({
					interests:[
						{
							filter_type:'store',
							id:34,
							name:'some store'
						}
					]
				});
				dashboard.fetch();
			} catch (e) {
				message = e;
			}

			var productStripCalled = false;
			var insightCalled = false;
			var dykCalled = false;
			var newsCalled = false;
			var buzzCalled = false;

			var call = ajaxCalls.pop();
			while (call) {
				// Mock a success callback.
				switch (call.url) {
					case '/explore/products_strip?storeId=34&extendStrip=false&enableMix=false':
						call.success({
							"count":163457,
							"hikes":28,
							"drops":89,
							"addedLastWeek":10,
							"outOfStock":85,
							"onPromotion":15
						});
						productStripCalled = true;
						break;

					case '/quickstats/didyouknow_items?storeId=34':
						call.success([
							{
								title:"Nike prices increased by 12%",
								image:"some-img.png",
								date:"17 days ago",
								value_with_sign:"+12",
								value:12.04
							}
						]);
						dykCalled = true;
						break;

					case '/quickstats/buzz_items?storeId=34':
						call.success({
							fb_likes:'374M',
							fb_talking_about:'183K',
							tw_count:'474K',
							tw_follower_count:'34K'
						});
						buzzCalled = true;
						break;

					case '/quickstats/news_items?storeId=34':
						call.success([
							{
								url:"www.website1.com",
								title:"Rising Sun",
								summary:"Sun rises in the East",
								source:"bobo",
								pub_date:"about 3 hours ago",
								image:"some-img.jpg"
							},
							{
								url:"www.website2.com",
								title:"Rising Star",
								summary:"Stars don't rise",
								source:"lambo",
								pub_date:"about 1 hour ago",
								image:"some-other-img.jpg"
							}
						]);
						newsCalled = true;
						break;

					case '/quickstats/pricehistory?storeId=34':
						call.success("Price History server data");
						insightCalled = true;
						break;
				}
				call = ajaxCalls.pop();
			}

			expect(message).toBe('');
			expect(productStripCalled).toBe(true);
			expect(dykCalled).toBe(true);
			expect(newsCalled).toBe(true);
			expect(buzzCalled).toBe(true);
			expect(insightCalled).toBe(true);

			expect($('#catalog-0 .content #products-count div.value').html()).toBe('163.5k');
			expect($('#catalog-0 .content #products-rise div.value').html()).toBe('28');
			expect($('#catalog-0 .content #products-drop div.value').html()).toBe('89');
			expect($('#catalog-0 .content #products-added div.value').html()).toBe('10');
			expect($('#catalog-0 .content #products-oos div.value').html()).toBe('85');
			expect($('#catalog-0 .content #products-promotion div.value').html()).toBe('15');
			expect($('#insight-0 .content').find('.highcharts-container').length > 0).toBe(true);
			expect(dashboard.buzz[0].get('fb_likes')).toBe('374M');
			expect(dashboard.buzz[0].get('fb_talking_about')).toBe('183K');
			expect(dashboard.buzz[0].get('tw_count')).toBe('474K');
			expect(dashboard.buzz[0].get('tw_follower_count')).toBe('34K');

			expect($('#news-0 .content').find('.url').eq(0).text()).toBe('www.website1.com');
			expect($('#news-0 .content').find('.title').eq(0).text()).toBe('Rising Sun');
			expect($('#news-0 .content').find('.summary').eq(0).text()).toBe('Sun rises in the East');
			expect($('#news-0 .content').find('.source').eq(0).text()).toBe('bobo');
			expect($('#news-0 .content').find('.pub_date').eq(0).text()).toBe('about 3 hours ago');
			expect($('#news-0 .content').find('.image').eq(0).text()).toBe('some-img.jpg');

			expect(dashboard.didYouKnow[0].get('didYouKnowItems')[0].title).toBe('Nike prices increased by 12%');
			expect(dashboard.didYouKnow[0].get('didYouKnowItems')[0].image).toBe('some-img.png');
			expect(dashboard.didYouKnow[0].get('didYouKnowItems')[0].date).toBe('17 days ago');
			expect(dashboard.didYouKnow[0].get('didYouKnowItems')[0].value_with_sign).toBe('+12');
			expect(dashboard.didYouKnow[0].get('didYouKnowItems')[0].value).toBe(12.04);
		});
	});
});