const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAPI_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai