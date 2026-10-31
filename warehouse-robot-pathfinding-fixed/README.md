# Warehouse Robot Pathfinding Simulator

An interactive, software-only warehouse simulation for demonstrating graph traversal and pathfinding algorithms for Advanced Data Structures & Algorithm Analysis.

## Features

- Editable warehouse grid with start, destination, and obstacles
- A* Search, Breadth-First Search (BFS), and Depth-First Search (DFS)
- Custom min-heap priority queue and FIFO queue implementations
- Animated robot path traversal
- FIFO pickup task queue
- Algorithm comparison using explored-node counts and path lengths
- Performance metrics and an explored-nodes chart
- Unit tests for algorithms and data structures

## Requirements

- Node.js 20 or newer recommended
- npm
- VS Code or another code editor

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Verify the project

```bash
npm test
npm run lint
npm run build
```

## How to use

1. Choose an editing mode: obstacles, start, or destination.
2. Click grid cells to edit the warehouse. Start and destination cannot overlap obstacles.
3. Select A*, BFS, or DFS and choose **Run selected**.
4. Use **Animate robot** to watch the route being traversed.
5. Use **Compare algorithms** to run all three algorithms against the same layout.
6. Add pickup tasks with row and column coordinates, then select **Run pickup queue**.

## Algorithms and data structures

- **A* Search:** uses Manhattan distance as its heuristic and a custom min-heap priority queue. With four-directional movement and uniform step costs, Manhattan distance is admissible and consistent.
- **BFS:** finds a shortest path on an unweighted grid.
- **DFS:** explores reachable cells and may return a non-optimal path.
- **Queue:** manages pickup tasks in first-in, first-out order.
- **Graph/grid:** each traversable cell is a vertex connected to its valid orthogonal neighbors.

## Performance-analysis notes

The app displays single-run elapsed time and explored-node counts. Browser timing is noisy, especially on small grids. For a formal report, run multiple trials for each grid size and obstacle density, record averages or medians, and compare algorithms on identical layouts. Do not claim an algorithm is universally fastest from one run. DFS is not guaranteed to find a shortest path.

## Current scope and limitations

- No physical robot, sensors, database, authentication, or backend is required.
- The task queue routes the simulated robot to each pickup location in insertion order; it does not yet model pickup duration, carrying capacity, or a separate final drop-off station.
- Grid dimensions are currently 15 rows by 25 columns in the interface. If you change them, also update the row/column input limits in `TaskManager.jsx`.
- This is an educational simulation, not a certified real-world navigation system.

## Suggested future enhancements

- Configurable grid dimensions and weighted terrain
- Multiple robots and collision avoidance
- Dijkstra's algorithm and diagonal movement options
- Downloadable CSV performance reports
- Automated benchmark runs over many random maps
- Accessibility improvements and additional tests

## License

For academic use, add the license required by your institution or team. If you publish this project publicly and want others to reuse it, consider choosing an open-source license such as MIT after confirming it fits your requirements.
