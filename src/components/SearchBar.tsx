import  {useContext} from 'react'
import {Context} from '../App'
interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBar({onChange}: SearchBarProps)  {
  const { searchTerm} = useContext(Context);
    return (
        <div className="search">
          {/* Apply props to the input element */}
          <input
           placeholder="search for the movie"
            value={searchTerm }
            onChange={onChange}
          />
        </div>
      );
}

// import  {useContext} from 'react'
// import {Context} from '../App'
// // interface SearchBarProps {
// //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // }
// export default function SearchBar()  {
//   const { searchTerm} = useContext(Context);
//     return (
//         <div className="search">
//           {/* Apply props to the input element */}
//           <input
//            placeholder="search for the movie"
//             value={searchTerm}
//             onChange={(e)=>e.target.value}
//           />
//         </div>
//       );
// }

