import { Todo } from "./todo.class";


export class TodoList {

    constructor(){
        // this.todos = [];
        this.cargarLocalStorage();
    }

    //METODOS
    
    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        this.todos = this.todos.filter( todo => todo.id != id )
        this.guardarLocalStorage();
    }

    marcarCompletado( id ){
        
        for(const todo of this.todos){
            if( todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados(){
        
         this.todos = this.todos.filter( todo => !todo.completado )
         this.guardarLocalStorage();

    }

    //Local Storage permite la persistencia de los datos en el navegador del cliente
    guardarLocalStorage(  ){

        //STRINGIFY guarda la informacion en LocalStorage 
        localStorage.setItem('todo', JSON.stringify(this.todos));
        this.cargarPendientes();

    }

    cargarLocalStorage( ){

        this.todos = ( localStorage.getItem('todo') ) 
                            ? JSON.parse(localStorage.getItem('todo'))
                            : [];
                            
        this.todos = this.todos.map( Todo.fromJson );

    }

    cargarPendientes(){
 

        let cont = 0;
        for (const elemento of this.todos){
            //console.log(elemento.completado);
            if (!elemento.completado){
                cont ++;
            }
        }
        //console.log(cont);
        return cont;
    }


}