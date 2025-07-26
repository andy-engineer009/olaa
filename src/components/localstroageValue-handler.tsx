'use client';
import { useEffect } from "react";
import { setIsLoggedIn } from "@/store/userRoleSlice";
import { useDispatch } from "react-redux";

export default function LocalStorageValueHandler() {
    const dispatch = useDispatch();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn == null || isLoggedIn === "false") {
            dispatch(setIsLoggedIn(false));
        } else {
            dispatch(setIsLoggedIn(true));
        }
    }, [dispatch]);

    return <div />;
}