// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Тестовое задание',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
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