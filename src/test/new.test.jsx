import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import Calculator from '../components/Calculator';

const getDisplayValue = () => screen.getByTestId('display').textContent;

describe('Calculator UI', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    render(<Calculator />, { container });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test('realiza una suma (2 + 3 = 5)', () => {
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    expect(getDisplayValue()).toBe('5');
  });

  test('limpiar al presionar C', () => {
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('C'))

    expect(getDisplayValue()).toBe('0');
})

test('invierte el signo al presionar +/-', () => {
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('+/-'))
    
    expect(getDisplayValue()).toBe('-1');
  })

  test('muestra ERROR al dividir por cero', () => {
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));

    expect(getDisplayValue()).toBe('ERROR');
  });

  test('maneja entrada de punto decimal', () => {
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('5'))

    expect(getDisplayValue()).toBe('1.5');
  })

});