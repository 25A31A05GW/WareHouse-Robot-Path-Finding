## Warehouse Robot Pathfinding Simulator — Technical Documentation

## 1. Introduction

The Warehouse Robot Pathfinding Simulator is an interactive web application designed to demonstrate pathfinding algorithms and data structures through a simulated warehouse environment.

The application represents a warehouse as a two-dimensional grid. A robot navigates between cells while avoiding obstacles. Users can experiment with multiple search algorithms, observe calculated routes, animate robot movement, and manage pickup tasks using a queue.

The project is developed using React, Vite, JavaScript, and CSS.

## 2. Objectives

The primary objectives of the project are:

- Demonstrate fundamental pathfinding algorithms.
- Visualize graph-search behavior in an interactive environment.
- Show how obstacles affect route planning.
- Compare the results of different algorithms.
- Demonstrate the FIFO principle through task management.
- Apply queues and priority queues in an algorithmic application.
- Provide an accessible learning environment for data structures and algorithms.

## 3. System Scope

3.1 Included Features

- Interactive warehouse grid.
- Configurable start and destination cells.
- Obstacle placement and removal.
- A* pathfinding.
- Breadth-First Search.
- Depth-First Search.
- Algorithm comparison.
- Route and explored-cell visualization.
- Animated robot movement.
- Pickup task management.
- FIFO pickup queue.
- Random obstacle generation.
- Path and layout reset controls.
- Algorithm result metrics.
- Static website deployment.

3.2 Limitations

The application simulates robot navigation in a browser. It does not directly control physical robots, communicate with warehouse hardware, retrieve live sensor information, or integrate with an inventory management system.

## 4. Technology Stack
```
Technology| Purpose

React| Builds the user interface and manages component state

Vite| Provides the development server and production build

JavaScript| Implements algorithms and application logic

JSX| Defines React component interfaces

CSS| Controls visual styling and responsive layout

A*| Performs heuristic-guided pathfinding

BFS| Performs level-by-level graph traversal

DFS| Performs depth-first graph traversal

Queue| Supports FIFO processing

Priority Queue| Supports priority-based node selection

Vercel| Hosts the production web application
```
## 5. System Architecture

The application is organized into algorithm modules, reusable interface components, utility functions, and data structures.

5.1 Application Layer

"src/App.jsx" coordinates the application state and connects the interface to the pathfinding algorithms. It manages grid editing, algorithm execution, result updates, robot animation, status messages, and pickup task processing.

5.2 Algorithm Layer

The algorithm modules calculate routes and search results for the current grid.
```
- "src/algorithms/astar.js"
- "src/algorithms/bfs.js"
- "src/algorithms/dfs.js"
```
5.3 Component Layer

The components present the warehouse, controls, metrics, and task manager.

- "WarehouseGrid.jsx": renders the warehouse grid and handles cell interactions.
- "ControlPanel.jsx": provides algorithm selection and simulation controls.
- "MetricsPanel.jsx": displays algorithm results and comparison information.
- "TaskManager.jsx": provides the pickup-task form and task list.

5.4 Data Structure Layer

- "Queue.js": provides queue operations.
- "PriorityQueue.js": provides priority-based item selection.

5.5 Utility Layer

"src/utils/gridUtils.js" provides grid-related operations, including grid creation, random obstacle generation, and cell comparison.

## 6. Directory Structure
```
warehouse-robot-pathfinding/
├── public/
│   └── robot.svg
├── src/
│   ├── algorithms/
│   │   ├── astar.js
│   │   ├── bfs.js
│   │   └── dfs.js
│   ├── components/
│   │   ├── ControlPanel.jsx
│   │   ├── MetricsPanel.jsx
│   │   ├── TaskManager.jsx
│   │   └── WarehouseGrid.jsx
│   ├── data-structures/
│   │   ├── PriorityQueue.js
│   │   └── Queue.js
│   ├── utils/
│   │   └── gridUtils.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tests/
│   ├── pathfinding.test.js
│   └── setup.js
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── documentation.md
```
## 7. Warehouse Grid Model

The warehouse is represented by a two-dimensional grid. Each cell represents a possible robot position and may be blocked by an obstacle.

The grid provides the environment in which the algorithms search for a valid route.

7.1 Coordinate System

The interface displays coordinates starting at 1, while JavaScript arrays use indices starting at 0.

For example:

- Displayed row 1, column 1 corresponds to internal row 0, column 0.
- Displayed row 8, column 4 corresponds to internal row 7, column 3.

