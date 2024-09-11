interface DataPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const CardPosts: React.FC<DataPost> = ({ userId, id, title, body }) => {
  return (
    <div
      className="container mx-auto px-3 py-2 bg-white border border-gray-200 
    rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800
     dark:border-gray-700 dark:hover:bg-gray-700 mb-3"
    >
      <div className="justify-between flex items-center">
        <p>ID : {id}</p>
        <p className="pr-2">User ID : {userId}</p>
      </div>
      <p className="uppercase">Title : {title}</p>
      <p className="text-justify">Body : {body}</p>
    </div>
  );
};

export default CardPosts;
