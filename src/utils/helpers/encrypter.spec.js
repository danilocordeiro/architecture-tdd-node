const bcrypt = require('bcrypt')
const Encrypter = require('./encrypter')
const {
  MissingParamError
} = require('../errors')

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('Should return true if bcrypt return true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt return false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(false)
  })

  test('Should calls bcrypt with corret values', async () => {
    const sut = makeSut()

    await sut.compare('any_value', 'hashed_value')
    expect(bcrypt.value).toBe('any_value')
    expect(bcrypt.hash).toBe('hashed_value')
  })

  test('Should thorw if no params are provided', async () => {
    const sut = makeSut()

    expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
    expect(sut.compare('any_value')).rejects.toThrow(new MissingParamError('hash'))
  })
})
