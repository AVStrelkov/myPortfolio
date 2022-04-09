import Vue from "vue";

const thumbs = {
    props:["works", "currentWork"],
    template: "#previews-thumbs"
}

const btns = {
    template: "#previews-btn"
}

const display = {
    props: ["currentWork", "works", "currentIndex"],
    template: "#previews-display",
    components: { thumbs, btns },
    computed: {
        reversedWorks(){
            const works = [...this.works];
            return works.slice(0, 4).reverse();
        }
    },
}

const tags = {
    props:["tags"],
    template: "#previews-tag"
}

const info = {
    props: ["currentWork"],
    template: "#previews-info",
    components: { tags },
    computed: {
        tagsArray(){
            return this.currentWork.skills.split(",");
        }
    },
}

new Vue({
    el: "#preview-component",
    template: "#previews-container",
    components: { display, info },
    data() {
        return {
            works: [],
            currentIndex: 0
        }
    },
    computed: {
        currentWork(){
            return this.works[0];
        }
    },
    watch: {
        currentIndex(value){
            this.makeInfiniteLoopForNdx(value);
        }
    },
    methods: {
        makeInfiniteLoopForNdx(index){
            const worksNumber = this.works.length - 1;
            if (index < 0) this.currentIndex = worksNumber;
            if (index > worksNumber) this.currentIndex = 0;
        },
        requireImagesToArray(data) {
            return data.map(item => {
                const requireImage = require(`../images/content/${item.photo}`).default;
                item.photo = requireImage;
                return item
            });
        },
        slide(direction){
            const lastItem = this.works[this.works.length -1]
            switch(direction){
                case "left" :
                    this.works.push(this.works[0]);
                    this.works.shift();
                    this.currentIndex++;
                    break;
                case "right" :
                    this.works.unshift(lastItem);
                    this.works.pop();
                    this.currentIndex--;
                    break;
            }
        }
    },
    created() {
        const data = require("../data/works.json");
        this.works = this.requireImagesToArray(data);
    }
})