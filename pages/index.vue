<template>
  <section class="main-page" v-if="page">
    <h1 class="main-page-title">{{ page?.name }}</h1>
    <ul class="main-page-cards">
      <li class="main-page-card" v-for="card in getSlides">
        <card-ui :data="card">
          <template #under>
            <ul class="tags">
              <li class="tag tag_green" v-for="genre in card.title.genres">
                {{ mapEntries(genres, genre)?.name }}
              </li>
            </ul>
            <ul class="tags">
              <li class="tag tag_red" v-for="label in card.title.labels">
                {{ mapEntries(labels, label)?.name }}
              </li>
            </ul>
          </template>
        </card-ui>
      </li>
    </ul>
  </section>
  <div v-else>Ошибка получения данных || CORS error</div>
</template>

<script lang="ts" setup>
const filmsApi = useRuntimeConfig().public.filmsApi;

// Может встать сайт из-за отсутствия данных или долгих ответов от сервера
const [{ data: page }, { data: genres }, { data: labels }] = await Promise.all([
  useFetch<ShowcasePage>(`${filmsApi}/showcases/showcases/mainpage/`),
  useFetch<Genre[]>(`${filmsApi}/metadata/genres/`),
  useFetch<Label[]>(`${filmsApi}/metadata/labels/`),
]).catch((error) => {
  console.error("Ой что-то пошло не так", error);
  throw error;
});

const getSlides = computed(() => {
  if (!page.value) return [];
  return page.value.slides.map((item, i) => ({
    ...item,
    id: i,
  }));
});
</script>

<style scoped>
.main-page {
  padding: 1.25rem;
  background-color: white;
  border-radius: 1.25rem;
}
.main-page-title {
  margin: 0;
  text-align: center;
  background-color: rgb(18, 68, 133);
  padding: 0.625rem;
  border-radius: 0.5rem;
  color: white;
}
.main-page-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  margin: 0;
  margin-top: 1.25rem;
  padding: 0;
  list-style-type: none;
}
.main-page-card {
  display: flex;
}
.tags {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.tags + .tags {
  margin-top: 1.5rem;
}
.tag {
  padding: 0.625rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
}
.tag_green {
  background-color: rgb(149, 255, 149);
}
.tag_red {
  background-color: rgb(255, 152, 152);
}
</style>
