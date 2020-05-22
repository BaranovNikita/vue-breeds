import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
import { Breed, BreedImage } from '~/types'

const getImages = (breedId: number, limit = 1) => {
  return $axios.$get('images/search', {
    params: {
      breed_id: breedId,
      limit
    }
  })
}

@Module({
  name: 'breed',
  stateFactory: true,
  namespaced: true
})
class BreedModule extends VuexModule {
  breeds: Breed[] = []
  pageLimit:number = 10
  page:number = 0
  total: number = 0
  loading: boolean = false

  @Mutation
  setBreeds (breeds: Breed[]) {
    this.breeds = breeds
  }

  @Mutation
  setPage (page: number) {
    this.page = page
  }

  @Mutation
  setPageLimit (pageLimit: number) {
    this.pageLimit = pageLimit
  }

  @Mutation
  setTotal (total: number) {
    this.total = total
  }

  @Mutation
  setLoading (loading: boolean) {
    this.loading = loading
  }

  @Action
  async getBreeds () {
    this.setLoading(true)
    const breeds = await $axios.$get('/breeds', {
      params: {
        page: this.page,
        limit: this.pageLimit
      }
    })
    this.setBreeds(breeds)
    this.setLoading(false)
  }

  @Action
  async getTotal () {
    const all = await $axios.$get('/breeds')
    this.setTotal(all.length)
  }

  @Action
  async changePage (page: number) {
    this.setPage(page - 1)
    await this.getBreeds()
  }

  @Mutation
  updateBreed ({ id, update }: { id: number, update: { [K in keyof Breed]?: any } }) {
    const breedIdx = this.breeds.findIndex(breed => breed.id === id)
    if (breedIdx > -1) {
      this.breeds = [
        ...this.breeds.slice(0, breedIdx),
        { ...this.breeds[breedIdx], ...update },
        ...this.breeds.slice(breedIdx + 1)
      ]
    }
  }

  @Action
  async loadImages (limit: number = 1) {
    for (const breed of this.breeds) {
      const images = await getImages(breed.id, limit) as BreedImage[]
      this.updateBreed({ id: breed.id, update: { images } })
    }
  }

  @Action
  async loadBreed (id: number) {
    this.setLoading(true)
    try {
      const breed = await $axios.$get(`/breeds/${id}`)
      this.setBreeds([breed])
    } catch (e) {
      console.error(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default BreedModule
