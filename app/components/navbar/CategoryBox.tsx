'use client';
import { IconType } from "react-icons";
import {useRouter,useSearchParams} from 'next/navigation';
import { useCallback } from "react";
import qs from 'query-string';

interface CategoryBoxProps{
    icon:IconType;
    label:string;
    selected?:boolean;
}
const CategoryBox:React.FC<CategoryBoxProps>=({
    icon:Icon,
    label,
    selected
})=>{
    const router=useRouter();
    const params=useSearchParams();

    const handleClick=useCallback(()=>{
        //define empty query
        let currentQuery={};

        //we have looked through the params and if there is a category key, we will assign it to currentQuery
        if(params){
            currentQuery=qs.parse(params.toString());
        }

        //spread the currentQuery and add the new category key to it
        const updatedQuery: any={
            ...currentQuery,
            category:label
        }

        //if the category key is already in the query, we will remove it
        if(params?.get('category')===label){
            delete updatedQuery.category;
        }

        //generate the url with the updated query
        const url=qs.stringifyUrl({
            url:'/',
            query:updatedQuery
        },{skipNull:true});

        router.push(url);
    },[label,params,router]);

    return (
        <div
        onClick={handleClick} 
        className={`
            flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
            ${selected? 'border-b-neutral-800' : 'border-transparent'}
            ${selected? 'text-neutral-800' : 'text-neutral-500'}
    
        `}>
            <Icon size={26}/>
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    )
}
export default CategoryBox;