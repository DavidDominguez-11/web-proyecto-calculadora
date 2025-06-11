import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, beforeEach } from 'vitest'
import Calculator from '../components/Calculator'

describe('Calculator UI', () => {
  beforeEach(() => {
    render(<Calculator />)
  })

  const getDisplayValue = () => screen.getByTestId('display').textContent

  test('realiza una suma básica (2 + 3 = 5)', () => {
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('='))

    expect(getDisplayValue()).toBe('5')
  })

  test('muestra ERROR al dividir por cero', () => {
    fireEvent.click(screen.getByText('6'))
    fireEvent.click(screen.getByText('/'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('='))

    expect(getDisplayValue()).toBe('ERROR')
  })

  test('limpia correctamente al presionar C', () => {
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('C'))

    expect(getDisplayValue()).toBe('0')
  })

  test('invierte el signo al presionar +/-', () => {
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('+/-'))

    expect(getDisplayValue()).toBe('-8')
  })

  test('maneja entrada de punto decimal correctamente', () => {
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('5'))

    expect(getDisplayValue()).toBe('1.5')
  })

  test('realiza operaciones consecutivas correctamente', () => {
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('*'))
    expect(getDisplayValue()).toBe('9') // 4 + 5 = 9
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('='))
    expect(getDisplayValue()).toBe('18') // 9 * 2 = 18
  })

  test('maneja el porcentaje correctamente', () => {
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('%'))
    expect(getDisplayValue()).toBe('100')
  })

  test('no permite múltiples puntos decimales', () => {
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('5'))
    expect(getDisplayValue()).toBe('3.5')
  })
})