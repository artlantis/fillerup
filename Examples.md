# Add some HTML #

Add a single piece of content if there is 1px of space:

```
$('#col2').fillerup({
  alignWith:'#col1',
  content:'<p>Stuff to add</p>'
});
```

# Add an array of HTML #

Add an array of content, one element at a time while there is 100px of space:

```
$('#col2').fillerup({
  alignWith:'#col1',
  padding:100,
  content:['<p>Stuff to add</p>','<div><img src="myimg.jpg"/>More stuff</div>']
});
```

# Call a function that adds content #

Call a function repeatedly (maximum of 10 times) to add content while there is 1px of space:

```
$('#col2').fillerup({
  alignWith:'#col1',
  max:10,
  content:function(){ $(this).append('<p>Stuff to add</p>'); }
});
```

# Call a function that adds content using AJAX #

Call a function repeatedly that uses AJAX to add content while there is 1px of space:

```
$('#col2').fillerup({
  alignWith:'#col1',
  content:function(o){

    var col = $(this);
    col.load('myurl.php', function(){ col.fillerup(o); });

    // Return false to stop from immediately calling the function again
    return false;
  }
});
```

# Call a function that reveals hidden content #

Call a function repeatedly to reveal some content that is already hidden in column2, while there is 1px of space:

```

$('#col2').fillerup({
  alignWith:'#col1',
  content:function(){ $(this).children(':hidden:first').show(); }
});
```