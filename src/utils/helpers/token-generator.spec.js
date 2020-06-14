class TokenGenerator {
  async generate (id) {
    return null
  }
}

describe('Token Generator', () => {
  test('should returns null id JWT return null', async () => {
    const sut = new TokenGenerator()
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })
})
