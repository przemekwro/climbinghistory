<template>
    <div class="home container">
        <div class="row mt-4 no-gutters ">
            <div class="col-lg-4 col-md-12 mb-5 pr-lg-3">
                <div class="shadow d-flex flex-column pt-2">
                    <h2 class="shadow-sm pb-2">Your stats</h2>
                    <div class="p-2">
                        <h5>Best tr: V11</h5>
                        <h5>Best lead: V5</h5>
                        <h5>Last ascend: 25.05.2019</h5>
                        <h5>Last week: V6</h5>
                    </div>
                </div>

                <div class="shadow d-flex flex-column mt-5 pt-2">
                    <h2 class="shadow-sm pb-2">Last month best:</h2>
                    <div class="p-2">
                        <Chart height="325"></Chart>
                    </div>
                </div>
            </div>

            <div class="col-lg-8 col-md-12 pl-lg-3">
                <div id="historyList" class="shadow pt-2">
                    <h2 class="shadow-sm m-0 pb-2">Ascent history:</h2>
                    <div class="pr-3 pl-3 pt-0 pb-0">
                        <div class="row shadow-sm">
                            <div class="col">
                                <span>Grade</span>
                            </div>
                            <div class="col">
                                <span>Style</span>
                            </div>
                            <div class="col">
                                <span>Date</span>
                            </div>
                        </div>
                    </div>
                    <div class="history">
                        <transition-group name="fade" :style="{ '--total': asd.length }" appear>
                            <historyList id="city_list" v-for="(history,i) in climbingHistory" :key="i"
                                         :history="history" :style="{'--i': i}"></historyList>
                        </transition-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import historyList from "@/components/historyList"
    import Chart from '@/components/Chart'
    import {db} from '@/main'

    export default {
        name: 'Home',
        data() {
            return {
                height: 325,
                asd: [1, 2, 3, 4, 5, 6, 7, 9, 10, 8],
                climbingHistory: []
            }
        },
        components: {
            historyList,
            Chart,
        },
        methods: {
            async getHistory() {

                console.log('asd')
                await db.collection('history').get().then(data => {
                    data.forEach(a => {
                        this.climbingHistory.push(a.data())
                    })
                })

            },


        },
        mounted() {
            this.getHistory()
        }
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

    .history {
        max-height: 70vh;
        min-height: 70vh;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .historyList:last-child {
        hr {
            display: none;
        }
    }
</style>
