import CardPosts from "../components/cardPosts";
import Navbar from "../components/navbar";

const base_url = "https://jsonplaceholder.typicode.com/posts";

interface Iposts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts = async () => {
  const response = await fetch(base_url);
  const posts: Iposts[] = await response.json();

  return (
    <div className="min-h-screen flex flex-col bg-honeyDew dark:bg-eggplant text-eggplant dark:text-honeyDew">
      {/* Navbar */}
      <Navbar title="Fake Posts API" />

      <main className="max-w-4xl mx-auto px-5 py-8 font-poppins space-y-6">
        <h1 className="text-2xl font-bold text-center mb-8">Posts</h1>

        {/* Display Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <CardPosts
              key={post.id}
              userId={post.userId}
              title={post.title}
              body={post.body}
              id={post.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Posts;
