const successResponseBody = () => ({
    err: {},
    data: {},
    message: 'Successfully processed the request',
    success: true
});

const errorResponseBody = () => ({
    err: {},
    data: {},
    message: 'Something went wrong, cannot process the request',
    success: false
});

module.exports = {
    successResponseBody,
    errorResponseBody
};
