/**
 * 
 * @authors Sujith G (sujith3g@gmail.com)
 * @date    2015-01-11 01:12:29
 * @version $Id$
 */

Router.configure({
	layoutTemplate: 'default',
	loadingTemplate:'loadingTemplate',
	notFoundTemplate:'notfound'
});

Router.map(function () {
	this.route('home',{
		path:'/'
	});
});