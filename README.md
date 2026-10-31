## 🤖 Warehouse Robot Pathfinding Simulator

<p align="center">
  An interactive visualization of intelligent robot navigation using A*, BFS, and DFS.
</p><p align="center">
  <a href="https://ware-house-robot-path-finding.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_LIVE_DEMO-OPEN_SIMULATOR-2563EB?style=for-the-badge" alt="Live Demo" />
  </a>
</p><p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS-663399?style=flat-square&logo=css&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/Hosted_on-Vercel-black?style=flat-square&logo=vercel" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />
</p>

## Overview

Warehouse Robot Pathfinding Simulator is an interactive web application that demonstrates how autonomous warehouse robots can navigate grid-based environments, avoid obstacles, and find routes to a destination.

The project brings fundamental computer science concepts to life through visual representations of graph traversal, pathfinding algorithms, data structures, and robot movement.

## 🔗 Live Application: "ware-house-robot-path-finding.vercel.app" (https://ware-house-robot-path-finding.vercel.app/)

## Application Screenshots

<img width="1080" height="865" alt="20261027_133536" src="https://github.com/user-attachments/assets/599544a8-7bb2-467c-9a32-045212328174" />

<img width="999" height="524" alt="20261027_133556" src="https://github.com/user-attachments/assets/358d4a70-315c-4e0a-8d9d-6447a5d254d7" />

<img width="1001" height="671" alt="20261027_133607" src="https://github.com/user-attachments/assets/ec56dde3-235f-42a3-9ac9-d76a3382106a" />

## Key Features

- Interactive Grid Environment — visualize a warehouse as a collection of traversable cells and obstacles.
- Multiple Pathfinding Algorithms — explore A*, Breadth-First Search, and Depth-First Search.
- Obstacle Placement — experiment with different warehouse layouts and blocked routes.
- Path Visualization — observe the route identified by the selected algorithm.
- Search Exploration — visualize explored cells where supported by the implementation.
- Robot Animation — watch the robot move along the calculated path.
- Performance Metrics — inspect the search statistics provided by the application.
- Algorithm Comparison — understand how different search strategies behave.
- Pickup Task Queue — organize pickup tasks using a first-in, first-out queue.
- Random Obstacles — experiment with different grid configurations.

## Technology Stack
```
Technology| Purpose

React| Interactive, component-based user interface

Vite| Development server and production build tooling
JavaScript (ES6+)| Application logic and search algorithms

JSX| React component structure

CSS| Layout and visual styling

Graph Search| Exploring possible paths through the grid

Queue| FIFO operations and breadth-first traversal

Priority Queue| Prioritizing search nodes in A*

Git and GitHub| Version control and source code management

Vercel| Web application deployment
```
## How It Works

The simulator initializes a warehouse grid, accepts a start and goal position, and runs the selected pathfinding algorithm to find a route around obstacles.

## flowchart TD
```
    A([Start]) --> B[Initialize Warehouse Grid]
    B --> C[Set Start and Goal]
    C --> D[Configure Obstacles]
    D --> E[Select Algorithm]
    E --> F[Execute Pathfinding]
    F --> G{Goal Reached?}
    G -- Yes --> H[Reconstruct Path]
    G -- No --> I[Display No-Path Result]
    H --> J[Visualize Route and Explored Cells]
    J --> K[Animate Robot]
    K --> L[Display Available Metrics]
    I --> M{Try Again?}
    L --> M
    M -- Yes --> D
    M -- No --> N([End])
```
## Workflow

1. Initialize the warehouse grid.
2. Configure the starting position, destination, and obstacles.
3. Select A*, BFS, or DFS.
4. Execute the chosen search algorithm.
5. Determine whether the destination is reachable.
6. Reconstruct and visualize the route when a path exists.
7. Animate the robot along the calculated route, where supported.
8. Review available metrics and experiment with another configuration.

## Pathfinding Algorithms

# A* Search

A* is an informed search algorithm that uses the cost of reaching a node and an estimate of the remaining distance to the destination.

Its evaluation function is:

"f(n) = g(n) + h(n)"

- "g(n)" represents the cost from the starting node to the current node.
- "h(n)" estimates the cost from the current node to the destination.
- "f(n)" represents the combined estimated cost.

A* typically uses a priority queue to prioritize promising nodes. With an appropriate admissible heuristic and a suitable implementation, it can find a shortest path.

