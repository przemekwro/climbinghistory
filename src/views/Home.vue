<template>
    <div class="home container">
        <div class="row mt-4 no-gutters">
            <div class="col-lg-4 col-md-12 mb-5 pr-lg-3">
                <Stats class="bg-white"></Stats>
                <div class="shadow d-flex flex-column mt-5 pt-2 bg-white">
                    <h2 class="shadow-sm pb-2 bg-white">Top 10:</h2>
                    <div class="bg-white" style="min-height: 380px">
                        <Chart  height="400" v-if="loaded" :chartData="chartData"></Chart>
                    </div>
                </div>

            </div>
            <div class="col-lg-8 col-md-12 pl-lg-3 ">
                <div id="historyList" class="shadow pt-2 bg-white">
                    <div class="history">
                        <historyList id="city_list"></historyList>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import state from '@/store'
    import historyList from "@/components/historyList"
    import Chart from '@/components/Chart'
    import Stats from '@/components/Stats'
    import {db} from "@/main";

    export default {
        name: 'Home',
        data() {
            return {
                chartData: [[], []],
                loaded: false,
            }
        },
        components: {
            historyList,
            Chart,
            Stats,
        },
        mounted() {
            this.getHistory()
        },
        methods: {
            async getHistory() {
                let climbingHistory = []
                await db.collection('history').get().then(data => {
                    data.forEach(data => {
                        climbingHistory.push(data)
                    })
                    this.climbingHistory = climbingHistory
                    state.commit('setHistoryClimbing',this.climbingHistory)

                    //data to chart
                    climbingHistory.sort(this.sortByBest)
                    climbingHistory.splice(10)
                    climbingHistory.sort(this.sortByTime)
                    climbingHistory.forEach(a => {
                        this.chartData[0].push(a.data()['grade'])
                        let date =new Date(a.data()['date']['seconds']*1000)
                        this.chartData[1].push(date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear())
                    })
                    this.loaded=true
                })
            },
            sortByBest(a, b) {
                if (a.data()['grade'] < b.data()['grade']) return 1
                if (a.data()['grade'] > b.data()['grade']) return -1
                else return 0
            },
            sortByTime(a, b){
                if (a.data()['date'] < b.data()['date']) return 1
                if (a.data()['date'] > b.data()['date']) return -1
                else return 0
            }
        },
    }
</script>

<style lang="scss" scoped>
    @media (max-width: 575px) {
        .container {
            padding-left: 0;
            padding-right: 0;
            margin-left: 0;
            margin-right: 0;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
        transition-delay: calc((0.08s * var(--i)) + 0.2s);

    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
