<template>
    <div class="history">
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
                <div class="col"></div>
            </div>
        </div>
        <div class="historyList">
            <transition-group v-if="loaded" name="fade" :style="{ '--total': climbingHistory.length }" appear>
                <div v-for="(history,i) in climbingHistory" :key="history.id" :style="{'--i':i}"
                     class="historyElement shadow-sm">
                    <div class=" row align-items-center">

                        <div class="col m-3">
                            <p class="m-0">V{{history.data()['grade']}}</p>
                        </div>

                        <div class="col m-3">
                            <p class="m-0">{{history.data()['style']}}</p>
                        </div>

                        <div class="col m-3">
                            <p class="m-0">{{ history.data()['date']['seconds']*1000 | moment("DD.MM.YYYY") }}</p>
                        </div>
                        <div class="col m-3">
                            <v-btn icon @click="removeAscend(history.id)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import {db} from '@/main'
    import state from '@/store'

    export default {
        name: 'historyList',
        data() {
            return {
                climbingHistory: null,
                loaded: false,
            }
        },
        components: {
        },
        computed: {
            date() {
                let date = new Date(date.data()['date']['seconds'] * 1000)
                let day = date.getDate()
                let month = date.getMonth() + 1
                let year = date.getFullYear()
                let fulldate = day + '.' + month + '.' + year
                return fulldate
            }
        },
        methods: {
            removeAscend(history) {
                db.collection('history')
                    .doc(history)
                    .delete().then(function () {
                })
                this.getHistory()
            },
            async getHistory() {
                let climbingHistory = []
                await db.collection('history').get().then(data => {
                    data.forEach(data => {
                        climbingHistory.push(data)
                    })
                    this.climbingHistory = climbingHistory
                    state.commit('setHistoryClimbing',climbingHistory)
                    this.loaded = true
                })
            }
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

    .historyList {
        max-height: 70vh;
        min-height: 70vh;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .historyElement:hover{
        background: #efefef;
        font-size: 20px;
    }
</style>
