module.exports = {
    cleanQuery: (req) => {
        const postData = (Object.keys(req.body).length > 0 ? req.body : req.query);

        Object.keys(postData).map(key => {
            if (postData[key] === 'true' || postData[key] === 'false') {
                postData[key] = postData[key] === 'true';
            } else {
                postData[key] = postData[key];
            }
        });

        return postData;
    }
};