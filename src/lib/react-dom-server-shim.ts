// @ts-expect-error - import shim first
import './shim';

// @ts-expect-error - import edge version specifically to avoid circular dependency
import server from 'react-dom/server.edge';

// @ts-expect-error
export default server;
// @ts-expect-error
export * from 'react-dom/server.edge';
