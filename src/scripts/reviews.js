import Vue from "vue"
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'

new Vue({
    el: "#reviews-component",
    template: "#reviews-container",
    // components: {
    //     Swiper,
    //     SwiperSlide
    //   },
    data(){
        return{
            reviews: [],
            sliderOptions: {

            }
        }
    },
    methods: {
        reviewsImagesToArray(data){
            return data.map(item => {
                const requireImage = require(`../images/content/${item.pic}`).default;
                item.pic = requireImage;
                return item
            });
        }
    },
    created(){
        const data = require("../data/reviews.json");
        this.reviews = this.reviewsImagesToArray(data);
    }
})