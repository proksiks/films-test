import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Genre {
  oid: string
  name: string
}
export interface Label {
  oid: string
  name: string
}

export interface Asset {
  asset_type: string
  resize_url: string
}

export interface Title {
  title: string
  synopsis: string
  genres: string[]
  labels: string[]
  assets: Asset[]
}

export interface Slide {
  title: Title
}

export interface ShowcasePage {
  name: string
  slides: Slide[]
}

export const useShowcaseStore = defineStore('showcase', () => {
  const page = ref<ShowcasePage | null>(null)
  const genres = ref<Genre[]>([])
  let lables = ref<Label[]>([])

  const fetchMainPage = async () => {
    const { data } = await useFetch<ShowcasePage>(`https://cms.test.ksfr.tech/api/v1/showcases/showcases/mainpage/`)
    page.value = data.value
  }

  const fetchGenres = async () => {
    const { data } = await useFetch<Genre[]>('https://cms.test.ksfr.tech/api/v1/metadata/genres/')
    genres.value = data.value || []
  }
  const fetchLables = async () => {
    const { data } = await useFetch<Label[]>('https://cms.test.ksfr.tech/api/v1/metadata/lables/')
    lables.value = data.value || []
  }


  const replaceSizeImage = (assets: Asset[], type: string): string => {
    const asset = assets.find(
      (item) => item.asset_type.toLowerCase() === type.toLowerCase()
    )
    return asset ? asset.resize_url.replace('{w}x{h}', '320x320') : ''
  }

  const replaceGenre = (ids: string[]): Genre[] => {
    return ids.map((id) => genres.value.find((item) => item.oid === id)).filter((item): item is Genre => item !== undefined)
  }
  const replaceLabels = (ids: string[]): Label[] => {
    return ids.map((id) => lables.value.find((item) => item.oid === id)).filter((item): item is Label => item !== undefined)
  }

  return {
    page,
    genres,
    lables,
    fetchMainPage,
    fetchGenres,
    fetchLables,
    replaceSizeImage,
    replaceGenre,
    replaceLabels
  }
})