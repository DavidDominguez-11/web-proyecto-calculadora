// src/test/useCalculator.test.jsx
import { describe, test, expect, beforeEach, beforeAll } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useCalculator from '../hooks/useCalculator'

// Configuración del entorno DOM
beforeAll(() => {
  // Crear un DOM virtual con jsdom
  const { JSDOM } = require('jsdom')
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost/'
  })
  global.window = dom.window
  global.document = dom.window.document
})

describe('useCalculator', () => {
  let result

  beforeEach(() => {
    // Renderizar el hook antes de cada test
    const { result: hookResult } = renderHook(() => useCalculator())
    result = hookResult
    act(() => result.current.clear())
  })

  test('clear() debe restablecer la calculadora al estado inicial', () => {
    act(() => result.current.handleNumberInput('5'))
    act(() => result.current.performOperation('+'))
    expect(result.current.displayValue).toBe('5')
    
    act(() => result.current.clear())
    
    expect(result.current.displayValue).toBe('0')
  })

  test('handleNumberInput Debe manejar la entrada de nums basicos', () => {
    act(() => result.current.handleNumberInput('7'))
    expect(result.current.displayValue).toBe('7')
  })

  test('handleNumberInput debe limitarse a 9 digitos', () => {
    act(() => {
      '1234567890'.split('').forEach(num => result.current.handleNumberInput(num))
    })
    expect(result.current.displayValue).toBe('0')
  })

  test('performOperation una suma basica', () => {
    act(() => result.current.handleNumberInput('2'))
    act(() => result.current.performOperation('+'))
    act(() => result.current.handleNumberInput('3'))
    act(() => result.current.performOperation('+'))
    
    expect(result.current.displayValue).toBe('5')
  })

  test('handleEquals debe calcular el resultado final', () => {
    act(() => result.current.handleNumberInput('8'))
    act(() => result.current.performOperation('*'))
    act(() => result.current.handleNumberInput('5'))
    act(() => result.current.handleEquals())
    
    expect(result.current.displayValue).toBe('40')
  })

  test('should manejar la division entre 0', () => {
    act(() => result.current.handleNumberInput('5'))
    act(() => result.current.performOperation('/'))
    act(() => result.current.handleNumberInput('0'))
    act(() => result.current.handleEquals())
    
    expect(result.current.displayValue).toBe('ERROR')
  })

  test('toggleSign debe invertir el signo', () => {
    act(() => result.current.handleNumberInput('75'))
    act(() => result.current.toggleSign())
    expect(result.current.displayValue).toBe('-75')
    
    act(() => result.current.toggleSign())
    expect(result.current.displayValue).toBe('75')
  })

  test('should manejo correcto del punto decimal', () => {
    act(() => result.current.handleNumberInput('.'))
    expect(result.current.displayValue).toBe('0.')
    
    act(() => result.current.handleNumberInput('5'))
    act(() => result.current.handleNumberInput('.')) // Intentar agregar otro punto
    expect(result.current.displayValue).toBe('0.5')
  })
})