'use strict';

$(() => {
    let $list = $('#todo-list');

    ['1', '2', '3'].forEach((item) => {
       $('<li/>').text(item).appendTo($list);
    });
});