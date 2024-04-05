import Link from 'next/link';

const Home: React.FC = () => {
  const arr = ['bobby', 'hadz', 'com']
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to AIWA!</h1>
      <p className="text-lg text-gray-700 mb-8">Your one-stop destination for all AI needs.</p>
      <div className="flex space-x-4">
        <div className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer">
          <Link href="/auth/login">
            <span>Sign In</span>
          </Link>
        </div>
        <div className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg cursor-pointer">
          <Link href="/auth/register">
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;