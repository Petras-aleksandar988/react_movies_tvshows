import {create} from 'zustand';

type PageStore ={
    page : number;
    increment : ()=>void;
    decrement : ()=>void;
}
export const usePageNumber = create<PageStore>((set) =>({
    page:1,
    increment: ()=>{
        set((state) => ({page: state.page  + 1}))
    },
    decrement: ()=>{
        set((state) => ({page: state.page  + 1}))
    }
}))

// export  function usePageNumber() {

//     create<PageStore>(()=>({
//        page:1
//    }));

// }



