export interface BaseEntity {
    oid: string
    name: string
    [key: string]: string
}

export interface Genre extends BaseEntity {}

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
    id?: number
    title: Title
}

export interface ShowcasePage {
    name: string
    slides: Slide[]
}