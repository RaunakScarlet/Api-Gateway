const {StatusCodes}=require('http-status-codes')

const info = (req, res) => {
    return res.status(StatusCodes.OK).json({
        'message': "Api is live",
        "success": true,
        "error": {},
        "data":{}
    })
}

module.exports = {
    info
}