const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");
const scrapeIt = require("scrape-it")

router.get("/", async (req, res) => {
  const { sueldo, dni } = req.query;
  const { data: { tipoCambio } } = await scrapeIt('https://kambista.com/', {
    tipoCambio: '#valventa',
  });
  
  if (dni && sueldo) {
    const response = await fetch("https://shaggy-parrot-98.loca.lt?dni=" + dni);
    const data = await response.json();
    
    const total = sueldo/tipoCambio;
    console.log(total);
    console.log(sueldo);
    console.log(tipoCambio);
    res.json(total);
  } else {
    res.json({ status: "fallo" });
  }
});

module.exports = router;
