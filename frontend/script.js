document.addEventListener("DOMContentLoaded", function () {
    // Preserve original chatbot functionality
    
    const sidebar = document.querySelector(".sidebar");
    const dashboard = document.querySelector(".dashboard");

    

    // Consolidated API calls for data rendering
    fetchDataAndRender();
});



function fetchDataAndRender() {
    // --- Fetch and Render Cumulative Churn Chart ---
    fetch('http://localhost:5000/api/cumulative_churn')
        .then(response => response.json())
        .then(data => {
            renderCumulativeChurnChart(data.cumulative_churn);
        })
        .catch(error => console.error('Error fetching churn data:', error));

    // --- Fetch and Log Cumulative CHI (Average) (Optional) ---
    fetch('http://localhost:5000/api/cumulative_chi')
        .then(response => response.json())
        .then(data => {
            console.log("Cumulative CHI (Average):", data.cumulative_chi);
            // Optionally, you could render an average CHI chart here.
        })
        .catch(error => console.error('Error fetching cumulative CHI data:', error));

    // --- Fetch and Render Engagement Velocity Score (EVS) ---
    fetch('http://localhost:5000/api/engagement_velocity')
        .then(response => response.json())
        .then(data => {
            renderCumulativeEVSChart(data.cumulative_evs);
        })
        .catch(error => console.error('Error fetching EVS data:', error));

    // --- Fetch and Render Individual CHI Data for Multi-User Comparison ---
    fetch('http://localhost:5000/api/individual_chi')
        .then(response => response.json())
        .then(data => {
            renderCHIBarChart(data.individual_chi);
            if (data.individual_chi && data.individual_chi.length > 0) {
                // Render gauge for the first customer as an example
                renderIndividualCHIGauge(data.individual_chi[0].CHI, data.individual_chi[0].CustomerID);
            }
        })
        .catch(error => console.error('Error fetching individual CHI data:', error));

    // --- Fetch and Render Individual Payment Behavior Data (Heat Map Table) ---
    fetch('http://localhost:5000/api/individual_payment_behavior')
        .then(response => response.json())
        .then(data => {
            renderPaymentBehaviorTable(data.individual_pbi);
        })
        .catch(error => console.error('Error fetching Payment Behavior data:', error));
}

/* ---------------------------
   Render: Cumulative Churn Chart (Doughnut)
----------------------------*/
function renderCumulativeChurnChart(churnValue) {
    const container = document.getElementById('graph1');
    if (!container) return;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const canvas = document.createElement('canvas');
    canvas.id = 'cumulativeChurnChart';
    canvas.style.width = '100%';
    canvas.style.maxHeight = '250px';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Churn', 'Retention'],
            datasets: [{
                data: [churnValue, 100 - churnValue],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Cumulative Churn Prediction' }
            }
        }
    });
}

/* ---------------------------
   Render: Individual CHI Gauge (Per User)
   Gauge Meter with color zones:
     0–40: Red (At Risk)
     41–70: Yellow (Caution)
     71–100: Green (Healthy)
----------------------------*/
function renderIndividualCHIGauge(chiValue, customerID) {
    const container = document.getElementById('graph3'); // Gauge container (section8)
    if (!container) return;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const canvas = document.createElement('canvas');
    canvas.id = 'individualCHIGauge';
    canvas.style.width = '100%';
    canvas.style.height = '200px';
    canvas.style.maxHeight = '200px';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    const getGaugeColor = (value) => {
        if (value >= 71) return 'rgba(75, 192, 192, 1)'; // Green
        if (value >= 41) return 'rgba(255, 206, 86, 1)'; // Yellow
        return 'rgba(255, 99, 132, 1)'; // Red
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['CHI', 'Remaining'],
            datasets: [{
                data: [chiValue, 100 - chiValue],
                backgroundColor: [
                    getGaugeColor(chiValue),
                    'rgba(224, 224, 224, 0.6)'
                ],
                borderWidth: 2,
                borderColor: [
                    getGaugeColor(chiValue),
                    'rgba(224, 224, 224, 1)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            rotation: 270,
            circumference: 180,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: `Customer ${customerID} CHI Gauge`,
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: { enabled: false }
            }
        },
        plugins: [{
            id: 'gaugeValue',
            afterDraw: (chart) => {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = getGaugeColor(chiValue);
                ctx.fillText(`${chiValue}%`, width / 2, height - 40);
                ctx.restore();
            }
        }]
    });
}

