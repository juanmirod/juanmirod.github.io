const fs = require('fs');
const path = require('path');

const GRID_SIZE = 4;
const LEVELS_DISTRIBUTION = [5, 10, 15, 20, 5];
const MAX_TOTAL_LEVELS = 50;

function getLinkedIndices(index) {
    return (index % 2 === 0) ? [0, 2] : [1, 3];
}

function performShiftRow(grid, r, dir) {
    if (dir === 1) { // Right
        let last = grid[r].pop();
        grid[r].unshift(last);
    } else { // Left
        let first = grid[r].shift();
        grid[r].push(first);
    }
}

function performShiftCol(grid, c, dir) {
    let colData = [];
    for(let r=0; r<GRID_SIZE; r++) colData.push(grid[r][c]);

    if (dir === 1) { // Down
        let last = colData.pop();
        colData.unshift(last);
    } else { // Up
        let first = colData.shift();
        colData.push(first);
    }

    for(let r=0; r<GRID_SIZE; r++) grid[r][c] = colData[r];
}

function generateLevelData(difficulty, levelIndex) {
    // 1. Create a solved state (Target)
    let targetState = [];
    for (let r = 0; r < GRID_SIZE; r++) {
        let row = [];
        for (let c = 0; c < GRID_SIZE; c++) {
            // Pattern bias similar to original game
            if (r > 0 && c > 0 && Math.random() > 0.4) {
                row.push(Math.random() > 0.5 ? row[c-1] : targetState[r-1][c]);
            } else {
                row.push(Math.floor(Math.random() * 4));
            }
        }
        targetState.push(row);
    }

    // 2. Clone to initial state (to be scrambled)
    let gridState = targetState.map(row => [...row]);

    // 3. Scramble
    // Fixed number of scrambles based on difficulty
    const targetScrambles = difficulty;

    let scrambleMoves = 0;
    let lastMoveType = null;
    let lastMoveIndex = null;
    let lastMoveDir = null;

    for (let i = 0; i < targetScrambles; i++) {
        scrambleMoves++;
        let moveType;
        let moveIndex;
        let moveDir;
        let isValidMove = false;

        // Keep generating random moves until we get one that isn't the reverse of the last move
        while (!isValidMove) {
            moveType = Math.random() > 0.5 ? 'row' : 'col';
            moveIndex = Math.floor(Math.random() * GRID_SIZE);
            moveDir = Math.random() > 0.5 ? 1 : -1;

            if (lastMoveType === moveType && lastMoveIndex === moveIndex && lastMoveDir === -moveDir) {
                continue;
            }
            isValidMove = true;
        }

        // Execute the move on gridState
        if (moveType === 'row') {
            let linked = getLinkedIndices(moveIndex);
            linked.forEach(rowIndex => performShiftRow(gridState, rowIndex, moveDir));
        } else {
            let linked = getLinkedIndices(moveIndex);
            linked.forEach(colIndex => performShiftCol(gridState, colIndex, moveDir));
        }

        lastMoveType = moveType;
        lastMoveIndex = moveIndex;
        lastMoveDir = moveDir;
    }

    return {
        id: `d${difficulty}_l${levelIndex}`,
        difficulty: difficulty,
        levelNumber: levelIndex + 1, // 1-5
        targetState: targetState,
        initialState: gridState,
        scrambleCount: targetScrambles
    };
}

const allLevels = [];

let totalGenerated = 0;
for (let d = 1; d <= LEVELS_DISTRIBUTION.length; d++) {
    const levelsInThisDifficulty = LEVELS_DISTRIBUTION[d - 1];
    for (let l = 0; l < levelsInThisDifficulty; l++) {
        if (totalGenerated >= MAX_TOTAL_LEVELS) break;
        allLevels.push(generateLevelData(d, l));
        totalGenerated++;
    }
    if (totalGenerated >= MAX_TOTAL_LEVELS) break;
}

const jsonContent = JSON.stringify(allLevels, null, 2);
fs.writeFileSync(path.join(__dirname, 'levels.json'), jsonContent);
console.log(`Generated ${allLevels.length} levels into ${path.join(__dirname, 'levels.json')}`);

