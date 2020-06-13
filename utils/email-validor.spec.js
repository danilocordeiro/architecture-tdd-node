class EmailValidator {
  isValid (email) {
    return true
  }
}

describe('Email Validator', () => {
  test('Should returns true if validator', async () => {})
  const sut = new EmailValidator()
  const isEmailValid = sut.isValid('valid_email@test.com')
  expect(isEmailValid).toBe(true)
})
