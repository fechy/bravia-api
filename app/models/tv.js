const Bravia = require('bravia');

const debugEnabled = process.env.DEBUG || false;

module.exports = (ip, port, password) => {
    const bravia = new Bravia(ip, port, password);

    return {
        methodTypes: (version = null, protocol = 'system') => {
            return bravia[protocol].getMethodTypes(version);
        },

        getIRCCCodes: () => {
            return bravia.getIRCCCodes();
        },

        invoke: (method, result, err, protocol = 'system', params = {}, version = '1.0') => {
            if (debugEnabled) console.log(`INVOKE: ${method} ${protocol} ${version}`);

            bravia[protocol].invoke(method, version, params)
                         .then(result)
                         .catch(err);
        },

        post: (method, data, version = '1.0', protocol = 'system') => {
            if (debugEnabled) console.log(`POST: ${method} ${protocol} ${version}`);
            return bravia[protocol].invoke(method, version, data);
        },

        send: (command) => {
            if (debugEnabled) console.log(`Sending command: ${command}`);
            return bravia.send(command);
        }
    }
};