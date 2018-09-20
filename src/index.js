'use strict'

const util = require('util')
const path = require('path')
const fs = require('fs')
const sass = require('./sass')
const postcss = require('./postcss')

/**
 * Load SASS and transform to CSS, add vendor prefixes and minify.
 * @public
 * @param {String} filePath - Absolute path to file.
 * @param {?Object} opts - Options.
 * @returns {Promise<String>} CSS.
 */
module.exports = async function(filePath, opts) {

	if (typeof filePath !== 'string') throw new Error(`'filePath' must be a string`)
	if (typeof opts !== 'object' && opts != null) throw new Error(`'opts' must be undefined, null or an object`)

	const folderPath = path.dirname(filePath)

	let output = null

	output = await util.promisify(fs.readFile)(filePath, 'utf8')
	output = await sass(folderPath, output, opts)
	output = await postcss(folderPath, output, opts)

	return output

}

/**
 * Tell Rosid with which file extension it should load the file.
 * @public
 * @param {?Object} opts - Options.
 * @returns {String} File extension.
 */
module.exports.in = function(opts) {

	return (opts != null && opts.in != null) ? opts.in : '.sass'

}

/**
 * Tell Rosid with which file extension it should save the file.
 * @public
 * @param {?Object} opts - Options.
 * @returns {String} File extension.
 */
module.exports.out = function(opts) {

	return (opts != null && opts.out != null) ? opts.out : '.css'

}

/**
 * Attach an array to the function, which contains a list of
 * file patterns used by the handler. The array will be used by Rosid for caching purposes.
 * @public
 */
module.exports.cache = [
	'**/*.sass',
	'**/*.scss',
	'**/*.css'
]