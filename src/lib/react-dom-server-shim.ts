// @ts-expect-error - import shim first to ensure polyfills are available
import './shim';

// @ts-expect-error - import edge version specifically to avoid circular dependency with React Server Components
import server from 'react-dom/server.edge';

// @ts-expect-error - re-exporting default from edge version for build compatibility
export default server;
// @ts-expect-error - re-exporting all named exports from edge version for full API surface
export * from 'react-dom/server.edge';
