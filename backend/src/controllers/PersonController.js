import database from '../database/connection'
import generateUniqueId from '../utils/generateUniqueId'

export default {
  async store (request, response) {
    const { name, email, phone, city, fu } = request.body
    const id = generateUniqueId()

    await database('people').insert({
      id,
      name,
      email,
      phone,
      city,
      fu
    })

    return response.status(200).json({ id })
  }
}
