import { ref, computed, watch } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'
import { useCrosswordGenerator } from './useCrosswordGenerator.js'
import { getRandomWords } from '../data/wordPool.js'

export function useGameState() {
  const {
    words,
    grid,
    gridSize,
    wordPlacements,
    generateCrossword,
    restoreCrossword
  } = useCrosswordGenerator()

  // Game state
  const userInput = ref({}) // { "row-col": "letter" }
  const completedWords = ref([])
  const selectedSquare = ref(null) // { row, col }
  const gameStartTime = ref(null)
  const isCompleted = ref(false)
  const showKeyboard = ref(false)

  // Persistent storage
  const savedGame = useLocalStorage('crosswordGame', null)

  // Initialize or load game
  function initializeGame() {
    if (savedGame.value && !isCompleted.value) {
      // Load saved game
      loadGame(savedGame.value)
    } else {
      // Start new game
      startNewGame()
    }
  }

  function startNewGame() {
    const wordList = getRandomWords(5)
    const success = generateCrossword(wordList)
    
    if (success) {
      userInput.value = {}
      completedWords.value = []
      selectedSquare.value = null
      gameStartTime.value = Date.now()
      isCompleted.value = false
      showKeyboard.value = false
      
      // Save initial game state
      saveGame()
    }
  }

  function loadGame(gameData) {
    // Check if we have saved wordPlacements (new format)
    if (gameData.words && gameData.wordPlacements && gameData.grid) {
      // Load the exact crossword state without regenerating
      const savedGridSize = gameData.gridSize || { rows: gameData.grid.length, cols: gameData.grid[0].length }
      restoreCrossword(gameData.words, gameData.grid, savedGridSize, gameData.wordPlacements)
      
      userInput.value = gameData.userInput || {}
      completedWords.value = gameData.completedWords || []
      gameStartTime.value = gameData.gameStartTime || Date.now()
      isCompleted.value = gameData.isCompleted || false
      selectedSquare.value = null
      showKeyboard.value = false
    } else if (gameData.words) {
      // Fallback for old saved games without placement data
      if (generateCrossword(gameData.words)) {
        userInput.value = gameData.userInput || {}
        completedWords.value = gameData.completedWords || []
        gameStartTime.value = gameData.gameStartTime || Date.now()
        isCompleted.value = gameData.isCompleted || false
        selectedSquare.value = null
        showKeyboard.value = false
      }
    }
  }

  function saveGame() {
    savedGame.value = {
      words: words.value,
      wordPlacements: wordPlacements.value,
      grid: grid.value,
      gridSize: gridSize.value,
      userInput: userInput.value,
      completedWords: completedWords.value,
      gameStartTime: gameStartTime.value,
      isCompleted: isCompleted.value
    }
  }

  // Game logic
  function selectSquare(row, col) {
    // Only allow selection of squares that are part of the crossword
    if (grid.value[row] && grid.value[row][col] !== '') {
      selectedSquare.value = { row, col }
      showKeyboard.value = true
    }
  }

  function deselectSquare() {
    selectedSquare.value = null
    showKeyboard.value = false
  }

  function inputLetter(letter) {
    if (!selectedSquare.value) return
    
    const { row, col } = selectedSquare.value
    const key = `${row}-${col}`
    
    userInput.value[key] = letter.toLowerCase()
    
    // Check for word completion after input
    checkWordCompletion()
    
    // Auto-deselect after input
    deselectSquare()
    
    // Save game state
    saveGame()
  }

  function clearSquare() {
    if (!selectedSquare.value) return
    
    const { row, col } = selectedSquare.value
    const key = `${row}-${col}`
    
    delete userInput.value[key]
    
    // Remove from completed words if this affects completion
    checkWordCompletion()
    
    // Save game state
    saveGame()
  }

  function checkWordCompletion() {
    const newCompletedWords = []
    
    wordPlacements.value.forEach(placement => {
      const { word, row, col, direction } = placement
      let isComplete = true
      
      for (let i = 0; i < word.length; i++) {
        const currentRow = direction === 'horizontal' ? row : row + i
        const currentCol = direction === 'horizontal' ? col + i : col
        const key = `${currentRow}-${currentCol}`
        const userLetter = userInput.value[key]
        const correctLetter = word[i].toLowerCase()
        
        if (userLetter !== correctLetter) {
          isComplete = false
          break
        }
      }
      
      if (isComplete) {
        newCompletedWords.push(word)
      }
    })
    
    completedWords.value = newCompletedWords
    
    // Check if game is completed
    if (completedWords.value.length === words.value.length) {
      isCompleted.value = true
      showKeyboard.value = false
      saveGame()
    }
  }

  // Computed properties
  const progress = computed(() => {
    if (words.value.length === 0) return 0
    return Math.round((completedWords.value.length / words.value.length) * 100)
  })

  const getSquareState = computed(() => (row, col) => {
    const key = `${row}-${col}`
    const userLetter = userInput.value[key]
    const correctLetter = grid.value[row]?.[col]
    
    if (!correctLetter || correctLetter === '') return 'empty'
    
    const isSelected = selectedSquare.value?.row === row && selectedSquare.value?.col === col
    if (isSelected) return 'selected'
    
    if (!userLetter) return 'unfilled'
    
    // Check if this square is part of a completed word
    const isPartOfCompletedWord = wordPlacements.value.some(placement => {
      const { word, row: pRow, col: pCol, direction } = placement
      if (!completedWords.value.includes(word)) return false
      
      for (let i = 0; i < word.length; i++) {
        const currentRow = direction === 'horizontal' ? pRow : pRow + i
        const currentCol = direction === 'horizontal' ? pCol + i : pCol
        if (currentRow === row && currentCol === col) return true
      }
      return false
    })
    
    if (isPartOfCompletedWord) return 'correct'
    
    return userLetter === correctLetter ? 'correct' : 'incorrect'
  })

  // Watch for game completion
  watch(isCompleted, (completed) => {
    if (completed) {
      setTimeout(() => {
        // Could trigger celebration animation here
      }, 500)
    }
  })

  return {
    // State
    words,
    grid,
    gridSize,
    wordPlacements,
    userInput,
    completedWords,
    selectedSquare,
    isCompleted,
    showKeyboard,
    progress,
    
    // Computed
    getSquareState,
    
    // Methods
    initializeGame,
    startNewGame,
    selectSquare,
    deselectSquare,
    inputLetter,
    clearSquare,
    saveGame
  }
}
