const EmailValidator = require('./email-validator')
const validator = require('validator')
const {
  MissingParamError
} = require('../errors')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should returns true if validator returns true', async () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@test.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should returns false if validator returns false', async () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email.com')
    expect(isEmailValid).toBe(false)
  })

  test('Should call validator with correct email', async () => {
    const sut = makeSut()
    sut.isValid('valid_email@test.com')
    expect(validator.email).toBe('valid_email@test.com')
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()

    expect(() => {
      sut.isValid()
    }).toThrow(new MissingParamError('email'))
  })
})
