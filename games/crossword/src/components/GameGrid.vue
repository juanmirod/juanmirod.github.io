<template>
  <div class="grid-container">
    <div 
      class="crossword-grid"
      :style="{ 
        gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
        gridTemplateRows: `repeat(1, 1fr)`
      }"
    >
      <div
        v-for="(row, rowIndex) in grid"
        :key="`row-${rowIndex}`"
      >
        <div
          v-for="(cell, colIndex) in row"
          :key="`cell-${rowIndex}-${colIndex}`"
          :class="[
            'grid-square',
            getSquareState(rowIndex, colIndex)
          ]"
          @click="handleSquareClick(rowIndex, colIndex)"
          :tabindex="cell !== '' ? 0 : -1"
          @keydown="handleKeyDown($event, rowIndex, colIndex)"
          role="button"
          :aria-label="getSquareAriaLabel(rowIndex, colIndex, cell)"
        >
          {{ getUserLetter(rowIndex, colIndex) || '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  grid: {
    type: Array,
    required: true
  },
  gridSize: {
    type: Object,
    required: true
  },
  userInput: {
    type: Object,
    required: true
  },
  selectedSquare: {
    type: Object,
    default: null
  },
  getSquareState: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['selectSquare', 'inputLetter'])

function handleSquareClick(row, col) {
  const cell = props.grid[row]?.[col]
  if (cell && cell !== '') {
    emit('selectSquare', row, col)
  }
}

function handleKeyDown(event, row, col) {
  const key = event.key.toLowerCase()
  
  if (key === 'enter' || key === ' ') {
    event.preventDefault()
    handleSquareClick(row, col)
  } else if (key.match(/^[a-z]$/)) {
    event.preventDefault()
    emit('selectSquare', row, col)
    emit('inputLetter', key)
  } else if (key === 'backspace' || key === 'delete') {
    event.preventDefault()
    emit('selectSquare', row, col)
    emit('inputLetter', '')
  }
}

function getUserLetter(row, col) {
  const key = `${row}-${col}`
  return props.userInput[key]?.toUpperCase() || ''
}

function getSquareAriaLabel(row, col, cell) {
  if (!cell || cell === '') {
    return 'Empty square'
  }
  
  const userLetter = getUserLetter(row, col)
  const state = props.getSquareState(row, col)
  
  let label = `Square at row ${row + 1}, column ${col + 1}`
  
  if (userLetter) {
    label += `, contains letter ${userLetter}`
  } else {
    label += ', empty'
  }
  
  if (state === 'selected') {
    label += ', selected'
  } else if (state === 'correct') {
    label += ', correct'
  } else if (state === 'incorrect') {
    label += ', incorrect'
  }
  
  return label
}
</script>

<style scoped>
.grid-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  width: 100%;
  overflow-x: auto;
  padding: 0 1rem;
}

.crossword-grid {
  display: grid;
  gap: 2px;
  background-color: var(--border);
  padding: 2px;
  border-radius: 8px;
  box-shadow: var(--shadow);
  width: fit-content;
  max-width: 100%;
}

/* Ensure grid squares scale properly */
.crossword-grid .grid-square {
  width: clamp(32px, 8vw, 50px);
  height: clamp(32px, 8vw, 50px);
}

@media (max-width: 480px) {
  .grid-container {
    padding: 0 0.5rem;
  }
  
  .crossword-grid .grid-square {
    width: clamp(28px, 7vw, 40px);
    height: clamp(28px, 7vw, 40px);
  }
}
</style>
