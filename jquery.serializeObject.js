/*!
 * jQuery serializeObject - v0.2 - 1/20/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * Modified by Daniel Carbone (daniel.p.carbone@vanderbilt.edu)
 *
 * Updated because IE (as of v 9) and WebKit (as of safari 5 and older versions of chrome)
 * are not able to serialize the value of a fieldset in a field.  if $(fieldset).serializeArray() is called,
 * it will serialize and return the value of the parent form or return undefined.
 *
 * This is obviously evil, and I have modified the below code to enable compabitility
 */

// Whereas .serializeArray() serializes a form into an array, .serializeObject()
// serializes a form into an (arguably more useful) object.

(function($,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
    $.fn.serializeObject = function(){
        var obj = {},
            data = {},
            browser = $.browser;

        if (this.is("fieldset") && (typeof browser.msie === "boolean" || typeof browser.webkit === "boolean"))
        {
            $.each(this.find("input, select, textarea"), function (i, field)
            {
                var $field = $(field), n, v;

                if ($field.is("input"))
                {
                    if ($field.is(":checkbox"))
                    {
                        if ($field.is(":checked"))
                        {
                            n = $field.attr("name");
                            v = $field.val();
                        }
                    }
                    else
                    {
                        n = $field.attr("name");
                        v = $field.val();
                    }
                }
                else
                {
                    n = $field.attr("name");
                    v = $field.val();
                }

                if (n !== undefined && n !== null)
                {
                    obj[n] = obj[n] === undefined ? v
                      : $.isArray( obj[n] ) ? obj[n].concat( v )
                      : [ obj[n], v ];
                }
            });
        }
        else
        {
            $.each( this.serializeArray(), function(i,o){
                var n = o.name,
                    v = o.value;
                
                obj[n] = obj[n] === undefined ? v
                  : $.isArray( obj[n] ) ? obj[n].concat( v )
                  : [ obj[n], v ];
            });
        }
        return obj;
    };
})(jQuery);
