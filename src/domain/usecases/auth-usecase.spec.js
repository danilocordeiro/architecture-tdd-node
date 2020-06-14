const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
  }
}

describe('AuhUseCase', () => {
  test('Should throw if no email is provided', () => {
    const sut = new AuthUseCase()
    const promisse = sut.auth()
    expect(promisse).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if password is not provided', () => {
    const sut = new AuthUseCase()
    const promisse = sut.auth('any_email@email.com')
    expect(promisse).rejects.toThrow(new MissingParamError('password'))
  })
})
