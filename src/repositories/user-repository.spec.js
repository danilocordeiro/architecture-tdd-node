class LoadUserByEmailRepository {
  async load (email) {
    return null
  }
}

describe('LoadUserByEmailRepository', () => {
  test('Should returns null if no user id found', async () => {
    const sut = new LoadUserByEmailRepository()
    const user = await sut.load('email@email.com')
    expect(user).toBeNull()
  })
})
