<template>
    <div class="progress-card" :class="[ completed ? 'done' : 'notDone' ]">
        <h2>{{title}}</h2>
        <!-- <div class="icon">
            <i :class="[ completed ? done : notDone ]"></i>
        </div> -->
    </div>
</template>

<script>
export default {
    name: "QuizProgress",
    props: {
        title: String,
        completed: Boolean
    },
    // setup(){
    //     return{
    //         notDone: "fas fa-times",
    //         done: "fas fa-check"
    //     }
    // }
}
</script>

<style scoped>

    .done{
        background: #DCE35B;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #45B649, #DCE35B);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #45B649, #DCE35B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }
    .notDone{
        background: #e52d27;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #b31217, #e52d27);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #b31217, #e52d27); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }
    .progress-card{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 100%;
        width: 97.8rem;
        height: 12.7rem;
        box-shadow: 1px 2px 16px 2px rgba(0, 0, 0, 0.24);
        border-radius: 1.4rem;
        margin: 7rem auto;
        cursor: pointer;
        transition: .2s linear all;
    }
    .progress-card:hover{
        transform: translateY(-1rem);
    }
    h2{
        color: white;
        font-weight: normal;
        font-size: 4.9rem;
        text-align: center;
        text-transform: capitalize;
    }
    .icon{
        position: absolute;
        right: 0;
        width: 17.7rem;
        height: 100%;
        background: #181824;
        border-radius: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /* i{
        color: white;
        font-size: 8rem;
    } */
    @media (max-width: 550px) {
        h2{
            font-size: 3.5rem;
        }
    }
</style>