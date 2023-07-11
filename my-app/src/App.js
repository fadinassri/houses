import React, { Component } from 'react';

class HouseCostCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      housePrice: 350000,
      downPayment: 100000,
      mortgageRate: 5.4,
      mortgagePeriod: 25,
      taxPerYearPercentagre: 1.408600,
      buyingCost: 7000,
      sellingCostPercentage: 5,
      sellingPrice: 350000,
      monthlyInsurance: 80,
      utilityPerMonth: 350,
      maintenanceFeesPerMonth: 0,
      totalMonthlyPayment: 0,
      mortgageMonthlyPayment: 0,
      otherMonthlyPayment: 0,
      equityMonthlyGain: 0,
      holdingLength: 3,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  calculateHouseCost = () => {
    const {
      housePrice,
      downPayment,
      mortgageRate,
      mortgagePeriod,
      taxPerYearPercentagre,
      buyingCost,
      sellingCostPercentage,
      sellingPrice,
      monthlyInsurance,
      utilityPerMonth,
      maintenanceFeesPerMonth,
      holdingLength,
    } = this.state;

    const loanAmount = housePrice - downPayment;
    const monthlyInterestRate = mortgageRate / 100 / 12;
    const totalMonths = mortgagePeriod * 12;

    // Calculate mortgage monthly payment
    const mortgageMonthlyPayment =
      (loanAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);





    const taxPerYear = housePrice * taxPerYearPercentagre / 100;


    // Calculate other monthly payment
    const otherMonthlyPayment =
      (parseFloat(housePrice * taxPerYearPercentagre / 100) / 12 +
        parseFloat(monthlyInsurance) +
        parseFloat(utilityPerMonth) +
        parseFloat(maintenanceFeesPerMonth));

    // Calculate total monthly payment
    const totalMonthlyPayment = mortgageMonthlyPayment + otherMonthlyPayment;



    // Calculate principal and interest
    // Calculate the remaining loan amount for each month
    let remainingLoanAmount = loanAmount;

    // Initialize variables for principal and interest
    let Principal = 0;
    let Interest = 0;

    // Calculate principal and interest for each month
    for (let i = 0; i < (12 * holdingLength); i++) {
      Interest = remainingLoanAmount * monthlyInterestRate;
      Principal = mortgageMonthlyPayment - Interest;

      remainingLoanAmount -= Principal;
    }

    // Calculate the total principal and interest paid over the mortgage period
    Principal *= (12 * holdingLength);
    Interest *= (12 * holdingLength);



    // Calculate equity monthly gain
    const houseSellingCost = sellingCostPercentage * sellingPrice / 100
    const equityMonthlyGain = Principal / (12 * holdingLength) - parseFloat(buyingCost) / (12 * holdingLength) - parseFloat(sellingCostPercentage * sellingPrice / 100) / (12 * holdingLength) + (sellingPrice - housePrice) / (12 * holdingLength);
    const realMonthlyPayment = totalMonthlyPayment - equityMonthlyGain;




    this.setState({
      totalMonthlyPayment,
      mortgageMonthlyPayment,
      otherMonthlyPayment,
      equityMonthlyGain,
      Principal,
      Interest,
      realMonthlyPayment,
      houseSellingCost,
      sellingCostPercentage,
      taxPerYear,
    });
  };

  render() {
    const {
      housePrice,
      downPayment,
      mortgageRate,
      mortgagePeriod,
      taxPerYearPercentagre,
      buyingCost,
      houseSellingCost,
      sellingPrice,
      monthlyInsurance,
      utilityPerMonth,
      maintenanceFeesPerMonth,
      totalMonthlyPayment,
      mortgageMonthlyPayment,
      otherMonthlyPayment,
      equityMonthlyGain,
      Principal,
      Interest,
      realMonthlyPayment,
      sellingCostPercentage,
      taxPerYear,
      holdingLength,
    } = this.state;

    return (
      <div>
        <h1>House Cost Calculator</h1>
        <div>
          <label>House Price:</label>
          <input
            type="number"
            name="housePrice"
            value={housePrice}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Down Payment:</label>
          <input
            type="number"
            name="downPayment"
            value={downPayment}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Mortgage Rate (%):</label>
          <input
            type="number"
            name="mortgageRate"
            value={mortgageRate}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Mortgage Period (years):</label>
          <input
            type="number"
            name="mortgagePeriod"
            value={mortgagePeriod}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Tax per Year (Percentage of buying Price %):</label>
          <input
            type="number"
            name="taxPerYearPercentagre"
            value={taxPerYearPercentagre}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Buying Cost:</label>
          <input
            type="number"
            name="buyingCost"
            value={buyingCost}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Selling Cost Percentage (% of Selling Price):</label>
          <input
            type="number"
            name="sellingCostPercentage"
            value={sellingCostPercentage}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Selling Price:</label>
          <input
            type="number"
            name="sellingPrice"
            value={sellingPrice}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Monthly Insurance:</label>
          <input
            type="number"
            name="monthlyInsurance"
            value={monthlyInsurance}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Utility per Month:</label>
          <input
            type="number"
            name="utilityPerMonth"
            value={utilityPerMonth}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Maintenance Fees per Month:</label>
          <input
            type="number"
            name="maintenanceFeesPerMonth"
            value={maintenanceFeesPerMonth}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>After how many years are you planning to sell this house:</label>
          <input
            type="number"
            name="holdingLength"
            value={holdingLength}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <button onClick={this.calculateHouseCost}>Calculate</button>
        </div>
        <h2>Results:</h2>
        <div>
          <label><b>Total Monthly Payment:</b></label>
          <span><b>{totalMonthlyPayment}</b></span>
        </div>
        <div>
          <label><b>Real Monthly Payment (Adjusted after sale and Equity Calc):</b></label>
          <span><b> {realMonthlyPayment}</b></span>
        </div>
        <div>
          <label>Mortgage Monthly Payment:</label>
          <span>{mortgageMonthlyPayment}</span>
        </div>
        <div>
          <label>Equity Monthly (Considering the Buying cost and selling cost):</label>
          <span>{equityMonthlyGain}</span>
        </div>
        <div>
          <label>House Tax per year/month:</label>
          <span>{taxPerYear}/{taxPerYear / 12}</span>
        </div>
        <div>
          <label>House Selling Cost:</label>
          <span>{houseSellingCost}</span>
        </div>
        <div>
          <label>First Three Years Principal:</label>
          <span>{Principal}</span>
        </div>
        <div>
          <label>First Three Years Interest:</label>
          <span>{Interest}</span>
        </div>
      </div>
    );
  }
}

export default HouseCostCalculator;