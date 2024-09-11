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
    <div className="min-h-screen flex flex-col dark:bg-gradient-to-br from-teal-600 to-black dark:text-gray-200">
      <Navbar title="Fake Posts API" />
      <main className="flex-col items-center justify-center px-10 font-poppins">
        {posts.map((post) => {
          return (
            <CardPosts
              key={post.id}
              userId={post.userId}
              title={post.title}
              body={post.body}
              id={post.id}
            ></CardPosts>
          );
        })}
      </main>
    </div>
  );
};

export default Posts;
