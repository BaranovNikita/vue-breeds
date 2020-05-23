interface ImageCategory {
  id: number,
  name: string
}

interface BreedImage {
  id: string,
  url: string,
  width: number,
  height: number,
  // eslint-disable-next-line camelcase
  mime_type: string,
  // eslint-disable-next-line no-use-before-define
  breeds: Breed[],
  categories: ImageCategory[]
}

interface Breed {
  name: string,
  id: number,
  weight: {
    imperial: string,
    metric: string
  },
  height: {
    imperial: string,
    metric: string
  },
  // eslint-disable-next-line camelcase
  life_span: string,
  // eslint-disable-next-line camelcase
  bred_for: string,
  // eslint-disable-next-line camelcase
  breed_group: string,
  images: BreedImage[]
}
