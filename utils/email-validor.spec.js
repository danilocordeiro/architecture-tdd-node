const validator = require('validator')

class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

describe('Email Validator', () => {
  test('Should returns true if validator returns true', async () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@test.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should returns false if validator returns false', async () => {
    validator.isEmailValid = false
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('invalid_email.com')
    expect(isEmailValid).toBe(false)
  })
})