/* ---------------------------
   Render: CHI Ranking Bar Chart (Multi-User Comparison)
   Bar chart ranking users by CHI
----------------------------*/
function renderCHIBarChart(individualData) {
    const container = document.getElementById('graph2'); // Ranking container (section9)
    if (!container) return;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const canvas = document.createElement('canvas');
    canvas.id = 'chiBarChart';
    canvas.style.width = '100%';
    canvas.style.height = '300px';
    canvas.style.maxHeight = '300px';
    container.appendChild(canvas);
    
    if (!individualData || individualData.length === 0) {
        const ctx = canvas.getContext('2d');
        ctx.font = '14px Arial';
        ctx.fillText('No CHI data available', 20, 50);
        return;
    }
    
    const labels = individualData.map(item => `${item.CustomerID}`);
    const chiValues = individualData.map(item => item.CHI);
    
    const getBarColor = (value) => {
        if (value >= 71) return 'green';
        if (value >= 41) return 'yellow';
        return 'red';
    };
    
    const barColors = chiValues.map(val => getBarColor(val));
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Customer Health Index (CHI)',
                data: chiValues,
                backgroundColor: barColors,
                borderColor: barColors,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'CHI Ranking (Higher is Healthier)',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'CHI Score',
                        font: { weight: 'bold', size: 14 }
                    }
                }
            },
            layout: {
                padding: { left: 10, right: 10, top: 0, bottom: 10 }
            }
        }
    });
}

/* ---------------------------
   Render: Cumulative EVS Chart (Doughnut)
----------------------------*/
function renderCumulativeEVSChart(evsValue) {
    const container = document.getElementById('graph4');
    if (!container) return;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const canvas = document.createElement('canvas');
    canvas.id = 'cumulativeEVSChart';
    canvas.style.width = '100%';
    canvas.style.height = '250px';
    canvas.style.maxHeight = '250px';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    const getEvsColor = (value) => {
        if (value >= 70) return 'rgba(54, 162, 235, 1)';
        if (value >= 40) return 'rgba(255, 206, 86, 1)';
        return 'rgba(255, 99, 132, 1)';
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['EVS', 'Remaining'],
            datasets: [{
                data: [evsValue, 100 - evsValue],
                backgroundColor: [
                    getEvsColor(evsValue),
                    'rgba(224, 224, 224, 0.6)'
                ],
                borderColor: [
                    getEvsColor(evsValue),
                    'rgba(176, 176, 176, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Cumulative Engagement Velocity Score',
                    font: { size: 16, weight: 'bold' }
                }
            },
            cutout: '70%'
        },
        plugins: [{
            id: 'evsValue',
            afterDraw: (chart) => {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = 'bold 28px Arial';
                ctx.fillStyle = getEvsColor(evsValue);
                ctx.fillText(`${evsValue}%`, width / 2, height / 2);
                ctx.font = '14px Arial';
                ctx.fillStyle = '#333';
                ctx.fillText('EVS Score', width / 2, height / 2 + 25);
                ctx.restore();
            }
        }]
    });
}

/* ---------------------------
   Render: Payment Behavior Heat Map Table
   Table listing users with color-coded Payment Behavior Index (PBI)
----------------------------*/
function renderPaymentBehaviorTable(individualData) {
    const container = document.getElementById('graph5');
    if (!container) return;
    container.innerHTML = ""; // Clear previous content

    // Create table element
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['CustomerID', 'Payment Behavior Index (PBI)', 'Rating'].forEach(headerText => {
        const th = document.createElement('th');
        th.innerText = headerText;
        th.style.border = '1px solid #ccc';
        th.style.padding = '8px';
        th.style.backgroundColor = '#f4f4f4';
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    individualData.forEach(item => {
        const row = document.createElement('tr');
        
        // CustomerID cell
        const cellID = document.createElement('td');
        cellID.innerText = item.CustomerID;
        cellID.style.border = '1px solid #ccc';
        cellID.style.padding = '8px';
        row.appendChild(cellID);
        
        // PBI value cell
        const cellPBI = document.createElement('td');
        const pbiValue = item.PBI.toFixed(2);
        cellPBI.innerText = pbiValue;
        cellPBI.style.border = '1px solid #ccc';
        cellPBI.style.padding = '8px';
        // Set background color based on thresholds
        if (item.PBI >= 80) {
            cellPBI.style.backgroundColor = 'lightgreen';
        } else if (item.PBI >= 60) {
            cellPBI.style.backgroundColor = 'lightblue';
        } else if (item.PBI >= 40) {
            cellPBI.style.backgroundColor = 'khaki';
        } else {
            cellPBI.style.backgroundColor = 'salmon';
        }
        row.appendChild(cellPBI);
        
        // Rating cell
        const cellRating = document.createElement('td');
        cellRating.style.border = '1px solid #ccc';
        cellRating.style.padding = '8px';
        if (item.PBI >= 80) {
            cellRating.innerText = 'Excellent';
        } else if (item.PBI >= 60) {
            cellRating.innerText = 'Good';
        } else if (item.PBI >= 40) {
            cellRating.innerText = 'Average';
        } else {
            cellRating.innerText = 'Needs Attention';
        }
        row.appendChild(cellRating);
        
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    container.appendChild(table);
}
