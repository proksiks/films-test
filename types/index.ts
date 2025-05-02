export interface Genre {
    oid: string
    name: string
}
export interface Label {
    oid: string
    name: string
}

export interface Asset {
    asset_type: string;
    resize_url: string;
}

export interface Title {
    title: string;
    synopsis: string;
    genres: string[];
    labels: string[];
    assets: Asset[];
}

export interface Slide {
    title: Title;
}

export interface ShowcasePage {
    name: string;
    slides: Slide[];
}