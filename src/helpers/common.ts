const setVerfiedUser = (data: any) => {  
    if(data?.token) {
        localStorage.setItem('token', data.token);
        // localStorage.setItem('user', JSON.stringify(data.user));
        // localStorage.setItem('role', data.role);
        localStorage.setItem('isLoggedIn', 'true');
    }else{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}

export { setVerfiedUser };