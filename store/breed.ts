import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
import { Breed } from '~/types'

const getImage = (breedId: number) => {
  return $axios.$get('images/search', {
    params: {
      breed_id: breedId,
      limit: 1
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
    await this.loadImages()
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

  @Action
  async loadImages () {
    const breeds = await Promise.all(this.breeds.map(async (breed) => {
      const imgs = await getImage(breed.id)
      const imageUrl = imgs.length ? imgs[0].url : ''

      return {
        ...breed,
        imageUrl
      }
    }))
    this.setBreeds(breeds)
  }
}

export default BreedModule
