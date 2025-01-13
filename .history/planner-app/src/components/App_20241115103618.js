import '../styles/App.css';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';
import Header from './Header';
import Footer from './Footer';
import CanvasElements  from './MainContent/CanvasElements';
import { CanvasProvider } from './contexts/CanvasContext';

const App = () => {
  return (
    <CanvasProvider>
      <div className="app-wrapper">
        <Header />
        <div className="main-content">
        <ObjectProvider>
          <LeftSidebar />
        </ObjectProvider>
          <CanvasElements />
          <RightSidebar /> 
        </div>
        <Footer />
      </div>
    </CanvasProvider>
  );
};

export default App;