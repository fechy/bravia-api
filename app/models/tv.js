const Bravia = require('bravia');

const debugEnabled = process.env.DEBUG || false;

module.exports = (ip, port, password) => {
    const bravia = new Bravia(ip, port, password);

    return {
        methodTypes: (version = null) => {
            return bravia.system.getMethodTypes(version);
        },

        getIRCCCodes: () => {
            return bravia.getIRCCCodes();
        },

        invoke: (method, result, err) => {
            if (debugEnabled) console.log(`INVOKE: ${method}`);
            bravia.system.invoke(method)
                         .then(result)
                         .catch(err);
        },

        post: (method, data, version = '1.0') => {
            if (debugEnabled) console.log(`POST: ${method}`);
            return bravia.system.invoke(method, version, data);
        },

        send: (command) => {
            if (debugEnabled) console.log(`Sending command: ${command}`);
            return bravia.send(command);
        }
    }
};