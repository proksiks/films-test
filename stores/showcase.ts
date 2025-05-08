import { defineStore } from 'pinia';

interface ShowcaseState {
  page: ShowcasePage | null;
  genres: Genre[];
  labels: Label[];
  isLoading: boolean;
  error: string | null;
}

export const useShowcaseStore = defineStore('showcase', {
  state: (): ShowcaseState => ({
    page: null,
    genres: [],
    labels: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getSlides: (state) => {
      if (!state.page) return [];
      return state.page.slides.map((item: Slide, i: number) => ({
        ...item,
        id: i,
      }));
    },
  },

  actions: {
    async fetchShowcaseData() {
      const config = useRuntimeConfig();
      const filmsApi = config.public.filmsApi;
      
      const fetchOptions = {
        credentials: 'include' as const,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      this.isLoading = true;
      this.error = null;

      try {
        const [pageResponse, genresResponse, labelsResponse] = await Promise.all([
          useFetch<ShowcasePage>(`${filmsApi}/showcases/showcases/mainpage/`, fetchOptions),
          useFetch<Genre[]>(`${filmsApi}/metadata/genres/`, fetchOptions),
          useFetch<Label[]>(`${filmsApi}/metadata/labels/`, fetchOptions),
        ]);

        if (pageResponse.error.value || genresResponse.error.value || labelsResponse.error.value) {
          const errorResponse = pageResponse.error.value || genresResponse.error.value || labelsResponse.error.value;
          if (errorResponse) {
            throw new Error(`Ошибка сервера: ${errorResponse.statusCode} - ${errorResponse.message}`);
          }
          throw new Error('Неизвестная ошибка сервера');
        }

        if (!pageResponse.data.value || !genresResponse.data.value || !labelsResponse.data.value) {
          throw new Error('Не удалось получить данные от сервера');
        }

        this.page = pageResponse.data.value;
        this.genres = genresResponse.data.value;
        this.labels = labelsResponse.data.value;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = error instanceof Error ? error.message : 'Произошла ошибка при загрузке данных';
      } finally {
        this.isLoading = false;
      }
    },
  },
});