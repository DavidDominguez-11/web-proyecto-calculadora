
import Display from '../components/Display'

export default {
  title: 'Calculator/Display',
  component: Display,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'El valor actual mostrado en el display' }
  }
}

export const Default = {
  args: {
    value: '0'
  }
}

export const LongNumber = {
  args: {
    value: '123456789'
  }
}

export const ErrorState = {
  args: {
    value: 'ERROR'
  }
}

export const DecimalNumber = {
  args: {
    value: '3.141592'
  }
}