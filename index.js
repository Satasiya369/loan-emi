const express = require("express");
const cors = require('cors')
const app = express();
const port = 5000;
app.use(express.json(), cors());

app.get("/", (req, res) => {
  res.send("loan-EMI Calculator");
});

app.post("/calculate", (req, res) => {
  const { amount, interest, month } = req.body;

  if (!amount || !month) {
    return res.status(400).json({ error: "amount and months are required" });
  }

  const amountFloat = parseFloat(amount);
  const interestFloat = parseFloat(interest);
  const monthInt = parseInt(month);

  let monthlyemi;
  if (interestFloat === 0) {
    monthlyemi = amountFloat / monthInt;
  } else {
    const monthlyrate = interestFloat / 100 / 12;
    monthlyemi =
      (amountFloat * monthlyrate) / (1 - Math.pow(1 + monthlyrate, -monthInt));
  }

  const monthlyemis = Math.round(monthlyemi * 100) / 100;

  res.json({ monthlyemis });
});

app.listen(port, () => {
  console.log(`Server is alive on ${port}`);
});
