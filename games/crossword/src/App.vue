<template>
  <div id="app">
    <div class="container">
      <header class="game-header">
        <h1>🧩 Crossword Puzzle</h1>
        <p class="game-subtitle">Find all the hidden words!</p>
      </header>

      <main class="game-layout">
        <div class="game-main">
          <div v-if="words.length === 0" class="loading">
            🧩 Generating your crossword puzzle...
          </div>
          
          <GameGrid
            v-else
            :grid="grid"
            :grid-size="gridSize"
            :user-input="userInput"
            :selected-square="selectedSquare"
            :get-square-state="getSquareState"
            @select-square="selectSquare"
            @input-letter="inputLetter"
          />
        </div>

        <aside class="game-sidebar">
          <WordList
            :words="words"
            :completed-words="completedWords"
          />
          
          <GameStatus
            :progress="progress"
            :is-completed="isCompleted"
            @new-game="startNewGame"
          />
        </aside>
      </main>

      <!-- On-screen keyboard -->
      <OnScreenKeyboard
        :show-keyboard="showKeyboard"
        @input-letter="inputLetter"
        @clear="clearSquare"
        @close="deselectSquare"
      />

      <!-- Completion modal -->
      <CelebrationModal
        :show="isCompleted"
        :word-count="words.length"
        :game-start-time="gameStartTime"
        @new-game="startNewGame"
        @close="() => {}"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGameState } from './composables/useGameState.js'
import GameGrid from './components/GameGrid.vue'
import WordList from './components/WordList.vue'
import OnScreenKeyboard from './components/OnScreenKeyboard.vue'
import GameStatus from './components/GameStatus.vue'
import CelebrationModal from './components/CelebrationModal.vue'

// Initialize game state
const {
  words,
  grid,
  gridSize,
  userInput,
  completedWords,
  selectedSquare,
  isCompleted,
  showKeyboard,
  progress,
  gameStartTime,
  getSquareState,
  initializeGame,
  startNewGame,
  selectSquare,
  deselectSquare,
  inputLetter,
  clearSquare
} = useGameState()

// Initialize game on mount
onMounted(() => {
  initializeGame()
})

// Handle keyboard input for accessibility
function handleGlobalKeyDown(event) {
  // Close keyboard on Escape
  if (event.key === 'Escape' && showKeyboard.value) {
    deselectSquare()
  }
  
  // Handle letter input when a square is selected
  if (selectedSquare.value && event.key.match(/^[a-zA-Z]$/)) {
    event.preventDefault()
    inputLetter(event.key.toLowerCase())
  }
  
  // Handle backspace/delete
  if (selectedSquare.value && (event.key === 'Backspace' || event.key === 'Delete')) {
    event.preventDefault()
    clearSquare()
  }
}

// Add global keyboard listener
onMounted(() => {
  document.addEventListener('keydown', handleGlobalKeyDown)
})

// Cleanup on unmount
import { onUnmounted } from 'vue'
onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeyDown)
})
</script>

<style>
/* Global styles are in main.css */
.game-header {
  text-align: center;
  margin-bottom: 2rem;
}

.game-subtitle {
  color: var(--text-light);
  font-size: 1.125rem;
  margin-top: 0.5rem;
}

.game-layout {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  align-items: start;
}

@media (min-width: 768px) {
  .game-layout {
    grid-template-columns: 1fr 300px;
  }
}

.game-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 767px) {
  .game-layout {
    grid-template-columns: 1fr;
  }
  
  .game-sidebar {
    order: 1;
  }
  
  .game-main {
    order: 0;
  }
}

/* Loading state */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 1.125rem;
  color: var(--text-light);
}

/* Error state */
.error {
  background-color: #fee2e2;
  color: var(--error);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin: 1rem 0;
}
</style>
