const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");
const scrapeIt = require("scrape-it")

router.get("/", async (req, res) => {
  const { sueldo, dni } = req.query;
  const { data: { tipoCambio } } = await scrapeIt('https://kambista.com/', {
    tipoCambio: '#valventa',
  });
  
  if (dni && sueldo ) {
    const response = await fetch("https://shaggy-parrot-98.loca.lt?dni=" + dni);
    const data = await response.json();
    if(data.apto) {
      const total = sueldo/tipoCambio;
      res.json({total : total.toFixed(2)});
    } else {
      res.json({status: 'dni no apto'});
    }
  } else {
    res.json({ status: "fallo" });
  }
});

module.exports = router;
