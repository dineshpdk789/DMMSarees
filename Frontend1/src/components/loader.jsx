import { TailSpin } from 'react-loader-spinner';

const Loader = () => (
  <div className="flex justify-center items-center h-screen bg-white">
    <TailSpin
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      visible={true}
    />
  </div>
);

export default Loader;