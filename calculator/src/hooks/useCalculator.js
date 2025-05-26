// src/hooks/useCalculator.js
import { useState } from 'react'

const MAX_DISPLAY_LENGTH = 9
const MAX_NUMBER_VALUE = 999999999

const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0')
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)
  const [hasDecimal, setHasDecimal] = useState(false)

  const clear = () => {
    setDisplayValue('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
    setHasDecimal(false)
  }

  const handleNumberInput = (num) => {
    if (displayValue === 'ERROR') {
      clear() // Limpiar error antes de un nuevo número
    }

    if (waitingForSecondOperand) {
      setDisplayValue(String(num))
      setWaitingForSecondOperand(false)
      setHasDecimal(num === '.')
    } else {
      if (displayValue.length >= MAX_DISPLAY_LENGTH && num !== '.') {
        return // Ignorar si excede el límite y no es un punto
      }
      if (num === '.') {
        if (!hasDecimal) {
          setDisplayValue(displayValue + '.')
          setHasDecimal(true)
        }
      } else {
        setDisplayValue(displayValue === '0' && num !== '.' ? String(num) : displayValue + String(num))
      }
    }
  }

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue)

    if (displayValue === 'ERROR') {
      setOperator(nextOperator)
      setFirstOperand(inputValue)
      setWaitingForSecondOperand(true)
      return
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)

      if (isNaN(result) || !isFinite(result)) {
        setDisplayValue('ERROR')
        setFirstOperand(null)
        setOperator(null)
        setWaitingForSecondOperand(true)
        setHasDecimal(false)
        return
      }

      const resultString = result.toString()

      if (result < 0) {
        setDisplayValue('ERROR') // No negativos
        setFirstOperand(null)
        setOperator(null)
        setWaitingForSecondOperand(true)
        setHasDecimal(false)
        return
      }

      if (result > MAX_NUMBER_VALUE) {
        setDisplayValue('ERROR') // No superiores a 999,999,999
        setFirstOperand(null)
        setOperator(null)
        setWaitingForSecondOperand(true)
        setHasDecimal(false)
        return
      }

      let formattedResult = resultString
      // Manejo de decimales para resultados largos
      if (resultString.includes('.') && resultString.length > MAX_DISPLAY_LENGTH) {
        const [integerPart, decimalPart] = resultString.split('.')
        const remainingLength = MAX_DISPLAY_LENGTH - integerPart.length - (integerPart.length > 0 ? 1 : 0) // -1 para el punto
        if (remainingLength > 0) {
          formattedResult = integerPart + '.' + decimalPart.substring(0, remainingLength)
        } else {
          formattedResult = integerPart
        }
      }

      if (formattedResult.length > MAX_DISPLAY_LENGTH) {
        setDisplayValue('ERROR') // Si el resultado formateado aún excede el límite
      } else {
        setDisplayValue(formattedResult)
      }
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
    setHasDecimal(false)
  }

  const calculate = (firstNum, secondNum, op) => {
    switch (op) {
      case '+': return firstNum + secondNum
      case '-': return firstNum - secondNum
      case '*': return firstNum * secondNum
      case '/':
        if (secondNum === 0) return NaN // División por cero
        return firstNum / secondNum
      case '%': return firstNum % secondNum
      default: return secondNum
    }
  }

  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return // No hay operación pendiente
    }

    const inputValue = parseFloat(displayValue)
    const result = calculate(firstOperand, inputValue, operator)

    if (isNaN(result) || !isFinite(result)) {
      setDisplayValue('ERROR')
      setFirstOperand(null)
      setOperator(null)
      setWaitingForSecondOperand(true)
      setHasDecimal(false)
      return
    }

    const resultString = result.toString()

    if (result < 0) {
      setDisplayValue('ERROR') // No negativos
      setFirstOperand(null)
      setOperator(null)
      setWaitingForSecondOperand(true)
      setHasDecimal(false)
      return
    }

    if (result > MAX_NUMBER_VALUE) {
      setDisplayValue('ERROR') // No superiores a 999,999,999
      setFirstOperand(null)
      setOperator(null)
      setWaitingForSecondOperand(true)
      setHasDecimal(false)
      return
    }

    let formattedResult = resultString
    if (resultString.includes('.') && resultString.length > MAX_DISPLAY_LENGTH) {
      const [integerPart, decimalPart] = resultString.split('.')
      const remainingLength = MAX_DISPLAY_LENGTH - integerPart.length - (integerPart.length > 0 ? 1 : 0)
      if (remainingLength > 0) {
        formattedResult = integerPart + '.' + decimalPart.substring(0, remainingLength)
      } else {
        formattedResult = integerPart
      }
    }

    if (formattedResult.length > MAX_DISPLAY_LENGTH) {
      setDisplayValue('ERROR')
    } else {
      setDisplayValue(formattedResult)
    }

    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(true)
    setHasDecimal(false)
  }

  const toggleSign = () => {
    if (displayValue === '0' || displayValue === 'ERROR') return

    const currentValue = parseFloat(displayValue)
    const newValue = -currentValue
    const newValueString = String(newValue)

    if (newValueString.length > MAX_DISPLAY_LENGTH) {
      setDisplayValue('ERROR')
      return
    }

    setDisplayValue(newValueString)
  }

  return {
    displayValue,
    handleNumberInput,
    performOperation,
    clear,
    handleEquals,
    toggleSign
  }
}

export default useCalculator