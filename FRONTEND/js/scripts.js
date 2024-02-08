const { createApp } = Vue;

createApp({
    data(){
        return{
            task: [],
        };
    },
    mounted(){
        axios.get('http://localhost/Lezione_08_02_24/php-todo-list-json/BACKEND/task.php')
        .then((res)=>{
            console.log(res);
            this.task = res.data;
        })
    }
}).mount('#app');