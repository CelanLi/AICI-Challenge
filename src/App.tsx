import React, {useEffect, useState} from 'react';
import './App.css';
import {fetchData} from "./apis/user";

export type User = {
    id : number,
    name : string,
    email: string,
    website: string,
    phone: string

}

function App() {
  const [count, setCount] = useState(1);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const getUserData = async (count: number): Promise<User | undefined> => {
      try {
          const user = await fetchData(count);
          // encapsulate the user into a userInfo object
          if (user){
              const userInfo:User = {
                  id:user.data.id,
                  name: user.data.name,
                  email: user.data.email,
                  website: user.data.website,
                  phone: user.data.phone
              }
              return userInfo;
          }
          else {
              alert("user is empty")
          }
      }
      catch (error){
          alert('Error: ' + error);
      }
  }

  // listen the change of count
  useEffect(() => {
    const fetchDataAsync = async () => {
        return await getUserData(count);
    };
    // set the userInfo everytime when count changes
    fetchDataAsync().then(r => {if (r) setUserInfo(r)});
    }, [count]);

  // handle minus button click
  const handleMinusClick = () => {
      if (count > 1){
          setCount(count-1);
      }
      else{
          alert("You cannot make count less than 1.")
      }
  }

    // handle plus button click
  const handlePlusClick = () => {
      if (count < 10){
          setCount(count+1);
      }
      else{
          alert("You cannot make count greater than 10.")
      }
  }

  return (
      <div className="App">
          <header className="App-header">
              <p>React Challenge</p>
          </header>
          <div className="content">
              <div className="counter">
                  <button onClick={handleMinusClick}>-</button>
                  <p>{count}</p>
                  <button onClick={handlePlusClick}>+</button>
              </div>
              <div className="user-info">
                  <p><strong>Name:</strong> {userInfo?.name ?? '-'}</p>
                  <p><strong>Email:</strong> {userInfo?.email ?? '-'}</p>
                  <p><strong>Phone:</strong> {userInfo?.phone ?? '-'}</p>
                  <p><strong>Website:</strong> {userInfo?.website ?? '-'}</p>
              </div>
          </div>
      </div>
  );
}

export default App;
