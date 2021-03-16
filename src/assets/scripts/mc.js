import axios from 'axios';
import { Model, Collection } from 'vue-mc';
// import { test } from '../../components/Exam5/Exam5';

/**
 * Task model
 */
class Task extends Model {

    // Default attributes that define the "empty" state.
    defaults() {
        return {
            id: null,
            name: null,
            brewery_type: null,
            street: null,
            address_2: null,
            address_3: null,
            city: null,
            state: null,
            county_province: null,
            postal_code: null,
            country: null,
            longitude: null,
            latitude: null,
            phone: null,
            website_url: null,
            updated_at: null,
            created_at: null,
            test: true,
        }
    }

    // Route configuration
    routes() {
        return {
            fetch: '/task/{id}',
            save:  'http://localhost:8080/',
            delete: '/task/{id}'
        }
        //save는 따로 진짜 저장하기보단 기능을 제공하는지를 보기
    }
    save(test){
        localStorage.setItem('key', test);
    }
}

/**
 * Task collection
 */
class TaskList extends Collection { 

    // Model that is contained in this collection.
    model() {
        return Task;
    }

    // Default attributes
    defaults() {
        return {
            orderBy: 'name',
        }
    }

    options(){
        return{
            page: 1,
            perPage: 25,
        }
    }

    // Route configuration
    routes() {
        return {
            // fetch: url,
            fetch: 'https://api.openbrewerydb.org/breweries'
        }
    }
    // routeparameter url작성시 routeparameter로 편집가능 -> getRouterParameter 사용하려 했으나 잘 되지 않음 => options에 값 변수 만든 후 config.url을 재구성해주는 것으로 구현
    // options-> page 페이지네이션 -> 구현완료

    // 얘는 fetch하면 자동으로 실행됨
    createRequest(config){
        console.log(config);
        config.url = `${this.getRoute('fetch')}?page=${this.getOptions().page}&per_page=${this.getOptions().perPage}`;
        return{
            send:() => axios(config.url).then(res =>({
                getData: () => res.data,
                getStatus: () => res.status,
            }))
        }
    }

    // async fetch(){
    //     const test = await axios.get('https://api.openbrewerydb.org/breweries');
    //     //getRoute
    //     this.add(test.data);
    // }

    // Number of tasks to be completed.
    get todo() {
        return this.sum('done');
    }

    // Will be `true` if all tasks have been completed.
    get done() {
        return this.todo == 0;
    }
}

export let tasks = new TaskList();
tasks.fetch();
// export { tasks }