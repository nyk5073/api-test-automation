import { createPost } from "../../apiCalls/postCalls"
import { createUser } from "../../apiCalls/usersCalls"
import { TestUtils } from "../../helpers"

describe('Post Management Tests', () => {

    let user_id: number
    let post_id: number

    beforeAll(async() => {
        const userObject ={
            "name": TestUtils.generateRandomName(),
            "email": TestUtils.generateRandomEmail(),
            "gender": "male",
            "status": "active"
          }
        const {data} = await createUser(userObject)
        user_id = data.id
    })

    it('creates a user post', async()=> {
        let payload = {
            user_id,
            title: TestUtils.generateRandomString(),
            body: TestUtils.generateParagraph()
        }
        const {status, data} = await createPost(payload)
        expect(status).toBe(201)
        expect(data).toMatchObject({
            id: expect.any(Number),
            ...payload
          })
      
          post_id = data.id
    })

})