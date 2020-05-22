interface ImageCategory {
  id: number,
  name: string
}

interface BreedImage {
  id: string,
  url: string,
  width: number,
  height: number,
  mime_type: string,
  // eslint-disable-next-line no-use-before-define
  breeds: Breed[],
  categories: ImageCategory[]
}

export interface Breed {
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
  life_span: string,
  bred_for: string,
  breed_group: string,
  images: BreedImage[]
}
