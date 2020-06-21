<template>
    <div class="add container">
        <div class="row mt-4 justify-content-center">
            <div class="col-lg-4 col-md-12">
                <div class="shadow d-flex flex-column pt-2 bg-white">
                    <h2 class="shadow-sm pb-2">Add new ascend</h2>
                    <div class="pb-3">
                        <h5>Grade:</h5>
                        <div id="addroutes" class="d-flex justify-content-around">
                            <div>
                                <v-btn icon @click="decreaseGrade">
                                    <v-icon large>mdi-arrow-left-drop-circle</v-icon>
                                </v-btn>
                            </div>
                            <div>
                                <span class="text row justify-content-center align-content-center ">V{{grade}}</span>
                            </div>
                            <div>
                                <v-btn icon color="red" @click="increaseGrade">
                                    <v-icon large>mdi-arrow-right-drop-circle</v-icon>
                                </v-btn>
                            </div>
                        </div>
                        <h5 class="mt-3">Style:</h5>
                        <div class="row d-flex justify-content-center m-2 mb-4">
                            <div>
                                <input type="radio" v-model="picked" id="lead" value="Lead">
                                <label for="lead"> Lead</label>
                            </div>
                            <div>
                                <input type="radio" v-model="picked" id="tr" value="Top Rope">
                                <label for="tr"> Top Rope</label>
                            </div>
                        </div>

                        <v-btn @click="addAscend" tile>Add ascent</v-btn>
                        <v-overlay v-if="overlay" absolute>
                            <div class="overlay col-lg-12 no-gutters p-0">
                                <h1 class="shadow-sm p-2 pr-5 pl-5">Added:</h1>
                                <div class="p-2">
                                    <div class="m-2">
                                        <h5>Grade: V{{grade}}</h5>
                                        <h5>Style: {{picked}}</h5>
                                    </div>
                                    <div>
                                        <v-btn class="m-3" @click="back" tile>Next</v-btn>
                                        <v-btn class="m-3" @click="toHome" tile>Home</v-btn>
                                    </div>
                                </div>
                            </div>
                        </v-overlay>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {db} from '@/main'

    export default {
        name: 'grade',
        components: {},
        data() {
            return {
                grade: 5,
                picked: 'Lead',
                overlay: false,
            }
        },
        methods: {
            increaseGrade() {
                if (this.grade < 15)
                    this.grade += 1
            },
            decreaseGrade() {
                if (this.grade > 0) {
                    this.grade -= 1
                }
            },
            async addAscend() {
                this.overlay = ! this.overlay
                await db.collection("history").doc().set({
                    grade: this.grade,
                    style: this.picked,
                    date: new Date()
                })
            },
            toHome(){
                this.$router.push('/')
            },
            back(){
                this.grade = 5
                this.picked = 'Lead'
                this.overlay = !this.overlay
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

    .v-btn:focus {
        outline: 0;
    }

    #addroutes {
        span {
            user-select: none;
        }

        .text {
            font-size: 30px;
        }

        .buttons {
            background: #4e555b;
            width: 50px;
            max-width: 50px;
            height: 50px;
            color: #ffffff;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            font-size: 20px;
        }

        .buttons:hover {
            background: #2c3e50;
            font-size: 30px;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
        transition-delay: calc((0.05s * var(--i)));

    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    /* radio */
    input[type=radio] {
        position: absolute;
        visibility: hidden;
        display: none;
        user-select: none;
    }

    label {
        display: inline-block;
        cursor: pointer;
        font-weight: bold;
        padding: 5px 20px;
        user-select: none;
        color: #2c3e50;
    }

    label:hover {
        background: #EFEFEF;
    }

    input[type=radio]:checked + label {
        color: black;
        background: #4e555b;
        color: #fff;
    }

    .v-overlay {
        h5 {
            color: #2c3e50;
        }

        h1 {
            color: #2c3e50;
        }

        .v-btn {
            background: #2c3e50;
        }

        .overlay {
            background: rgba(255, 255, 255, 1);
        }

        background: rgba(239, 239, 239, 0.8);
    }
</style>
