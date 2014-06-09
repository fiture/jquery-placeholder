jquery-placeholder
==================

A jquery pulgin for old browers, to simulate the placeholder in modern browers.

Useage: 
--------

Include jquery.placeholder.js into your html code.

``` javascript

    $('input.xx').placeholder(options);
    $('textarea.xx').placeholder(options);
```

Options:

``` javascript
    var defaults = {
        customLeft: 3, // 单位: px
        textColor: '#CCC', // label的颜色: red, #DDD
        cls: '', //placeholderp-simulation
        forceUse: false, //支持placeholder的浏览器，是否强制使用
        focusHide: true //是否聚焦隐藏placeholder
    };
```
