import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import BreedModule from '~/store/breed'

let breedStore: BreedModule

function initialiseStores(store: Store<any>): void {
  breedStore = getModule(BreedModule, store)
}

export { initialiseStores, breedStore }
