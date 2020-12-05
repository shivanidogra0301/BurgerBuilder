import axios from 'axios'

const instance=axios.create({
    baseURL: "https://react-burger-app-c99da.firebaseio.com/"
})


export default instance;