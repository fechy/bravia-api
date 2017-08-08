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
            console.log(`INVOKE: ${method}`);
            bravia.system.invoke(method)
                         .then(result)
                         .catch(err);
        },

        post: (method, data, version = '1.0') => {
            console.log(`POST: ${method}`);
            return bravia.system.invoke(method, version, data);
        },

        send: (command) => {
            console.log(`Sending command: ${command}`);
            return bravia.send(command);
        }
    }
};