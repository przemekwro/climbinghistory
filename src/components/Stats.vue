<template>
    <div class="shadow d-flex flex-column pt-2">
        <h2 class="shadow-sm pb-2">Your stats</h2>
        <div class="p-2">
            <h5>Best TR: V{{bestTR}}</h5>
            <h5>Best Lead: V{{bestLead}}</h5>
            <h5>Last ascend: {{ lastAscend | moment("DD.MM.YYYY") }}</h5>
            <h5>All ascends: {{allAscends}}</h5>
        </div>
    </div>
</template>

<script>
    import state from '@/store'

    export default {
        name: 'historyList',
        props: ['formatDate'],
        data() {
            return {
                climbingHistory: null,
                loaded: false,
            }
        },
        computed: {
            bestLead() {
                let all = state.getters.getHistoryClimbing
                let best = -1
                all.forEach(i=>{
                    if(i.data()['grade'] > best && i.data()['style'] == 'Lead')
                        best = i.data()['grade']
                })
                return best
            },
            bestTR() {
                let all = state.getters.getHistoryClimbing
                let best = -1
                all.forEach(i=>{
                    if(i.data()['grade'] > best &&  i.data()['style'] == 'Top Rope')
                        best = i.data()['grade']
                })
                return best
            },
            lastAscend(){
                let all = state.getters.getHistoryClimbing
                let last = new Date(2000,1,1)
                all.forEach(i=>{
                    let current = new Date(i.data()['date']['seconds']*1000)
                    if(last < current)
                        last = current
                })
                return last
            },
            allAscends(){
                let all = state.getters.getHistoryClimbing
                let i = 0
                all.forEach(function () {
                    i++;
                })
                return i
            },
        },
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


</style>
