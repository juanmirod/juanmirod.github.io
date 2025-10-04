<template>
  <Teleport to="body">
    <div v-if="show" class="completion-modal" @click="handleBackdropClick">
      <div class="completion-content" @click.stop>
        <div class="celebration-icon">🎉</div>
        <h2 class="completion-title">Congratulations!</h2>
        <p class="completion-message">
          You found all {{ wordCount }} words! Great job!
        </p>
        <div class="completion-stats" v-if="gameTime">
          <p>Time: {{ formatTime(gameTime) }}</p>
        </div>

        <!-- User Profile Section -->
        <div class="user-profile-section">
          <!-- Show input if no user is set or if changing name -->
          <div v-if="!hasCurrentUser || showNameInput" class="name-input-container">
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
              Save
            </button>
          </div>
          
          <!-- Show user profile if user exists and not changing name -->
          <div v-else-if="currentProfile" class="user-profile-display">
            <button 
              class="user-profile-button"
              @click="startChangingName"
            >
              <span class="username">{{ currentProfile.username }}</span>
              <span class="games-count">
                ⭐ {{ currentProfile.gamesCompleted }} 
                {{ currentProfile.gamesCompleted === 1 ? 'game' : 'games' }}
              </span>
            </button>
            <p class="change-hint">Click to change user</p>
          </div>
        </div>

        <div class="completion-actions">
          <button 
            class="btn success"
            @click="$emit('newGame')"
          >
            Play Again
          </button>
          <button 
            class="btn"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useUserProfile } from '../composables/useUserProfile.js'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  wordCount: {
    type: Number,
    default: 0
  },
  gameStartTime: {
    type: Number,
    default: null
  }
})

defineEmits(['newGame', 'close'])

// User profile management
const {hasCurrentUser, currentUsername, incrementGamesCompleted, setUser, currentProfile} = useUserProfile()
const showNameInput = ref(false)
const newUsername = ref('')
const gameCountedForUser = ref(null)

// Watch for modal showing and increment games completed once per game
watch(() => props.show, (isShowing) => {
  if (isShowing && hasCurrentUser.value) {
    // Only count this game once
    const currentUser = currentUsername.value
    if (gameCountedForUser.value !== currentUser) {
      incrementGamesCompleted()
      gameCountedForUser.value = currentUser
    }
  }
  // Reset input state when modal opens
  showNameInput.value = false
  newUsername.value = ''
})

const saveUsername = () => {
  const trimmed = newUsername.value.trim()
  if (trimmed) {
    const success = setUser(trimmed)
    if (success) {
      // Increment for the just-completed game
      incrementGamesCompleted()
      gameCountedForUser.value = trimmed
      showNameInput.value = false
      newUsername.value = ''
    }
  }
}

const startChangingName = () => {
  showNameInput.value = true
  newUsername.value = ''
}

const gameTime = computed(() => {
  if (!props.gameStartTime) return null
  return Date.now() - props.gameStartTime
})

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }
  return `${remainingSeconds}s`
}

function handleBackdropClick() {
  // Close modal when clicking backdrop
  // You might want to make this optional
}
</script>

<style scoped>
.completion-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.completion-content {
  background-color: var(--surface);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: var(--shadow-lg);
  animation: modalAppear 0.5s ease-out;
}

.celebration-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 1s ease-in-out infinite alternate;
}

.completion-title {
  font-size: 2rem;
  color: var(--success);
  margin-bottom: 1rem;
  font-weight: 700;
}

.completion-message {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  color: var(--text);
  line-height: 1.6;
}

.completion-stats {
  background-color: var(--background);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.completion-stats p {
  margin: 0;
  font-weight: 600;
  color: var(--text-light);
}

/* User Profile Section */
.user-profile-section {
  background-color: var(--background);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
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
  font-size: 1rem;
  background-color: var(--surface);
  color: var(--text);
  transition: border-color 0.2s;
}

.name-input:focus {
  outline: none;
  border-color: var(--primary);
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.user-profile-display {
  text-align: center;
}

.user-profile-button {
  width: 100%;
  background-color: var(--surface);
  border: 2px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-profile-button:hover {
  background-color: var(--background);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.username {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
}

.games-count {
  font-size: 0.875rem;
  color: var(--text-light);
  font-weight: 500;
}

.change-hint {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-light);
  opacity: 0.7;
}

.completion-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.completion-actions .btn {
  flex: 1;
  min-width: 120px;
}

@keyframes modalAppear {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

@media (max-width: 480px) {
  .completion-content {
    padding: 1.5rem;
  }
  
  .completion-title {
    font-size: 1.5rem;
  }
  
  .celebration-icon {
    font-size: 3rem;
  }
  
  .completion-actions {
    flex-direction: column;
  }
  
  .completion-actions .btn {
    flex: none;
  }
}
</style>
