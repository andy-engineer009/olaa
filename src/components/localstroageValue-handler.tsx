'use client';
import { setIsLoggedIn } from "@/store/userRoleSlice";
import { useDispatch } from "react-redux";

export default function LocalStorageValueHandler() {
    const dispatch = useDispatch();
    const isLoggedIn: any = localStorage.getItem('isLoggedIn');
    if (isLoggedIn == null || isLoggedIn == false) {
        dispatch(setIsLoggedIn(false));
    }else{
        dispatch(setIsLoggedIn(true));
    }

    return <></>;
}
            