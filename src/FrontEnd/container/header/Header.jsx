import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getCategory, clearErrors } from "../../store/action/categoryAction";

import headerStyles from "./Header.module.css";
// import { categoriesData } from "../../Data/CategoriesData";
import { Link } from "react-router-dom";
import { SearchBar } from "../../components/searchBar/SearchBar";
import allServices from "../../Data/ServicesImports";
import { Cities } from "../../Data/CityData";

// import { Test } from "../Test";

export const Header = () => {
  const dispatch = useDispatch();
  const { loading, error, category: categoriesData } = useSelector((state) => {
    // console.log(state.allCategory);
    return state.allCategory;
  })
    
  
  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    dispatch(getCategory());

  }, []);

  if(loading == true){
    return <h2>loading.....</h2>;
  }

  return (
    <div className={headerStyles.container}>
      <div className={headerStyles.title}>
        <h1>Services at the Doorstep</h1>
        <h5>We Focus on Customer Satisfaction</h5>
      </div>

      <div className={headerStyles.inputBoxes}>
        <div className={headerStyles.gradient}></div>
        <SearchBar
          placeholder="Search the Location"
          name="location"
          data={Cities}
        />
        <SearchBar
          placeholder="Search the Service"
          name="services"
          data={allServices}
        />
      </div>

      <div className={headerStyles.categories}>
        <h3>Categories</h3>
        <div className={headerStyles.categories_container}>
          {/* {
            category.map((item) => {
              console.log(item.categoryName)
            })
          } */}
          {categoriesData?.items?.map((item) => (
            <div
              key={item._id}
              // onClick={() => onclickHandler(item)}
              className={headerStyles.categories_container_item}
            >
              <Link to={"/view?category=" + item.categoryName}>
                <img src={"/image/categoryImages/" + item.image} alt={item.categoryName} />
                <span>{item.categoryName}</span>
              </Link>
            </div>
          ))}
          {/* <Test showModal={show} closeModal={() => setShow(false)} /> */}
        </div>
      </div>
    </div>
  );
};
