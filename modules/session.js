/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/3
 Copy Prohibited
 */

exports.checkUserSession = function checkUserSession(req) {
  if (req.session != undefined) {
    if (req.session.username) {
      return true
    }
  }
};