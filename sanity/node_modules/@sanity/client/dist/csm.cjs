'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var resolveEditInfo = require('./_chunks/resolveEditInfo-v_7g85GR.cjs');
const defaultUpdateFunction = changed => changed;
function applySourceDocuments(result, resultSourceMap, getCachedDocument) {
  let updateFn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultUpdateFunction;
  if (!resultSourceMap) return result;
  return resolveEditInfo.walkMap(JSON.parse(JSON.stringify(result)), (value, path) => {
    const resolveMappingResult = resolveEditInfo.resolveMapping(path, resultSourceMap);
    if (!resolveMappingResult) {
      return value;
    }
    const {
      mapping,
      pathSuffix
    } = resolveMappingResult;
    if (mapping.type !== "value") {
      return value;
    }
    if (mapping.source.type !== "documentValue") {
      return value;
    }
    const sourceDocument = resultSourceMap.documents[mapping.source.document];
    const sourcePath = resultSourceMap.paths[mapping.source.path];
    if (sourceDocument) {
      const cachedDocument = getCachedDocument(sourceDocument);
      if (!cachedDocument) {
        return value;
      }
      const parsedPath = resolveEditInfo.parseJsonPath(sourcePath + pathSuffix);
      const changedValue = cachedDocument ? resolveEditInfo.get(cachedDocument, resolveEditInfo.toString(parsedPath), value) : value;
      return value === changedValue ? value : updateFn(changedValue, {
        cachedDocument,
        previousValue: value,
        sourceDocument,
        sourcePath: parsedPath
      });
    }
    return value;
  });
}
function resolvedKeyedSourcePath(options) {
  const {
    keyedResultPath,
    pathSuffix,
    sourceBasePath
  } = options;
  const inferredResultPath = pathSuffix === void 0 ? [] : resolveEditInfo.parseJsonPath(pathSuffix);
  const inferredPath = keyedResultPath.slice(keyedResultPath.length - inferredResultPath.length);
  const inferredPathSuffix = inferredPath.length ? resolveEditInfo.jsonPath(inferredPath).slice(1) : "";
  return resolveEditInfo.parseJsonPath(sourceBasePath + inferredPathSuffix);
}
function resolveEditUrl(options) {
  const {
    resultSourceMap,
    studioUrl
  } = options;
  const resultPath = resolveEditInfo.studioPathToJsonPath(options.resultPath);
  const editInfo = resolveEditInfo.resolveEditInfo({
    resultPath,
    resultSourceMap,
    studioUrl
  });
  if (!editInfo) {
    return void 0;
  }
  return resolveEditInfo.createEditUrl(editInfo);
}
exports.createEditUrl = resolveEditInfo.createEditUrl;
exports.getPublishedId = resolveEditInfo.getPublishedId;
exports.jsonPath = resolveEditInfo.jsonPath;
exports.jsonPathToStudioPath = resolveEditInfo.jsonPathToStudioPath;
exports.parseJsonPath = resolveEditInfo.parseJsonPath;
exports.resolveEditInfo = resolveEditInfo.resolveEditInfo;
exports.resolveMapping = resolveEditInfo.resolveMapping;
exports.studioPath = resolveEditInfo.studioPath;
exports.studioPathToJsonPath = resolveEditInfo.studioPathToJsonPath;
exports.walkMap = resolveEditInfo.walkMap;
exports.applySourceDocuments = applySourceDocuments;
exports.resolveEditUrl = resolveEditUrl;
exports.resolvedKeyedSourcePath = resolvedKeyedSourcePath;
//# sourceMappingURL=csm.cjs.map
