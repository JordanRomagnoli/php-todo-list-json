const { createApp } = Vue;

createApp({
    data(){
        return{
            newTask: '',
            task: [],
        };
    },
    methods: {

        toggleDrop(index) {
            this.task[index].status = !this.task[index].status;
        },

        addTodo(){
            axios
                .post('http://localhost/Lezione_08_02_24/php-todo-list-json/BACKEND/addTask.php',
                {
                    task: this.newTask,
                    status: false
                },
                {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                })
                .then((res) =>{
                    if(res.data.code == 200){
                       this.task.push({task: this.newTask, status: false});
                    }
                    this.newTask = '';
                });
        }
            
    },
    created(){
        axios.get('http://localhost/Lezione_08_02_24/php-todo-list-json/BACKEND/task.php')
        .then((res)=>{
            console.log(res);
            this.task = res.data;
        });

    }
}).mount('#app');