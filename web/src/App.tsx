import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateRoom from "./pages/CreateRoom";
import { Room } from "./pages/Room";
import RecordRoomAudio from "./pages/RecordRoomAudio";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<CreateRoom />} />
            <Route path="/room/:id" element={<Room />} />
            <Route path="/room/:id/audio" element={<RecordRoomAudio />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
