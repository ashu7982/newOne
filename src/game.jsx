

import { useEffect, useState } from 'react';

export default function Main() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://rickandmortyapi.com/api/character');
        const characters = await res.json();
        setData(characters.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredData = data.filter((character) =>
    character.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '90%', margin: '0 auto', padding: '20px' }}>
      <p>Hello</p>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search by name"
        value={searchInput}
        onChange={handleSearch}
        style={{
          width: '100%',
          padding: '10px',
          boxSizing: 'border-box',
          marginBottom: '20px',
        }}
      />
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {filteredData.map((character) => (
          <li
            key={character.id}
            style={{
              textAlign: 'center',
              margin: '10px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              width: '30%', // Adjust as needed for the number of columns
            }}
          >
            <h3>{character.name}</h3>
            <img
              src={character.image}
              alt={character.name}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
