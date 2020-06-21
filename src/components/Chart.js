import {Line} from 'vue-chartjs'

export default {
    extends: Line,
    props:['chartData'],

    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart({
            labels: this.$props['chartData'][1],
            datasets: [
                {
                    label: 'V-scale',
                    backgroundColor: '#f87979',
                    data: this.$props['chartData'][0]
                }
            ],
        })
    }
}
