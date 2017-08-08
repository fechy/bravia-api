const Bravia = require('bravia');

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
            bravia.system.invoke(method)
                         .then(result)
                         .catch(err);
        },

        post: (method, data, version = '1.0') => {
            return bravia.system.invoke(method, version, data);
        },

        send: (command) => {
            console.info(`Sending command: ${command}`);
            return bravia.send(command);
        }
    }
};