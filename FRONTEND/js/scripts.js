const { createApp } = Vue;

createApp({
    data(){
        return{
            newTask: '',
            task: [],
            taskForRemove: null,
            trueTask: true,
            input: false,
            editingIndex: null,
            inputVisible: false,
            editedTask: '',
        };
    },
    methods: {

        editTaskDb(i){
            axios
                .post('http://localhost/Lezione_08_02_24/php-todo-list-json/BACKEND/editTask.php',
                {
                    index : i,
                    taskEdited : this.editedTask,
                },
                {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                })
                .then((res) =>{
                    if(res.data.code == 200){

                        this.task[i].task = this.editedTask;
                        this.trueTask = true;
                        this.input = false;
                        this.editingIndex = null;
                        this.inputVisible = false;
                        this.editedTask = '';
                    }
                    
                });
        },

        editTask(index) {
            
            if (this.editingIndex === index) {
                this.editingIndex = null;
                this.inputVisible = false;
            } else {
                
                this.editingIndex = index;
                this.inputVisible = true;
            }
        },

        toggleDrop(i) {

            axios
                .post('http://localhost/Lezione_08_02_24/php-todo-list-json/BACKEND/changeStatus.php',
                {
                    index : i
                },
                {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                })
                .then((res) =>{
                    if(res.data.code == 200){

                        this.task[i].status = !this.task[i].status;
                    }
                    
                });

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