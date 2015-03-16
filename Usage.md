
```
$(column2).fillerup(options);
```

**column2** (selector) The column(s) where you want to insert more content.

# Option Parameters #

**alignWith** (selector, jQuery object, or DOM element) The column (column1) that you are measuring against.

**content** (single value, array of values, or a single function) The content to insert. Values are added using jQuery.append(), so they should be HTML strings or jQuery objects. See below for using a function.

**max** (int) When using content:fn(), this is the maximum number of times to run the function.

**padding** (int) Minimum difference between the height of column1 and column2. For example, for padding:100, if column1 is 100px taller than column2, then more content will be added. But if column1 is only 99px taller than column2, no additional content will be added.

## content:fn(options) ##

When you use a function as your content, fillerup calls your function and passes a single options argument containing all the fillerup options above, plus one additional options parameter:

**diff** (int) The pixels available to be filled (the difference in height between column1 and column2).

Within your function the keyword "this" refers to the element where you should add the content.

If the function returns false, then fillerup will stop; otherwise, fillerup will check the columns and call the function again if necessary. When using ajax to asynchronously fetch content, the function should _always_ return false - then in your ajax callback you can call fillerup again (using the same options) to continue loading more content if necessary. Each time the function is called, the "max" option is decremented (to avoid getting caught in an infinite loop).

# Changing the Defaults #

You can change the global defaults for all the options by modifying the jQuery.fn.fillerup.defaults object. For example:

```
$.extend($.fn.fillerup.defaults, {alignWith:'#col1', padding:100});
```

Then whenever you call fillerup, those defaults will be used unless you override them with new options. After setting the defaults above, the following example would use the default alignWith option, but override the default padding:

```
$('col2').fillerup({content:'<p>More stuff...</p>', padding:200});
```