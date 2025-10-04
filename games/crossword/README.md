# Vue 3 Crossword Puzzle Game

A fun and educational crossword puzzle game designed for children aged 8-11, built with Vue 3 and featuring themed word categories, interactive gameplay, and persistent game state.

## 🎮 Features

### Core Gameplay
- **Dynamic Crossword Generation**: Automatically generates crosswords with 6 words from themed categories
- **Interactive Grid**: Click or tap squares to select and input letters
- **On-Screen Keyboard**: Mobile-friendly keyboard for letter input
- **Word Validation**: Real-time feedback on correct/incorrect letters
- **Progress Tracking**: Visual progress bar and completion status

### Themed Word Categories
- 🐾 **Animals**: cat, dog, bird, fish, lion, bear, etc.
- 🌈 **Colors**: red, blue, green, yellow, purple, etc.
- 🍎 **Food**: apple, bread, milk, cake, pizza, etc.
- 📚 **School**: book, pen, desk, chair, paper, etc.
- 🏠 **Home**: bed, sofa, table, lamp, clock, etc.
- 🌳 **Nature**: tree, flower, grass, rock, water, etc.

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Keyboard navigation, ARIA labels, high contrast support
- **Visual Feedback**: Animations for correct answers and game completion
- **Persistent State**: Game progress saved automatically using localStorage
- **Celebration Modal**: Congratulatory message with completion time

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd crossword3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the URL shown in your terminal)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 How to Play

1. **Start the Game**: A new crossword puzzle is automatically generated when you load the page
2. **Select a Square**: Click or tap on any square that's part of the crossword (highlighted squares)
3. **Input Letters**: Use the on-screen keyboard or your physical keyboard to enter letters
4. **Find Words**: Complete words will be highlighted in green and marked as found
5. **Win the Game**: Find all words to complete the puzzle and see your completion time
6. **Play Again**: Click "New Game" to generate a fresh puzzle

## 🏗️ Technical Architecture

### Built With
- **Vue 3**: Modern JavaScript framework with Composition API
- **Vite**: Fast build tool and development server
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **localStorage**: Browser storage for game persistence

### Project Structure
```
src/
├── App.vue                 # Main application component
├── components/
│   ├── GameGrid.vue       # Interactive crossword grid
│   ├── WordList.vue       # List of words to find
│   ├── OnScreenKeyboard.vue # Mobile-friendly keyboard
│   ├── GameStatus.vue     # Progress and game controls
│   └── CelebrationModal.vue # Completion celebration
├── composables/
│   ├── useGameState.js    # Game state management
│   ├── useCrosswordGenerator.js # Crossword generation logic
│   └── useLocalStorage.js # Persistent storage
├── data/
│   └── wordPool.js        # Themed word categories
└── assets/styles/
    └── main.css          # Global styles and design system
```

### Key Features Implementation

#### Crossword Generation Algorithm
- Places first word horizontally in center
- Finds intersection points between words
- Alternates horizontal/vertical placement
- Ensures no overlapping except at intersections
- Trims grid to optimal size

#### Game State Management
- Reactive Vue 3 state with Composition API
- Automatic localStorage persistence
- Real-time word completion detection
- Progress tracking and validation

#### Responsive Design
- Mobile-first CSS approach
- Touch-friendly button sizes (minimum 44px)
- Flexible grid scaling for different screen sizes
- Accessible color contrast ratios

## 🎨 Design System

### Color Palette
- **Primary**: #2563eb (Blue)
- **Success**: #059669 (Green)
- **Error**: #dc2626 (Red)
- **Background**: #f8fafc (Light Gray)
- **Text**: #1e293b (Dark Gray)

### Typography
- **Font**: System fonts for optimal performance
- **Grid Letters**: 1.25rem (mobile), 1.5rem (desktop)
- **Minimum Text Size**: 16px for accessibility

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactions
- **ARIA Labels**: Screen reader friendly descriptions
- **High Contrast**: Support for high contrast mode
- **Touch Targets**: Minimum 44px touch targets for mobile
- **Reduced Motion**: Respects user's motion preferences

## 🔧 Customization

### Adding New Word Categories
Edit `src/data/wordPool.js` to add new themed categories:

```javascript
export const wordCategories = {
  // ... existing categories
  sports: ['ball', 'game', 'run', 'jump', 'swim'],
  // Add your category here
}
```

### Adjusting Difficulty
Modify the word selection in `src/data/wordPool.js`:

```javascript
// Change word count (default: 6)
export function getRandomWords(count = 8) {
  // ... existing logic
}
```

### Styling Customization
Update CSS custom properties in `src/assets/styles/main.css`:

```css
:root {
  --primary: #your-color;
  --success: #your-color;
  /* ... other variables */
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Game doesn't load**: Check browser console for errors, ensure JavaScript is enabled
2. **Words don't intersect properly**: The algorithm tries multiple placement strategies
3. **Touch not working on mobile**: Ensure viewport meta tag is present in index.html
4. **Saved game not loading**: Check if localStorage is available and not full

### Browser Support
- Chrome/Edge: 88+
- Firefox: 85+
- Safari: 14+
- Mobile browsers: iOS Safari 14+, Chrome Mobile 88+

## 📱 Mobile Optimization

- Touch-friendly interface with large tap targets
- On-screen keyboard for letter input
- Responsive grid that scales to screen size
- Optimized for portrait and landscape orientations
- Fast loading with minimal JavaScript bundle

## 🎓 Educational Value

Perfect for children aged 8-11 to:
- Improve spelling and vocabulary
- Develop problem-solving skills
- Practice letter recognition
- Learn themed word categories
- Build concentration and patience

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the game!

---

**Enjoy playing the crossword puzzle game! 🧩✨**
