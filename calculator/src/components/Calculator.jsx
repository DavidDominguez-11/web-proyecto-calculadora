// src/components/Calculator.jsx
import Display from './Display'
import Button from './Button'
import useCalculator from '../hooks/useCalculator'
import './Calculator.css'

function Calculator () {
  const {
    displayValue,
    handleNumberInput,
    performOperation,
    clear,
    handleEquals,
    toggleSign
  } = useCalculator()

  return (
    <div className='calculator'>
      <Display value={displayValue} />
      <div className='keypad'>
        <Button label='C' onClick={clear} className='clear' />
        <Button label='+/-' onClick={toggleSign} />
        <Button label='%' onClick={performOperation} className='operation' />
        <Button label='/' onClick={performOperation} className='operation' />

        <Button label='7' onClick={handleNumberInput} />
        <Button label='8' onClick={handleNumberInput} />
        <Button label='9' onClick={handleNumberInput} />
        <Button label='*' onClick={performOperation} className='operation' />

        <Button label='4' onClick={handleNumberInput} />
        <Button label='5' onClick={handleNumberInput} />
        <Button label='6' onClick={handleNumberInput} />
        <Button label='-' onClick={performOperation} className='operation' />

        <Button label='1' onClick={handleNumberInput} />
        <Button label='2' onClick={handleNumberInput} />
        <Button label='3' onClick={handleNumberInput} />
        <Button label='+' onClick={performOperation} className='operation' />

        <Button label='0' onClick={handleNumberInput} className='zero' />
        <Button label='.' onClick={handleNumberInput} />
        <Button label='=' onClick={handleEquals} className='equals' />
      </div>
    </div>
  )
}

export default Calculator