import { walkMap, resolveMapping, parseJsonPath, get, toString, jsonPath, studioPathToJsonPath, resolveEditInfo, createEditUrl } from './_chunks/resolveEditInfo-AeWgV4US.js';
export { getPublishedId, jsonPathToStudioPath, studioPath } from './_chunks/resolveEditInfo-AeWgV4US.js';
const defaultUpdateFunction = changed => changed;
function applySourceDocuments(result, resultSourceMap, getCachedDocument) {
  let updateFn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultUpdateFunction;
  if (!resultSourceMap) return result;
  return walkMap(JSON.parse(JSON.stringify(result)), (value, path) => {
    const resolveMappingResult = resolveMapping(path, resultSourceMap);
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
      const parsedPath = parseJsonPath(sourcePath + pathSuffix);
      const changedValue = cachedDocument ? get(cachedDocument, toString(parsedPath), value) : value;
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
  const inferredResultPath = pathSuffix === void 0 ? [] : parseJsonPath(pathSuffix);
  const inferredPath = keyedResultPath.slice(keyedResultPath.length - inferredResultPath.length);
  const inferredPathSuffix = inferredPath.length ? jsonPath(inferredPath).slice(1) : "";
  return parseJsonPath(sourceBasePath + inferredPathSuffix);
}
function resolveEditUrl(options) {
  const {
    resultSourceMap,
    studioUrl
  } = options;
  const resultPath = studioPathToJsonPath(options.resultPath);
  const editInfo = resolveEditInfo({
    resultPath,
    resultSourceMap,
    studioUrl
  });
  if (!editInfo) {
    return void 0;
  }
  return createEditUrl(editInfo);
}
export { applySourceDocuments, createEditUrl, jsonPath, parseJsonPath, resolveEditInfo, resolveEditUrl, resolveMapping, resolvedKeyedSourcePath, studioPathToJsonPath, walkMap };
//# sourceMappingURL=csm.js.map
