'use client';
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from '../Avatar';
import { useCallback,useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps{
    currentUser?: SafeUser |null
}

const UserMenu:React.FC<UserMenuProps>=({
    currentUser
})=>{
    const registerModal=useRegisterModal();
    const loginModal=useLoginModal();
    const rentModal=useRentModal();
    const [isOpen,setIsOpen]=useState(false);

    const toggleOpen=useCallback(()=>{
        setIsOpen((value)=>!value);
    },[]);

    const onRent=useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }
        rentModal.onOpen();
    },[currentUser,loginModal,rentModal]);

    return (
        <div className="relative ">
            <div className="flex flex-row items-center gap-3">
                <div
                onClick={onRent}
                className="
                 hidden
                 md:block
                 text-sm
                 font-semibold
                 py-3
                 px-4
                 rounder-full
                 hover:bg-neutral-100
                 transition
                 cursor-pointer
                 "
                >
                    Horizon My Home
                </div>
                <div
                onClick={toggleOpen}
                className="p-4 md:py-1 md:px-2 border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
          {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer ">
                    {currentUser?(
                    <>
                        <MenuItem 
                            onclick={()=>{}}
                            label="My Trips"
                        />
                        <MenuItem 
                            onclick={()=>{}}
                            label="My Favourite"
                        />
                        <MenuItem 
                            onclick={()=>{}}
                            label="My Reservations"
                        />
                        <MenuItem 
                            onclick={()=>{}}
                            label="My Properties"
                        />
                        <MenuItem 
                            onclick={rentModal.onOpen}
                            label="Horizon my home"
                        />
                        <hr />
                        <MenuItem 
                            onclick={()=>signOut()}
                            label="Logout"
                        />
                    </>

                    ):(
                    <>
                        <MenuItem 
                            onclick={loginModal.onOpen}
                            label="Login"
                        />
                        <MenuItem 
                            onclick={registerModal.onOpen}
                            label="Sign up"
                        />
                    </>
                    )}
                </div>
            </div>
          )}
        </div>
    );   
}
export default UserMenu;