The conversion formulas are:

Internal row = Displayed row - 1
Internal column = Displayed column - 1

Displayed row = Internal row + 1
Displayed column = Internal column + 1

7.2 Default Positions
```
Element| Internal Position| Displayed Position
Start| "{ row: 7, col: 3 }"| Row 8, Column 4
Destination| "{ row: 7, col: 21 }"| Row 8, Column 22
```
The application validates grid edits so that the start and destination do not overlap or occupy blocked cells.

## 8. Pathfinding Algorithms

## 8.1 A* Algorithm

A* is a heuristic-guided search algorithm. It uses the known cost of reaching a node and an estimate of the remaining cost to the destination.

The evaluation function is commonly expressed as:
```
"f(n) = g(n) + h(n)"
```
Where:

- "g(n)" is the cost from the start to the current node.
- "h(n)" is the estimated cost from the current node to the destination.
- "f(n)" is the combined priority used to guide the search.

A* can find an optimal path when its heuristic and implementation satisfy the necessary conditions. The exact heuristic and priority rules are defined in the project's implementation.

## 8.2 Breadth-First Search (BFS)

BFS explores the graph level by level. It typically uses a queue to manage the order in which nodes are visited.

When each movement has equal cost, BFS finds a shortest path in the number of moves if a route exists.

## 8.3 Depth-First Search (DFS)

DFS explores one branch deeply before backtracking to another branch.

DFS demonstrates traversal behavior, but it does not generally guarantee the shortest path.

8.4 Algorithm Comparison
```
Algorithm| Strategy| Typical Data Structure| Shortest Path

A*| Heuristic-guided search| Priority queue| Depends on heuristic and implementation

BFS| Level-by-level exploration| Queue| Yes, for equal-cost moves

DFS| Deep exploration before backtracking| Stack or recursion| Not guaranteed
```
The metrics shown in the interface depend on the values returned by the project's algorithm modules.

## 9. Data Structures

9.1 Queue

A queue follows the First In, First Out (FIFO) principle.

The first item inserted into a queue is the first item removed. This principle is demonstrated by processing pickup tasks in their insertion order.

The queue implementation is located at:
```
"src/data-structures/Queue.js"
```
9.2 Priority Queue

A priority queue selects elements according to their priority rather than only their insertion order.

This is useful for algorithms such as A*, which select the next candidate node based on its evaluation score.

The implementation is located at:
```
"src/data-structures/PriorityQueue.js"
```
## 10. Main Application Workflows

10.1 Application Initialization

1. The React application is mounted through "src/main.jsx".
2. The initial warehouse grid is created.
3. The start and destination positions are initialized.
4. The interface renders the grid, control panel, metrics panel, and task manager.

10.2 Grid Editing

1. The user selects an editing mode.
2. The user clicks a cell in the warehouse.
3. The application checks whether the edit is valid.
4. The grid or position state is updated.
5. Previous path results are cleared when appropriate.

10.3 Route Calculation

1. The user selects a pathfinding algorithm.
2. The application passes the grid, start position, and destination to that algorithm.
3. The algorithm searches for a route.
4. The application stores the returned result.
5. The interface displays the path and search information.

10.4 Robot Animation

1. The application calculates a route.
2. If no route exists, the interface displays an appropriate status message.
3. If a route exists, the robot moves along the returned sequence of cells.
4. The animation ends when the route has been traversed.

The animation is a visual demonstration and does not represent the speed of a physical robot.

10.5 Pickup Task Processing

1. The user enters a task name and pickup coordinates.
2. The application converts the displayed coordinates to internal grid indices.
3. The application validates the coordinates and obstacle state.
4. A valid task is added to the queue.
5. The user can remove individual tasks or clear the entire queue.
6. When the queue is run, the robot plans a route to each pickup location in FIFO order.
7. If a pickup location cannot be reached, the application reports the problem.

If the current application implementation includes a final delivery leg, the existing destination cell is used as the drop-off destination after the queued pickup tasks. Confirm the behavior against the version of "App.jsx" and "TaskManager.jsx" that is actually committed to the repository.

10.6 Random Obstacles and Reset Controls

The application can generate random obstacles to create different pathfinding scenarios. Reset controls clear path results or obstacles according to their function.

## 11. State Management

The main application manages the state required for the simulation, including:

- Warehouse grid.
- Start and destination coordinates.
- Selected algorithm.
- Grid editing mode.
- Current algorithm result.
- Algorithm comparison results.
- Robot position.
- Animation state.
- Status message.
- Pickup task list.

