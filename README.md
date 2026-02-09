# Simple electron-cpp

This is a minimal "Hello World" example demonstrating how to integrate C++ native addons with Electron and React. While intentionally simple, the architecture here is production-ready and can be expanded into larger, maintainable desktop applications.

## Prerequisites

- Node.js 18+
- CMake 3.15+
- C++ compiler (MSVC on Windows, GCC/Clang on Linux/macOS)
- Ninja build system (for IntelliSense)

## Installation

```bash
npm install
```

## Scripts

| Command | VSCode Task | Description |
|---------|-------------|-------------|
| `npm run build:native` | `Build Native (Ninja + Electron)` | Build C++ native addon with CMake |
| `npm run build:app` | `Build App (TypeScript + Webpack)` | Build main and renderer |
| `npm run build` | `Build All` | Build native addon and app |
| `npm start` | `Start Electron` | Build and run the application |
| `npm run dist:portable` | `Build Portable` | Create portable distribution |
| `npm run dist:installer` | `Build Installer` | Create installer package |
| `npm run dist:ci` | `Build and compress to zip` | Create zip package |
| `npm run clean` | `Clean Build Folders` | Remove all build artifacts |

**How to Run:**
- **CLI:** Use the `npm run` commands listed above in your terminal
- **VSCode:** Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS), type "Run Task" or `Terminal > Run Task...` and select any task from the list.

## Project Structure

```
├── native/
│   └── hello.cpp          # C++ native addon source
├── src/
│   ├── main.ts            # Electron main process
│   ├── preload.ts         # Preload script for secure IPC
│   ├── renderer.tsx       # React renderer process
│   └── index.html         # HTML entry point
├── CMakeLists.txt         # CMake configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript config (renderer)
└── tsconfig.main.json     # TypeScript config (main)
```

## Architecture

The application consists of three main parts:

1. **Native Layer** (`native/`): C++ code using N-API for Node.js bindings
2. **Main Process** (`src/main.ts`): Electron main process with IPC handlers
3. **Renderer Process** (`src/renderer.tsx`): React-based UI with secure preload script

## Native Addon API

The native addon exposes the following function:

```typescript
sayHello(): string
```

Returns `"Hello World from C++!"`

## References

This project was inspired by the architecture of [electron-cpp](https://github.com/akab/electron-cpp), modernized with React 19, TypeScript, and cmake-js for a more streamlined native addon integration.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
