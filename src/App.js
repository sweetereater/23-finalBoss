import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getAuthors } from './store/features/authors/authorsSelectors';
import Header from "./components/HeaderComponent/HeaderComponent";
import SubmitFormComponent from "./components/commons/SubmitFormComponent/SubmitFormComponent";
import PaginationComponent from "./components/commons/PaginationComponent/PaginationComponent";
import './App.css'
import PlayerWidgetComponent from "./components/PlayerWidgetComponent/PlayerWidgetComponent";
import SongItemComponent from "./components/SongItemComponent/SongItemComponent";

function App() {
  const authors = useSelector(getAuthors);

  return (
    <BrowserRouter>
        <div className='App'>
            <Header />
            <div className='MainWrapper'>
                <p>The coolest project from these dudes: {authors.join(', ')}</p>
                <SubmitFormComponent/>
                <PlayerWidgetComponent />
                <SongItemComponent />
                <SongItemComponent />
                <SongItemComponent />
                <SongItemComponent />
                <SongItemComponent />
                <PaginationComponent />
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
