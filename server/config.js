module.exports = {
  port: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  session_secret: process.env.SECRET,
  sid: process.env.SID,
  authToken: process.env.AUTH_TOKEN
}
