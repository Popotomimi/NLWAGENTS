import CreateRoomForm from "@/components/CreateRoomForm";
import RoomList from "@/components/RoomList";

const CreateRoom = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 grid-cols-2 items-start">
          <CreateRoomForm />

          <RoomList />
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
