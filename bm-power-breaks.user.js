// ==UserScript==
// @name Beeminder Power Breaks
// @namespace https://www.nathanarthur.com/
// @version 0.1
// @description Add power features to Beeminder breaks page. (Icon by icons8.com)
// @match https://*.beeminder.com/breaks/*
// @include https://*.beeminder.com/breaks/*
// @grant none
// @copyright 2020, Nathan Arthur (https://www.nathanarthur.com/)
// @license MIT; https://mit-license.org/
// @icon https://raw.githubusercontent.com/narthur/bm-power-breaks/master/icons8-bee-48.png
// @homepage https://github.com/narthur/bm-power-breaks
// @updateURL https://raw.githubusercontent.com/narthur/bm-power-breaks/master/bm-opener.user.js
// @downloadURL https://raw.githubusercontent.com/narthur/bm-power-breaks/master/bm-opener.user.js
// @supportURL https://github.com/narthur/bm-power-breaks/issues
// @run-at document-end
// ==/UserScript==

// ==OpenUserJS==
// @author narthur
// ==/OpenUserJS==

(function() {
    'use strict';

    if (window.self != window.top || document.querySelector('.breaks-blurb') === null) {
        return;
    }

    var $ = window.$;

    window.naCheckAll = function() {
        alert('This may take a few seconds...')
        $('.break-cell.break-disabled .taking-a-break .fancy-checkbox').click();
        alert('Done!')
    };

    window.naCheckNone = function() {
        alert('This may take a few seconds...')
        $('.break-cell:not(.break-disabled) .taking-a-break .fancy-checkbox').click();
        alert('Done!')
    }

    window.naSetFrom = function() {
        alert('setting from...')
        var val = $('#na_date').val()
        $('.break-cell:not(.break-disabled) .break-start').val(val)
        alert('done setting')
    }

    window.naSetTo = function() {
        alert('setting to...')
        var val = $('#na_date').val()
        $('.break-cell:not(.break-disabled) .break-end').val(val)
        alert('done setting')
    }

    var today = new Date();
    today.setDate(today.getDate() + 7);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today_string = yyyy + '-' + mm + '-' + dd;

    var body = document.querySelector('body'),
        content = document.querySelector('.content'),
        wrapper = document.createElement('div'),
        all = '<a href="#" onclick="naCheckAll(); return false;">Check All</a> ',
        none = '<a href="#" onclick="naCheckNone(); return false;">Check None</a> ',
        date = '<input id="na_date" type="text" class="datepicker input-date" value="'+today_string+'">',
        from = '<a href="#" onclick="naSetFrom(); return false;">Set From</a> ',
        to = '<a href="#" onclick="naSetTo(); return false;">Set To</a> ';

    wrapper.innerHTML = all + none + date + from + to;

    var node = body.insertBefore(wrapper, content);

    node.style.textAlign = "center";

    $('.datepicker').datepicker({format: 'yyyy-mm-dd'});
})();
