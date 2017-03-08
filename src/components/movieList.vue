<template>
    <div class="movie-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="1">
        <ul>
            <li v-for="moive in moives">
                <router-link :to="{name: 'moviedetail',params: {id: moive.id}}">
                    <div class="cover"><img v-bind:src="moive.images.medium" alt=""></div>
                    <div class="info"><h3>{{moive.title}}</h3></div>
                </router-link>
            </li>
        </ul>
        <div class="loading" v-if="busy">{{text}}</div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import infiniteScroll from 'vue-infinite-scroll'
    Vue.use(infiniteScroll)
    export default {
        data(){
            return {
                moives:[],
                busy: false,
                text:'loading...',
                count:0
            }
        },
        directives: {infiniteScroll},
        methods: {
            loadMore: function() {
                let _this=this;
                _this.busy = true;
                axios.get('/api/movie/in_theaters?start='+this.count+'&count=10')
                    .then((response) => {
                    if(response.data.subjects.length!=0){
                        _this.busy = false;
                        _this.moives=_this.moives.concat(response.data.subjects);
                        this.count+=10;
                    }else{
                        this.text='no more...'
                        return
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

            }
        }
    }
</script>
<style lang="scss">
.movie-list{
    width:100%;
    ul{
        width:100%;
        display:block;
        box-sizing:border-box;
        padding:10px;
        font-size:0;
    }
    ul:after{
        width:100%;
        content:'';
        height:1px;
        clear:both;
        display:block;
    }
    ul li{
        width:33.333%;
        display:inline-block;
        text-align:center;
        color:#000;
        box-sizing:border-box;
        padding:5px;
        float:left;
        a{
            display:block;
        }
    }
    ul li .cover{width:100%;max-height:150px;overflow:hidden;}
    ul li .cover img{width:100%;height:auto;display:block;}
    .loading{
        width:100%;
        height:30px;
        text-align:center;
        color:#f00;
        line-height:30px;
    }
    ul li .info{
        width:100%;
        display:block;
    }
    ul li .info h3{
        width:100%;
        text-align:center;
        color:#000;
        display:block;
        font-size:14px;
        font-weight: normal;
        height:45px;
        line-height:24px;
    }
}
</style>