# Breadth-First Search (BFS)

BFS explores neighboring nodes level by level using a queue. It finds a shortest path when all movements have equal cost and a path exists.

Key concept: Queue-based graph traversal.

# Depth-First Search (DFS)

DFS explores one branch as deeply as possible before backtracking to other branches. It typically uses a stack or recursion.

DFS can find a valid route, but it does not guarantee that the route is the shortest.

Key concept: Stack-based or recursive graph traversal.

# Algorithm Comparison

Property| A*| BFS| DFS

Search strategy| Cost and heuristic| Level by level| Depth first

Main data structure| Priority queue| Queue| Stack or recursion

Uses heuristic| Yes| No| No

Shortest-path guarantee| Under suitable conditions| Yes, for equal-cost edges|No
Can navigate around obstacles| Yes, if reachable| Yes, if reachable| Yes, if reachable
Typical application| Goal-directed navigation| Unweighted shortest paths| Graph exploration

## Complexity Analysis

For a graph with "V" vertices and "E" edges:
```
Algorithm| Time Complexity| Space Complexity
BFS| "O(V + E)"| "O(V)"
DFS| "O(V + E)"| "O(V)"
A*| Depends on the heuristic and implementation; worst-case behavior can be exponential in search depth| Depends on the number of stored search nodes
```
These are general algorithmic properties, not measured performance results from this application.

Project Structure
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
├── docs/
│   └── screenshots/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── documentation.md
└── LICENSE
```
«Verify the filenames against your actual repository. The "docs/screenshots/" directory is for documentation images and must be created if it does not already exist.»

Getting Started

# Prerequisites

- Node.js
- npm
- Git (optional, if cloning the repository)

## Installation

Clone the repository:
```
git clone https://github.com/25A31A05IG/warehouse-robot-pathfinding.git
```
Navigate to the project directory:

cd warehouse-robot-pathfinding

Install dependencies:
```
npm install
```
Start the development server:
```
npm run dev
```
Open the local URL displayed in the terminal.
```
Production Build

npm run build
```
Preview the production build locally:
```
npm run preview
```
These commands assume the relevant scripts are defined in "package.json".

## Testing

The project contains test-related files under "tests/". Check "package.json" for the configured test runner and test command.

# Recommended scenarios include:

- A clear route between the start and destination.
- A route requiring obstacle avoidance.
- An unreachable destination.
- Changes to the warehouse layout.
- BFS shortest-path behavior on an equal-cost grid.
- DFS traversal and backtracking.
- A* pathfinding with the configured heuristic.

## Deployment

The application is deployed on Vercel.

<p align="center">
  <a href="https://ware-house-robot-path-finding.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_OPEN_LIVE_APPLICATION-Launch_Now-2563EB?style=for-the-badge" alt="Launch Live Application" />
  </a>
</p>Live URL: https://ware-house-robot-path-finding.vercel.app/

## Typical Vite deployment settings:
```
Setting| Value
Framework preset| Vite
Build command| "npm run build"
Output directory| "dist"
Install command| "npm install"
```
# Limitations

- This is an educational software simulation, not a physical robot-control system.
- Hardware integration, real-world sensors, and physical robot localization are outside the scope of the application unless implemented separately.
- Pathfinding results depend on the grid, movement rules, edge costs, heuristic, and algorithm implementation.
- The simulator should not be considered a production warehouse fleet-management system.

# Future Enhancements

- Additional pathfinding algorithms.
- Configurable warehouse dimensions.
- More detailed search statistics and timing measurements.
- Reproducible algorithm benchmarking.
- Improved accessibility and keyboard navigation.
- Exportable pathfinding results.
- Multi-robot path planning and collision avoidance.

# Documentation

See ""documentation.md"" (documentation.md) for additional technical information about the application architecture, algorithms, data structures, and testing.

# License

This project is distributed under the MIT License. See the ""LICENSE"" (LICENSE) file for the complete terms.

# Author

# Kapusetti Priyanka

- GitHub: "@25A31A05GW" (https://github.com/25A31A05GW)
- Live Project: "Warehouse Robot Pathfinding Simulator" (https://ware-house-robot-path-finding.vercel.app/)

---

<p align="center">
  <b>Exploring pathfinding algorithms through interactive warehouse navigation.</b>
</p><p align="center">
  <a href="https://ware-house-robot-path-finding.vercel.app/">Launch the Live Demo →</a>
</p>
