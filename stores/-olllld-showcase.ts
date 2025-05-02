import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface BaseEntity {
    oid: string
    name: string
}

export interface Genre extends BaseEntity { }

export interface Label extends BaseEntity {
    left_color: string
    center_color: string
    right_color: string
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

export interface EntityMap {
    genres: Genre[]
    labels: Label[]
}

export const useShowcaseStore = defineStore('showcase', () => {
    const page = ref<ShowcasePage | null>(null)
    const entities = ref<EntityMap>({
        genres: [],
        labels: []
    })

    const fetchMainPage = async () => {
        const { data } = await useFetch<ShowcasePage>(
            'https://cms.test.ksfr.tech/api/v1/showcases/showcases/mainpage/'
        )
        page.value = data.value
    }

    const fetchEntities = async () => {
        const [genresResponse, labelsResponse] = await Promise.all([
            useFetch<Genre[]>('https://cms.test.ksfr.tech/api/v1/metadata/genres/'),
            useFetch<Label[]>('https://cms.test.ksfr.tech/api/v1/metadata/labels/')
        ])

        entities.value = {
            genres: genresResponse.data.value || [],
            labels: labelsResponse.data.value || []
        }
    }

    const getImageUrl = (assets: Asset[], type: string): string => {
        const asset = assets.find(
            (item) => item.asset_type.toLowerCase() === type.toLowerCase()
        )
        return asset ? asset.resize_url.replace(/{w}x{h}/g, '320x320') : ''
    }

    const mapEntities = <T extends keyof EntityMap>(
        ids: string[],
        entityType: T
    ): EntityMap[T] => {
        return ids
            .map((id) => entities.value[entityType].find((item) => item.oid === id))
            .filter((item): item is EntityMap[T][number] => item !== undefined)
    }

    return {
        page,
        entities,
        fetchMainPage,
        fetchEntities,
        getImageUrl,
        mapEntities
    }
})