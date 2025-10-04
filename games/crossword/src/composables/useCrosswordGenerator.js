import { ref, computed } from 'vue'

export function useCrosswordGenerator() {
  const words = ref([])
  const grid = ref([])
  const gridSize = ref({ rows: 0, cols: 0 })
  const wordPlacements = ref([])

  // Find intersection points between two words
  function findIntersections(word1, word2) {
    const intersections = []
    for (let i = 0; i < word1.length; i++) {
      for (let j = 0; j < word2.length; j++) {
        if (word1[i].toLowerCase() === word2[j].toLowerCase()) {
          intersections.push({ word1Index: i, word2Index: j })
        }
      }
    }
    return intersections
  }

  // Check if a word can be placed at a specific position
  function canPlaceWord(word, row, col, direction, currentGrid) {
    const wordLength = word.length
    
    if (direction === 'horizontal') {
      if (col + wordLength > currentGrid[0].length) return false
      
      for (let i = 0; i < wordLength; i++) {
        const cell = currentGrid[row][col + i]
        if (cell !== '' && cell !== word[i]) return false
      }
    } else {
      if (row + wordLength > currentGrid.length) return false
      
      for (let i = 0; i < wordLength; i++) {
        const cell = currentGrid[row + i][col]
        if (cell !== '' && cell !== word[i]) return false
      }
    }
    
    return true
  }

  // Place a word on the grid
  function placeWord(word, row, col, direction, currentGrid) {
    const placement = {
      word,
      row,
      col,
      direction,
      length: word.length
    }

    for (let i = 0; i < word.length; i++) {
      if (direction === 'horizontal') {
        currentGrid[row][col + i] = word[i]
      } else {
        currentGrid[row + i][col] = word[i]
      }
    }

    return placement
  }

  // Generate crossword grid
  function generateCrossword(wordList) {
    if (!wordList || wordList.length === 0) return false

    words.value = [...wordList]
    
    // Start with a reasonable grid size
    const maxWordLength = Math.max(...wordList.map(w => w.length))
    const gridRows = Math.max(12, maxWordLength + 4)
    const gridCols = 12
    
    // Initialize empty grid
    const currentGrid = Array(gridRows).fill().map(() => Array(gridCols).fill(''))
    const placements = []
    
    // Place first word horizontally in the center
    const firstWord = wordList[0]
    const startRow = Math.floor(gridRows / 2)
    const startCol = Math.floor((gridCols - firstWord.length) / 2)
    
    const firstPlacement = placeWord(firstWord, startRow, startCol, 'horizontal', currentGrid)
    placements.push(firstPlacement)
    
    // Try to place remaining words
    for (let wordIndex = 1; wordIndex < wordList.length; wordIndex++) {
      const currentWord = wordList[wordIndex]
      let placed = false
      
      // Try to intersect with each already placed word
      for (const placement of placements) {
        if (placed) break
        
        const intersections = findIntersections(placement.word, currentWord)
        
        for (const intersection of intersections) {
          if (placed) break
          
          let newRow, newCol, newDirection
          
          if (placement.direction === 'horizontal') {
            // Place current word vertically
            newDirection = 'vertical'
            newCol = placement.col + intersection.word1Index
            newRow = placement.row - intersection.word2Index
          } else {
            // Place current word horizontally
            newDirection = 'horizontal'
            newRow = placement.row + intersection.word1Index
            newCol = placement.col - intersection.word2Index
          }
          
          // Check bounds
          if (newRow >= 0 && newCol >= 0 && 
              newRow < gridRows && newCol < gridCols &&
              canPlaceWord(currentWord, newRow, newCol, newDirection, currentGrid)) {
            
            const newPlacement = placeWord(currentWord, newRow, newCol, newDirection, currentGrid)
            placements.push(newPlacement)
            placed = true
          }
        }
      }
      
      // If we couldn't place the word, try random positions (fallback)
      if (!placed) {
        for (let attempts = 0; attempts < 50 && !placed; attempts++) {
          const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical'
          const maxRow = direction === 'horizontal' ? gridRows - 1 : gridRows - currentWord.length
          const maxCol = direction === 'vertical' ? gridCols - 1 : gridCols - currentWord.length
          
          if (maxRow >= 0 && maxCol >= 0) {
            const randomRow = Math.floor(Math.random() * (maxRow + 1))
            const randomCol = Math.floor(Math.random() * (maxCol + 1))
            
            if (canPlaceWord(currentWord, randomRow, randomCol, direction, currentGrid)) {
              const newPlacement = placeWord(currentWord, randomRow, randomCol, direction, currentGrid)
              placements.push(newPlacement)
              placed = true
            }
          }
        }
      }
    }
    
    // Trim the grid to remove empty rows/columns
    // const { trimmedGrid, offset } = trimGrid(currentGrid)
    
    // // Adjust placements for trimmed grid
    // const adjustedPlacements = placements.map(p => ({
    //   ...p,
    //   row: p.row - offset.row,
    //   col: p.col - offset.col
    // }))
    
    grid.value = currentGrid
    gridSize.value = { rows: currentGrid.length, cols: currentGrid[0].length }
    wordPlacements.value = placements
    
    return true
  }

  // Trim empty rows and columns from grid
  function trimGrid(currentGrid) {
    let minRow = currentGrid.length, maxRow = -1
    let minCol = currentGrid[0].length, maxCol = -1
    
    // Find bounds of non-empty cells
    for (let row = 0; row < currentGrid.length; row++) {
      for (let col = 0; col < currentGrid[row].length; col++) {
        if (currentGrid[row][col] !== '') {
          minRow = Math.min(minRow, row)
          maxRow = Math.max(maxRow, row)
          minCol = Math.min(minCol, col)
          maxCol = Math.max(maxCol, col)
        }
      }
    }
    
    // Add padding
    minRow = Math.max(0, minRow - 1)
    maxRow = Math.min(currentGrid.length - 1, maxRow + 1)
    minCol = Math.max(0, minCol - 1)
    maxCol = Math.min(currentGrid[0].length - 1, maxCol + 1)
    
    // Create trimmed grid
    const trimmedGrid = []
    for (let row = minRow; row <= maxRow; row++) {
      const newRow = []
      for (let col = minCol; col <= maxCol; col++) {
        newRow.push(currentGrid[row][col])
      }
      trimmedGrid.push(newRow)
    }
    
    return {
      trimmedGrid,
      offset: { row: minRow, col: minCol }
    }
  }

  // Restore crossword state from saved data
  function restoreCrossword(savedWords, savedGrid, savedGridSize, savedWordPlacements) {
    words.value = savedWords
    grid.value = savedGrid
    gridSize.value = savedGridSize
    wordPlacements.value = savedWordPlacements
  }

  return {
    words: computed(() => words.value),
    grid: computed(() => grid.value),
    gridSize: computed(() => gridSize.value),
    wordPlacements: computed(() => wordPlacements.value),
    generateCrossword,
    restoreCrossword
  }
}
