$(() => {
  console.log("hello")
  let firstOperand: number;
  let secondOperand: number;

  $('#first-operand').on('input', function() {
    console.log(1);
    firstOperand = parseFloat($('#first-operand').val() as string);
  })

  $('#second-operand').on('input', function() {
    console.log(2);
    secondOperand = parseFloat($('#second-operand').val() as string)
  })

  $('#sum').on('click', function() {
    console.log("world")
    $('#result').text(firstOperand + secondOperand)
  })

  $('#difference').on('click', function() {
    $('#result').text(firstOperand - secondOperand)
  })

  $('#product').on('click', function() {
    $('#result').text(firstOperand * secondOperand)
  })

  $('#division').on('click', function() {
    $('#result').text(firstOperand / secondOperand)
  })
})
