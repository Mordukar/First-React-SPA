import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../../../utils/ThemeContext";
// import { store } from "../../../store";
import { toggleShowName } from "../../../store/profile/actions";
import { useEffect } from "react";


const withContext = (Component) => {
  return (props) => {
    const theme = useContext(ThemeContext);
    return <Component {...props} theme={theme} />;
  };
};

export const Profile = ({ theme, onLogout}) => {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");

  const showName = useSelector((state) => state.showName);
  const dispatch = useDispatch();

  const handleClick = () => {
    onLogout
    // dispatch(toggleShowName);
  };

  useEffect(() => {
    
  })
  
  return (
    <>
    
      <button onClick={theme?.changeTheme}>Toggle theme</button>
      
      <div>
        <span>Показать имя пользователя</span>
        <input onClick={handleClick} type='checkbox'></input>
      </div>
      
      {showName && <div>Show name is true</div>}

      <h3 style={{ color: theme?.theme === "light" ? "red" : "black" }}>
        This is profile page
      </h3>
   
    </>
  );
};

export const ThemedProfile = withContext(Profile);
