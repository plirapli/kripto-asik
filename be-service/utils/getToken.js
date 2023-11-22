const getToken = (header) => {
  let token;
  const authorization = header.authorization;

  if (authorization !== undefined && authorization.startsWith("Bearer "))
    token = authorization.substring(7);

  return token;
}

module.exports = getToken