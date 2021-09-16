import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../../../utils/ThemeContext";
// import { store } from "../../../store";
import { toggleShowName } from "../../../store/profile/actions";


const withContext = (Component) => {
  return (props) => {
    const theme = useContext(ThemeContext);
    console.log(theme)
    return <Component {...props} theme={theme} />;
  };
};

export const Profile = ({ theme }) => {
  const showName = useSelector((state) => state.showName);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleShowName);
  };
  
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
