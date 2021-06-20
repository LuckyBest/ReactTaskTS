import axios from "axios";
import React, { useState, useEffect, Suspense } from "react";
import Header from "./Components/Header/Header";
import "./App.css";
import FetchingComponent from "./Components/FetchingComponent/FetchingComponent";
import Loader from "./Components/Loader/Loader";
const UserComponent = React.lazy(() =>
  import("./Components/UserComponent/UserComponent")
);

const imageFile =
  "https://th.bing.com/th/id/OIP.xtPHCReBbZoveYWjnesFlwHaHa?pid=ImgDet&rs=1";

const App = () => {
  
  //Масив користувачів
  const [listItems, setListItems] = useState<any[]>([]);
  //Булева перевірка загрузки данних
  const [isFetching, setIsFetching] = useState(false);
  //Підугрузка потрібної кількості юзерів
  const usersAmount = 50;
  //Номер юзера
  let counter = 0;
  //Перехід по сторінках
  let page = 1;


  //додаю івент на глобальну змінну
  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  //відслідковую скрол
  const handleScroll = () => {
    if (
      Math.floor(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  //отримую дані з API
  const fetchData = async () => {
    setTimeout(async () => {
      await axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${usersAmount}`
        )
        .then((response) => {
          page = +1;
          setListItems(():any => {
          return [...listItems, ...response.data.items];
        })
        });
    }, 1000);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="main-content__container">
          {listItems.map((listItem) => {
            counter += 1;
            return (
              <div key={counter} className="main-content__container-component">
                <Suspense fallback={<Loader />}>
                  <UserComponent
                    name={listItem.name}
                    photo={imageFile}
                    id={listItem.id}
                    counter={counter}
                  />
                </Suspense>
              </div>
            );
          })}
          {isFetching && <FetchingComponent />}
        </div>
      </main>
    </>
  );
};

export default App;
