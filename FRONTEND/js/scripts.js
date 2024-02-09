const { createApp } = Vue;

createApp({
    data(){
        return{
            newTask: '',
            task: [],
            taskForRemove: null,
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
        },

        removeTodo(i){
            
            if(this.newTask.length > 3){

                axios
                    .post('http://localhost/Lezione_08_02_24/php-todo-list-json/BACKEND/removeTask.php',
                    {
                        index: i,
                    },
                    {
                        headers: {
                            'Content-Type' : 'multipart/form-data'
                        }
                    })
                    .then((res) =>{
                        if(res.data.code == 200){
    
                            this.task.splice(i, 1);
                        }
                    });
            }
        },


            
    },
    mounted(){
        axios.get('http://localhost/Lezione_08_02_24/php-todo-list-json/BACKEND/task.php')
        .then((res)=>{
            console.log(res);
            this.task = res.data;
        });

    }
}).mount('#app');