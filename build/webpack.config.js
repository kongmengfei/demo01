module.exports = (envVars) => {
  const { env } = envVars
  const envConfig = require(`./webpack.${env}.js`);

  console.log(envConfig);
  return envConfig;
}