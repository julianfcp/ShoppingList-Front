import axios from 'axios';

const getSession = async () => {
    try {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:4000/api/sessionResponse',
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
            }
            
        });
        if(res.data.success) {
            const res2 = await axios.post('http://localhost:4000/api/user/getUserName',{userId: res.data.userId});
            return {success: true, userId: res.data.userId, userName: res2.data.userName};
        }
    } catch (error) {
        console.log(error);
    }
        console.log("false")
        return false;
}

export default getSession;