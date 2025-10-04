/** Pool of words from the Simple English Wikipedia vocabulary */
export const wordCategories = {
  animals: [
    'cat', 'dog', 'bird', 'fish', 'lion', 'bear', 'frog', 'duck', 'cow', 'pig',
    'fox', 'owl', 'bee', 'ant', 'bat', 'rat', 'hen', 'goat', 'deer', 'wolf',
    'tiger', 'horse', 'sheep', 'mouse', 'snake', 'turtle', 'rabbit', 'monkey',
    'elephant', 'giraffe', 'penguin', 'dolphin', 'butterfly',
    'seal', 'hawk', 'eagle', 'zebra', 'whale'
  ],
  colors: [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown',
    'black', 'white', 'gray', 'gold', 'silver', 'violet', 'indigo', 'crimson',
    'tan', 'navy', 'lime', 'teal', 'maroon'
  ],
  food: [
    'apple', 'bread', 'milk', 'cake', 'pizza', 'rice', 'egg', 'fish', 'meat',
    'soup', 'pie', 'jam', 'tea', 'ice', 'corn', 'bean', 'nuts', 'honey',
    'banana', 'orange', 'grape', 'lemon', 'cherry', 'peach', 'cookie', 'butter',
    'cheese', 'yogurt', 'cereal', 'sandwich', 'noodles', 'chicken',
    'bacon', 'pasta', 'salad', 'mango', 'waffle'
  ],
  school: [
    'book', 'pen', 'desk', 'chair', 'paper', 'ruler', 'bag', 'box', 'map',
    'bell', 'door', 'wall', 'board', 'chalk', 'eraser', 'glue', 'pencil',
    'marker', 'crayon', 'folder', 'binder', 'stapler', 'teacher', 'student',
    'library', 'classroom', 'homework', 'reading', 'writing',
    'exam', 'test', 'quiz', 'lesson', 'grade'
  ],
  home: [
    'bed', 'sofa', 'table', 'lamp', 'clock', 'phone', 'tv', 'cup', 'plate',
    'spoon', 'fork', 'knife', 'bowl', 'pot', 'pan', 'oven', 'sink', 'chair',
    'window', 'mirror', 'pillow', 'blanket', 'towel', 'shower', 'bathtub',
    'kitchen', 'bedroom', 'bathroom', 'garage', 'garden',
    'couch', 'shelf', 'drawer', 'carpet', 'curtain'
  ],
  nature: [
    'tree', 'flower', 'grass', 'rock', 'water', 'sun', 'moon', 'star', 'cloud',
    'rain', 'snow', 'wind', 'fire', 'earth', 'sand', 'leaf', 'seed', 'branch',
    'forest', 'river', 'ocean', 'mountain', 'valley', 'desert', 'rainbow',
    'thunder', 'lightning', 'sunrise', 'sunset',
    'pond', 'lake', 'hill', 'stream', 'canyon'
  ],
  sports: [
    'ball', 'game', 'run', 'jump', 'kick', 'goal', 'team', 'win', 'play',
    'swim', 'race', 'bat', 'net', 'pass', 'shot', 'score', 'field', 'court',
    'soccer', 'tennis', 'hockey', 'boxing', 'track', 'coach', 'player', 'medal',
    'champion', 'swimming', 'baseball', 'football', 'skating',
    'golf', 'rugby', 'athlete', 'diving', 'cycling'
  ],
  weather: [
    'hot', 'cold', 'warm', 'cool', 'fog', 'ice', 'hail', 'dew', 'mist', 'gust',
    'storm', 'breeze', 'freeze', 'cloudy', 'sunny', 'windy', 'rainy', 'snowy',
    'tornado', 'cyclone', 'drizzle', 'blizzard', 'thunder', 'forecast',
    'humid', 'frost', 'sleet', 'shower', 'climate'
  ],
  body: [
    'arm', 'leg', 'eye', 'ear', 'nose', 'hand', 'foot', 'head', 'neck', 'back',
    'face', 'hair', 'skin', 'bone', 'knee', 'toe', 'chin', 'lip', 'thumb',
    'chest', 'belly', 'elbow', 'wrist', 'ankle', 'finger', 'shoulder', 'stomach',
    'hip', 'jaw', 'rib', 'brain', 'heart'
  ],
  transport: [
    'car', 'bus', 'van', 'taxi', 'boat', 'ship', 'jet', 'bike', 'tram', 'sled',
    'train', 'plane', 'ferry', 'truck', 'rocket', 'subway', 'scooter', 'wagon',
    'bicycle', 'airplane', 'helicopter', 'motorcycle',
    'yacht', 'canoe', 'kayak', 'buggy', 'trolley'
  ],
  jobs: [
    'chef', 'nurse', 'pilot', 'judge', 'actor', 'baker', 'clerk', 'guard',
    'doctor', 'lawyer', 'farmer', 'teacher', 'driver', 'writer', 'artist',
    'singer', 'dancer', 'waiter', 'painter', 'plumber', 'engineer', 'mechanic',
    'scientist', 'musician', 'builder', 'designer',
    'maid', 'coach', 'barber', 'sailor', 'cashier'
  ]
}

// Function to get random words with varied lengths from different categories
export function getRandomWords(count = 6) {
  const categories = Object.keys(wordCategories)
  const selectedWords = []
  
  // Create length buckets to ensure variety
  const lengthBuckets = {
    short: [], // 3-4 letters
    medium: [], // 5-6 letters  
    long: [] // 7-8 letters
  }
  
  // Categorize all words by length
  categories.forEach(category => {
    wordCategories[category].forEach(word => {
      const length = word.length
      if (length >= 3 && length <= 4) {
        lengthBuckets.short.push(word.toLowerCase())
      } else if (length >= 5 && length <= 6) {
        lengthBuckets.medium.push(word.toLowerCase())
      } else if (length >= 7 && length <= 8) {
        lengthBuckets.long.push(word.toLowerCase())
      }
    })
  })
  
  // Ensure we have a good mix of word lengths
  const targetDistribution = {
    short: Math.floor(count * 0.33), // ~33% short words
    medium: Math.floor(count * 0.5),  // ~50% medium words
    long: Math.ceil(count * 0.17)     // ~17% long words
  }
  
  // Adjust if we don't have enough words in any category
  if (lengthBuckets.long.length === 0) {
    targetDistribution.medium += targetDistribution.long
    targetDistribution.long = 0
  }
  
  // Select words from each bucket
  function selectFromBucket(bucket, targetCount) {
    const shuffled = [...bucket].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(targetCount, shuffled.length))
  }
  
  selectedWords.push(...selectFromBucket(lengthBuckets.short, targetDistribution.short))
  selectedWords.push(...selectFromBucket(lengthBuckets.medium, targetDistribution.medium))
  selectedWords.push(...selectFromBucket(lengthBuckets.long, targetDistribution.long))
  
  // If we still need more words, fill from any available bucket
  while (selectedWords.length < count) {
    const allAvailable = [
      ...lengthBuckets.short,
      ...lengthBuckets.medium,
      ...lengthBuckets.long
    ].filter(word => !selectedWords.includes(word))
    
    if (allAvailable.length === 0) break
    
    const randomWord = allAvailable[Math.floor(Math.random() * allAvailable.length)]
    selectedWords.push(randomWord)
  }
  
  // Shuffle the final selection
  return selectedWords.sort(() => Math.random() - 0.5)
}
