import { useEffect, useState } from 'react';
import '../styles/joke.css';

const Jokes = () => {
  const [lists, setLists] = useState([]);
  const [show, setShow] = useState(null); // This is typically used when you don't have a specific initial value(could be obj or arr).
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
      <h1>The Joke Machine</h1>
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
        {show && (// show is boolean var if true display div
// The expression before && is evaluated.
// If the expression evaluates to a truthy value, the JSX after && is rendered.
// If the expression evaluates to a falsy value, the JSX after && is skipped and not rendered.
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
