import { createUser, deleteUser, getUserById, updateUser } from '../../apiCalls/usersCalls'
import { TestUtils } from '../../helpers';

describe('Users Tests', () => {

  let userId: number

  let payload = {
    "name": TestUtils.generateRandomName(),
    "email": TestUtils.generateRandomEmail(),
    "gender": "male",
    "status": "active"
  }

  let payload2 = {
    ...payload,
    email: TestUtils.generateRandomEmail()
  }

  it('should create a new user', async () => {

    const {status, data} = await createUser(payload)
    expect(status).toBe(201)
    expect(data).toMatchObject({
      id: expect.any(Number),
      ...payload
    })

    userId = data.id

  })

  it('should get the new user', async () => {
    const {status, data} = await getUserById(userId);  
    expect(status).toBe(200)
    expect(data).toMatchObject({
      id: userId,
      ...payload
    })
  })

  it('should be able to update user', async () => {

    const {status, data} = await updateUser(userId,payload2)
    expect(status).toBe(200)
    expect(data).toMatchObject({
      id: userId,
      ...payload2
    })
  })

  it('should get the updated user', async () => {
    const {status, data} = await getUserById(userId);  
    expect(status).toBe(200)
    expect(data).toMatchObject({
      id: userId,
      ...payload2
    })
  })

  it('should delete a user', async () => {
    const {status, data} = await deleteUser(userId)
    expect(status).toBe(204)
    expect(data).toBeNull
  })

  it('should not be able to retrieve deleted user', async () => {
    await expect(getUserById(userId)).rejects.toMatchObject({
      response: {
        status: 404,
        data: {
          message: 'Resource not found',
        },
      },
    });
  });    

});

