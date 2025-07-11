import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

type RoomParams = {
  id: string;
};

const RecordRoomAudio = () => {
  const params = useParams<RoomParams>();

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }

    // Libera o microfone
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();
    formData.append("file", audio, "audio.webm");

    const response = await fetch(
      `http://localhost:3333/rooms/${params.id}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log(result);
  }

  async function startRecording() {
    setIsRecording(true);

    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });

    streamRef.current = audioStream;

    recorder.current = new MediaRecorder(audioStream, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64880,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("🎙️ Gravação iniciada!");
    };

    recorder.current.onstop = () => {
      console.log("🛑 Gravação encerrada");
    };

    recorder.current.start();
  }

  if (!params.id) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-950 text-white">
      <div className="flex flex-col items-center gap-6 p-6 rounded-lg shadow-lg bg-gray-900">
        <h1 className="text-2xl font-bold">Gravador de Áudio 🎤</h1>
        {isRecording ? (
          <Button
            onClick={stopRecording}
            className="bg-red-600 hover:bg-red-700">
            Parar Gravação
          </Button>
        ) : (
          <Button
            onClick={startRecording}
            className="bg-green-600 hover:bg-green-700">
            Iniciar Gravação
          </Button>
        )}
        <p className="text-sm text-gray-300">
          {isRecording ? "🔴 Gravando..." : "Clique para começar a gravar"}
        </p>
      </div>
    </div>
  );
};

export default RecordRoomAudio;
