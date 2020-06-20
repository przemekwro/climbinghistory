<template>
    <div id="app">
        <div id="nav" class="shadow">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">Add</router-link>
        </div>
            <transition enter-active-class="animated fade" leave-active-class="animated fade" mode="out-in" appear>
                <router-view/>
            </transition>

    </div>
</template>

<style lang="scss">
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
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
