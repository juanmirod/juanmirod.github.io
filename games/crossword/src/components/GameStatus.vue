<template>
  <div class="game-status">
    <!-- User Profile Section -->
    <div class="user-section">
      <h3 class="section-title">Player</h3>
      
      <!-- Show input if no user is set or if selecting user -->
      <div v-if="!hasCurrentUser || showUserSelector" class="user-input-section">
        <!-- Show existing users if any -->
        <div v-if="allUsernames.length > 0 && showUserSelector" class="user-list">
          <button
            v-for="username in allUsernames"
            :key="username"
            class="user-option"
            @click="selectExistingUser(username)"
          >
            <span class="option-name">{{ username }}</span>
            <span class="option-games">⭐ {{ profiles[username] }}</span>
          </button>
          <div class="divider">or</div>
        </div>
        
        <!-- Input for new user -->
        <div class="name-input-container">
          <input
            v-model="newUsername"
            type="text"
            placeholder="Enter your name"
            class="name-input"
            maxlength="30"
            @keyup.enter="saveUsername"
          />
          <button 
            class="btn btn-small"
            @click="saveUsername"
            :disabled="!newUsername.trim()"
          >
            {{ allUsernames.length > 0 ? 'Add' : 'Start' }}
          </button>
        </div>
        
        <button 
          v-if="showUserSelector"
          class="btn-link"
          @click="cancelUserSelection"
        >
          Cancel
        </button>
      </div>
      
      <!-- Show current user profile -->
      <div v-else-if="currentProfile" class="user-display">
        <button 
          class="user-button"
          @click="openUserSelector"
          :title="'Click to switch user'"
        >
          <span class="user-name">{{ currentProfile.username }}</span>
          <span class="user-games">
            ⭐ {{ currentProfile.gamesCompleted }} 
            {{ currentProfile.gamesCompleted === 1 ? 'game' : 'games' }} completed
          </span>
        </button>
      </div>
    </div>

    <div class="progress-container">
      <div class="progress-header">
        <h3>Progress</h3>
        <span class="progress-text">{{ progress }}% Complete</span>
      </div>
      <div class="progress-bar">
        <div 
          class="progress-fill"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
    
    <div class="game-actions">
      <button 
        class="btn"
        @click="$emit('newGame')"
        :disabled="!canStartNewGame"
      >
        New Game
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserProfile } from '../composables/useUserProfile.js'

const props = defineProps({
  progress: {
    type: Number,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})

defineEmits(['newGame'])

// User profile management
const { currentProfile, allUsernames, setUser, switchUser, profiles, hasCurrentUser} = useUserProfile()
const showUserSelector = ref(false)
const newUsername = ref('')

const selectExistingUser = (username) => {
  switchUser(username)
  showUserSelector.value = false
  newUsername.value = ''
}

const saveUsername = () => {
  const trimmed = newUsername.value.trim()
  if (trimmed) {
    setUser(trimmed)
    showUserSelector.value = false
    newUsername.value = ''
  }
}

const openUserSelector = () => {
  showUserSelector.value = true
  newUsername.value = ''
}

const cancelUserSelection = () => {
  showUserSelector.value = false
  newUsername.value = ''
}

const canStartNewGame = computed(() => {
  return  true; // props.isCompleted || props.progress > 0
})
</script>

<style scoped>
.game-status {
  background-color: var(--surface);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  margin-bottom: 1rem;
}

/* User Section Styles */
.user-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-light);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 0.75rem 0;
}

.user-input-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.user-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: var(--background);
  border: 2px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.user-option:hover {
  background-color: var(--surface);
  border-color: var(--primary);
  transform: translateX(4px);
}

.option-name {
  font-weight: 600;
  color: var(--text);
}

.option-games {
  font-size: 0.875rem;
  color: var(--text-light);
}

.divider {
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-light);
  margin: 0.25rem 0;
}

.name-input-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.name-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--border);
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: var(--background);
  color: var(--text);
  transition: border-color 0.2s;
}

.name-input:focus {
  outline: none;
  border-color: var(--primary);
}

.btn-small {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  white-space: nowrap;
}

.btn-link {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0;
  text-decoration: underline;
  transition: color 0.2s;
}

.btn-link:hover {
  color: var(--text);
}

.user-display {
  display: flex;
  flex-direction: column;
}

.user-button {
  width: 100%;
  background-color: var(--background);
  border: 2px solid var(--border);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
}

.user-button:hover {
  background-color: var(--surface);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.user-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
}

.user-games {
  font-size: 0.875rem;
  color: var(--text-light);
  font-weight: 500;
}

.progress-container {
  margin-bottom: 1.5rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

.progress-text {
  font-size: 0.875rem;
  color: var(--text-light);
  font-weight: 500;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background-color: var(--border-light);
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--success));
  border-radius: 6px;
  transition: width 0.5s ease;
}

.game-actions {
  display: flex;
  justify-content: center;
}

.btn:disabled {
  background-color: var(--border);
  color: var(--text-light);
  cursor: not-allowed;
  transform: none;
}

.btn:disabled:hover {
  background-color: var(--border);
  transform: none;
}
</style>
