/* $Id$ */
/*! jQuery Fillerup plugin, Copyright (c) 2009 Patrick Fitzgerald
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

;(function($) {

    $.fn.fillerup = function(optsArg) {

        var opts, alignObj;

	// Provide defaults for some of the options
	opts = $.extend({}, $.fn.fillerup.defaults, optsArg);

	// Get the element to align with
	alignObj = $(opts.alignWith);
	if (!alignObj[0]) { return this; }

	return $(this).each(function(){

	    var obj = $(this),      // where we want to add more content
            content = opts.content, // the stuff we want to add (function, array, or content to append)
            count = 0,              // loop counter
            max,                    // max times to loop (to prevent infinite loops)
            alignY,                 // bottom of the alignWith element
            objY;                   // botom of the >elemnt where we want to add more content

	    // Set the max number of times we'll loop
	    if ($.isArray(content)) { max = content.length; }
            else if ($.isFunction(content)) { max = opts.max; }
            else { max = 1; }

	    // Loop and add content if necessary
	    for (count = 0; count < max; count++) {

		// Recalculate alignY and objY every time,
                // in case the page reflows when new content is added.
		alignY = alignObj.offset().top + alignObj.height();
		objY = obj.offset().top + obj.height();

		// Do we have space to add more content?
		if (objY + opts.padding >= alignY) {
		    break;
		}

                // We have space, so add some content

		if ($.isFunction(content)) {
		    
                    // Make sure we don't get into an endless loop.
                    // If the function needs to call .fillerup() again,
                    // it should pass the same options back in.
		    opts.max--;

                    // Send the height difference to the function
		    opts.diff = alignY - objY;

		    // Run the function:
                    // * set "this" to the element where we're adding content
                    // * pass the fillerup options to the function
		    // If the function returns false, then stop looping.
		    if (content.call(obj[0], opts) === false) {
			break;
		    }

		    // If the function did not return false then loop again,
		    // recheck the position and call the function again
		    // to add more content if necessary

		} else if ($.isArray(content)) {
		    obj.append(content[count]);
		} else {
		    obj.append(content);
		}

	    }
	});
    };

    $.fn.fillerup.defaults = {
	padding: 1, // only add new stuff if this many pixels are available
	max:20      // max times fillerup can run if content is a function
    };

})(jQuery);
