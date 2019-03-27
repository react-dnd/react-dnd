
let pnp;

try {
  pnp = require(`pnpapi`);
} catch (error) {
  // not in PnP; not a problem
}

if (pnp) {
  module.exports = (request, {basedir, extensions}) => {
    const resolution = pnp.resolveRequest(request, `${basedir}/`, {extensions});

    // When the request is a native module, Jest expects to get the string back unmodified, but pnp returns null instead.
    if (resolution === null) {
      return request;
    }

    return resolution;
  };
} else {
  module.exports = require(`jest-resolve/build/default_resolver`).default;
}
