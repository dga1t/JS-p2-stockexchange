
class Marquee {
  constructor (container) {
  this.container = container;
  }

  load = async () => {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/quotes/NASDAQ?apikey=ed93f3e229380c530b7a0e7663f86b99`);
    const data = await response.json();
    const slicedData = data.slice(0,40);    
  
    slicedData.map((item) => {
      this.container.textContent += ` *${item.symbol} $${item.price}* `;
    })
  }
};

export default Marquee;
