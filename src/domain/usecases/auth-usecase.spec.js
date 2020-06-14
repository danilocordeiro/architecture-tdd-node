class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new Error()
    }
  }
}

describe('AuhUseCase', () => {
  test('Should throw if no email is provided', () => {
    const sut = new AuthUseCase()
    const promisse = sut.auth()
    expect(promisse).rejects.toThrow()
  })
})
