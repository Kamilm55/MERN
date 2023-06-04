const tokenCookie = () => {
    if(document){
        const cookies = document.cookie;
        const token = cookies.split(";").find(cookie=>cookie.includes("token="));
        return token;
    }
    return null;
}


export default tokenCookie