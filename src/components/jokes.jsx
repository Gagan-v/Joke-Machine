import { useEffect, useState } from 'react';
import '../styles/joke.css';

const Jokes = () => {
  const [lists, setLists] = useState([]);
  const [show, setShow] = useState(null);
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.chucknorris.io/jokes/categories');
      const data = await res.json();
      setLists(data);
    };
    fetchData();
  }, []);

  const handleclick = async (x) => {
    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${x}`);
    const data = await response.json();
    setShow(data);
    setShowDiv(true);
  };

  const handleNextJoke = async () => {
    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${show.categories}`);
    const data = await response.json();
    setShow(data);
  };

  const handleHideDiv = () => {
    setShowDiv(false);
  };

  return (
    <div className="jokes">
      <h1>Chuck Norris</h1>
      <div className="list">
        {lists.map((x) => (
          <div className="container" onClick={() => handleclick(x)} key={x}>
            <h2>{x}</h2>
            <p>{`Unlimited Jokes On ${x}`}</p>
          </div>
        ))}
      </div>
      {showDiv && <div className="my-div">
      <div className="details">
        {show && (
          <div className="data">
            <div className="box">
            <h2>{show.categories}</h2>
            <button className='cross' onClick={handleHideDiv}>❌</button>
            </div>
            <div className="para">
            <p>{`"${show.value}"`}</p>
            <button className='next' onClick={handleNextJoke}>Next Joke</button>
            </div>
          </div>
        )}
      </div>
      </div>}
    </div>
  );
};

export default Jokes;
