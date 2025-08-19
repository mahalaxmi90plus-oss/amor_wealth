document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const investmentInput = document.getElementById('monthly-investment');
    const periodInput = document.getElementById('investment-period');
    const returnInput = document.getElementById('expected-return');
    const calculateBtn = document.getElementById('calculate-btn');
    const investedAmount = document.getElementById('invested-amount');
    const estimatedReturns = document.getElementById('estimated-returns');
    const totalValue = document.getElementById('total-value');
    const investmentValue = document.getElementById('investment-value');
    const periodValue = document.getElementById('period-value');
    const returnValue = document.getElementById('return-value');
    const chartCanvas = document.getElementById('sip-chart');
    
    let chart = null;
    
    // Update range value displays
    investmentInput.addEventListener('input', function() {
        investmentValue.textContent = this.value;
    });
    
    periodInput.addEventListener('input', function() {
        periodValue.textContent = this.value;
    });
    
    returnInput.addEventListener('input', function() {
        returnValue.textContent = this.value;
    });
    
    // Calculate SIP
    function calculateSIP() {
        const monthlyInvestment = parseFloat(investmentInput.value);
        const investmentPeriod = parseFloat(periodInput.value);
        const expectedReturn = parseFloat(returnInput.value);
        
        const months = investmentPeriod * 12;
        const monthlyRate = expectedReturn / 100 / 12;
        
        // Calculate future value of SIP
        const futureValue = monthlyInvestment * 
                          (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
                          (1 + monthlyRate));
        
        const totalInvested = monthlyInvestment * months;
        const totalReturns = futureValue - totalInvested;
        
        // Update DOM
        investedAmount.textContent = formatCurrency(totalInvested);
        estimatedReturns.textContent = formatCurrency(totalReturns);
        totalValue.textContent = formatCurrency(futureValue);
        
        // Update chart
        updateChart(totalInvested, totalReturns);
    }
    
    // Format currency
    function formatCurrency(amount) {
        return '₹' + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // Update chart
    function updateChart(invested, returns) {
        const data = {
            labels: ['Invested Amount', 'Estimated Returns'],
            datasets: [{
                data: [invested, returns],
                backgroundColor: [
                    'rgba(65, 105, 225, 0.7)',
                    'rgba(46, 204, 113, 0.7)'
                ],
                borderColor: [
                    'rgba(65, 105, 225, 1)',
                    'rgba(46, 204, 113, 1)'
                ],
                borderWidth: 1
            }]
        };
        
        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += formatCurrency(context.raw);
                                return label;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        };
        
        if (chart) {
            chart.data = data;
            chart.update();
        } else {
            chart = new Chart(chartCanvas, config);
        }
    }
    
    // Initial calculation
    calculateSIP();
    
    // Recalculate on button click or input change
    calculateBtn.addEventListener('click', calculateSIP);
    investmentInput.addEventListener('input', calculateSIP);
    periodInput.addEventListener('change', calculateSIP);
    returnInput.addEventListener('input', calculateSIP);
});