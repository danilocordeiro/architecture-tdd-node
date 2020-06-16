const MongoHelper = require('../helpers/mongo-helpers')
const MissingParamError = require('../../utils/errors/missing-param-error')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('UpdateAccessTokenRepository', () => {
  let fakeUserId

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    const userModel = db.collection('users')
    await userModel.deleteMany()
    const fakeUser = await userModel.insertOne({
      email: 'email@email.com',
      password: 'hashed_password'
    })
    fakeUserId = fakeUser.ops[0]._id
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('should update the user with the given accessToken', async () => {
    const {
      sut,
      userModel
    } = makeSut()

    await sut.update(fakeUserId, 'valid_token')
    const updatedFakeUser = await userModel.findOne({
      _id: fakeUserId
    })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const
      sut = new UpdateAccessTokenRepository()

    const promisse = sut.update(fakeUserId, 'valid_token')
    expect(promisse).rejects.toThrow()
  })

  test('Should throw if no params is provided', async () => {
    const {
      sut
    } = makeSut()

    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(fakeUserId)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
