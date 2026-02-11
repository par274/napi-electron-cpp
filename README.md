# Simple electron-cpp

This is a minimal "Hello World" example demonstrating how to integrate C++ native addons with Electron and React. While intentionally simple, the architecture here is production-ready and can be expanded into larger, maintainable desktop applications.

## Prerequisites

- Node.js 20+
- CMake 3.15+
- C++ compiler (MSVC on Windows, GCC/Clang on Linux/macOS)
- Ninja build system (for IntelliSense)
- Git

## Installation

```bash
# Clone the repository
git clone https://github.com/par274/napi-electron-cpp.git

# Navigate to the project directory
cd napi-electron-cpp

# Install dependencies
npm install
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build:native` | Build C++ native addon with CMake |
| `npm run dev` | Start Vite development server |
| `npm run build` | Build native addon and Vite app |
| `npm run preview` | Preview production build locally |
| `npm start` | Build and run the Electron application |
| `npm run dist:portable` | Create portable distribution |
| `npm run dist:installer` | Create installer package |
| `npm run dist:ci` | Create CI distribution (zip) |
| `npm run clean` | Remove all build artifacts |

**How to Run:**
- **VSCode:** Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS), type "Run Task" or `Terminal > Run Task...` and select any task from the list.

## Project Structure

The project structure was developed based on the principle of modularity.

```
├── config/
│   └── (electron builder configuration scripts)
├── src-cpp/
│   └── hello.cpp          # C++ native addon source (N-API)
├── release/               # Release builds
├── src/
│   ├── main.ts            # Electron main process entry
│   ├── preload.ts         # Preload script for secure IPC
│   ├── addon.ts           # Native addon loader with path resolution
│   ├── ipc.ts             # IPC channel definitions
│   ├── index.html         # HTML entry point
│   ├── renderer/          # UI layer (React components & styles)
│   │   ├── index.tsx      # React renderer entry point
│   │   └── styles/
│   │       └── app.css    # Application styles
│   ├── functions/         # Business logic layer (IPC handlers)
│   │   └── sayHello.ts    # IPC handler for native addon
│   ├── helpers/           # Utility layer (shared helpers)
│   │   └── paths.ts       # Path utilities for ES modules
│   └── types/             # Type definitions layer
│       └── index.d.ts     # TypeScript type definitions
├── CMakeLists.txt         # CMake configuration for native addon
├── tsconfig.ts            # configuration for TypeScript
├── vite.config.ts         # Vite bundler configuration
```

## Architecture

The application consists of three main parts:

1. **Native Layer** (`src-cpp/`): C++ code using N-API for Node.js bindings.
2. **Main Process** (`src/main.ts`): Electron main process with IPC handlers and native addon loading.
3. **Renderer Process** (`src/renderer/`): React-based UI with secure preload script.

### Key Components

- **`src/addon.ts`**: Handles dynamic loading of the native addon from multiple possible paths.
- **`src/ipc.ts`**: Centralized IPC channel name definitions.
- **`src/functions/`**: Business logic handlers for IPC calls.
- **`src/helpers/paths.ts`**: ES module-compatible path utilities.

## Native Addon API

The native addon exposes the following function:

```typescript
sayHello(): string
```

Returns `"Hello World from C++!"`

### IPC Response Format

The main process wraps native addon calls with standardized responses:

```typescript
interface SayHelloResponse {
  success: boolean;
  result?: string;
  error?: string;
}
```

## Sources

- [Electron N-API documentation](https://www.electronjs.org/docs/latest/tutorial/native-code-and-electron): Official reference for integrating native (C/C++) code with Electron.
- [electron-cpp](https://github.com/akab/electron-cpp): Used as architectural inspiration only.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
