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
            console.log("true");
            return {success: true, userId: res.data.userId};
        }
    } catch (error) {
        console.log(error);
    }
        console.log("false")
        return false;
}

export default getSession;