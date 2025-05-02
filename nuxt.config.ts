// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      filmsApi: import.meta.env.BASE_URL
    }
  },
  imports: {
    dirs: [
      "composables/**",
      "utils/**",
      "types/**"
    ]
  },
  css: ['assets/styles/main.css'],
  modules: [
    ['@pinia/nuxt', {
      storesDirs: ['./stores/**']
    }]
  ]
})