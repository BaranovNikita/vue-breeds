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
  imageUrl: string
}
