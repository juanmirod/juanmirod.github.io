<template>
  <div class="word-list">
    <h2>Find These Words</h2>
    <div class="words">
      <div
        v-for="word in words"
        :key="word"
        :class="[
          'word-item',
          { completed: completedWords.includes(word) }
        ]"
        :aria-label="`Word: ${word}, ${completedWords.includes(word) ? 'completed' : 'not found'}`"
      >
        {{ word.toUpperCase() }}
      </div>
    </div>
    <div class="word-count" v-if="words.length > 0">
      {{ completedWords.length }} of {{ words.length }} words found
    </div>
  </div>
</template>

<script setup>
defineProps({
  words: {
    type: Array,
    required: true
  },
  completedWords: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.word-list {
  background-color: var(--surface);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

.word-list h2 {
  color: var(--primary);
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.words {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.word-item {
  padding: 0.75rem;
  background-color: var(--background);
  border-radius: 6px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.word-item.completed {
  background-color: #dcfce7;
  color: var(--success);
  text-decoration: line-through;
  border-color: var(--success);
  animation: celebration 0.8s ease-out;
}

.word-count {
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-light);
  font-weight: 500;
}

@keyframes celebration {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style>
