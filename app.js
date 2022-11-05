require("dotenv").config();
const express = require("express");
const app = express();
const OpenAI = require("openai-api");

const port = process.env.PORT || 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});

//OPENAI function to make use of GPT-3
const highAI = async (req, res) => {
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  // const operation_type = req.body;
  let operation_type = req;

  const completion = await openai.complete({
    engine: "text-davinci-002",
    prompt: operation_type,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 256,
  });
  let result = completion.data.choices[0].text;

  return result;
};

app.post("/", async (req, res) => {
  let result;
  const { firstNumber, secondNumber, operation_type } = req.body;

  let x, y;
  (x = firstNumber), (y = secondNumber), (Enum = operation_type);
  Enum: ["addition", "subtraction", "multiplication"];
  if (operation_type == "addition") {
    result = parseInt(x) + parseInt(y);
    answer = result.toString();
    // console.log(typeof result);
  } else if (operation_type == "subtraction") {
    result = parseInt(x) - parseInt(y);
    answer = result.toString();
  } else if (operation_type == "multiplication") {
    result = parseInt(x) * parseInt(y);
    answer = result.toString();
  } else if (typeof operation_type === "string") {
    result = await highAI(operation_type);
    answer = result.toString();

    // console.log(result);
  }
  res.json({
    slackUsername: "Henshaw",
    result: parseInt(answer),
    operation_type: Enum.valueOf(operation_type),
  });
  console.log(typeof result);
});

// app.post("/api", async function (req, res) {
//   const openai = new OpenAI(process.env.OPENAI_API_KEY);
//   {
//     const completion = await openai.complete({
//       engine: "text-davinci-002",
//       prompt: req.body.text,
//       temperature: 0.7,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       max_tokens: 256,
//     });
//     res.status(200).json({ result: completion.data });
//   }
// });

// app.post("/", (req, res) => {
//     let result;
//     const { firstNumber, secondNumber, operation_type } = req.body;

//     let x, y;
//     (x = firstNumber), (y = secondNumber), (Enum = operation_type);
//     Enum: ["+", "-", "*"];
//     if (operation_type == "+") {
//       result = parseInt(x) + parseInt(y);
//     } else if (operation_type == "-") {
//       result = parseInt(x) - parseInt(y);
//     } else if (operation_type == "*") {
//       result = parseInt(x) * parseInt(y);
//     }
//     res.json({
//       slackUsername: "Henshaw",
//       result: result,
//       operation_type: Enum.valueOf(operation_type),
//     });

//     // res.send("Hi");
//     //console.log(operation_type);
//     console.log(x);
//     console.log(y);
//     console.log(result);
//     console.log(operation_type);
//   });
