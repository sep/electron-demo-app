// window.$ = window.jQuery = require('jquery.js');
// window.$ = window.jQuery = require('jquery');

$(() => {

  let firstOperand: number;
  let secondOperand: number;

  $('.first-operand').on('input propertychange', function() {
    firstOperand = parseFloat($('.first-operand').val() as string);
  })

  $('.second-operand').on('input propertychange', function() {
    secondOperand = parseFloat($('.second-operand').val() as string)
  })

  $('.sum').on('button onclick', function() {
    $('.result').text(firstOperand + secondOperand)
  })

  $('.difference').on('button onclick', function() {
    $('.result').text(firstOperand - secondOperand)
  })

  $('.product').on('button onclick', function() {
    $('.result').text(firstOperand * secondOperand)
  })

  $('.division').on('button onclick', function() {
    $('.result').text(firstOperand / secondOperand)
  })
})