React state updates cause the affected interface components to render the latest values.

## 12. Installation

12.1 Prerequisites
```
- Node.js
- npm
- Git, if cloning the repository
- A modern web browser
```
12.2 Clone the Repository

Replace the placeholder with the actual GitHub username:
```
git clone https://github.com/<your-github-username>/warehouse-robot-pathfinding.git
cd warehouse-robot-pathfinding
```
If the project already exists on the computer, open its root directory instead.

12.3 Install Dependencies
```
npm install
```
12.4 Start the Development Server
```
npm run dev
```
```
Open the local URL shown in the terminal, usually "http://localhost:5173".
```
12.5 Build for Production
```
npm run build
```
The production build is normally generated in the "dist/" directory.

12.6 Preview the Production Build
```
npm run preview
```
Check "package.json" for the exact scripts configured in the project.

## 13. Deployment to Vercel

1. Push the latest project files to GitHub.
2. Sign in to Vercel.
3. Import the GitHub repository.
4. Configure the build settings.
```
Setting| Value
Framework Preset| Vite
Root Directory| "./"
Install Command| "npm install"
Build Command| "npm run build"
Output Directory| "dist"
```
5. Click Deploy.
6. Open the generated deployment URL.
7. Test the grid, algorithms, robot animation, and task queue.

For future updates, push new commits to the connected GitHub branch and review the resulting Vercel deployment.

## 14. Testing and Validation

The repository includes test-related files under "tests/". Check "package.json" to identify the configured test runner and available commands.

Before deployment, verify:

- Dependencies install successfully.
- The application starts locally.
- The production build completes.
- A* executes successfully.
- BFS executes successfully.
- DFS executes successfully.
- Obstacles affect route planning.
- Unreachable routes are handled.
- Start and destination editing works.
- Pickup task coordinates are validated.
- Tasks are processed in FIFO order.
- Task removal and queue clearing work.
- Robot animation completes correctly.
- The deployed website behaves as expected.

## 15. Troubleshooting

Node.js or npm is not recognized

Check the installation:
```
node --version
npm --version
```
Install Node.js if required, then reopen the terminal.

Dependencies are missing

Run:
```
npm install
```
The production build fails

Run:
```
npm run build
```
Review the first meaningful error and check imports, file names, and package scripts.

The robot cannot find a route

Obstacles may block all available paths. Remove or rearrange obstacles and run the algorithm again.

A pickup task is rejected

Check that the row and column are within the grid dimensions and that the selected pickup cell is not blocked.

The animation does not start

Check whether a route was found and whether another animation is already running.

Vercel deployment fails

Review the Vercel build log and verify the repository's latest commit, root directory, build command, and output directory.

## 16. Performance Considerations

- A* performance depends on the heuristic, priority queue, and obstacle layout.
- BFS may explore many cells because it processes nodes layer by layer.
- DFS may find a route quickly in some scenarios but does not guarantee a shortest route.
- Animation delays exist for visualization and do not represent real-world travel time.
- Larger grids may require further algorithm and rendering optimization.

Performance values should be measured from the actual implementation rather than assumed.

## 17. Security and Privacy

The documented project is a front-end simulation. Avoid committing passwords, API keys, access tokens, or other secrets to source files or a public repository.

If a backend, authentication, or external API integration is introduced later, evaluate its security requirements separately.

## 18. Future Enhancements

Potential improvements include:

- Configurable pickup and drop-off locations.
- A mission-progress indicator for pickup and delivery stages.
- Step-by-step visualization of explored nodes.
- More detailed algorithm metrics.
- Exportable algorithm comparisons.
- Weighted terrain and different movement costs.
- Saving and loading warehouse layouts.
- Additional automated tests.
- Improved accessibility and mobile responsiveness.
- Optional backend integration.

These are suggested extensions and should not be interpreted as features that are already implemented.

## 19. Glossary

- Grid cell: A single position in the warehouse map.
- Node: A position considered by a pathfinding algorithm.
- Obstacle: A blocked cell.
- Path: An ordered sequence of cells connecting the start and destination.
- Heuristic: An estimate of the remaining cost to the destination.
- FIFO: First In, First Out.
- Queue: A data structure that processes items in insertion order.
- Priority queue: A data structure that selects items according to priority.
- Drop-off destination: The target location used to complete a delivery workflow.
- Simulation: A software model of navigation rather than physical robot control.

## Author
## Ramesh Netheti 
