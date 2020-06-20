<template>
    <div class="historyList shadow-sm" @click="aaa">
        <div class="row align-items-center">
            <div class="col m-3">
                <p class="m-0">V{{history['grade']}}</p>
            </div>
            <div class="col m-3">
                <p class="m-0">{{history['style']}}</p>
            </div>
            <div class="col m-3">
                <p class="m-0">{{date}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'historyList',
        props: ['history'],
        methods: {
            aaa() {
                alert('asd')
            }
        },
        computed: {
            date(){
                let date = new Date(this.$props['history']['date']['seconds'] * 1000)
                let day = date.getDate()
                let month = date.getMonth() + 1
                let year = date.getFullYear()
                let fulldate = day + '.' + month + '.' + year
                console.log(fulldate)
                return fulldate
            }
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .historyList:hover {
        background: #EFEFEF;
        cursor: pointer;
    }

</style>
