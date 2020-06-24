# Minesweeper

You can watch an expample using Angular on this [link](https://ecarlosqm.github.io/minesweeper/)

Basic usage.
```typescript
import { Minesweeper, Coordinates } from 'minesweeper';

const minesweeper = new Minesweeper();

// The minimum size is 9
minesweeper.newBoard(15);

minesweeper.uncover(new Coordinates(1,1));
```

Draw board.
```typescript
const cells:Cell[] = minesweeper.board;

cells.forEach((cell,index,cells)=>{
    functionTodrawACell(cell);
});
```

Subscribe to events.
```typescript
//If you use 'this' inside callback make sure you use callback = callback.bind(this)
const uncoverMineCallback = (coordinatesOfMine:Coordinates)=>{
    console.log(coordinatesOfMine.toString())
}

const cancelSubcription = minesweeper.onUncoverMine(uncoverMineCallback);

cancelSubcription();
```
