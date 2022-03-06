// Imports
const jwt = require('jsonwebtoken')

// Export JWT check function
module.exports = function (req, res, next) {
    // Get token value from header
    const token = req.header('auth-token')
    // If token not found
    if(!token) {
        // Return status 400 and message saying access denied
        return res
            .status(400)
            .json(
                {
                    message: 'Access Denied'
                }
            )
    }

    try{
        // Verify token value with secret saved in env file
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        // Mark user as verified
        req.user = verified
        // Next function
        next()

    } catch (err) {
        // If not verified, return status 400 and message saying invalid token
        return res.status(400).json(
            {
                message: 'Invalid Token'
            }
        )
    }
}