import { printNoDefaultExport, defineCreateClientExports, SanityClient, middleware } from './_chunks/nodeMiddleware-KnoWsJY5.js';
export { BasePatch, BaseTransaction, ClientError, ObservablePatch, ObservableSanityClient, ObservableTransaction, Patch, ServerError, Transaction } from './_chunks/nodeMiddleware-KnoWsJY5.js';
export { adapter as unstable__adapter, environment as unstable__environment } from 'get-it';
function defineDeprecatedCreateClient(createClient) {
  return function deprecatedCreateClient(config) {
    printNoDefaultExport();
    return createClient(config);
  };
}
const exp = defineCreateClientExports(middleware, SanityClient);
const requester = exp.requester;
const createClient = exp.createClient;
const deprecatedCreateClient = defineDeprecatedCreateClient(createClient);
export { SanityClient, createClient, deprecatedCreateClient as default, requester };
//# sourceMappingURL=index.js.map
