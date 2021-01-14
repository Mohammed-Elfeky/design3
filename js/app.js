$(function () {
    'use strict';
    var winH   = $(window).height(),
        navH   = $('.navbar').innerHeight();
    $('.head,.head .item').innerHeight(winH-navH);
  });