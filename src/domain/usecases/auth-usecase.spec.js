const {
  MissingParamError
} = require('../../utils/errors')
const AuthUseCase = require('./auth-usecase')

const makeSut = () => {
  class EncrypterSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
    }
  }
  const encrypterSpy = new EncrypterSpy()

  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    password: 'hashed password'
  }
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encrypterSpy)
  return {
    sut,
    loadUserByEmailRepositorySpy,
    encrypterSpy
  }
}

describe('AuhUseCase', () => {
  test('Should throw if no email is provided', async () => {
    const {
      sut
    } = makeSut()
    const promisse = sut.auth()
    expect(promisse).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if password is not provided', async () => {
    const {
      sut
    } = makeSut()
    const promisse = sut.auth('any_email@email.com')
    expect(promisse).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should calls LoadUserByEmailRepository with correct email', async () => {
    const {
      sut,
      loadUserByEmailRepositorySpy
    } = makeSut()
    await sut.auth('any_email@email.com', 'any_password')
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase()

    const promisse = sut.auth('any_email@email.com', 'any_password')
    expect(promisse).rejects.toThrow()
  })

  test('Should throw if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})

    const promisse = sut.auth('any_email@email.com', 'any_password')
    expect(promisse).rejects.toThrow()
  })

  test('Should return null if an invalid email is provided', async () => {
    const {
      sut,
      loadUserByEmailRepositorySpy
    } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid_email.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid password is provided', async () => {
    const {
      sut
    } = makeSut()

    const accessToken = await sut.auth('valid_email@email.com', 'invalid_password')
    expect(accessToken).toBeNull()
  })

  test('Should call Enprypter with correct values', async () => {
    const {
      sut,
      loadUserByEmailRepositorySpy,
      encrypterSpy
    } = makeSut()

    await sut.auth('valid_email@email.com', '_password')
    expect(encrypterSpy.password).toBe('_password')
    expect(encrypterSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })
})
