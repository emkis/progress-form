import database from '../database/connection'

export default {
  async store (request, response) {
    const person_id = request.params.id

    const {
      realistic,
      investigative,
      entrepreneur,
      conventional,
      artistic,
      social } = request.body

    await database('results').insert({
      person_id,
      realistic,
      investigative,
      entrepreneur,
      conventional,
      artistic,
      social
    })

    return response.status(204).send()
  }
}
