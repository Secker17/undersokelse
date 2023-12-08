document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('surveyForm');
    const totalPointsSpan = document.getElementById('totalPoints');
    let totalPoints = 0;

    form.addEventListener('input', function (e) {
        if (e.target.type === 'number') {
            totalPoints = Array.from(form.querySelectorAll('input[type="number"]'))
                .reduce((sum, input) => sum + Number(input.value), 0);
            totalPointsSpan.textContent = totalPoints;
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (totalPoints !== 100) {
            alert('Totalt poeng må være 100');
            return;
        }

        const dataPoints = Array.from(form.querySelectorAll('input[type="number"]'))
            .map(input => ({ label: input.name, value: Number(input.value) }));
        drawChart(dataPoints);
    });

    function drawChart(dataPoints) {
        const ctx = document.getElementById('resultChart').getContext('2d');
        const labels = dataPoints.map(dp => dp.label);
        const data = dataPoints.map(dp => dp.value);
        
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Poengfordeling',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Poengfordeling per Kategori'
                    }
                }
            }
        });
    }
});

