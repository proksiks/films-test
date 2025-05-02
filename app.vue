<template>
  <section class="app">
    <h1 class="title">{{ page?.name }}</h1>
    <ul class="cards">
      <li class="card" v-for="card in page?.slides">
        <picture class="card-cover">
          <img
            class="card-image"
            :src="replaceImageSize(card.title.assets, 'poster')"
            :alt="card.title.title"
          />
        </picture>
        <h2 class="card-title">
          {{ card.title.title }}
        </h2>
        <p class="card-description">
          {{ card.title.synopsis }}
        </p>
        <div class="card-under">
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
        </div>
      </li>
    </ul>
  </section>
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
</script>

<style scoped>
.app {
  padding: 1.25rem;
  background-color: white;
  border-radius: 1.25rem;
}
.title {
  margin: 0;
  text-align: center;
  background-color: rgb(18, 68, 133);
  padding: 0.625rem;
  border-radius: 0.5rem;
  color: white;
}
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  margin: 0;
  margin-top: 1.25rem;
  padding: 0;
  list-style-type: none;
}
.card {
  display: flex;
  flex-direction: column;
  background-color: rgb(119, 164, 247);
  padding: 1rem;
  border-radius: 0.5rem;
}

.card-image {
  display: block;
  max-width: 100%;
  object-fit: cover;
  margin: 0 auto;
}

.card-under {
  margin-top: auto;
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
