import {Line} from 'vue-chartjs'

export default {
    extends: Line,
    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart({
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                max: 100,
                                stepSize: 25,
                            }
                        }]
                },
                responsive: true,
                maintainAspectRatio: false
            },
            labels: [1,2,3,4,5,6,7,8,9,10],
            datasets: [
                {
                    label: 'V-scale',
                    backgroundColor: '#f87979',
                    data: [1, 8, 6, 3, 1, 4, 3, 8, 4,11]
                }
            ],
        })
    }
}
