# Minesweeper

You can watch an expample using Angular on this [link](https://ecarlosqm.github.io/minesweeper/)

Basic usage.
```typescript
import { MinesWeeper, Coordinates } from 'minesweeper';

const minesWeeper = new MinesWeeper();

// The minimum size is 9
minesWeeper.newBoard(15);

minesWeeper.uncover(new Coordinates(1,1));
```

Draw board.
```typescript
const cells:Cell[] = minesWeeper.board();

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

const cancelSubcription = minesWeeper.onUncoverMine(uncoverMineCallback);

cancelSubcription();
```
