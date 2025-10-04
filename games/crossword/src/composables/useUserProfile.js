import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'crossword_user_profiles'
const LAST_USER_KEY = 'crossword_last_user'

export function useUserProfile() {
  // Load profiles from localStorage
  const loadProfiles = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading user profiles:', error)
      return {}
    }
  }

  // Load last used username
  const loadLastUser = () => {
    try {
      return localStorage.getItem(LAST_USER_KEY) || null
    } catch (error) {
      console.error('Error loading last user:', error)
      return null
    }
  }

  // Reactive state
  const profiles = ref(loadProfiles())
  const currentUsername = ref(loadLastUser())

  // Computed properties
  const currentProfile = computed(() => {
    if (!currentUsername.value || profiles.value[currentUsername.value] === undefined) {
      return null
    }
    return {
      username: currentUsername.value,
      gamesCompleted: profiles.value[currentUsername.value]
    }
  })

  const hasCurrentUser = computed(() => {
    return currentUsername.value !== null && currentUsername.value !== ''
  })

  const allUsernames = computed(() => {
    return Object.keys(profiles.value).sort()
  })

  // Save profiles to localStorage whenever they change
  watch(profiles, (newProfiles) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfiles))
    } catch (error) {
      console.error('Error saving user profiles:', error)
    }
  }, { deep: true })

  // Save current username whenever it changes
  watch(currentUsername, (newUsername) => {
    try {
      if (newUsername) {
        localStorage.setItem(LAST_USER_KEY, newUsername)
      } else {
        localStorage.removeItem(LAST_USER_KEY)
      }
    } catch (error) {
      console.error('Error saving last user:', error)
    }
  })

  // Methods
  const setUser = (username) => {
    if (!username || typeof username !== 'string') {
      return false
    }
    
    const trimmedUsername = username.trim()
    if (trimmedUsername.length === 0) {
      return false
    }

    // Initialize profile if it doesn't exist
    if (!profiles.value[trimmedUsername]) {
      profiles.value[trimmedUsername] = 0
    }

    currentUsername.value = trimmedUsername
    return true
  }

  const incrementGamesCompleted = () => {
    if (!currentUsername.value) {
      return false
    }

    if (!profiles.value[currentUsername.value]) {
      profiles.value[currentUsername.value] = 0
    }

    profiles.value[currentUsername.value]++
    return true
  }

  const switchUser = (username) => {
    if (profiles.value[username] !== undefined) {
      currentUsername.value = username
      return true
    }
    return false
  }

  const clearCurrentUser = () => {
    currentUsername.value = null
  }

  const deleteUser = (username) => {
    if (profiles.value[username] !== undefined) {
      delete profiles.value[username]
      if (currentUsername.value === username) {
        currentUsername.value = null
      }
      return true
    }
    return false
  }

  return {
    // State
    profiles,
    currentUsername,
    
    // Computed
    currentProfile,
    hasCurrentUser,
    allUsernames,
    
    // Methods
    setUser,
    incrementGamesCompleted,
    switchUser,
    clearCurrentUser,
    deleteUser
  }
}

