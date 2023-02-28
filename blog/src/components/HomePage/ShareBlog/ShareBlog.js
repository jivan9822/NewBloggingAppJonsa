import formCss from './Share.module.css';
import axios from 'axios';
import { useState } from 'react';

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];
const ShareForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { text, source, category };
    axios
      .post('/addBlog', blog)
      .then((res) => {
        console.log(res.data.data.blog);
        const newBlog = res.data.data.blog;
        props.setFacts((old) => [...old, newBlog]);
      })
      .catch((err) => {
        console.log(err);
        alert('Your Session expired! Please login!');
        window.location.reload();
      });
  };
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const textLength = text.length;

  return (
    <form className={formCss.factForm} onSubmit={handleSubmit}>
      <textarea
        type='text'
        placeholder='Share a fact with the world...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type='text'
        placeholder='Trustworthy source...'
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=''>Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className={formCss.btn}>Post</button>
    </form>
  );
};

export default ShareForm;
