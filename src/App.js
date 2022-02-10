import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getAuthors } from './store/features/authors/authorsSelectors';

function App() {
  const authors = useSelector(getAuthors);

  return (
    <BrowserRouter>
      <p>The coolest project from these dudes: {authors.join(', ')}</p>
    </BrowserRouter>
  );
}

export default App;
