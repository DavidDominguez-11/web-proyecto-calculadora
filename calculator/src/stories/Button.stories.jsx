
import Button from '../components/Button'

export default {
  title: 'Calculator/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'El texto del botón' },
    className: { control: 'text', description: 'Clases CSS adicionales para el botón' },
    onClick: { action: 'clicked', description: 'Función que se ejecuta al hacer clic en el botón' }
  }
}

export const NumberButton = {
  args: {
    label: '7',
    onClick: () => console.log('7 clicked')
  }
}

export const OperationButton = {
  args: {
    label: '+',
    className: 'operation',
    onClick: () => console.log('+ clicked')
  }
}

export const LargeButton = {
  args: {
    label: '0',
    className: 'zero',
    onClick: () => console.log('0 clicked')
  }
}

export const EqualsButton = {
  args: {
    label: '=',
    className: 'equals',
    onClick: () => console.log('= clicked')
  }
}

export const ClearButton = {
  args: {
    label: 'C',
    className: 'clear',
    onClick: () => console.log('C clicked')
  }
}