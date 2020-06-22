<template>
    <div class="history">
        <h2 class="shadow-sm m-0 pb-2">Ascent history:</h2>
        <div class="shadow-sm row no-gutters">
            <div class="row no-gutters col-12 pr-lg-3">
                <div class="col-3">
                    <div class="row d-flex justify-content-center no-gutters">
                        <v-btn @click="sortByGradeIncrease" small icon>
                            <v-icon class="col-12 m-sm-0">mdi-chevron-double-up</v-icon>
                        </v-btn>
                        <span class="col-12 m-sm-0">Grade</span>
                        <v-btn @click="sortByGradeDecrease" small icon>
                            <v-icon class="col-12 m-sm-0">mdi-chevron-double-down</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row d-flex align-content-center justify-content-center no-gutters">
                        <v-btn @click="sortByStyleIncrease" small icon>
                            <v-icon class="col-12 m-0">mdi-chevron-double-up</v-icon>
                        </v-btn>
                        <span class="col-12 m-0"> Style </span>
                        <v-btn @click="sortByStyleDecrease" small icon>
                            <v-icon class="col-12 m-0">mdi-chevron-double-down</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row d-flex justify-content-center no-gutters">
                        <v-btn @click="sortByDateIncrease" small icon>
                            <v-icon class="col-12 m-sm-0">mdi-chevron-double-up</v-icon>
                        </v-btn>
                        <span class="col-12 m-sm-0 p-0">Date</span>
                        <v-btn @click="sortByDateDecrease" small icon>
                            <v-icon class="col-12 m-sm-0">mdi-chevron-double-down</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div class="col-1">
                </div>
            </div>
        </div>
        <div class="historyList">
            <div v-if="loaded">
                <transition-group
                        name="staggered-fade"
                        tag="div"
                        :css="false"
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @leave="leave">
                    <div v-for="(history, i) in list" :key="history.id"
                         class="historyElement shadow-sm pt-2 pb-3">
                        <div class="row align-items-center">
                            <div class="col-3">
                                <p class="m-0">V{{history.data()['grade']}}</p>
                            </div>

                            <div class="col-4">
                                <p class="m-0">{{history.data()['style']}}</p>
                            </div>

                            <div class="col-3">
                                <p class="m-0">{{ history.data()['date']['seconds']*1000 | moment("DD.MM.YYYY") }}</p>
                            </div>
                            <div class="col-1">
                                <v-btn icon @click="removeAscend(history.id,i)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    import {db} from '@/main'
    import state from '@/store'
    import Velocity from 'velocity-animate'

    const ELEMENT_DELAY = 64

    export default {
        name: 'historyList',
        data() {
            return {
                climbingHistory: null,
                loaded: false,
            }
        },
        components: {},

        computed: {
            date() {
                let date = new Date(date.data()['date']['seconds'] * 1000)
                let day = date.getDate()
                let month = date.getMonth() + 1
                let year = date.getFullYear()
                let fulldate = day + '.' + month + '.' + year
                return fulldate
            },
            list() {
                return this.climbingHistory
            }

        },

        methods: {
            beforeEnter (el) {
                el.style.opacity = 0
                el.style.height = 0
            },
            enter (el, done) {
                const delay = el.dataset.index * ELEMENT_DELAY
                const nodeHeight = el.scrollHeight + 'px'
                setTimeout(() => {
                    console.log('height', nodeHeight)
                    Velocity(el, {
                        opacity: 1,
                        height: nodeHeight,
                        complete: done
                    })
                }, delay)
            },
            leave (el, done) {
                const delay = el.dataset.index * ELEMENT_DELAY
                setTimeout(() => {
                    Velocity(el, {
                        opacity: 0,
                        height: 0,
                        complete: done
                    })
                }, delay)
            },

            removeAscend(index, i) {
                db.collection('history')
                    .doc(index)
                    .delete().then(function () {
                })
                this.list.splice(i, 1);
            },
            async getHistory() {
                let climbingHistory = []
                await db.collection('history').get().then(data => {
                    data.forEach(data => {
                        climbingHistory.push(data)
                    })
                    state.commit('setHistoryClimbing', climbingHistory)
                    this.sortByDateDecrease()
                    this.loaded = true
                })
            },

            sortByDateDecrease() {
                this.climbingHistory = []
                let climbingHistory = state.getters.getHistoryClimbing
                climbingHistory.sort(function (a, b) {
                    if (a.data()['date'] < b.data()['date']) return 1
                    if (a.data()['date'] > b.data()['date']) return -1
                    else return 0
                })
                setTimeout(() => {
                    this.climbingHistory = climbingHistory
                }, 0)


            },

            sortByDateIncrease() {
                this.climbingHistory = []
                let climbingHistory = state.getters.getHistoryClimbing
                climbingHistory.sort(function (a, b) {
                    if (a.data()['date'] < b.data()['date']) return -1
                    if (a.data()['date'] > b.data()['date']) return 1
                    else return 0
                })
                setTimeout(() => {
                    this.climbingHistory = climbingHistory
                }, 0)
            },

            sortByGradeDecrease() {
                this.climbingHistory = []
                let climbingHistory = state.getters.getHistoryClimbing
                climbingHistory.sort(function (a, b) {
                    if (a.data()['grade'] < b.data()['grade']) return 1
                    if (a.data()['grade'] > b.data()['grade']) return -1
                    else return 0
                })
                setTimeout(() => {
                    this.climbingHistory = climbingHistory
                }, 0)
            },

            sortByGradeIncrease() {
                this.climbingHistory = []
                let climbingHistory = state.getters.getHistoryClimbing
                climbingHistory.sort(function (a, b) {
                    if (a.data()['grade'] < b.data()['grade']) return -1
                    if (a.data()['grade'] > b.data()['grade']) return 1
                    else return 0
                })
                setTimeout(() => {
                    this.climbingHistory = climbingHistory
                }, 0)
            },

            sortByStyleDecrease() {
                this.climbingHistory = []
                let climbingHistory = state.getters.getHistoryClimbing
                climbingHistory.sort(function (a, b) {
                    if (a.data()['style'] < b.data()['style']) return 1
                    if (a.data()['style'] > b.data()['style']) return -1
                    else return 0
                })
                setTimeout(() => {
                    this.climbingHistory = climbingHistory
                }, 0)
            },

            sortByStyleIncrease() {
                this.climbingHistory = []
                let climbingHistory = state.getters.getHistoryClimbing
                climbingHistory.sort(function (a, b) {
                    if (a.data()['style'] < b.data()['style']) return -1
                    if (a.data()['style'] > b.data()['style']) return 1
                    else return 0
                })
                setTimeout(() => {
                    this.climbingHistory = climbingHistory
                }, 0)
            },
        },
        mounted() {
            this.getHistory()
        }
    }
</script>

<style scoped lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
        transition-delay: calc((0.08s * var(--i)) + 0.2s);

    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .v-btn {
        outline: none;
    }

    .historyList {
        max-height: 70vh;
        min-height: 70vh;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .historyElement:hover {
        background: #efefef;
        font-size: 20px;
    }
</style>
