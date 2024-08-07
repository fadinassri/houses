import React, { Component } from 'react';

class HouseCostCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      housePrice: 440000,
      downPayment: 150000,
      mortgageRate: 4.9,
      mortgagePeriod: 25,
      taxPerYearPercentagre: 1.338600,
      buyingCost: 7000,
      sellingCostPercentage: 5,
      sellingPrice: 460000,
      monthlyInsurance: 50,
      utilityPerMonth: 350,
      maintenanceFeesPerMonth: 0,
      totalMonthlyPayment: 0,
      mortgageMonthlyPayment: 0,
      otherMonthlyPayment: 0,
      equityMonthlyGain: 0,
      holdingLength: 5,
      income: 6000, // Optional input for monthly income
      otherMonthlyDebts: 250, // Optional input for other monthly debts
      dtiRatio: 0, // Debt-to-Income ratio
      remainingIncome: 0, // Remaining monthly income
    };
  }

  componentDidMount() {
    this.calculateHouseCost();
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.calculateHouseCost);
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
      income,
      otherMonthlyDebts,
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
    const houseSellingCost = sellingCostPercentage * sellingPrice / 100;
    const equityMonthlyGain = Principal / (12 * holdingLength) - parseFloat(buyingCost) / (12 * holdingLength) - parseFloat(sellingCostPercentage * sellingPrice / 100) / (12 * holdingLength) + (sellingPrice - housePrice) / (12 * holdingLength);
    const realMonthlyPayment = totalMonthlyPayment - equityMonthlyGain;
    const cashGainAfterSell = Principal - parseFloat(buyingCost) - parseFloat(sellingCostPercentage * sellingPrice / 100) + (sellingPrice - housePrice);

    // Calculate DTI ratio and remaining income
    const totalDebt = parseFloat(totalMonthlyPayment) + parseFloat(otherMonthlyDebts);
    const dtiRatio = (income > 0) ? (totalDebt / income) * 100 : 0;
    const remainingIncome = (income > 0) ? income - totalDebt : 0;

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
      dtiRatio,
      remainingIncome,
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
      income,
      otherMonthlyDebts,
      dtiRatio,
      remainingIncome,
    } = this.state;

    return (
      <div className="container" style={{ marginLeft: '5px' }}>
        <div className="form-group">
          <label>House Price:</label>
          <input
            type="number"
            name="housePrice"
            value={housePrice}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Down Payment:</label>
          <input
            type="number"
            name="downPayment"
            value={downPayment}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Mortgage Rate (%):</label>
          <input
            type="number"
            name="mortgageRate"
            value={mortgageRate}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Mortgage Period (years):</label>
          <input
            type="number"
            name="mortgagePeriod"
            value={mortgagePeriod}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group" title="Enter the annual property tax as a percentage of the buying price.">
          <label>Annual Property Tax (% of Price):</label>
          <input
            type="number"
            name="taxPerYearPercentagre"
            value={taxPerYearPercentagre}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Buying Cost:</label>
          <input
            type="number"
            name="buyingCost"
            value={buyingCost}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Monthly Insurance:</label>
          <input
            type="number"
            name="monthlyInsurance"
            value={monthlyInsurance}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Utility per Month:</label>
          <input
            type="number"
            name="utilityPerMonth"
            value={utilityPerMonth}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Maintenance Fees per Month:</label>
          <input
            type="number"
            name="maintenanceFeesPerMonth"
            value={maintenanceFeesPerMonth}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label title="Enter the number of years you plan to hold the house before selling it.">Years until sale:</label>
          <input
            type="number"
            name="holdingLength"
            value={holdingLength}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Selling Price:</label>
          <input
            type="number"
            name="sellingPrice"
            value={sellingPrice}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group" title="Enter the percentage of the selling price that will be incurred as selling costs.">
          <label>Selling Costs (% of Price):</label>
          <input
            type="number"
            name="sellingCostPercentage"
            value={sellingCostPercentage}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Monthly Income (Optional):</label>
          <input
            type="number"
            name="income"
            value={income}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Other Monthly Debts (Optional):</label>
          <input
            type="number"
            name="otherMonthlyDebts"
            value={otherMonthlyDebts}
            onChange={this.handleInputChange}
          />
        </div>
        {/* <div style={{ padding: '10px 20px' }}>
          <button className='button' onClick={this.calculateHouseCost}>Calculate</button>
        </div> */}
        <h4>Results:</h4>
        <div className="result-table">
          <table border={1}>
            <tbody>
              <tr>
                <td><b>Total Monthly Payment:</b></td>
                <td><b>{totalMonthlyPayment?.toFixed(3)}</b></td>
              </tr>
              <tr>
                <td><b>The cash gain after selling the house and deducting the selling cost and buying cost:</b></td>
                <td><b>{cashGainAfterSell?.toFixed(3)}</b></td>
              </tr>
              <tr>
                <td><b>Actual Total Monthly Payment (Adjusted after considering selling cost, buying cost, and equity gain):</b></td>
                <td><b>{realMonthlyPayment?.toFixed(3)}</b></td>
              </tr>
              <tr>
                <td>Mortgage Monthly Payment:</td>
                <td>{mortgageMonthlyPayment?.toFixed(3)}</td>
              </tr>
              <tr>
                <td>Equity Monthly (Adjusted after considering buying cost and selling cost):</td>
                <td>{equityMonthlyGain?.toFixed(3)}</td>
              </tr>
              <tr>
                <td>House Tax per year / month:</td>
                <td>{taxPerYear?.toFixed(3)} / {(taxPerYear?.toFixed(3) / 12).toFixed(3)}</td>
              </tr>
              <tr>
                <td>House Selling Cost:</td>
                <td>{houseSellingCost?.toFixed(3)}</td>
              </tr>
              <tr>
                <td>First {holdingLength} Years Principal:</td>
                <td>{Principal?.toFixed(3)}</td>
              </tr>
              <tr>
                <td>First {holdingLength} Years Interest:</td>
                <td>{Interest?.toFixed(3)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {income > 0 && (
          <div>
            <br />
            <h3 style={{color:'red'}}>Debt-to-Income Ratio and Remaining Income</h3>
            <div className="result-table">
              <table border={1}>
                <tbody>
                  <tr>
                    <td><b>Debt-to-Income Ratio (%):</b></td>
                    <td><b>{dtiRatio?.toFixed(2)}%</b></td>
                  </tr>
                  <tr>
                    <td><b>Remaining Monthly Income:</b></td>
                    <td><b>{remainingIncome?.toFixed(3)}</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HouseCostCalculator;