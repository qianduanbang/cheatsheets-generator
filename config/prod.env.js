var env = {
  NODE_ENV: '"production"'
};

if (process.env.NODE_ENV == 'development') {
  env = {
    NODE_ENV: '"development"'
  };
}

module.exports = env
