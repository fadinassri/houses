import React, { Component } from 'react';

class HouseCostCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      housePrice: 350000,
      downPayment: 120000,
      mortgageRate: 6.59,
      mortgagePeriod: 25,
      taxPerYearPercentagre: 1.338600,
      buyingCost: 7000,
      sellingCostPercentage: 5,
      sellingPrice: 350000,
      monthlyInsurance: 50,
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
    // const mortgageMonthlyPayment =
    //   (loanAmount *
    //     (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
    //   (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    const effectiveRate = Math.pow(1 + (mortgageRate / 100) / 2, 2) - 1;
    const monthlyPeriodicRate = Math.pow(1 + effectiveRate, 1 / 12) - 1;
    const mortgageMonthlyPayment =
      (monthlyPeriodicRate * loanAmount) /
      (1 - Math.pow(1 + monthlyPeriodicRate, -totalMonths));



    const taxPerYear = housePrice * taxPerYearPercentagre / 100;


    // Calculate other monthly payment
    const otherMonthlyPayment =
      (parseFloat(housePrice * taxPerYearPercentagre / 100) / 12 +
        parseFloat(monthlyInsurance) +
        parseFloat(utilityPerMonth) +
        parseFloat(maintenanceFeesPerMonth));

    // Calculate total monthly payment
    const totalMonthlyPayment = mortgageMonthlyPayment + otherMonthlyPayment;



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
    Principal = loanAmount - remainingLoanAmount;
    Interest = mortgageMonthlyPayment * (12 * holdingLength) - Principal;



    // Calculate equity monthly gain
    const houseSellingCost = sellingCostPercentage * sellingPrice / 100
    const equityMonthlyGain = Principal / (12 * holdingLength) - parseFloat(buyingCost) / (12 * holdingLength) - parseFloat(sellingCostPercentage * sellingPrice / 100) / (12 * holdingLength) + (sellingPrice - housePrice) / (12 * holdingLength);
    const realMonthlyPayment = totalMonthlyPayment - equityMonthlyGain;
    const cashGainAfterSell = Principal - parseFloat(buyingCost) - parseFloat(sellingCostPercentage * sellingPrice / 100) + (sellingPrice - housePrice);



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
      cashGainAfterSell,
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
      cashGainAfterSell,
    } = this.state;

    return (
      <div className="container" style={{ marginLeft: '5px' }}>
        <h1>Canadian Homeownership Cost Estimator</h1>
        <p>
          Our Canadian Homeownership Cost Estimator provides a clear and concise estimate of monthly and overall expenses associated with owning a house. Covering mortgage details, taxes, insurance, utilities, and maintenance fees, this calculator helps you grasp the financial implications of homeownership over a specified period. Make informed decisions with our user-friendly tool designed for Canadian homebuyers
        </p>
        <div>
          <label>House Price:</label><br />
          <input
            type="number"
            name="housePrice"
            value={housePrice}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>After how many years are you planning to sell this house:</label><br />
          <input
            type="number"
            name="holdingLength"
            value={holdingLength}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Selling Price:</label><br />
          <input
            type="number"
            name="sellingPrice"
            value={sellingPrice}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Down Payment:</label><br />
          <input
            type="number"
            name="downPayment"
            value={downPayment}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Mortgage Rate (%):</label><br />
          <input
            type="number"
            name="mortgageRate"
            value={mortgageRate}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Mortgage Period (years):</label><br />
          <input
            type="number"
            name="mortgagePeriod"
            value={mortgagePeriod}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Tax per Year (Percentage of buying Price %):</label><br />
          <input
            type="number"
            name="taxPerYearPercentagre"
            value={taxPerYearPercentagre}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Buying Cost:</label><br />
          <input
            type="number"
            name="buyingCost"
            value={buyingCost}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Selling Cost Percentage (% of Selling Price):</label><br />
          <input
            type="number"
            name="sellingCostPercentage"
            value={sellingCostPercentage}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Monthly Insurance:</label><br />
          <input
            type="number"
            name="monthlyInsurance"
            value={monthlyInsurance}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Utility per Month:</label><br />
          <input
            type="number"
            name="utilityPerMonth"
            value={utilityPerMonth}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Maintenance Fees per Month:</label><br />
          <input
            type="number"
            name="maintenanceFeesPerMonth"
            value={maintenanceFeesPerMonth}
            onChange={this.handleInputChange}
          />
        </div>
        <div style={{ padding: '10px 20px' }}>
          <button style={{ fontSize: '18px', padding: '10px 20px' }} onClick={this.calculateHouseCost}>Calculate</button>
        </div>
        <h4>Results:</h4>
        <div className="result-table">
          <table border={1}>
            <tbody>
              <tr>
                <td><b>Total Monthly Payment:</b></td>
                <td><b>{totalMonthlyPayment}</b></td>
              </tr>
              <tr>
                <td><b>The cash gain after selling the house and deducting the selling cost and buying cost:</b></td>
                <td><b>{cashGainAfterSell}</b></td>
              </tr>
              <tr>
                <td><b>Actual Total Monthly Payment (Adjusted after considering selling cost, buying cost, and equity gain):</b></td>
                <td><b>{realMonthlyPayment}</b></td>
              </tr>
              <tr>
                <td>Mortgage Monthly Payment:</td>
                <td>{mortgageMonthlyPayment}</td>
              </tr>
              <tr>
                <td>Equity Monthly (Adjusted after considering buying cost and selling cost):</td>
                <td>{equityMonthlyGain}</td>
              </tr>
              <tr>
                <td>House Tax per year / month:</td>
                <td>{taxPerYear} / {taxPerYear / 12}</td>
              </tr>
              <tr>
                <td>House Selling Cost:</td>
                <td>{houseSellingCost}</td>
              </tr>
              <tr>
                <td>First {holdingLength} Years Principal:</td>
                <td>{Principal}</td>
              </tr>
              <tr>
                <td>First {holdingLength} Years Interest:</td>
                <td>{Interest}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default HouseCostCalculator;