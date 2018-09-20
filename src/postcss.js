'use strict';

const postcss = require('postcss');
const postcssrc = require('postcss-load-config');
const findUp = require('find-up');

const getConfig = function() {
	const configPath = findUp.sync(['postcss.config.js']);
	if (configPath == null) throw new Error('No postcss.config.js found');
	return configPath;
};

/**
 * Add vendor prefixes and minify CSS.
 * @public
 * @param {?String} folderPath - Path to the folder containing the SASS file.
 * @param {?String} str - CSS.
 * @param {?Object} opts - Optional options for the task.
 * @returns {Promise<String>} Vendor prefixed and minified CSS.
 */
module.exports = async function(folderPath, str, opts) {
	if (str == null || str === '') return '';

	// Dismiss sourceMap when output should be optimized
	const sourceMap = opts == null || (opts != null && opts.optimize !== true);

	// PostCSS only accepts undefined or a string for `from` and `to`
	folderPath = typeof folderPath === 'string' ? folderPath : undefined;
	const configPath = await getConfig();
	const { plugins } = await postcssrc({ from: configPath });

	const result = await postcss(plugins)
		.process(str, {
			from: folderPath,
			to: folderPath,
			map: sourceMap
		})
		.catch(err => {
			throw new Error(err);
		});
	return result.css;
};
