<script setup lang="ts">
import { useShowcaseStore } from './stores/-olllld-showcase'

const store = useShowcaseStore()

onMounted(async () => {
  await Promise.all([
    store.fetchMainPage(),
    store.fetchEntities()
  ])
})
</script>

<template>
  <div>
    <h1>{{ store.page?.name }}</h1>
    <div class="items">
      <div class="item" v-for="item in store.page?.slides" :key="item.title.title">
        <img 
          :src="store.getImageUrl(item.title.assets, 'poster')"
          :alt="item.title.title"
        />
        <h2>{{ item.title.title }}</h2>
        <p>{{ item.title.synopsis }}</p>
        <div class="genres">
          <span
            v-for="genre in store.mapEntities(item.title.genres, 'genres')"
            :key="genre.oid"
            class="genre"
          >
            {{ genre.name }}
          </span>
        </div>
        <div class="labels">
          <span
            v-for="label in store.mapEntities(item.title.labels, 'labels')"
            :key="label.oid"
            class="label"
            :style="{
              background: `linear-gradient(90deg, 
                ${label.left_color} 0%, 
                ${label.center_color} 50%, 
                ${label.right_color} 100%
              )`
            }"
          >
            {{ label.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 20px;
}

.item {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.item:hover {
  transform: translateY(-5px);
}

.item img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.item h2 {
  margin: 1rem 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.item p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.genres,
.labels {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.genre,
.label {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.genre {
  background-color: #e5f2ff;
  color: #0066cc;
}

.genre:hover {
  background-color: #cce4ff;
}

.label {
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.label:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .items {
    padding: 10px;
  }

  .item img {
    height: 300px;
  }

  .item h2 {
    font-size: 1.2rem;
  }
}
</style>