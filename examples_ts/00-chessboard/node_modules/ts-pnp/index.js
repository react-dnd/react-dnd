let pnp;

try {
  pnp = require(`pnpapi`);
} catch (error) {
  // not in PnP; not a problem
}

function resolveModuleName(request, issuer, compilerOptions, moduleResolutionHost, parentResolver) {
  const topLevelLocation = pnp.getPackageInformation(pnp.topLevel).packageLocation;

  const [, prefix = ``, packageName = ``, rest] = request.match(/^(!(?:.*!)+)?((?!\.{0,2}\/)(?:@[^\/]+\/)?[^\/]+)?(.*)/);

  let failedLookupLocations = [];

  // First we try the resolution on "@types/package-name" starting from the project root
  if (packageName) {
    const typesPackagePath = `@types/${packageName.replace(/\//g, `__`)}${rest}`;

    let unqualified;
    try {
      unqualified = pnp.resolveToUnqualified(typesPackagePath, `${topLevelLocation}/`, {considerBuiltins: false});
    } catch (error) {}

    if (unqualified) {
      const finalResolution = parentResolver(unqualified, issuer, compilerOptions, moduleResolutionHost);

      if (finalResolution.resolvedModule) {
        return finalResolution;
      } else {
        failedLookupLocations = failedLookupLocations.concat(finalResolution.failedLookupLocations);
      }
    }
  }

  // Then we try on "package-name", this time starting from the package that makes the request
  if (true) {
    const regularPackagePath = `${packageName || ``}${rest}`;

    let unqualified;
    try {
      unqualified = pnp.resolveToUnqualified(regularPackagePath, issuer, {considerBuiltins: false});
    } catch (error) {}

    if (unqualified) {
      const finalResolution = parentResolver(unqualified, issuer, compilerOptions, moduleResolutionHost);

      if (finalResolution.resolvedModule) {
        return finalResolution;
      } else {
        failedLookupLocations = failedLookupLocations.concat(finalResolution.failedLookupLocations);
      }
    }
  }

  return {
    resolvedModule: undefined,
    failedLookupLocations,
  };
}

module.exports.resolveModuleName = pnp
  ? resolveModuleName
  : (moduleName, containingFile, compilerOptions, compilerHost, resolveModuleName) =>
      resolveModuleName(moduleName, containingFile, compilerOptions, compilerHost);
