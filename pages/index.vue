<template>
  <div v-if="store.isLoading" class="loading">
    Загрузка...
  </div>
  <div v-else-if="store.error" class="error">
    {{ store.error }}
  </div>
  <section v-else-if="store.page" class="main-page">
    <h1 class="main-page-title">{{ store.page.name }}</h1>
    <ul class="main-page-cards">
      <li class="main-page-card" v-for="card in store.getSlides" :key="card.id">
        <card-ui :data="card">
          <template #under>
            <ul class="tags">
              <li class="tag tag_green" v-for="genre in card.title.genres" :key="genre">
                {{ mapDeepEntries(store.genres, genre)?.name }}
              </li>
            </ul>
            <ul class="tags">
              <li class="tag tag_red" v-for="label in card.title.labels" :key="label">
                {{ mapDeepEntries(store.labels, label)?.name }}
              </li>
            </ul>
          </template>
        </card-ui>
      </li>
    </ul>
  </section>
  <div v-else class="error">
    Ошибка получения данных
  </div>
</template>

<script lang="ts" setup>
import { mapDeepEntries } from '~/utils/mapDeepEntries';
import { useShowcaseStore } from '~/stores/showcase';

const store = useShowcaseStore();

onMounted(async () => {
  await store.fetchShowcaseData();
});
</script>

<style scoped>
.loading,
.error {
  padding: 2rem;
  text-align: center;
  font-size: 1.25rem;
  background-color: white;
  border-radius: 1.25rem;
}

.error {
  color: rgb(220, 38, 38);
}

.main-page {
  padding: 1.25rem;
  background-color: white;
  border-radius: 1.25rem;
  @media (max-width: 480px) {
    padding: 0.625rem;
  }
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

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 920px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
