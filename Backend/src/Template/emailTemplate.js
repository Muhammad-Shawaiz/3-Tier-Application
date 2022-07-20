require('dotenv').config();

template = `click <a href="${process.env.redirectUrl}/$id">Here</a> for reset password`

module.exports = template;