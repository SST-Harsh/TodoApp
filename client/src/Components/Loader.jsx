import loading from '../../public/loading.gif';

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={loading} alt="Loading..." className="w-20 h-20" />
    </div>
  );
}
