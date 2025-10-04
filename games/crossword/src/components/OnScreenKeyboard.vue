<template>
  <div :class="['keyboard-overlay', { show: showKeyboard }]">
    <div class="keyboard-header">
      <span class="keyboard-title">Select a Letter</span>
      <button 
        class="keyboard-close"
        @click="$emit('close')"
        aria-label="Close keyboard"
      >
        ×
      </button>
    </div>
    
    <div class="keyboard-grid">
      <button
        v-for="letter in letters"
        :key="letter"
        class="keyboard-key"
        @click="$emit('inputLetter', letter)"
        :aria-label="`Letter ${letter}`"
      >
        {{ letter }}
      </button>
    </div>
    
    <div class="keyboard-actions">
      <button 
        class="keyboard-action clear"
        @click="$emit('clear')"
        aria-label="Clear current square"
      >
        Clear
      </button>
      <button 
        class="keyboard-action"
        @click="$emit('close')"
        aria-label="Close keyboard"
      >
        Done
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showKeyboard: {
    type: Boolean,
    default: false
  }
})

defineEmits(['inputLetter', 'clear', 'close'])

const letters = [
  'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z'
]
</script>

<style scoped>
.keyboard-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--surface);
  border-top: 1px solid var(--border);
  padding: 1rem;
  box-shadow: var(--shadow-lg);
  z-index: 100;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.keyboard-overlay.show {
  transform: translateY(0);
}

.keyboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.keyboard-title {
  font-weight: 600;
  color: var(--text);
}

.keyboard-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  min-height: 44px;
  min-width: 44px;
}

.keyboard-close:hover {
  background-color: var(--border-light);
}

.keyboard-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  max-width: 400px;
  margin: 0 auto;
}

@media (max-width: 480px) {
  .keyboard-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.keyboard-key {
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  text-transform: uppercase;
}

.keyboard-key:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
}

.keyboard-key:active {
  transform: translateY(0);
}

.keyboard-key:focus {
  outline: 2px solid white;
  outline-offset: 2px;
}

.keyboard-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 1rem;
}

.keyboard-action {
  background-color: var(--text-light);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
}

.keyboard-action:hover {
  background-color: var(--text);
}

.keyboard-action.clear {
  background-color: var(--error);
}

.keyboard-action.clear:hover {
  background-color: #b91c1c;
}
</style>
